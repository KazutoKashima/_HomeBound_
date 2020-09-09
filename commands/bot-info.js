const keep_alive = require("../keepalive.js");
const fs = require('fs');
const Discord = require('discord.js');

require('dotenv').config();
const kazID = '701652992549716069';
const prefix = process.env.PREFIX;

const token = process.env.TOKEN

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.login(token);

module.exports = {
	name: 'bot-info',
	description: 'gives the info on the bot',
	aliases: ['binfo', 'bot'],
	cooldown: 2,
	execute(message) {
		let bicon = client.user.displayAvatarURL;
        let clientembed = new Discord.MessageEmbed()
            .setDescription("Bot Information")
            .setColor("#15f153")
            .setThumbnail(bicon)
            .addField("Bot Name", client.user.username)
            .addField("Created On", client.user.createdAt);

        return message.channel.send(clientembed);
	},
};