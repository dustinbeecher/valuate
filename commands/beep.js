const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beep')
		.setDescription('boop!'),
	async execute(interaction) {
		let latency = Math.round((Date.now() - interaction.createdTimestamp)/100);
		await interaction.reply(`boop! ${latency}ms`);
	},
};