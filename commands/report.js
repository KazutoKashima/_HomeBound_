const keep_alive = require("../keepalive.js");
const fs = require('fs');
const Discord = require('discord.js');

require('dotenv').config();
const kazID = '701652992549716069';
const prefix = process.env.PREFIX;

const token = process.env.TOKEN

const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
	name: 'report',
	description: 'reports a user',
	args: true,
	cooldown: 2,
	guildOnly: true,
	execute(message, args) {
		//!report @ned this is the reason

        try {
			let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
			if (!rUser) return message.channel.send("Couldn't find user.");
			let reason = message.content.slice(prefix.length).trim().split(/ +/);

			let reportEmbed = new Discord.MessageEmbed()
            .setDescription("Reports")
            .setColor("#15f153")
            .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
            .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
            .addField("Channel", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", reason);

			const channel = member.guild.channels.cache.find(ch => ch.name === "server-logs")
			if (!channel) return channel.send("Couldn't find logs channel.");
			
			channel.send(reportEmbed);

			message.delete().catch(O_o => { });
		}
		catch(error) {
			console.error(error.stack);
			if (message.author.id === kazID) {
				message.reply('Please check the console for errors related to `fn.bind`!');
			}
			
			else if (message.author.id != kazID){
				message.reply('That command will be fixed soon!\nPlease be patient!');
			}
		}
	},
};