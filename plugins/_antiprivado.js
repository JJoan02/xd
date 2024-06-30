const comandosPermitidos = /piedra|papel|tijera|estado|verificar|code|jadibot --code|--code|creadora|bottemporal|grupos|instalarbot|términos|bots|deletebot|eliminarsesion|serbot|verify|register|registrar|reg|reg1|nombre|name|nombre2|name2|edad|age|edad2|age2|genero|género|gender|identidad|pasatiempo|hobby|identify|finalizar|pas2|pas3|pas4|pas5|registroc|deletesesion|registror|jadibot/i

let handler = m => m
handler.before = async function (m, { conn, isOwner, isROwner }) {
    if (m.fromMe) return !0 // Ignorar mensajes enviados por el propio bot
    if (m.isGroup) return !1 // Ignorar mensajes enviados en grupos
    if (!m.message) return !0 // Ignorar mensajes que no contienen texto

    // Crear una expresión regular para los comandos permitidos
    const regex = new RegExp(`^${comandosPermitidos.source}$`, 'i')
    
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
    
    return !1 // No bloquear ni enviar advertencias, simplemente ignorar
} 
export default handler
