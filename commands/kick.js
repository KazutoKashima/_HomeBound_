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
	name: 'kick', 
	aliases: ['remove'],
	description: 'Tag a member to kick them',
	args: true,
	cooldown: 5,
	guildOnly: true,
	execute(message, args) {
		let kUser = message.guild.member(message.mentions.users.first());
        if (!kUser) return message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

        let kickEmbed = new Discord.MessageEmbed()
            .setDescription("~Kick~")
            .setColor("#e56b00")
            .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
            .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Kicked In", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", kReason);

        let kickChannel = message.guild.channels.cache.find(`name`, "server-logs");
        if (!kickChannel) return message.channel.send("Can't find log channel.");

        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);

        return;
	},
};