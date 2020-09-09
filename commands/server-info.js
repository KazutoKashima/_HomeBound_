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
	name: 'server-info',
	description: 'gives the info on the server',
	aliases: ['server', 'sinfo'],
	cooldown: 2,
	execute(message) {
		try {
            let sicon = message.guild.iconURL;
            let serverembed = new Discord.MessageEmbed()
                .setDescription("Server Information")
                .setColor("#15f153")
                .setThumbnail(sicon)
                .addField("Server Name", message.guild.name)
                .addField("Created On", message.guild.createdAt)
                .addField("You Joined", message.member.joinedAt)
                .addField("Total Members", message.guild.memberCount);

            return message.channel.send(serverembed);
        }

        catch (err) {
            console.error(err.stack);
            message.channel.send(`<@!${message.author.id}>, This command only works in servers!`);
        }
	},
};