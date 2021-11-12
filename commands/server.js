const { SlashCommandBuilder } = require('@discordjs/builders');
const { COMMANDS } = require('../commands');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(COMMANDS.SERVER.commandName)
		.setDescription('Replies with server info!'),
	async execute(interaction) {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	},
};