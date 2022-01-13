const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');

/**const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info'),
]
	.map(command => command.toJSON());**/

const commands = [
/*	new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong')
		.addUserOption(option => option.setName('target').setDescription('The user')),
	new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info about something')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Info about a user')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('bot')
				.setDescription('Info about the bot')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Info about the server'))
				.addUserOption(option => option.setName('target').setDescription('The user')),*/
];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(config.token);

rest.put(Routes.applicationGuildCommands(config.clientID, config.devGuildID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);