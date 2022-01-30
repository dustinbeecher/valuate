const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('pong!'),
	async execute(interaction) {
		let latency = Math.round((Date.now() - interaction.createdTimestamp)/100);
		await interaction.reply(`pong! ${latency}ms`);
	},
};