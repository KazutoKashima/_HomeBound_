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
	name: 'pat',
	description: 'pats a user',
	cooldown: 2,
	execute(message, args) {
		let pat = [
			`https://i.imgur.com/oTUDUAx.gif`,
			`https://giffiles.alphacoders.com/930/93090.gif`,
			`http://cdn.lowgif.com/small/8261ca3e5c7495f1-head-pat-gif-9-gif-800-450-moe-pinterest-anime.gif`,
			`https://64.media.tumblr.com/cf7ab0c9ca0d574aff3308e0767d370f/tumblr_pf4y87cTnH1th206io1_500.gif`,
			`https://i.imgur.com/UWbKpx8.gif`,
			`https://thumbs.gfycat.com/ImpurePleasantArthropods-small.gif`,
			`https://media1.giphy.com/media/ARSp9T7wwxNcs/giphy.gif`,
			`https://pa1.narvii.com/6451/1123cea199f4a6f0134c9dfdfd97e8f0fabce777_hq.gif`,
			`https://farm4.staticflickr.com/3815/9190388546_ce2a03f308_o.gif`,
			`https://media.tenor.com/images/40f454db8d7ee7ccad8998479fbabe69/tenor.gif`,
		]
		if(!args[0] || message.mentions.users === message.author.id) {
			return message.reply('You can\'t pat yourself!');
		}
		let gif = pat[Math.floor(Math.random()*pat.length)];
		
		if (args[0] === '<@!712495341097975848>') {
			let arg = args.join(" ").slice(22);
			let sEmbed = new Discord.MessageEmbed()
			.setDescription(`OwO A pat? Yay!`)
			.setColor("#ffffff")
			.setImage(`${gif}`)
			.setTimestamp()
			return message.channel.send(sEmbed);
		}
		
		let arg = args.join(" ").slice(22);
		let sEmbed = new Discord.MessageEmbed()
			.setDescription(`${message.author.username} just patted ${args[0]}!`)
			.setColor("#ffffff")
			.setImage(`${gif}`)
			.setTimestamp()
			message.channel.send(sEmbed)
	}	
}