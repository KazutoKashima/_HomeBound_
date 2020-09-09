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
	name: 'ban',
	description: 'Bans a user from the server',
	args: true,
	cooldown: 5,
	guildOnly: true,
	execute(message, args) {
		let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!bUser) return message.channel.send("Can't find user!");
        let bReason = args.join(" ").slice(22);
        if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
        if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

        let banEmbed = new Discord.MessageEmbed()
            .setDescription("~Ban~")
            .setColor("#bc0000")
            .addField("Banned User", `${bUser} with ID ${bUser.id}`)
            .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Banned In", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", bReason);

        let incidentchannel = message.guild.channels.cache.find(`name`, "server-logs");
        if (!incidentchannel) return message.channel.send("Can't find log channel.");

        message.guild.member(bUser).ban(bReason);
        incidentchannel.send(banEmbed);


        return;
	},
};