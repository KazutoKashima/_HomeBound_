'use strict';
require('dotenv').config(); // for .env files for configuration of the program
const fs = require('fs');
const Discord = require('discord.js');
const prefix = process.env.PREFIX; // grabbing the prefix for the program to detect usaged from .env file
const token = process.env.TOKEN; // grabbing the token from the .env file
const kazID = "701652992549716069";
const client = new Discord.Client();
client.commands = new Discord.Collection();

// detecting the commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// grabbing the command files to be used as a command
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// getting the collection for cooldowns
const cooldowns = new Discord.Collection();

// writing to the console that it's ready to use
client.on('ready', () => {
	console.log('Ready!');
	client.user.setActivity('with my prefix H!', { type: "STREAMING", url:"https://www.twitch.tv/monstercat" });
});

// detecting errors and sending them to me
client.on('error', error => {
	console.log(`\n{error.stack}`);
	client.user.cache.get(kazID).send(`The following error has occured:\n\`\`\`{error.stack}\`\`\``);
});

// detects if a message has been sent
client.on('message', message => {
	
	// checking if the command has the prefix or if the message is a bot
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	// defining args and commandName
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	// finding aliases
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
	// if the command is not for the bot
	if (!command) return; // do nothing
	
	// checking if the command is guild only and is unusable in DMs
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!'); // notify user that it can't be used
	}
	
	// checking if the command does or does not require arguments
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
	
	// checking if the command has a cooldown value set
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	
	// Setting up the cooldowns
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	
	// attempting to execute the command
	try {
		command.execute(message, args);
	} catch (error) { // returnng an error if one occurs
		console.error(error);
		message.reply('there was an error trying to execute that command!'); // notfying user if one occurs
		client.users.cache.get(kazID).send(`Hi Kaz!\nThere was an error...here's the error!\n\`\`\`${error.stack}\`\`\``);
	}
});

// join message
client.on('guildMemberAdd', member => {
	//member.guild.channels.get('725163588280385793').send(`Welcome! ${member.username} to ${guild.name}!\nHope you enjoy your stay!`);
	let joinEmbed = new Discord.MessageEmbed()
		.setColor('#ffffff')
		.setTitle("Welcome!")
		.setDescription(`Welcome to ${member.guild.name}, ${member}!\nWe hope you enjoy your stay!`)
		.setTimestamp()
	const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
	if(!channel) return;
	channel.send(joinEmbed);
});

// leave message
client.on('guildMemberRemove', member => {
	let leaveEmbed = new Discord.MessageEmbed()
	.setColor('#ffffff')
	.setTitle("Someone left!")
	.setDescription(`Lets say "Goodbye" to ${member}!\nWe hope they enjoyed their stay!`)
	.setTimestamp()
	//.setThumbnail(`${member.guild.iconURL}`)
	const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
	if(!channel) return;
	channel.send(leaveEmbed);
});

// login into the bot
client.login(token);