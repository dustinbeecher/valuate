const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const package = require('../package.json');
const moment = require('moment');

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
			const userInfo = new MessageEmbed()

				.setColor('#000')
				.setTitle(`${user.tag}`)
				.setAuthor({ name: "Valuate", iconURL: config.botAvatarURL, url: 'https://github.com/dustinbeecher/valuate'})
				.setDescription('')
				.setThumbnail(user.displayAvatarURL({dynamic: true, format: 'webp', size: 300}))
				.addFields(
					{ name: 'User ID', value: `${user.id}` },
					{ name: 'Account Created', value: `${moment(user.createdAt).format('LLLL')} EST` },
					{ name: 'Joined', value: `${moment(user.joinedAt).format('LLLL')} EST` }
				)
				.setTimestamp()
				.setFooter({ text: `V${package.version}`, iconURL: config.botAvatarURL });

			interaction.reply({ embeds: [userInfo] });	
			//await interaction.reply(`user id: ${user.id}\nusername: ${user.username}\ntag: ${user.discriminator}\n${user.displayAvatarURL({dynamic: true, format: 'webp', size: 300})}`);
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