require('dotenv').config();
const fs = require('fs')
const { Client, Collection, Intents } = require('discord.js');

const { DISCORD_BOT_TOKEN } = process.env;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
    const command = client.commands.get(commandName);
    if (!command) {
        console.log("Command not found!");
        return;
    };

    try {
		await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Login to Discord with your client's token
client.login(DISCORD_BOT_TOKEN);