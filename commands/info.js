const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Returns server/user info')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('User info')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Server info')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'user') {
			const user = interaction.options.getUser('target');
			if (user) {
				await interaction.reply(`${user.username}\n${user.id}`);
			} else {
				await interaction.reply(`${interaction.user.username}\n${interaction.user.id}`);
			}
		} else if (interaction.options.getSubcommand() === 'server') {
			await interaction.reply(`${interaction.guild.name}\n${interaction.guild.memberCount} Members\n`);
		};
	},
};