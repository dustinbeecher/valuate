const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beep')
		.setDescription('boop!'),
	async execute(interaction) {
		await interaction.reply(`boop! ${Math.round((Date.now() - interaction.createdTimestamp)/100)}ms`);
	},
};