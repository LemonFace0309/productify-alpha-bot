import { MessageActionRow, MessageEmbed, MessageButton } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  execute: async (interaction: any) => {
    const row = new MessageActionRow().addComponents([
      new MessageButton().setCustomId('primary').setLabel('Primary').setStyle('PRIMARY'),
      new MessageButton().setCustomId('secondary').setLabel('Secondary').setStyle('SECONDARY').setDisabled(true),
      new MessageButton().setCustomId('success').setLabel('Success').setStyle('SUCCESS').setDisabled(true),
      new MessageButton().setCustomId('danger').setLabel('Danger').setStyle('DANGER').setDisabled(true),
      new MessageButton().setURL('https://prepanywhere.com').setLabel('Link').setStyle('LINK'),
    ]);
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Prep anywhere!')
      .setURL('https://prepanywhere.com')
      .setDescription(
        "Find helpfull video for every problem in your Math textbook. Search. Let's Find Your Content! See step-by-step how to solve tough problems."
      );

    await interaction.reply({
      content: 'Pong!',
      embeds: [embed],
      components: [row],
    });
  },
};
