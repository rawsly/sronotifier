const { SlashCommandBuilder } = require('@discordjs/builders');
const { COMMANDS } = require('../commands');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(COMMANDS.PING.commandName)
		.setDescription('Replies with Ping pong!'),
	async execute(interaction) {
		console.log("ping sent");
		await interaction.reply('Ping pong!');
	},
};