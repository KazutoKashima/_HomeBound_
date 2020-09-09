const keep_alive = require("../keepalive.js");
const fs = require('fs');
const Discord = require('discord.js');

require('dotenv').config();
const kazID = '701652992549716069';
const prefix = process.env.PREFIX;

const token = process.env.TOKEN

const client = new Discord.Client();

module.exports = {
	name: 'hug',
	description: 'Sends a hug!',
	aliases: ['hug'],
	usage: '[command name] <user (optional)>',
	cooldown: 2,
	execute(message, args) {
		let hGifs = [
			`https://media2.giphy.com/media/PHZ7v9tfQu0o0/200.gif`,
			`https://i.pinimg.com/originals/f2/80/5f/f2805f274471676c96aff2bc9fbedd70.gif`,
			`https://i.imgur.com/r9aU2xv.gif`,
			`https://i.imgur.com/wOmoeF8.gif`,
			`https://25.media.tumblr.com/tumblr_ma7l17EWnk1rq65rlo1_500.gif`,
		]
		
		let gif = hGifs[Math.floor(Math.random()*hGifs.length)];
		
		try {
			if(!args[0]) {
			return message.reply('You can\'t hug yourself!');
		}
		
		
		if (args[0] === '<@!712495341097975848>') {
			let arg = args.join(" ").slice(22);
			let sEmbed = new Discord.MessageEmbed()
			.setDescription(`OwO A hug? Yay!`)
			.setColor("#ffffff")
			.setImage(`${gif}`)
			.setTimestamp()
			return message.channel.send(sEmbed);
		}
		
		let arg = args.join(" ").slice(22);
		let hEmbed = new Discord.MessageEmbed()
			.setDescription(`${message.author.username} just hugged ${args[0]}!`)
			.setColor("#ffffff")
			.setImage(`${gif}`)
			.setTimestamp()
		message.channel.send(hEmbed)
		}
		catch(err) {
			console.log(err.stack);
			message.channel.send(`Sorry ${message.author.name}, but there has been an error!\nKaz will fix this when he can, please be patient`);
		}
	}
}