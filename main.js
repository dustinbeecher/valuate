const config = require('./config.json');
const stats = require('./stats.json');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const package = require('./package.json')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });	

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('ready', () => {
	console.log('Bot is online');
	client.user.setActivity('online!');
	stats.guilds = client.guilds.cache.size;
	let x = 0;
	setInterval(() => {
		// console.log(messagesSeen);
		let statuses = [
			['PLAYING', `V${package.version}`],
			['WATCHING', 'and evaluating'],
			['WATCHING', 'and evaluating.'],
			['WATCHING', 'and evaluating..'],
			['WATCHING', 'and evaluating...'],
			['WATCHING', `${stats.messagesSeen} messages`],
			['WATCHING', `${stats.commandsRegistered} commands`],
			['WATCHING', `${stats.guilds} servers`],
		];
		if (x === statuses.length) x = 0; {
			client.user.setActivity(statuses[x][1], { type: statuses[x][0] });
			x++;
		}
	}, 12000); // milliseconds, the rate limit is 5/60s
});

client.on('messageCreate', (message) => {
	stats.messagesSeen++;
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	stats.commandsRegistered++;

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
