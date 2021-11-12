require('dotenv').config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { DISCORD_CLIENT_ID, DISCORD_CHANNEL_ID, DISCORD_BOT_TOKEN } = process.env;

console.log(DISCORD_CLIENT_ID, DISCORD_CHANNEL_ID, DISCORD_BOT_TOKEN);

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(DISCORD_BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_CHANNEL_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);