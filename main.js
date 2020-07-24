const Discord = require('discord.js');
const client = new Discord.Client();
 
const prefix = '-';
 
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

 
client.once('ready', () => {
    console.log('yee bot');
    client.guilds.cache.forEach((guild) => {
        console.log(guild.name);
        console.log(guild.ownerID);
    })
});

var index = 0; //color index
client.on('message', async (message) => {
    message.content = message.content.toLowerCase();
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.content === 'hi' || message.content === 'hello' && 
    message.author.bot == false) {
        client.commands.get('shutup').execute(message, args);
        return;
    }
    

    if (message.content.includes('bruh') && message.author.bot == false) {
        message.channel.send('bruh');
        if (!(message.author.bot)) {
            message.author.send("bruh");
        }
        return;
    }

    if (message.content.includes('lmao') && message.author.bot == false) { 
        message.channel.send('L M A O');
        return;
    }
    //if someone pings testers
    if (message.content.includes('<@&551884063967805440')) {
        if(!(message.author.bot)) {
            message.author.send('You will be tested soon.');
        }
        return;
    }

    if (message.content.includes('@&552131262622466048')) {
        message.channel.send('Nobody uses this channel');
        return;
    }
    if (message.content.includes('fuck you') && !(message.author.bot)) {
        message.channel.send('fuck you too');
        message.author.send('That was very rude.');
        return;
    }

    if (message.content.includes('fuck') || message.content.includes('shit') || 
    message.content.includes('bitch')) {
        if (!(message.author.bot)) {
            message.channel.send(`Please do not swear <@${message.author.id}>`);
            message.author.send('If you swear again im gonna ban you');
            return;
        }
    }

    if (message.content.includes('yee') && !(message.content.includes('-'))) {
        message.channel.send('Y E E E E E E E E'); 
        return;
    }

    if (message.content.includes('gay') && !(message.author.bot)) {
        message.channel.send(`We do not tolerate homophobic slurs in this server <@${message.author.id}>`);
        return;
    }

    if (message.content.includes('pp') || message.content.includes('cock') || 
    message.content.includes('penis')) {
        if (!(message.author.bot)) {
            message.channel.send(`Penis <@${message.author.id}>`);
        }
    }

    //when someone pings yee bot 
    if (message.content.includes('735621111781523516')) {
        message.channel.send( `<@${message.author.id}> stfu`);
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
    else if(command === 'fresh'){
        client.commands.get('fresh').execute(message, args);
    }
    else if(command === 'yee'){
        client.commands.get('yee').execute(message, args);
        return;
    }
    else if (command ==='wa') { 
        client.commands.get('pa').execute(message, args);
    }
    else if (command ==='idiot') {
        client.commands.get('idiot').execute(message, args);
    }
    else if (command ==='pikachu') {
        client.commands.get('pikachu').execute(message, args);
    }
    else if (command === 'color') {
        message.channel.send(`Usage: -color hex roleName`)
            await message.guild.roles.create({ 
                data: {
                    name: args[1], 
                    color: "" + args[0], 
                    permissions:[] 
                }
            }) 
        
        color = message.guild.roles.cache.find(r => r.name === "" + args[1]);
        color.setPosition(0);
        message.member.roles.add(color);
        index += 1;
    }

    
});

client.login(process.env.token);
