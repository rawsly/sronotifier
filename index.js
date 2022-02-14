require('dotenv').config();
const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const express = require('express');
const { UNIQUES, formatDate, CHANNEL_IDS, COLORS } = require('./constants');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;
const { DISCORD_BOT_TOKEN, DISCORD_TEXT_CHANNEL_ID } = process.env;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

client.once('ready', () => {
	console.log('Discord Bot is ready to go 🚀!');
});

client.login(DISCORD_BOT_TOKEN);

app.use(express.static('assets'));

app.get('/api/health', async (req, res) => {
	const channel = await client.channels.fetch(DISCORD_TEXT_CHANNEL_ID);
	await channel.send('Bot is alive! 💓');
	res.send('Bot is alive! 💓');
});

const createUniqueSpawnMessage = (unique) => {
	console.log(unique);
	const { name, avatar, spawn, hp, level } = unique;
	const message = new MessageEmbed()
		.setColor(COLORS.red)
		.setTitle(`${name} has spawned.`)
		.setAuthor(name, avatar)
		.setDescription('Unique Spawn')
		.setThumbnail(avatar)
		.addFields(
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Date', value: formatDate(), inline: true },
			{ name: 'Level', value: level, inline: true },
			{ name: 'HP', value: hp, inline: true }
		);
	if (spawn) {
		message.setImage(spawn);
	}
	return message;
};
/*
const createItemDropMessage = ({ name, code, type, level }) => {
	return new MessageEmbed()
		.setColor(COLORS.default)
		.setTitle(`${type} Item Drop`)
		.setAuthor(formatDate(), icon)
		.setDescription(`New item dropped.`)
		.setThumbnail(icon)

}
 */

const createChatMessage = ({ player, message, type }) => {
	return new MessageEmbed()
		.setColor(COLORS.default)
		.setTitle(`**${player}**`)
		.setAuthor(formatDate())
		.setDescription(`[${type.toUpperCase()}] - ${message}`);
}

app.post('/api/unique-spawn', async (req, res) => {
	const { name } = req.body;
	const uniqCode = Object.keys(UNIQUES).find(code => UNIQUES[code].name === name);
	if (!uniqCode) {
		return;
	}
	try {
		const channel = await client.channels.fetch(CHANNEL_IDS.uniques);
		const embedMessage = createUniqueSpawnMessage(UNIQUES[uniqCode]);
		await channel.send({ embeds: [embedMessage] });
		res.json({ success: true, message: `[SRO Notifier][Unique Spawn][${name}] Notification sent!` });
	} catch (err) {
		console.error(err);
		res.json({ success: false, message: 'Something went wrong!' });
	}
});

/* app.get('/api/died', async (req, res) => {
	const channel = await client.channels.fetch(DISCORD_TEXT_CHANNEL_ID);
	const embedMessage = createDiedMessage()
}); */

app.post('/api/chat', async (req, res) => {
	const { player, message, type } = req.body;
	if (!player || !message) {
		res.json({ success: false, message: `[SRO Notifier][${type.toUpperCase()}] Invalid input.` });
		return;
	}
	try {
		const channelId = CHANNEL_IDS[type];
		if (!channelId) {
			return;
		}
		const channel = await client.channels.fetch(channelId);
		const embedMessage = createChatMessage({ player, message, type });
		await channel.send({ embeds: [embedMessage] });
		res.json({ success: true, message: `[SRO Notifier][${type.toUpperCase()}] Notification sent!` });
	} catch (err) {
		console.error(err);
		res.json({ success: false, message: 'Something went wrong!' });
	}
});

app.post('/api/dead', async (req, res) => {
	const { position } = req.body || {};
	try {
		const channelId = CHANNEL_IDS.dead;
		if (!channelId) {
			return;
		}
		const channel = await client.channels.fetch(channelId);
		const { x, y, z } = position || {};
		const embedMessage = new MessageEmbed()
			.setColor(COLORS.default)
			.setTitle(`You died at [${x || 0}, ${y || 0}, ${z || 0}]`)
			.setAuthor(formatDate());
		await channel.send({ embeds: [embedMessage] });
		res.json({ success: true, message: `[SRO Notifier][DEAD] Notification sent!` });
	} catch (err) {
		console.error(err);
		res.json({ success: false, message: 'Something went wrong!' });
	}
});

/* app.post('/api/drop', async (req, res) => {
	const { item, type } = req.body || {};
	if (!item || !type) {
		res.json({ success: false, message: `[SRO Notifier][DROP] Invalid input.` });
		return;
	}
	const { name: itemName, servername: itemCode, level } = item;

}); */

app.post('/api/disconnect', async (req, res) => {
	try {
		const channelId = CHANNEL_IDS.disconnects;
		if (!channelId) {
			return;
		}
		const channel = await client.channels.fetch(channelId);
		const embedMessage = new MessageEmbed()
			.setColor(COLORS.default)
			.setTitle(`You are disconnected!`)
			.setAuthor(formatDate());
		await channel.send({ embeds: [embedMessage] });
		res.json({ success: true, message: `[SRO Notifier][DISCONNECT] Notification sent!` });
	} catch (err) {
		console.error(err);
		res.json({ success: false, message: 'Something went wrong!' });
	}
});

app.post('/api/reconnect', async (req, res) => {
	try {
		const channelId = CHANNEL_IDS.disconnects;
		if (!channelId) {
			return;
		}
		const channel = await client.channels.fetch(channelId);
		const embedMessage = new MessageEmbed()
			.setColor(COLORS.success)
			.setTitle(`You are reconnected!`)
			.setAuthor(formatDate());
		await channel.send({ embeds: [embedMessage] });
		res.json({ success: true, message: `[SRO Notifier][RECONNECT] Notification sent!` });
	} catch (err) {
		console.error(err);
		res.json({ success: false, message: 'Something went wrong!' });
	}
});

app.post('/api/consignment-trade', async (req, res) => {
	const { content, opcode, data } = req.body;
	console.log("opcode: ", opcode, "data: ", data);
	try {
		const channelId = CHANNEL_IDS.consignment;
		if (!channelId) {
			return;
		}
		const channel = await client.channels.fetch(channelId);
		const embedMessage = new MessageEmbed()
			.setColor(COLORS.success)
			.setTitle(content)
			.setAuthor(formatDate());
		await channel.send({ embeds: [embedMessage] });
		res.json({ success: true, message: `[SRO Notifier][CONSIGNMENT_TRADE] Notification sent! - ${content}` });
	} catch (err) {
		console.error(err);
		res.json({ success: false, message: 'Something went wrong!' });
	}
});


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
