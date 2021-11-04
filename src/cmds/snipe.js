// made by recanman
module.exports = {
  name: "Snipe User",
  description: "Fetch the IP address of the Roblox game server for a specific experience a user is in.",
  params: {userId: ["number", true]},
  execute: function(msg, params, embed, common) {
    const userid = params[0]

    embed(module.exports.name, "Fetching IP...", undefined, true, msg, (botMsg, botEmbed) => {
      if (common.config.whitelist.includes(parseInt(msg.author.id)) == false) {
        botEmbed.setDescription("You are not whitelisted!")
        return botMsg.edit({embeds: [botEmbed]})
      }

      common.axios.get(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userid}&size=420x420&format=Png`).then(res => {
        res = res.data.data

        if (res[0] == undefined) {return}
        if (res[0].state != "Completed") {return}
        if (res[0].imageUrl == undefined) {return}
        // It is not essential to have the user icon, so if it fails, just ignore it and move on.
        
        botEmbed.setThumbnail(res[0].imageUrl)
        botMsg.edit({embeds: [botEmbed]})
      })

      common.axios.post("https://presence.roblox.com/v1/presence/users", {userIds: [userid]}, {headers: {
        Origin: "https://roblox.com",
        Cookie: `.ROBLOSECURITY=${common.config.cookie}; path=/; domain=.roblox.com;`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
      }}).then(res => {
        res = res.data.userPresences

        if (res == undefined) {return}
        if (res[0] == undefined) {return}

        res = res[0]

        if (res.userPresenceType != 2) {
          botEmbed.setDescription("User is not in game.")
          return botMsg.edit({embeds: [botEmbed]})
        }

        if (res.gameId == null) {
          botEmbed.setDescription("User's presence is private.")
          return botMsg.edit({embeds: [botEmbed]})
        }
        
        common.getServerInfo(res.placeId, res.gameId, res => {
          res = res.data
          if (res.jobId == null || res.joinScriptUrl == null) {return} //todo add failed message

          common.axios.get(res.joinScriptUrl).then(res => {
            res = JSON.parse(res.data.replace(/--.*\r\n/, '')) // RegEx from https://github.com/grilme99/Rodentify/blob/206d4dce08321bda0725c0f92920b97b0120ebca/src/getServerInfo.ts#L42
            botEmbed.setDescription(`\`\`\`ruby\n${res.MachineAddress}:${res.ServerPort}\n\`\`\``)
            botMsg.edit({embeds: [botEmbed]})
          })
        })
      })
    })
  }
}
