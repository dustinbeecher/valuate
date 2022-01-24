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
		const guild = interaction.guild;
		if (interaction.options.getSubcommand() === 'user') {
			const user = interaction.options.getUser('target') || interaction.user;
			const userInfo = new MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`${user.tag}`)
				.setAuthor({ name: "Valuate", iconURL: config.botAvatarURL, url: 'https://github.com/dustinbeecher/valuate'})
				.setDescription('')
				.setThumbnail(user.displayAvatarURL({ dynamic: true, format: 'webp', size: 300 }))
				.addFields(
					{ name: 'User ID', value: `${user.id}` },
					{ name: 'Account Created', value: `${moment(user.createdAt).format('LLLL')} EST` },
					{ name: 'Joined', value: `${moment(guild.joinedAt).format('LLLL')} EST` }
				)
				.setTimestamp()
				.setFooter({ text: `V${package.version}`, iconURL: config.botAvatarURL });

			await interaction.reply({ embeds: [userInfo] });	
			//await interaction.reply(`user id: ${user.id}\nusername: ${user.username}\ntag: ${user.discriminator}\n${user.displayAvatarURL({dynamic: true, format: 'webp', size: 300})}`);
		} else if (interaction.options.getSubcommand() === 'server') {
			const guildInfo = new MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`${guild.name}`)
				.setAuthor({ name: "Valuate", iconURL: config.botAvatarURL, url: 'https://github.com/dustinbeecher/valuate'})
				.setDescription('')
				.setThumbnail(guild.iconURL({dynamic: true, format: 'webp', size: 300}))
				.addFields(
					{ name: 'Description', value: `${guild.description}` },
					{ name: 'Guild ID', value: `${guild.id}`, inline: true },
					{ name: 'Owner ID', value: `${guild.ownerId}`, inline: true },
					{ name: 'Guild Created', value: `${moment(guild.createdAt).format('LLLL')} EST` },
					{ name: 'Members', value: `${guild.memberCount}`, inline: true },
					{ name: 'Large', value: `${guild.large}`, inline: true },
					{ name: 'Verification', value: `${guild.verificationLevel}`, inline: true },
					{ name: 'Boosts', value: `${guild.premiumTier}`, inline: true },
					{ name: 'Boost Level', value: `${guild.premiumSubscriptionCount}`, inline: true },
					{ name: 'Partnered', value: `${guild.partnered}`, inline: true },
					{ name: 'AFK Timeout', value: `${guild.afkTimeout}`, inline: true },
					{ name: 'Max Bitrate', value: `${guild.maximumBitrate}`, inline: true },
					{ name: 'Region', value: `${guild.preferredLocale}`, inline: true },
					{ name: 'AFK Channel', value: `${guild.afkChannel}`, inline: true },
					{ name: 'AFK Channel ID', value: `${guild.afkChannelId}`, inline: true },
					{ name: '\u200B', value: '\u200B', inline: true },
					{ name: 'Rules Channel', value: `${guild.rulesChannel}`, inline: true },
					{ name: 'Rules Channel ID', value: `${guild.rulesChannelId}`, inline: true },
					{ name: '\u200B', value: '\u200B', inline: true },
					{ name: 'System Channel', value: `${guild.systemChannel}`, inline: true },
					{ name: 'System Channel ID', value: `${guild.systemChannelId}`, inline: true },
					{ name: '\u200B', value: '\u200B', inline: true },
				)
				.setTimestamp()
				.setFooter({ text: `V${package.version}`, iconURL: config.botAvatarURL });

			await interaction.reply({ embeds: [guildInfo] });	
			//await interaction.reply(`${interaction.guild.name}\n${interaction.guild.memberCount} members\n`);
		};
	},
};
