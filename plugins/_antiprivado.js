const comandos = /piedra|papel|tijera|estado|verificar|code|jadibot --code|--code|creadora|bottemporal|grupos|instalarbot|términos|bots|deletebot|eliminarsesion|serbot|verify|register|registrar|reg|reg1|nombre|name|nombre2|name2|edad|age|edad2|age2|genero|género|gender|identidad|pasatiempo|hobby|identify|finalizar|pas2|pas3|pas4|pas5|registroc|deletesesion|registror|jadibot/i

let handler = m => m
handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, usedPrefix, command }) {
    if (m.isBaileys && m.fromMe) return !0 // Ignorar mensajes del propio bot
    if (m.isGroup) return !1 // Ignorar mensajes en grupos
    if (!m.message) return !0 // Ignorar mensajes sin contenido

    // Crear una expresión regular para los comandos permitidos
    const regex = new RegExp(`^${comandos.source}$`, 'i')
    
    // Obtener datos del usuario, chat y bot
    let chat, user, bot
    chat = global.db.data.chats[m.chat]
    user = global.db.data.users[m.sender]
    bot = global.db.data.settings[this.user.jid] || {}

    // Obtener lista de owners y oficiales
    const owners = global.owner || []
    const officials = global.official || []
    const isAuthorized = owners.includes(m.sender) || officials.includes(m.sender)

    // Verificar si el antiPrivate está activo
    if (bot.antiPrivate) {
        // Si el mensaje es privado y no es de un owner o un oficial, verificar si es un comando permitido
        if (!m.isGroup && !isAuthorized) {
            if (!regex.test(m.text.toLowerCase().trim())) {
                // Si el comando no está permitido, ignorar el mensaje
                return !0
            }
        }
    }
    
    // Lógica adicional de manejo de mensajes privados sin bloquear a ningún contacto
    if (!m.isGroup && !isAuthorized) {
        if (user.counterPrivate === 0) {
            await conn.reply(m.chat, mid.smsprivado(m), m, { mentions: [m.sender] })  
        } else if (user.counterPrivate === 1) {
            let grupos = redesMenu
            await conn.reply(m.chat, mid.smsprivado1(m, grupos), m, { mentions: [m.sender] }) 
        } else if (user.counterPrivate === 2) {
            await conn.reply(m.chat, mid.smsprivado2(m), m, { mentions: [m.sender] }) 
        }
        user.counterPrivate++
    }
    return !1
}
export default handler
