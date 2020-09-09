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
	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or you own avatar.',
	execute(message) {
		if(!message.mentions.users.size) {
			a1Embed = new Discord.MessageEmbed()
			.setDescription(`${message.author.username}'s Avatar`)
			.setColor('#ffffff')
			.setImage(`${message.author.displayAvatarURL({ dynamic: true })}`)
			message.channel.send(a1Embed);
		}
		
		const avatarList = message.mentions.users.map(user => {
			a2Embed = new Discord.MessageEmbed()
			.setDescription(`${user.username}'s Avatar`)
			.setColor('#ffffff')
			.setImage(`${user.displayAvatarURL({ dynamic: true })}`)
			message.channel.send(a2Embed);
		});
		
		message.channel.send(avatarList);
	},
};