const config = require('./config.json');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let messagesSeen = 0;
let commandsRegistered = 0;

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

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
			['WATCHING', `${commandsRegistered} commands`],
			['WATCHING', `${client.guilds.cache.size} servers`],
		];
		if (x === statuses.length) x = 0; {
			client.user.setActivity(statuses[x][1], { type: statuses[x][0] });
			x++;
		}
	}, 12000); // milliseconds, the rate limit is 5/60s
});

client.on('messageCreate', (message) => {
	messagesSeen++;
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	commandsRegistered++;
	messagesSeen--;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing the command', ephemeral: true });
	}
});

client.login(config.token); // keep this at the bottom of the code
