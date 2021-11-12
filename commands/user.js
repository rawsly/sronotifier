const { SlashCommandBuilder } = require('@discordjs/builders');
const { COMMANDS } = require('../commands');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(COMMANDS.USER.commandName)
		.setDescription('Replies with server info!'),
	async execute(interaction) {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	},
};