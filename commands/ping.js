const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('pong!'),
	async execute(interaction) {
		await interaction.reply(`pong! ${Math.round((Date.now() - interaction.createdTimestamp)/100)}ms`);
	},
};