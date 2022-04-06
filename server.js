const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const app = express();

const fs = require("fs");

client.on('ready', () => {
 client.user.setActivity(`🎅 Dia Spotify Legit`)
 console.log(`${client.user.tag} isimli bot başarıyla şu an aktifleştirildi!`);
});

//Uptime için__________________________________________________________________
app.get("/", (req, res) => {
  res.send("MustiDvclr, Discord BOT Altyapı v12");
});
app.listen(process.env.PORT);

//KOMUT Algılayıcı______________________________________________________________
client.commands = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});

//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", async () => {
  let sesliKanalID = client.channels.cache.get("960929697175306261");
  if (sesliKanalID)
    sesliKanalID.join()
      .catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});

client.on("ready", () => {
  console.log(`${client.user.tag}! Aktif!`);
});

client.login(process.env.TOKEN);

client.on(`userUpdate`, (oldUser, newUser) => {

 

  let kişi = client.users.get(oldUser.id)

  let avatar = kişi.avatarURL

  let kanal = client.channels.find(ch => ch.id === '957293433784000575')

 

  const emb = new Discord.RichEmbed()

  .setImage(avatar)

  .setFooter(`${kişi.tag}`)

  .setTimestamp()

  .setDescription(`Fotoğrafa gitmek için [tıkla](${kişi.avatarURL})!`)

  kanal.send(emb)

 

})