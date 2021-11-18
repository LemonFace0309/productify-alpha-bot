import { Constants } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add two numbers!')
    .addNumberOption((option) => option.setName('num1').setDescription('The first number').setRequired(true))
    .addNumberOption((option) => option.setName('num2').setDescription('The second number').setRequired(true)),
  execute: async (interaction: any) => {
    const { options } = interaction;
    const num1 = options.getNumber('num1')!;
    const num2 = options.getNumber('num2')!;

    await interaction.deferReply({
      ephemeral: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 3500));

    await interaction.editReply({
      content: `This sum is ${num1 + num2}`,
    });
    await interaction.followUp({ content: '[Hope that helps!](https://prepanywhere.com)', ephemeral: true });
  },
};
