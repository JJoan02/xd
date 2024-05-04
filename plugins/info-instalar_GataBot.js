let handler  = async (m, { conn, usedPrefix, command }) => {
let joan = `𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝘾𝙄𝙊𝙉 𝘿𝙀 𝙅𝙊𝘼𝙉𝘽𝙊𝙏

*━━━━━━━━━━━━━⬣*
✅ 𝗜𝗡𝗦𝗧𝗔𝗟𝗔𝗥 𝗘𝗡 𝗕𝗢𝗫𝗠𝗜𝗡𝗘
*⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯*
*𝙅𝙤𝙖𝙣𝘽𝙤𝙩-𝙏𝙆 : 𝘽𝙤𝙭𝙈𝙞𝙣𝙚*
*_Tutorial en proceso..._*
*⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯*
_GRUPO OFICIAL_ 
_https://chat.whatsapp.com/GQ82mPnSYnm0XL2hLPk7FV_
*⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯*
_Tutorial - Crea una cuenta en la Dashboard_
_https://youtu.be/o6ZSpMOsvHs?si=g8bYaVSD43f_JW7s_
*⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯*
_DASHBOARD_
_https://dashboard.infinitywa.xyz/_
*⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯*
_PANEL_
_https://live.panel-infinitywa.store/_

*━━━━━━━━━━━━━⬣*
✅ 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝙍 𝙀𝙉 𝙏𝙀𝙍𝙈𝙐𝙓
*⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯*
termux-setup-storage
apt update -y && yes | apt upgrade && pkg install -y bash wget mpv && wget -O - https://raw.githubusercontent.com/JJoan02/JoanBot-TK/master/joan.sh | bash
*━━━━━━━━━━━━━⬣*`
await conn.sendFile(m.chat, joanImg, 'lp.jpg', joan, fkontak, false, { contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: '𝗦𝘂𝗽𝗲𝗿 𝗝𝗼𝗮𝗻𝗕𝗼𝘁-𝗧𝗞 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', previewType: 0, thumbnail: imagen4, sourceUrl: accountsgb }}})}
/*conn.sendButton(m.chat, joan, `Comunícate con Mí Creadora si necesitas ayuda con la Instalación.\n\nContact My Creator if you need help with the Installation.\n\n${ig}\n${wm}`, picture, [
['𝘾𝙪𝙚𝙣𝙩𝙖𝙨 𝙊𝙛𝙞𝙘𝙞𝙖𝙡𝙚𝙨 | 𝘼𝙘𝙘𝙤𝙪𝙣𝙩𝙨 ✅', '.cuentasgb'],
['🎁 𝘿𝙤𝙣𝙖𝙧 | 𝘿𝙤𝙣𝙖𝙩𝙚', '.donar']], fkontak, m)}*/
handler.command = /^(instalarbot|instalarjoanbot|instalarjoan|procesobot|botproceso|procesodelbot|botinstall|installbot)/i
export default handler
