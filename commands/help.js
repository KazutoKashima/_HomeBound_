const keep_alive = require("../keepalive.js");
const fs = require('fs');
const Discord = require('discord.js');

require('dotenv').config();
const kazID = '701652992549716069';
const prefix = process.env.PREFIX;

const token = process.env.TOKEN

const client = new Discord.Client();

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands', 'h'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		
		if(!args.length) {
			
		let helpEmbed = new Discord.MessageEmbed()
			/* ----------------------Old Embed----------------------
			.setDescription("Mika's Help command, Prefix: a!")
			.setColor('#ffffff')
			.addField('Avatar', "Gives yours or someone else's avatar!",inline=false)
			.addField('bot-info','gives the info on me!',inline=false)
			.addField('server-info', 'shows the info of the server', inline=false)
			.addField('ping', 'checks my latency!', inline=false)
			.addField("funfact", "sends a random fact!", inline=false)
			.addField("hug", "gives a user a hug", inline=false)
			.addField("punch", 'punches a user', inline=false)
			.addField("poke",'pokes a user', inline=false)
			.addField("slap",'slaps a user', inline=false)
			*/
			//----------------------new embed----------------------//
			.setDescription("Homebound's Help Command, Prefix: H!")
			.setColor("#ffffff")
			.addField("Utility: ", "ping, server-info, bot-info", inline=false)
			.addField("Social Stuff: ", "funfact, avatar", inline=false)
			.addField("Roleplay: ", "hug, slap, poke, punch", inline=false)
			.addField("Economy: ", "work, deposit/bank/depos, rob", inline=false)
			data.push("Here's a list of all my commands:");
		data.push(commands.map(command => command.name).join(', \n'));
		data.push(`\nYou can send \`${prefix}help [command name]\` to get help on a command`);
			
		return message.author.send(helpEmbed)
			.then(() => {
				if (message.channel.type === 'dm') return;
				message.reply('I\'ve sent you a DM with all my commads!');
			})
			.catch(error => {
				console.error(err.stack);
				message.reply("It seems that I can't DM you! Do you have your DMs open?");
			});
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}
		

		message.channel.send(helpEmbed);
	},
};