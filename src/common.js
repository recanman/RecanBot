// made by recanman
module.exports = {
  getServerInfo: function(placeId, jobId, callback) {
    module.exports.axios.get(`https://assetgame.roblox.com/Game/PlaceLauncher.ashx?request=RequestGameJob&placeId=${placeId}&gameId=${jobId}`, {
      headers: {
        Referer: `https://www.roblox.com/games/${placeId}/`,
        Origin: "https://roblox.com",
        Cookie: `.ROBLOSECURITY=${module.exports.config.cookie}; path=/; domain=.roblox.com;`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
      }
    }).then(callback)
  },
  config: require("./config.json"),
  axios: require("axios")
}