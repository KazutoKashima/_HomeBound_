const keep_alive = require("../keepalive.js");
const fs = require('fs');
const Discord = require('discord.js');

require('dotenv').config();
const kazID = '701652992549716069';
const prefix = process.env.PREFIX;

const token = process.env.TOKEN

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.login(token);

module.exports = {
	name: 'ping',
	aliases: ['p'],
	description: 'Tests the bot\'s latency',
	execute(message) {
		message.channel.send("Pinging...").then(m => {
			var ping = m.createdTimestamp - message.createdTimestamp;
			
			let embed = new Discord.MessageEmbed()
				.setAuthor(`The latency is ${ping}ms`)
				.setColor("ffffff")
			m.edit(embed)
		});
	},
};