const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, ClientUser, Application } = require('discord.js');
const moment = require('moment');
const config = require('../config.json');
const package = require('../package.json');
const stats = require('../stats.json');

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
				.setDescription('server info'))
		.addSubcommand(subcommand => subcommand
			.setName('bot')
			.setDescription('bot info')),
	async execute(interaction) {
		const guild = interaction.guild;
		if (interaction.options.getSubcommand() === 'user') {
			const user = interaction.options.getUser('target') || interaction.user;
			const guildUser = await guild.members.fetch(user.id); //make this use discord.js.org/#/docs/discord.js/stable/class/CommandInteraction?scrollTo=member
			const userInfo = new MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`${user.tag}`)
				.setAuthor({ name: "Valuate", iconURL: config.botAvatarURL, url: 'https://github.com/dustinbeecher/valuate'})
				.setDescription(`${user}`)
				.setThumbnail(user.displayAvatarURL({ dynamic: true, format: 'webp', size: 300 }))
				.addFields(
					{ name: 'User ID', value: `${user.id}` },
					{ name: 'Account Created', value: `${moment(user.createdAt).format('LLLL')} EST` },
					{ name: 'Joined Server', value: `${moment(guildUser.joinedAt).format('LLLL')} EST` }
				)
				.setTimestamp()
				.setFooter({ text: `V${package.version}`, iconURL: config.botAvatarURL });

			await interaction.reply({ embeds: [userInfo] });	
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
		} else if (interaction.options.getSubcommand() === 'bot') {
			const botInfo = new MessageEmbed()
				.setColor(config.embedColor)
				.setTitle('Valuate')
				.setAuthor({ name: "Valuate", iconURL: config.botAvatarURL, url: 'https://github.com/dustinbeecher/valuate'})
				.setDescription('')
				.setThumbnail(config.botAvatarURL)
				.addFields(
					{ name: 'User ID', value: `${config.clientID}` }, // this should not be done like this and i need to change it
					{ name: 'Account Created', value: 'Saturday, November 13, 2021 3:31 AM EST' }, // i'm sure i'll fix this eventually
					{ name: 'Joined Server', value: `${moment(guild.joinedAt).format('LLLL')} EST` },
					{ name: 'Messages Read', value: `${stats.messagesSeen}`, inline: true },
					{ name: 'Commands Registered', value: `${stats.commandsRegistered}`, inline: true },
					{ name: 'Servers', value: `${stats.guilds}`, inline: true },
				) 
				.setTimestamp()
				.setFooter({ text: `V${package.version}`, iconURL: config.botAvatarURL });
				
			await interaction.reply({ embeds: [botInfo] });
		};
	},
};
