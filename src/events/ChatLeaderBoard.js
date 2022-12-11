const cfg = require("../configs/settings.json")
const messageUser = require("../schemas/messageUser");
const sex = require("../schemas/leaderboard");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const client = global.bot;

module.exports = async () => {
   const messageUsersData = await messageUser.find({ guildID: cfg.guildID }).sort({ topStat: -1 });
   const messageUsers = messageUsersData.splice(0, 10).map((x, index) => `\` ${index+1} \` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join(`\n`);
   
   let data = await sex.findOne({ guildID: cfg.guildID })
   if (!data || data && !data.messageListID.length) return

const sunucuisim = client.guilds.cache.get(cfg.guildID).name
 let LeaderBoard = await client.channels.cache.find(x => x.name == "leaderboard").messages.fetch(data.messageListID);
  setInterval(() => {
  ChatLeaderBoard()
  }, 600000);
  function ChatLeaderBoard() {  

  const msgList = (`${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`)

  let MessageEdit = new MessageEmbed()
  .setColor("BLACK")
  .setAuthor({ name: client.guilds.cache.get(cfg.guildID).name, iconURL: client.guilds.cache.get(cfg.guildID).iconURL({dynamic:true})})
  .setDescription(`🎉 Aşağı da \`${sunucuisim}\` sunucusunun genel mesaj sıralaması listelenmektedir.\n\n${msgList}\n\nGüncellenme Tarihi: <t:${Math.floor(Date.now() / 1000)}:R>`)
  LeaderBoard.edit({ embeds: [MessageEdit]})

}
}
module.exports.conf = {
  name: "ready",
};