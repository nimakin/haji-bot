const {
    Client,
    Attachment,
    Collection
} = require('discord.js');

const fs = require("fs");
let xp = require("./xp.json");
const bot = new Client();
const Discord = require('discord.js')
const config = require('./config.json');
const token = 'NjQ0ODI0MjEwMzcxNTEwMjcz.XeYrTQ.3oEJqOD6Cero-f-S9Y_8sZIeWxA';

const PREFIX = 'H!';

bot.on('ready', () => {
    console.log(`bot is online in ${bot.guilds.size} Discord Server`);
    let statuses = [
        `Type H!help`,
        `With ${bot.guilds.size} servers`,
        `HAJI BOT by HAJI GAMER`,
        `With ${bot.users.size} users `,
    ]
    setInterval(function(){
      let GAMES = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setPresence({ game: { name: GAMES }, type: 0, status: 'dnd' });
    }, 5000)
});


bot.on('message', message=> {
    let args = message.content.substring(PREFIX.length).split(" ");
    switch(args[0]){
        case 'level':
            let curxp = xp[message.author.id].xp;
            let curlvl = xp[message.author.id].level;
            let nxtLvlXp = curlvl * 300;
            let difference = nxtLvlXp - curxp;
            
            let lvl = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setColor(0x2E4053)
            .addField("Level", curlvl, true)
            .addField("XP", curxp, true)
            .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);
            message.channel.send(lvl);
        break;
        case 'meme':
            number = 12;
            imageNumber = Math.floor (Math.random() * (number - 1 + 1)) + 1; 
            message.channel.send ( {files: ["./memes/" + imageNumber + ".jpg"]})
        break;
        case 'fun':
            image(message);
        break;
        case 'ping':
            message.channel.send(':ping_pong: Pinging...').then(m => {
                let ping = m.createdTimestamp - message.createdTimestamp
                let choices = ["And there is your ping "]
                let responce = choices[Math.floor(Math.random() * choices.length)]
                m.edit({embed :{
                    color: 0x239B56,
                    description: `${responce}: Bot latency: ${ping}, API Latency: ${Math.round(bot.ping)}`

                }})
            })
        break;
        case 'time':
            message.channel.send({embed: {
                color: 0x34495E,
                description: "" + (new Date()).toString() + ""
            }})
        break;
        case 'serverinfo':
            let botIcon = bot.user.avatarURL;
            let inline = true;
            const serverinfo = new Discord.RichEmbed()
            .setAuthor(message.guild.name, botIcon)
            .addField('Server name', message.guild.name, inline)
            .addField('Server ID', message.guild.id, inline)
            .addField('Region', message.guild.region , inline)
            .addField('Roles', message.guild.roles.size, inline)
            .addField('Channels', message.guild.channels.size , inline)
            .addField('You Joined', message.member.joinedAt, inline)
            .addField('Total members', `${message.guild.memberCount} Members` , inline)
            .addField('Online', `${message.guild.members.filter(o => o.presence.status === 'online').size} Online`, inline)
            .addField('Offline', `${message.guild.members.filter(o => o.presence.status === 'offline').size} Offline`, inline)
            .addField('On stream', `${message.guild.members.filter(o => o.presence.status === 'streaming').size} Streaming`, inline)
            .addField('Playing', `${message.guild.members.filter(o => o.presence.status === 'playing').size} Playing`, inline)
            .addField('Watching', `${message.guild.members.filter(o => o.presence.status === 'watching').size} Watching`, inline)
            .setThumbnail(message.guild.avatarURL)
            .setColor("#36393f")
            message.channel.sendEmbed(serverinfo);
        break;
        case 'botinfo':
            message.channel.sendMessage( {embed: {
                color: 0xB03A2E ,
                description: "Author : Nima k.    ,  Versian : 1.0.2 "
            }})
        break;
        case 'invite':
            message.channel.sendMessage('https://discordapp.com/oauth2/authorize?&client_id=644824210371510273&scope=bot&permissions=8').then(message.react("💯"));
        break;
    }
    
})


function image(message){
    const cheerio = require('cheerio');
    const request = require('request');

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "fun",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });



}    

bot.on('guildCreate', guild => {
    console.log(`New guild joined ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members`);
    let channelID;
        let channels = guild.channels;
        channelLoop:
        for (let c of channels) {
            let channelType = c[1].type;
            if (channelType === "text") {
                channelID = c[0];
                break channelLoop;
            }
        }
        let channel = bot.channels.get(guild.systemChannelID || channelID);
        channel.send({
        embed: {
            color: 0x41e81b,
            author: { name: "bot Support Discord Server." },
            description: 'Bot Info',
            fields: [{
                name: "Thank you for adding me to your server",
                value: "Bot For build a best server"
            },
            {
                name: "Support Discord Server:",
                value: '[HERE](https://discord.gg/7GtDkkG)',
                inline: true
            }, 
            {
                name: "Bot Prefix:",
                value: PREFIX,
                inline: true
            },
            {
                name: "Developer:",
                value: "Haji gamer",
                inline: true
            }]
        }
    });
});
bot.on('guildDelete', guild => {
console.log(`Bot have been removed from: ${guild.name} (id: ${guild.id})`);
});


bot.on('message', msg => {

    if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;
    const args = msg.content.slice(PREFIX.length).split(' ');
    const cmd = args.shift().toLowerCase();
    const Role = args.join(" ");
    const random = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    const rRole = msg.guild.roles.find(role => role.name === Role);

    function botRianbow() {
        let random = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        let rRole = msg.guild.roles.find(role => role.name === Role);
        if (!Role) return msg.channel.send('Please specify a role');
        if (!rRole) return msg.channel.send('Cant find the specified role');
        rRole.edit({color: random}).catch(e => {
        })
    };

    if(cmd === 'rainbow'){
        if (!msg.member.hasPermission("ADMINISTRATOR")) return(msg.channel.send("```You Dont Have Permission```"))
        if (!Role) return msg.channel.send('Please specify a role');
        if (!rRole) return msg.channel.send('Cant find the specified role');
            setInterval(() => { botRianbow(); }, config.Interval)
            msg.channel.send({
                embed: {
                    color: msg.member.displayColor,
                    author: { name: "bot Support Discord Server", url: 'https://discord.gg/7GtDkkG', icon_url: msg.guild.iconURL  },
                    description: `Bot has enabled color changing role for **${Role}** If You Want This Bot Type ${PREFIX}help Bot Made By HAJI GAMER`
                }
            })
    }
    if(cmd === 'help'){
        msg.channel.send('```CHECK YOUR DM```')
        msg.author.send({
            embed: {
                color: 0x41e81b,
                author: { name: "bot Support Discord Server.", url: 'https://discord.gg/XhsvDS2', icon_url: msg.guild.iconURL },
                description: `${PREFIX}rainbow <role>\n${PREFIX}help - Shows this command...\n${PREFIX}time \n${PREFIX}meme - Shows you memes \n${PREFIX}serverinfo - Shows you the server info \n${PREFIX}ping - Shows you the ping \n${PREFIX}fun - Shows you fun images of google\n${PREFIX}level - Shows your level\n${PREFIX}invite - Link for invite a bot `
            }
        })
    }

});




bot.on('message', message => {
    if(message.content.startsWith("سلام")){
        message.channel.send({embed: {
            color: 0xD4AC0D,
            description: "سلام"
        }})
    }
    if(message.content.startsWith("چطوری")){
        message.channel.send({embed: {
            color: 0xD4AC0D,
            description: "خوب تو خوبی؟"
        }})
    }
    if(message.content.startsWith("خوبی")){
        message.channel.send({embed: {
            color: 0xD4AC0D,
            description: "خوب تو خوبی؟"
        }})
    }
});


bot.on("message", async message => {
    let xpAdd = Math.floor(Math.random() * 7) + 8;
  
    if(!xp[message.author.id]){
      xp[message.author.id] = {
        xp: 0,
        level: 1
      };
    }
  
  
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 300;
    xp[message.author.id].xp =  curxp + xpAdd;
    if(nxtLvl <= xp[message.author.id].xp){
      xp[message.author.id].level = curlvl + 1;
      let lvlup = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setColor(0x5B2C6F)
      .addField("New Level", curlvl + 1);
  
      message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
      if(err) console.log(err)
    
    });
});



bot.login(token);