const Discord = require('discord.js');
const config = require('./config.json');

const {Client, Intents} = require('discord.js');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.once('ready', () => {
    console.log("Bot is online");
})

client.login(config.token); //keep this at the bottom of the code