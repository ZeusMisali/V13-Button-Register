const moment = require("moment");
const cezapuans = require("../../schemas/cezapuan");
const ceza = require("../../schemas/ceza")
const name = require("../../schemas/names");
const penals = require("../../schemas/penals");
require("moment-duration-format");
const conf = require("../../configs/sunucuayar.json");
const { green, red  } = require("../../configs/emojis.json");
const { TeamMember, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["sf","sıfırla","isim-sıfırla"],
    name: "sıfırla",
    help: "sıfırla"
  },

  run: async (client, message, args, embed) => {
if (!message.member.permissions.has('ADMINISTRATOR'))
{
message.reply({ content:"Bu işlemi yapamazsın dostum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
message.react(red)
return;
}
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
     
    var DeleteName = new MessageButton()
    .setLabel("İsim Sıfırla")
    .setCustomId("isim_sıfırla")
    .setStyle("PRIMARY")

    
    const row = new MessageActionRow()
    .addComponents([DeleteName])


embed.addField(`KAYIT SIFIRLAMA PANELİ`,`

${member.toString()} üyesine ait isim sıfırlama işlemini yapmak için aşağıdaki butona basabilirsin. 
`)

    let msg = await message.channel.send({ embeds: [embed], components: [row] });
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

      if(button.customId === "isim_sıfırla") {
        await button.deferUpdate();
        await name.deleteMany({userID: member.user.id, guildID: message.guild.id})
      const isim = new MessageEmbed()
      .setDescription(`${green} ${member.toString()} üyesinin isim geçmişi ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`)

msg.edit({
  embeds : [isim],
  components : []
})
      
      }

  
})  
    }


 
}
  
;
