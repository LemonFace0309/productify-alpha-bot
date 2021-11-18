module.exports = {
  name: 'interactionCreate',
  execute: async (interaction: any) => {
    if (!interaction.isCommand()) return;
    const command: any = interaction!.client!.commands!.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  },
};
