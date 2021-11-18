import { Client, Constants, Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('messageCreate', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.on('ready', () => {
  // console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Bot is running`);
  const guild = client.guilds.cache.get(process.env.GUILD_ID!);

  const commands = guild ? guild.commands : client.application?.commands;

  commands?.create({
    name: 'ping',
    description: 'Replies with pong.',
  });

  commands?.create({
    name: 'add',
    description: 'Adds two numbers',
    options: [
      {
        name: 'num1',
        description: 'This first number',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: 'num2',
        description: 'This second number',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
      },
    ],
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  switch (commandName) {
    case 'ping':
      await interaction.reply({
        content: 'pong',
        ephemeral: true,
      });
      break;
    case 'add':
      const num1 = options.getNumber('num1')!;
      const num2 = options.getNumber('num2')!;

      await interaction.deferReply({
        ephemeral: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 3000));

      await interaction.editReply({
        content: `This sum is ${num1 + num2}`,
      });
      break;
    case 'server':
      await interaction.reply({
        content: `Server name: ${interaction!.guild!.name}\nTotal members: ${
          interaction!.guild!.memberCount
        }\nCreated at: ${interaction!.guild!.createdAt}\nVerification level: ${interaction!.guild!.verificationLevel}`,
        ephemeral: true,
      });
      break;
    case 'user':
      await interaction.reply({
        content: `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`,
        ephemeral: true,
      });
      break;
  }
});

client.login(process.env.TOKEN);
