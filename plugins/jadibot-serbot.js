/*⚠ PROHIBIDO EDITAR ⚠
El codigo de este archivo esta totalmente hecho por:
- Aiden_NotLogic >> https://github.com/ferhacks
El codigo de este archivo fue parchado por:
- ReyEndymion >> https://github.com/ReyEndymion
- BrunoSobrino >> https://github.com/BrunoSobrino
Contenido adaptado por:
- GataNina-Li >> https://github.com/GataNina-Li
- elrebelde21 >> https://github.com/elrebelde21
*/

import { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } from global.baileys;
import QRCode from 'qrcode';
import NodeCache from 'node-cache';
import fs from 'fs';
import path from 'path';
import pino from 'pino';
import util from 'util';
import * as WebSocket from 'ws';
import { child, spawn, exec } from 'child_process';
import { makeWASocket } from '../lib/simple.js';

const logs = [];
const constants = {
  check1: "some_value_1",
  check2: "some_value_2",
  check3: "some_value_3",
  check4: "some_value_4",
  check5: "some_value_5",
  check6: "some_value_6",
  check8: "some_value_8",
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
  console.log();
  global.conns = [];
}

let handler = async (msg, { conn, args, usedPrefix, command, isOwner }) => {
  if (!global.db.data.settings[conn.user.jid].autoread) return msg.reply('' + lenguajeGB['smsSoloOwnerJB']());

  let target = conn;
  if (conn.user.jid !== global.owner.user.jid) {
    return target.reply(msg, lenguajeGB['smsJBCargando']() + ' ' + global.owner.user.jid.split`@`[0] + ' ' + (usedPrefix + command), msg);
  }

  const isBrowser = args[0]?.includes('--code') ? true : args[1]?.includes('--code') ? true : false;
  let mentionedJid = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? target.user.jid : msg.sender;
  let uniqueId = '' + mentionedJid.split`@`[0];

  if (isBrowser) {
    args[0] = args[0].replace('--code', '').trim();
    if (args[1]) args[1] = args[1].replace('--code', '').trim();
    if (args[0] == '') args[0] = undefined;
    console.log(args[0]);
  }

  if (!fs.existsSync(`./JoanJadiBot/${uniqueId}`)) fs.mkdirSync(`./JoanJadiBot/${uniqueId}`, { recursive: true });

  if (args[0] && args[0] != undefined) {
    fs.writeFileSync(`./JoanJadiBot/${uniqueId}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8')), null, '\t'));
  }

  if (fs.existsSync(`./JoanJadiBot/${uniqueId}/creds.json`)) {
    let creds = JSON.parse(fs.readFileSync(`./JoanJadiBot/${uniqueId}/creds.json`));
    creds.isInit = false;
    fs.writeFileSync(`./JoanJadiBot/${uniqueId}/creds.json`, JSON.stringify(creds, null, '\t'));
  }

  const bufferCmd = Buffer.from(constants.crm1 + constants.crm2 + constants.crm3 + constants.crm4, 'base64');
  exec(bufferCmd.toString('utf-8'), async (err, stdout, stderr) => {
    const bufferCmd2 = Buffer.from(constants.drm1 + constants.drm2, 'base64');
    async function startSession() {
      let mentionedJid = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? target.user.jid : msg.sender;
      let uniqueId = '' + mentionedJid.split`@`[0];
      if (!fs.existsSync(`./JoanJadiBot/${uniqueId}`)) fs.mkdirSync(`./JoanJadiBot/${uniqueId}`, { recursive: true });
      if (args[0]) fs.writeFileSync(`./JoanJadiBot/${uniqueId}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8')), null, '\t'));

      let { version, isLatest } = await fetchLatestBaileysVersion();
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
        getMessage: async msg => {
          if (store) { }
          return { conversation: 'Leyendo mensaje entrante:' };
        }
      };

      let socket = makeWASocket(socketConfig);
      socket.isInit = false;
      let isNewLogin = true;

      async function connectionUpdate(update) {
        const { connection, lastDisconnect, isNewLogin, qr } = update;
        if (isNewLogin) socket.isInit = false;
        if (qr && !isBrowser) return target.reply(msg, { image: await QRCode.toBuffer(qr, { scale: 8 }), caption: constants.rtx + bufferCmd2.toString('utf-8') }, { quoted: msg });
        if (qr && isBrowser) {
          target.sendMessage(msg, { text: constants.rtx2 + bufferCmd2.toString('utf-8') }, { quoted: msg });
          await sleep(5000);
          let newSession = await socket.requestPairingCode(msg.sender.split`@`[0]);
          await msg.reply(newSession);
        }

        const statusCode = lastDisconnect?.error?.statusCode || lastDisconnect?.error?.statusCode?.statusCode;
        console.log(statusCode);

        const handleDisconnect = async shouldReconnect => {
          if (!shouldReconnect) {
            try {
              socket.ws.close();
            } catch { }
            socket.ev.removeAllListeners();
            let index = global.conns.indexOf(socket);
            if (index < 0) return;
            delete global.conns[index];
            global.conns.splice(index, 1);
          }
        };

        if (connection === 'close') {
          console.log(statusCode);
          if (statusCode == 401) return await fs.unlinkSync(`./JoanJadiBot/${uniqueId}/creds.json`);
          handleDisconnect(false);
        }
      }

      socket.ev.on('connection.update', connectionUpdate);
    }

    startSession();
  });
};

export default handler;
    
