const { SlashCommandBuilder } = require('@discordjs/builders');
const stats = require('../stats.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('view stats'),
	async execute(interaction) {
		await interaction.reply(`${stats.messagesSeen} messages\n${stats.commandsRegistered} commands\n${stats.guilds} servers`);
	},
};