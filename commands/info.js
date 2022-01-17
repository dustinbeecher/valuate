const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('returns server/user info')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('user info')
				.addUserOption(option => option
					.setName('target')
					.setDescription('user')))
		.addSubcommand(subcommand => subcommand
				.setName('server')
				.setDescription('server info')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'user') {
			const user = interaction.options.getUser('target') || interaction.user;
				await interaction.reply(`user id: ${user.id}\nusername: ${user.username}\ntag: ${user.discriminator}`);
		} else if (interaction.options.getSubcommand() === 'server') {
			await interaction.reply(`${interaction.guild.name}\n${interaction.guild.memberCount} members\n`);
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