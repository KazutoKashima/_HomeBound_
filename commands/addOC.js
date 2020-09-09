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
	name: 'addoc',
	description: "Adds an OC to the users list",
	cooldown: 2,
	guildOnly: true,
	async execute(msg, args, members, bot) {
		
		let user = msg.author;
		let author = await db.fetch(`work_${msg.guild.id}_${user.id}`);
		let OCS = args.slice(0).join(' ');
		
		if (OCS.includes("https://docs.google.com/document/d/")) {
			let timeout = 600000;
		
		    if (author !== null && timeout - (Date.now() - author) > 0) {
			    let time = ms(timeout - (Date.now() -author));
			
			    let timeEmbed = new Discord.MessageEmbed()
			    .setColor("#ffffff")
			    .setDescription(`:x: You have already added an OC within the testing limits,\nPlease wait ${time.minutes}minutes and ${time.seconds}seconds`);
		    } else {
			    try {
				    let embed1 = new Discord.MessageEmbed()
				    .setColor("#ffffff")
				    .setDescription(`:white_check_mark: successfully added: ${OCS} to your list!`);
				    msg.channel.send(embed1);
				    db.push(`ocs_${msg.guild.id}.${user.id}`, OCS)
			    }
			    catch (err) {
				    console.log(err.stack);
				    msg.channel.send("Sorry, but there was an error adding it to the database!\nKaz has been notified and will respond in due time!\n\nThank you for your patience");
			    }
		    }
        } else {
            msg.channel.send("Sorry but your OC doesn't have a google link!");
        }				
	}
}