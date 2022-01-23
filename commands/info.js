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
					{ name: 'Guild ID', value: `${guild.id}` },
					{ name: 'Guild Created', value: `${moment(guild.createdAt).format('LLLL')} EST` },
					{ name: 'Boosts', value: `${guild.premiumTier}`, inline: true },
					{ name: 'Boost Level', value: `${guild.premiumSubscriptionCount}`, inline: true },
					{ name: 'Members', value: `${guild.memberCount}`, inline: true },
					{ name: 'AFK Timeout', value: `${guild.afkTimeout}`, inline: true },
					{ name: 'AFK Channel', value: `${guild.afkChannel}`, inline: true },
					{ name: 'AFK Channel ID', value: `${guild.afkChannelId}` },
					{ name: 'Owner ID', value: `${guild.ownerId}`, inline: true },
					{ name: 'Partnered', value: `${guild.partnered}`, inline: true },
					{ name: 'Notifications', value: `${guild.defaultMessageNotifications}`, inline: true },
					{ name: 'Filter', value: `${guild.explicitContentFilter}`, inline: true },
					{ name: 'Large', value: `${guild.large}`, inline: true },
					{ name: 'Max Bitrate', value: `${guild.maximumBitrate}`, inline: true },
					{ name: 'Max Members', value: `${guild.maximumMembers}`, inline: true },
					{ name: '2FA Level', value: `${guild.mfaLevel}`, inline: true },
					{ name: 'Region', value: `${guild.preferredLocale}`, inline: true },
					{ name: 'Boosts', value: `${guild.premiumSubscriptionCount}`, inline: true },
					{ name: 'Nitro Level', value: `${guild.premiumTier}`, inline: true },
					{ name: 'test', value: `${guild.publicUpdateChannel}`, inline: true },
					{ name: 'test', value: `${guild.publicUpddateChannelId}`, inline: true },
					{ name: 'test', value: `${guild.roles}`, inline: true },
					{ name: 'test', value: `${guild.rulesChannel}`, inline: true },
					{ name: 'test', value: `${guild.rulesChannelId}`, inline: true },
					{ name: 'test', value: `${guild.scheduledEvents}`, inline: true },
					{ name: 'test', value: `${guild.shard}`, inline: true },
					{ name: 'test', value: `${guild.shardId}`, inline: true },
					{ name: 'test', value: `${guild.splash}`, inline: true },
					{ name: 'test', value: `${guild.stageInstances}`, inline: true },
					{ name: 'test', value: `${guild.stickers}`, inline: true },
					{ name: 'test', value: `${guild.systemChannel}`, inline: true },
					{ name: 'test', value: `${guild.systemChannelFlags}`, inline: true },
					{ name: 'test', value: `${guild.systemChannelId}`, inline: true },
					{ name: 'test', value: `${guild.vanityURLCode}`, inline: true },
					{ name: 'test', value: `${guild.vanityURLUses}`, inline: true },
					{ name: 'test', value: `${guild.verificationLevel}`, inline: true },
					{ name: 'test', value: `${guild.verified}`, inline: true },
					{ name: 'test', value: `${guild.voiceAdapterCreator}`, inline: true },
					{ name: 'test', value: `${guild.voiceStates}`, inline: true },
					{ name: 'test', value: `${guild.widgetChannel}`, inline: true },
					{ name: 'test', value: `${guild.widgetChannelId}`, inline: true },
					{ name: 'test', value: `${guild.widgetEnabled}`, inline: true },
				)
				.setTimestamp()
				.setFooter({ text: `V${package.version}`, iconURL: config.botAvatarURL });

			await interaction.reply({ embeds: [guildInfo] });	
			//await interaction.reply(`${interaction.guild.name}\n${interaction.guild.memberCount} members\n`);
		};
	},
};
