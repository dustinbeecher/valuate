const config = require('./config.json');
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let messagesSeen = 0;

client.on('ready', () => {
	console.log('Bot is online');
	client.user.setActivity('online!');
	let x = 0;
	setInterval(() => {
		// console.log(messagesSeen);
		let statuses = [
			['WATCHING', 'and evaluating'],
			['WATCHING', 'and evaluating.'],
			['WATCHING', 'and evaluating..'],
			['WATCHING', 'and evaluating...'],
			['WATCHING', `${messagesSeen} messages`],
			['WATCHING', `${client.guilds.cache.size} servers`],
		];
		if (x === statuses.length) x = 0; {
			// console.log(`${statuses[x][0]} ${statuses[x][1]}`);
			client.user.setActivity(statuses[x][1], { type: statuses[x][0] });
			x++;
		}
	}, 12000); // milliseconds, the rate limit is 5/60s
});

client.on('messageCreate', (message) => {
	const command = message.content.toLowerCase();
	if (message.author != config.clientID) {messagesSeen++;}
	// console.log(messagesSeen);
	if (command === 'ping') {
		message.reply({
			content: 'Pong!',
		});
	}
	else if (command === 'beep') {
		message.reply({
			content: 'Boop!',
		});
	}
});

client.login(config.token); // keep this at the bottom of the code
