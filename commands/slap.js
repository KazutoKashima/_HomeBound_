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
	name: 'slap',
	description: 'slaps a mentioned user',
	cooldown: 1,
	execute(message, args) {
		let slapping = message.content.split(" ").slice(22);
		
		let sGifs = [
			`https://media1.tenor.com/images/b6d8a83eb652a30b95e87cf96a21e007/tenor.gif`,
			`https://33.media.tumblr.com/4a58a89eaaea25571fcc03d3788b1e55/tumblr_nel3qwSzqw1tblzm8o1_500.gif`,
			`https://media1.tenor.com/images/448e9db420b1d7faadad508b887b2a00/tenor.gif`,
			`https://cdn.quotesgram.com/img/50/92/797193858-UXqzzab.gif`,
			`https://media.tenor.com/images/c8832c9d5596ed9e6297c947047b584d/tenor.gif`,
		]
		
		var gif = sGifs[Math.floor(Math.random()*sGifs.length)];
		if (!args[0]) {
			return message.reply('You cant slap yourself!');
		}
		let sEmbed = new Discord.MessageEmbed()
			.setDescription(`${message.author.username} just slapped ${args[0]}!`)
            .setColor("#ffffff")
            .setImage(`${gif}`)
			.setTimestamp()
		message.channel.send(sEmbed);
	},
};