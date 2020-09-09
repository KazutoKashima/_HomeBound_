const keep_alive = require("../keepalive.js");
const fs = require('fs');
const Discord = require('discord.js');

const db = require('quick.db');
const ms = require("parse-ms");

require('dotenv').config();
const kazID = '701652992549716069';
const prefix = process.env.PREFIX;

const token = process.env.TOKEN

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.login(token);

module.exports = {
	name: 'work',
	description: "Work to get some money",
	//args: true,
	guildOnly: true,
	async execute(message) {
		let user = message.author;
		let author = await db.fetch(`work_${message.guild.id}_${user.id}`)
		
		let timeout = 600000;
		
		if (author !== null && timeout - (Date.now() -author) > 0) {
			let time = ms(timeout - (Date.now() - author));
			
			let timeEmbed = new Discord.MessageEmbed()
			.setColor("#ffffff")
			.setDescription(`<:Cross:61873660290105418> You have already worked recently!\nTry again in ${time.minutes} (${time.seconds}s)m`)
			message.channel.send(timeEmbed)
		} else {
			let replies = ['Programmer', 'Builder', 'Waiter','Engineer'];
			
			let result = Math.floor((Math.random() * replies.length));
			let amount = Math.floor(Math.random() * 80) + 1;
			let embed1 = new Discord.MessageEmbed()
			.setColor("#ffffff")
			.setDescription(`:white_check_mark: You worked as a ${replies[result]} and earned ${amount} cookies!`)
			message.channel.send(embed1);
			
			db.add(`money_${message.guild.id}_${user.id}`, amount)
			db.set(`work_${message.guild.id}_${user.id}`, Date.now())
		}
	}
}