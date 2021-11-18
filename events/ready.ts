module.exports = {
  name: 'ready',
  once: true,
  execute: (client: any) => {
    console.log(`Bot is running. Logged in as ${client!.user!.tag}`);
  }
}