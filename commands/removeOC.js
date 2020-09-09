'use strict';
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
	name: 'removeoc',
	description: "Removes the user's OC from the list",
	aliases: ['rmoc', 'rm'],
	async execute(message, args) {
		
		let user = message.author;
		//let member = db.fetch(`ocs_${message.guild.id}.${user.id}`)
		let OCS = args.slice(0).join(' ');
		let ocs = await db.fetch(`ocs_${message.guild.id}.${user.id}`)
		let ocDB = await db.fetch(`ocs_${message.guild.id}.${user.id}`, ocs)
		
		if (args[0] == 'all') {
			
			
			db.remove(`ocs_${message.guild.id}.${user.id}`, ocs)
			let embed5 = new Discord.MessageEmbed()
			.setColor("#ffffff")
			.setDescription(":white_check_mark: You have removed all OCs from your list")
			message.channel.send(embed5);
		} else {
			if (OCS.includes(ocDB)) {
				let toRemove = OCS.includes(ocDB);

				try{

					let embed6 = new Discord.MessageEmbed()
					.setColor("#ffffff")
					.setDescription(`:white_check_mark: You have removed ${toRemove} from the list, successfully!`)
					message.channel.send(embed6);
					db.remove(`ocs_${message.guild.id}.${user.id}`, toRemove)
					
				} catch (err) {
					message.channel.send(`Sorry but there was an error trying to remove \`${toRemove}\` from you list!\nKaz has been notified`)
					console.log(err.stack);
				}
			}
		}
	}	
}