// made by recanman
const amounts = [10, 25, 50, 100]

module.exports = {
  name: "Get IP",
  description: "Fetch IP addresses of Roblox game servers for a specific experience.",
  params: {placeId: ["number", true], ipAmount: ["number", false]},
  execute: function(msg, params, embed, common) {
    const placeId = params[0]

    embed(module.exports.name, "Fetching IP's...", undefined, true, msg, (botMsg, botEmbed) => {
      if (common.config.whitelist.includes(parseInt(msg.author.id)) == false) {
        botEmbed.setDescription("You are not whitelisted!")
        return botMsg.edit({embeds: [botEmbed]})
      }

      var realIpAmount = params[1] // It is going to be limited by the bot, not the API. That is because the API only allows 10, 25, 50, 100.

      if (params[1] == undefined) {
        params[1] = 10
        realIpAmount = 10
      } else {
        params[1] = amounts.reduce(function(prev, curr) {
          return (Math.abs(curr - params[1]) < Math.abs(prev - params[1]) ? curr : prev)
        })
      }

      common.axios.get(`https://thumbnails.roblox.com/v1/places/gameicons?placeIds=${placeId}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`).then(res => {
        res = res.data.data

        if (res[0] == undefined) {return}
        if (res[0].state != "Completed") {return}
        if (res[0].imageUrl == undefined) {return}
        // It is not essential to have the game icon, so if it fails, just ignore it and move on.
        
        botEmbed.setThumbnail(res[0].imageUrl)
        botMsg.edit({embeds: [botEmbed]})
      }).catch(err => {})

      var currentIpAmount = 0

      common.axios.get(`https://games.roblox.com/v1/games/${placeId}/servers/Public?sortOrder=Asc&limit=${params[1]}`).then(res => {
        res = res.data

        if (res.data == undefined || res.errors != undefined) {
          botEmbed.setDescription(res.errors[0])
          botMsg.edit({embeds: [botEmbed]})
          return
        }

        const length = Object.keys(res.data).length
        botEmbed.setDescription(`${botEmbed.description}\n${length} servers found.`)

        var promises = []

        res.data.forEach((server, index) => {
          currentIpAmount += 1
          if (currentIpAmount > realIpAmount) {return}

          promises.push(new Promise((resolve, reject) => {
            common.getServerInfo(placeId, server.id, res => {
              res = res.data

              if (res.jobId == null || res.joinScriptUrl == null) {reject()}

              common.axios.get(res.joinScriptUrl).then(res => {
                res = JSON.parse(res.data.replace(/--.*\r\n/, '')) // RegEx from https://github.com/grilme99/Rodentify/blob/206d4dce08321bda0725c0f92920b97b0120ebca/src/getServerInfo.ts#L42
                resolve(`${res.MachineAddress}:${res.ServerPort} [${server.ping}ms], ${server.playing} / ${server.maxPlayers} playing\n`)
              }).catch(err => {})
            })
          }))
        })

        Promise.all(promises).then(servers => {
          botEmbed.setDescription(`\`\`\`ruby\n${servers.join("")}\`\`\`  `)
          botMsg.edit({embeds: [botEmbed]})
        })
      }).catch(err => {})
    })
  }
}
