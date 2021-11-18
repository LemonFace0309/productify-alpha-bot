module.exports = {
  name: 'interactionCreate',
  execute: async (interaction: any) => {
    if (!interaction.isButton()) return;
    await interaction.reply('Button Clicked!');
  },
};
