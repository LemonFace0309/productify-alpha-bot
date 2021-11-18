import { Client, Collection, Intents } from 'discord.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

interface NewClient extends Client<boolean> {
  commands?: Collection<unknown, unknown>;
}

const client: NewClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => /^.+(\.ts|\.js)$/.test(file));

/**
 * Adding commands to discord client
 */
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter((file) => /^.+(\.ts|\.js)$/.test(file));

/**
 * Adding events to discord client
 */
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.TOKEN);
