const Discord = require('discord.js');
var config = require('./config.json');

const {Client, Intents} = require('discord.js');

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () => {
    console.log('Bot is online');
    client.user.setActivity('online!'); 
    let statuses = [
        ['and evaluating', 'WATCHING'],
        ['and evaluating.', 'WATCHING'],
        ['and evaluating..', 'WATCHING'],
        ['and evaluating...', 'WATCHING']
    ];
    let x = 0;
    
    setInterval(() => {
        if (x === statuses.length) x = 0; {
            console.log(`${statuses[x][0]} ${statuses[x][1]}`);
            client.user.setActivity(statuses[x][0], {type: statuses[x][1]}); 
            x++;
        }
    }, 12000); //milliseconds, the rate limit is 5/60s
})

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.reply({
            content: 'pong',
        })
    }
})

client.login(config.token); //keep this at the bottom of the code
//YOUR_TOKEN
//YOUR_PREFIX