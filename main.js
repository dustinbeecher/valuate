//setup
const Discord = require('discord.js');
var config = require('./config.json');

const {Intents} = require('discord.js');

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

const botID = 908997485782007859;

let messagesSeen = 0;

//main code
client.on('ready', () => {
    console.log('Bot is online');
    client.user.setActivity('online!'); 
    let x = 0;
    
    setInterval(() => {
        console.log(messagesSeen);
        let statuses = [
            ['WATCHING', `over ${messagesSeen} messages`],
            ['WATCHING', 'and evaluating'],
            ['WATCHING', 'and evaluating.'],
            ['WATCHING', 'and evaluating..'],
            ['WATCHING', 'and evaluating...']
        ];
        if (x === statuses.length) x = 0; {
            console.log(`${statuses[x][0]} ${statuses[x][1]}`);
            client.user.setActivity(statuses[x][1], {type: statuses[x][0]}); 
            x++;
        }
    }, 12000); //milliseconds, the rate limit is 5/60s
})

client.on('messageCreate', (message) => {
    if (message.author != botID) {
        messagesSeen++;
    }
    console.log(messagesSeen);
    if (message.content === 'ping') {
        message.reply({
            content: 'pong',
        })
    }
})

client.login(config.token); //keep this at the bottom of the code
