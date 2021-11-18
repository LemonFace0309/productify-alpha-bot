import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
  data: new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
  execute: async (interaction: any) => {
    await interaction.reply({
      content: `Server name: ${interaction!.guild!.name}\nTotal members: ${
        interaction!.guild!.memberCount
      }\nCreated at: ${interaction!.guild!.createdAt}\nVerification level: ${interaction!.guild!.verificationLevel}`,
      ephemeral: false,
    });
  },
};
