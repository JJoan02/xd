import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    try {   
        if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
        if (!m.mentionedJid.length) m.mentionedJid.push(m.sender)
        
        let res = await fetch('https://neko-love.xyz/api/v1/slap')
        let json = await res.json()
        let { url } = json

        let message = `+${m.sender.split('@')[0]} le dio una bofetada a ${m.mentionedJid.map((user) => (user === m.sender) ? 'alguien' : `+${user.split('@')[0]}`).join(', ')}`
        
        conn.sendFile(m.chat, url, 'slap.gif', message, m, false, { mimetype: 'image/gif' })
    } catch (e) {
        console.error(e)
        m.reply('Ocurrió un error, por favor intente de nuevo.')
    }
}

handler.help = ['slap']
handler.tags = ['general']
handler.command = /^slap|bofetada|manotada|abofetear|golpear/i

export default handler
