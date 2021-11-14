const { SlashCommandBuilder } = require('@discordjs/builders');
const { COMMANDS } = require('../commands');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(COMMANDS.CLEAR_ALL.commandName)
		.setDescription(
			'Removes all messages! Becareful before using this command!',
		),
	async execute(interaction) {
		let messages;
		do {
			messages = await interaction.channel.fetch({ limit: 2 });
			interaction.channel
				.bulkDelete(2)
				.then(async () => {
					await interaction.reply('Messages deleted successfully.');
				})
				.catch(console.error);
		} while (messages.size >= 2);
	},
};
