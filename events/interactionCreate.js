module.exports = {
	name: 'interactionCreate',
	async execute(client, interaction) {
		console.log(
			`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`,
		);
		if (!interaction.isCommand()) return;

		const { commandName } = interaction;
		const command = client.commands.get(commandName);
		if (!command) {
			console.log('Command not found!');
			return;
		}

		try {
			await command.execute(interaction);
		}
		catch (err) {
			console.error(err);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	},
};
