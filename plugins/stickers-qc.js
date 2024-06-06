import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let text = extractText(m, args);
        validateText(text);

        let pp = await getProfilePictureUrl(conn, m.sender);

        const obj = createQuoteObject(m.name, pp, text);
        const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const buffer = Buffer.from(json.data.result.image, 'base64');
        let stiker = await sticker(buffer, false, global.packname, global.author);
        if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m);
    } catch (error) {
        m.reply(error.message);
    }
}

const extractText = (m, args) => {
    if (args.length >= 1) {
        return args.join(" ");
    } else if (m.quoted && m.quoted.text) {
        return m.quoted.text;
    } else {
        throw new Error("╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇* ⊱❗️⊱╮\n\n𝘼𝙂𝙍𝙀𝙂𝙐𝙀́ 𝙐𝙉 𝙏𝙀𝙓𝙏𝙊 𝙋𝘼𝙍𝘼 𝘾𝙍𝙀𝘼𝙍 𝙀𝙇 𝙎𝙏𝙄𝘾𝙆𝙀𝙍 ");
    }
}

const validateText = (text) => {
    if (!text) throw new Error('𝙔 𝙀𝙇 𝙏𝙀𝙓𝙏𝙊?');
    if (text.split(' ').length > 30) throw new Error('𝙈𝘼𝙓𝙄𝙈𝙊 30 𝙋𝘼𝙇𝘼𝘽𝙍𝘼𝙎!');
}

const getProfilePictureUrl = async (conn, sender) => {
    return await conn.profilePictureUrl(sender, 'image').catch(() => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg');
}

const createQuoteObject = (name, pp, text) => {
    return {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#000000",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
                "id": 1,
                "name": name,
                "photo": {
                    "url": pp
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    }
}

handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(qc)$/i

export default handler
