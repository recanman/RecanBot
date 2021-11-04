// made by recanman
const discord = require("discord.js")
const fs = require("fs")
const config = require("./config.json")
const common = require("./common.js")

const bot = new discord.Client({intents:[discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES]})

bot.once("ready", () => {
  console.log("Bot is running.")
})

var cmds = {}

fs.readdirSync("./src/cmds").forEach(file => {
  file = file.slice(0, -3)
  
  const cmd = require(`./cmds/${file}`)
  cmds[file] = cmd
})

function embed(cmdname, content, thumbnail, send, msg, callback) {
  const botEmbed = new discord.MessageEmbed()
  .setTitle(cmdname)
  .setColor(0x00AE86)
  .setDescription(content)
  .setAuthor("recanman#6915 (501070206760779806) ", "https://cdn.discordapp.com/avatars/501070206760779806/5c6eaa5d3b22528713d2cecd563588ac.png?size=1024", "https://github.com/recanman")
  .setTimestamp()
  
  if (thumbnail != undefined) {
    botEmbed.setThumbnail(thumbnail)
  }
  
  if (send == true) {
    return msg.reply({embeds: [botEmbed]}).then(botMsg => {
      if (callback != undefined) {
        callback(botMsg, botEmbed)
      }
    })
  } else {
    return botEmbed
  }
}

function parseInt2(x) {
  const int = parseInt(x)

  if (isNaN(int) == true) {
    return x
  } else {
    return int
  }
}

bot.on("messageCreate", msg => {
  const params = msg.content.split(" ")
  var cmd = params.shift()

  if (msg.content.slice(0, config.prefix.length) != config.prefix) {return}
  cmd = cmds[cmd.slice(config.prefix.length)]
  
  if (cmd == undefined) {return}
  var valid = true

  Object.keys(cmd.params).forEach((param, index) => {
    const val = cmd.params[param]
    if (typeof(parseInt2(params[index])) != val[0] && val[1] == true) {valid = false}
  })

  if (valid == false) {return embed(cmd.name, "Invalid parameters.", undefined, true, msg)}
  cmd.execute(msg, params, embed, common)
})

bot.login(config.token)