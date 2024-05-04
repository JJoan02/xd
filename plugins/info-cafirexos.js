let handler = async (m, { conn, command, usedPrefix }) => {
let cafirexostxt = `
_Optimice la implementación de *JoanBot* mediante la integración en un servicio de alojamiento de alto rendimiento._

*Compatible con JoanBot*
Aprovecha la compatibilidad y comienza usar JoanBot en servidores de alto rendimiento. El Staff de JoanBot e Infinity hacen posible que puedas ejecutar las funciones que tanto te gusta usar sintiendo una experiencia fluida y de calidad.

🔵 \`\`\`Información del Host\`\`\`

💻 *Página*
https://dashboard.infinitywa.xyz/

✨ *Dashboard*
https://dashboard.infinitywa.xyz/

⚙️ *Panel*
https://live.panel-infinitywa.store/

📢 *Canal de WhatsApp*
https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A

💥 *Grupo de WhatsApp*
https://chat.whatsapp.com/GQ82mPnSYnm0XL2hLPk7FV

📧 *Correo*
pronto...

🧑‍💻 *Contacto (MarioOFC)*
https://wa.me/5492266613038
`
await conn.sendFile(m.chat, 'https://telegra.ph/file/e1facb906c60556889497.jpg', 'fantasy.jpg', cafirexostxt.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `🔵 C A F I R E X O S 🔵`,
body: `✅ Hosting de Calidad`,
mediaType: 1,
sourceUrl: accountsgb,
thumbnailUrl: 'https://telegra.ph/file/e1facb906c60556889497.jpg'
}}
}, { mentions: m.sender })

}
handler.command = /^(Infinity|Host)$/i
export default handler
