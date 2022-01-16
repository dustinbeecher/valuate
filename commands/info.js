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
			const user = interaction.options.getUser('target') || interaction.user;
				await interaction.reply(`ID ${user.id}\nUSERNAME ${user.username}\nTAG ${user.discriminator}`);
		} else if (interaction.options.getSubcommand() === 'server') {
			await interaction.reply(`${interaction.guild.name}\n${interaction.guild.memberCount} Members\n`);
		};
	},
};

/*
id
username
discriminator
avatar
bot
system
mfa_enabled
banner
accent_color
locale
verified
email
flags
premium_type
public_flags
*/