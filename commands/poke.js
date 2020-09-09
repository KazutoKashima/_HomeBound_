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
	name: 'poke',
	description: 'pokes a user',
	cooldown: 2,
	execute(message, args) {
		let pGifs = [
			`https://i.pinimg.com/originals/b4/95/fb/b495fb19f4b9a1b04f48297b676c497b.gif`,
			`https://media.tenor.com/images/6d227fd93656bd164985aad517a25c3f/tenor.gif`,
			`https://i.imgur.com/xSvkpIh.gif`,
			`https://media0.giphy.com/media/FdinyvXRa8zekBkcdK/source.gif`,
			`https://thumbs.gfycat.com/EnlightenedInferiorAfricanaugurbuzzard-size_restricted.gif`,
		]
		if(!args[0]) {
			return message.reply('You can\'t poke yourself!');
		}
		let gif = pGifs[Math.floor(Math.random()*pGifs.length)];
		
		if (message.mentions.users === '712495341097975848') {
			return message.channel.send("OwO Why do you want to poke me?");
		}
		
		let arg = args.join(" ").slice(22);
		let sEmbed = new Discord.MessageEmbed()
			.setDescription(`${message.author.username} just poked ${args[0]}!`)
			.setColor("#ffffff")
			.setImage(`${gif}`)
			.setTimestamp()
			message.channel.send(sEmbed)
	}	
}