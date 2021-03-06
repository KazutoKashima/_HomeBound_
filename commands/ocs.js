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
	name: 'ocs',
	aliases: ['oc'],
	description: "Gives the user's current OCs",
	//args: true,
	async execute(message, args, utils) {
		let user = message.mentions.members.first() || message.author;
		
		let ocs = db.fetch(`ocs_${message.guild.id}.${user.id}`)
		
		if (ocs === null) ocs = 0;
		
		//let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
		//if (bank === null) bank = 0;
		
		let moneyEmbed = new Discord.MessageEmbed()
		.setColor("#ffffff")
		.setDescription(`**${user}'s OCs**:\n ${ocs}`)
		message.channel.send(moneyEmbed);
	}
}