// CÓDIGO CREADO POR GataNina-Li : https://github.com/GataNina-Li 
import { createHash } from 'crypto'
let nombre = 0, edad = 0, genero = 0, bio = 0, identidad = 0, pasatiempo = 0, registro, _registro, fecha, hora, tiempo, registrando
let pas1 = 0, pas2 = 0, pas3 = 0, pas4 = 0, pas5 = 0  

let handler = async function (m, { conn, text, command, usedPrefix }) {
let key 
let sinDefinir = '😿 No encontrada'
let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
}) 
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch((_) => joanMenu)
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
let nombreWA = await usedPrefix + conn.getName(m.sender) //'@' + m.sender.split("@s.whatsapp.net")[0]
let user = global.db.data.users[m.sender]
let verificar = new RegExp(usedPrefix)
let biografia = await conn.fetchStatus(m.sender).catch(_ => 'undefined')
bio = biografia.status?.toString() || sinDefinir
	
let intervalId
function mensajeRegistro() {
if (edad === 0) {
clearInterval(intervalId)	
registrando = false
return
}
if (user.registered === true) {
return 
}
if (typeof genero === 'string') {
global.db.data.users[m.sender]['registroC'] = true
registrando = false
conn.reply(m.chat, `*SU TIEMPO DE REGISTRO HA TERMINADO!!*\n\n_Si no continúa en este momento su registro no se guardará, si guarda más tarde su registro se habrá perdido_\n\n*Para continuar escriba:* ${usedPrefix}finalizar`, fkontak, m)
}else{
clearInterval(intervalId)
global.db.data.users[m.sender]['registroR'] = true		
registrando = false
conn.reply(m.chat, `*SU TIEMPO DE REGISTRO HA TERMINADO!!*\n\n_Si no continúa en este momento su registro no se guardará, si guarda más tarde su registro se habrá perdido_\n\n*Para continuar escriba:* ${usedPrefix}finalizar`, fkontak, m)}
}
		
if (user.registered === true) return conn.reply(m.chat, `${lenguajeGB['smsAvisoIIG']()}*YA ESTÁ REGISTRADO!!*\n*SI QUIERE ANULAR SU REGISTRO, USE ESTE COMANDO*\n*${usedPrefix}unreg numero de serie*\n\n*SI NO RECUERDA SU NÚMERO DE SERIE, USE ESTE COMANDO*\n*${usedPrefix}myns*`, fkontak, m)	

if (command == 'verificar' || command == 'verify' || command == 'register' || command == 'reg' || command == 'registrar') {
    await conn.reply(m.chat, `*👀 ¿CÓMO DESEA REGISTRARSE?*\n\n📑 **REGISTRO RÁPIDO**\n\nPara registrarse rápidamente, escriba:\n\`${usedPrefix}reg1 nombre edad\`\n\n📝 Asegúrese de dejar un espacio entre el nombre y la edad.\n\n🗂️ **REGISTRO COMPLETO**\n• Insignia de verificación\n• Desbloquear comandos que requieran registro\n• Premium Temporal Gratis\n• Más opciones disponibles\n\nPara registrarse completamente, escriba:\n\`${usedPrefix}nombre\`\n\n\`\`\`⭐ Tendrá un tiempo limitado para completar el registro\`\`\``, fkontak, m)
}

if (command == 'reg1') {
    registrando = true
    if (registrando === true) {
        intervalId = setInterval(mensajeRegistro, 2 * 60 * 1000) // 2 min
        setTimeout(() => {
            clearInterval(intervalId)
        }, 126000) // 2.1 min
    }

    registro = text.replace(/\s+/g, usedPrefix)
    _registro = text.split(" ", 2)
    if (!text) return conn.reply(m.chat, `${lenguajeGB['smsAvisoIIG']()}👉 *PARÁMETROS DEL REGISTRO:*\n${usedPrefix + command} nombre edad\n\n\`\`\`EJEMPLO:\`\`\`\n${usedPrefix + command} ${gt} 20\n\n*✨ CONSEJO:*\n• _Su nombre no debe de contener números_\n• _La edad no debe de contener letras_\n\n⭐ *Si desea personalizar más su registro, escriba:*\n${usedPrefix}nombre`, fkontak, m)

    if (!_registro[0]) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}*FALTA SU NOMBRE, PARÁMETROS DEL REGISTRO:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\``, fkontak, m)
    if (_registro[0].length >= 30) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}*SU NOMBRE ES MUY LARGO, PARÁMETROS DEL REGISTRO:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\``, fkontak, m)
    if (_registro[0].length <= 2) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}*SU NOMBRE ES MUY CORTO O FALTANTE, PARÁMETROS DEL REGISTRO:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\``, fkontak, m)
    _registro[0] = text.replace(/\s+/g, '').replace(/[0-9]+/gi, "")
    user.name = _registro[0]

    if (!_registro[1]) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}*FALTA SU EDAD, PARÁMETROS DEL REGISTRO:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\``, fkontak, m)
    if (_registro[1] > 90) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}*SU EDAD ES MUY MAYOR, USE OTRA EDAD POR FAVOR*\n\n*PARÁMETROS DEL REGISTRO:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\``, fkontak, m)
    if (_registro[1] < 10) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}*SU EDAD ES MUY MENOR, USE OTRA EDAD POR FAVOR*\n\n*PARÁMETROS DEL REGISTRO:*\n\`\`\`${usedPrefix + command} nombre edad\`\`\``, fkontak, m)
    user.age = parseInt(_registro[1])

    // Marcar al usuario como registrado
    user.registered = true
    user.registroC = false  // Registro rápido
    user.tiempo = new Date().toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    let sn = Math.random().toString(36).substr(2, 6) // Generar código de registro aleatorio
    user.sn = sn
    user.descripcion = 'Sin descripción' // Valor por defecto si no hay descripción
    user.genero = 'No especificado' // Valor por defecto
    user.identidad = 'No especificado' // Valor por defecto

    let registroCompleto = `
😼 *REGISTRADO POR*
❱❱ ${wm}\n
📑 *TIPO DE REGISTRO* 
❱❱ ${user.registroC === true ? 'REGISTRO COMPLETO' : 'REGISTRO RÁPIDO'}\n
⌛ *FECHA/HORA*
❱❱ ${user.tiempo}\n
🛅 *CÓDIGO DE REGISTRO*
❱❱ ${sn}\n
✅ *INSIGNIA DE VERIFICACIÓN*
❱❱   *${user.registered === true ? 'ͧͧͧͦꙶͣͤ✓ᚲᵀᴷ' : ''}*\n
✨ *NOMBRE* 
❱❱ ${user.name}\n
👀 *DESCRIPCIÓN*
❱❱ ${user.descripcion}\n
🔢 *EDAD* 
❱❱ ${user.age}\n` : ''}`.trim()

    await conn.sendMessage(m.chat, {
        text: registroCompleto,
        contextInfo: {
            externalAdReply: {
                title: wm,
                body: '🌟 Registro completado con éxito',
                thumbnailUrl: pp,
                sourceUrl: 'https://www.atom.bio/joan_tk02/',
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: fkontak })
}

if (command == 'nombre' || command == 'name') {
registrando = true
if (registrando === true) {
intervalId = setInterval(mensajeRegistro, 3 * 60 * 1000) //3 min
setTimeout(() => {
clearInterval(intervalId)}, 186000) //3.1 min
}
if (verificar.test(text) == false || text.length <= 1) return conn.reply(m.chat, `${lenguajeGB['smsAvisoIIG']()}👉 *PERSONALICE SU NOMBRE PARA REGISTRAR, EJEMPLO:*\n${usedPrefix}nombre ${gt}`, fkontak, m)
if (/^\d+$/.test(text)) return conn.sendMessage(m.chat, {text: `${lenguajeGB['smsAvisoFG']()}*SU NOMBRE NO DEBE DE TENER SÓLO NÚMEROS, EJEMPLO:*\n${usedPrefix}nombre ${gt}\n\n🌟 _Si quiere usar su nombre registrado en su WhatsApp, escriba:_\n*${usedPrefix}nombre2*`}, {quoted: fkontak})
if (text.length >= 25) return conn.sendMessage(m.chat, {text: `${lenguajeGB['smsAvisoFG']()}*USE UN NOMBRE MÁS CORTO, EJEMPLO:*\n${usedPrefix}nombre ${gt}\n\n🌟 _Si quiere usar su nombre registrado en su WhatsApp, escriba:_\n*${usedPrefix}nombre2*`}, {quoted: fkontak})
if (text.length <= 2) return conn.sendMessage(m.chat, {text: `${lenguajeGB['smsAvisoFG']()}*NOMBRE FALTANTE O MUY CORTO, EJEMPLO:*\n${usedPrefix}nombre ${gt}\n\n🌟 _Si quiere usar su nombre registrado en su WhatsApp, escriba ${usedPrefix}nombre2_`}, {quoted: fkontak})
user.name = text.replace(/\s+/g, '').replace(/[0-9]+/gi, "").trim()
if (user.name) return conn.sendMessage(m.chat, {text: `${lenguajeGB['smsAvisoEG']()}🌟 *GENIAL!! SE HA COMPLETADO LO SIGUIENTE*\n*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*\n\n*❖ NOMBRE:*\n${user.name === 0 ? sinDefinir : user.name}\n\n🔢 *AHORA PUEDE REGISTRAR SU EDAD, EJEMPLO:*\n\`\`\`${usedPrefix}edad 20\`\`\``}, {quoted: fkontak})
}
	
if (command == 'nombre2' || command == 'name2') {
if (/^\d+$/.test(text)) return conn.sendMessage(m.chat, {text: `${lenguajeGB['smsAvisoFG']()}*SU NOMBRE NO DEBE DE TENER SÓLO NÚMEROS, EJEMPLO:*\n${usedPrefix}nombre ${gt}\n\n🌟 _Si quiere usar su nombre registrado en su WhatsApp, escriba:_\n*${usedPrefix}nombre2*`}, {quoted: fkontak})
if (nombreWA.slice(1).length < 2) return conn.sendMessage(m.chat, {text: `${lenguajeGB['smsAvisoFG']()}*SU NOMBRE DE WHATSAPP ES MUY CORTO PARA REGISTRAR*\n\n*Modifique su nombre de WhatsApp e intente de nuevo o puede personalizar 🌟 su nombre usando:*\n*${usedPrefix}nombre ${gt}*`}, {quoted: fkontak})
if (nombreWA.slice(1).length > 25) return conn.sendMessage(m.chat, {text: `${lenguajeGB['smsAvisoFG']()}*SU NOMBRE DE WHATSAPP ES MUY LARGO PARA REGISTRAR*\n\n*Modifique su nombre de WhatsApp e intente de nuevo o puede personalizar 🌟 su nombre usando:*\n*${usedPrefix}nombre ${gt}*`}, {quoted: fkontak})
user.name = nombreWA.replace(/\s+/g, '').replace(/[0-9]+/gi, "").slice(1).trim()
if (user.name) return conn.sendMessage(m.chat, {text: `${lenguajeGB['smsAvisoEG']()}🌟 *GENIAL!! SE HA COMPLETADO LO SIGUIENTE*\n*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*\n\n*❖ NOMBRE:*\n${user.name === 0 ? sinDefinir : user.name}\n\n🔢 *AHORA PUEDE REGISTRAR SU EDAD, EJEMPLO:*\n\`\`\`${usedPrefix}edad 20\`\`\``}, {quoted: fkontak})
}
		
if (command == 'edad' || command == 'age' || command == 'edad2' || command == 'age2') {
if (verificar.test(text.slice(1)) == false && !text) return conn.sendMessage(m.chat, {text: `${lenguajeGB['smsAvisoIIG']()}*👉 AGREGUÉ SU EDAD PARA REGISTRAR, EJEMPLO:*\n${usedPrefix}edad 20`}, {quoted: fkontak})
if (isNaN(text)) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}*INGRESE SOLO NÚMEROS*`, fkontak, m)
if (text > 90) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}*DEMASIADO MAYOR PARA SER REGISTRADO*`, fkontak, m)
if (text < 10) return conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}*DEMASIADO MENOR PARA SER REGISTRADO*`, fkontak, m)
user.age = text.replace(/[.,\/#!$%\^&\*;:{}@=\-_`~()\s\a-z]/gi, "")
if (verificar.test(text) == true) return conn.sendMessage(m.chat, {text: `${lenguajeGB['smsAvisoEG']()}🌟 *GENIAL!! SE HA COMPLETADO LO SIGUIENTE*\n*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*\n\n*❖ NOMBRE:*\n${user.name === 0 ? sinDefinir : user.name}\n\n*❖ EDAD:*\n${user.age === 0 ? sinDefinir : user.age + ' años'}\n\n🧬 *AHORA PUEDE REGISTRAR SU GÉNERO, EJEMPLO:*\n\`\`\`${usedPrefix}genero\`\`\``}, {quoted: fkontak})
}
	
if (command == 'finalizar' || command == 'end') {
if (global.db.data.users[m.sender]['registroC'] == true) {
if (user.premLimit === 0) {	
tiempo = user.premLimit === 1 ? 0 : 36000000 //10 horas
var now = new Date() * 1
if (now < user.premiumTime) user.premiumTime += tiempo
else user.premiumTime = now + tiempo
user.premium = true
}
fecha = `${week}, ${date} *||* `
hora = `${time}`
user.tiempo = fecha + hora
user.name = user.name === 0 ? sinDefinir : user.name + 'ͧͧͧͦꙶͣͤ✓ᚲᵀᴷ'
user.descripcion = bio
user.age = user.age === 0 ? sinDefinir : user.age >= 18 ? user.age += ' Años *||* ' + '(Persona Adulta)' : user.age += ' Años *||* ' + '(Persona Joven)'
user.genero = user.genero === 0 ? sinDefinir : user.genero == 'Ocultado' ? `${user.genero} 🕶️` : user.genero == 'Mujer' ? `${user.genero} 🚺` : user.genero == 'Hombre' ? `${user.genero} 🚹` : sinDefinir
user.identidad = user.identidad === 0 ? sinDefinir : user.identidad
user.pasatiempo = user.pasatiempo === 0 ? sinDefinir : user.pasatiempo
}else{
fecha = `${week}, ${date} || `
hora = `${time}`
user.tiempo = fecha + hora
user.name = user.name === 0 ? sinDefinir : user.name + 'ͧͧͧͦꙶͣͤ✓ᚲᵀᴷ'
user.age = user.age === 0 ? sinDefinir : user.age >= 18 ? user.age += ' Años *||* ' + '(Persona Adulta)' : user.age += ' Años *||* ' + '(Persona Joven)'
user.descripcion = bio	
}
user.regTime = + new Date
user.registered = true
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)	
registrando = false
clearInterval(intervalId)	
await conn.sendMessage(m.chat, {
text: `🍃 \`\`\`VERIFICACIÓN EXITOSA\`\`\` 🍃
*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*\n
😼 *REGISTRADO POR*
❱❱ ${wm}\n
📑 *TIPO DE REGISTRO* 
❱❱ ${user.registroC === true ? 'REGISTRO COMPLETO' : 'REGISTRO RÁPIDO'}\n
⌛ *FECHA/HORA*
❱❱ ${user.tiempo}\n
🛅 *CÓDIGO DE REGISTRO*
❱❱ ${sn}\n
✅ *INSIGNIA DE VERIFICACIÓN*
❱❱   *${user.registered === true ? 'ͧͧͧͦꙶͣͤ✓ᚲᵀᴷ' : ''}*\n
✨ *NOMBRE* 
❱❱ ${user.name}\n
👀 *DESCRIPCIÓN*
❱❱ ${user.descripcion}\n
🔢 *EDAD* 
❱❱ ${user.age}\n
${user.registroC === true ? `☘️ *GÉNERO*
❱❱ ${user.genero}\n
🌱 *ORIENTACIÓN SEXUAL*
❱❱ ${user.identidad}\n
❇️ *PASATIEMPO(S)*
❱❱ ${user.pasatiempo}\n
${user.premLimit === 1 ? '' : `🎟️ *PREMIUM*
❱❱ ${user.premLimit === 1 ? '' : `${user.premiumTime > 0 ? '✅' : '❌'} +10 HORAS || ${user.premiumTime - now} ms`}`}   ` : ''}${user.registroC === true ? `\n🌟 *Si es su primera vez registrándose, recibirá horas premium de forma gratuita como bonificación exclusiva por su primera inscripción, puede cancelar y eliminar su registro en cualquier momento. Gracias por registrarse ✨*` : ''}`.trim(),
contextInfo: {
externalAdReply: {
title: wm,
body: user.name,
thumbnailUrl: pp, 
sourceUrl: 'https://www.atom.bio/katashifukushima/',
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}}}, { quoted: fkontak })
await m.reply(`${sn}`)	
}}
handler.command = ['verify', 'verificar', 'register', 'registrar', 'reg', 'reg1', 'nombre', 'name', 'nombre2', 'name2', 'edad', 'age', 'edad2', 'age2', 'genero', 'género', 'gender', 'identidad', 'pasatiempo', 'hobby', 'identity', 'finalizar', 'pas2', 'pas3', 'pas4', 'pas5']  ///^(verify|verificar|reg(ister)?)$/i
export default handler

function pickRandom(list) { 
return list[Math.floor(Math.random() * list.length)]} 
  
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
