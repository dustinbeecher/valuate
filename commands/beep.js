const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beep')
		.setDescription('boop!'),
	async execute(interaction) {
		await interaction.reply('boop!');
	},
};