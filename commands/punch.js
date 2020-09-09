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
	name: 'punch',
	description: 'punches a user',
	cooldown: 2,
	execute(message, args) {
		let pGifs = [
			`https://i.pinimg.com/originals/f3/ec/8c/f3ec8c256cb22279c14bfdc48c92e5ab.gif`,
			`https://media2.giphy.com/media/AlsIdbTgxX0LC/giphy.gif`,
			`https://i.pinimg.com/originals/d7/c3/0e/d7c30e46a937aaade4d7bc20eb09339b.gif`,
			`https://i2.kym-cdn.com/photos/images/original/000/989/495/3b8.gif`,
		]
		if(!args[0]) {
			return message.reply('You can\'t punch yourself!');
		}
		
		if (args[0] == message.author.id) {
			return message.channel.send("You can't punch yourself!");
		}
		let gif = pGifs[Math.floor(Math.random()*pGifs.length)];
		
		let arg = args.join(" ").slice(22);
		let sEmbed = new Discord.MessageEmbed()
			.setDescription(`${message.author.username} just punched ${args[0]}!`)
			.setColor("#ffffff")
			.setImage(`${gif}`)
			.setTimestamp()
			message.channel.send(sEmbed)
	}	
}