import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
    if (!m.quoted) throw '╰⊱❗️⊱ *LO USÓ MAL* ⊱❗️⊱╮\n\nRESPONDE AL STICKER QUE DESEAS AGREGAR UN PAQUETE Y UN NOMBRE'
    let stiker = false
    try {
        let [packname, ...author] = text.split('|')
        author = (author || []).join('|')
        let mime = m.quoted.mimetype || ''
        if (!/webp/.test(mime)) throw '╰⊱❗️⊱ *LO USÓ MAL* ⊱❗️⊱╮\n\nRESPONDE AL STICKER QUE DESEAS AGREGAR UN PAQUETE Y UN NOMBRE'
        let img = await m.quoted.download()
        if (!img) throw '╰⊱❗️⊱ *LO USÓ MAL* ⊱❗️⊱╮\n\nRESPONDE AL STICKER QUE DESEAS AGREGAR UN PAQUETE Y UN NOMBRE'
        stiker = await addExif(img, packname || '', author || '')
    } catch (e) {
        console.error(e)
        if (Buffer.isBuffer(e)) stiker = e
    } finally {
        if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: `😻 Super JoanBot-TK - WhatsApp`, mediaType: 2, sourceUrl: nn, thumbnail: imagen1}}}, { quoted: m })
        else throw '╰⊱❗️⊱ *LO USÓ MAL* ⊱❗️⊱╮\n\nERROR ALGO SALIÓ MAL, VUELVA A INTENTAR DE NUEVO'
    }
}

handler.help = ['wm <nombre del paquete>|<autor>']
handler.tags = ['sticker']
handler.command = /^robar|wm$/i
export default handler
