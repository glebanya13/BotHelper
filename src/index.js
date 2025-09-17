import { createBot } from './bot.js';

const bot = createBot();

bot.launch().then(() => {
  console.log('Bot started.');
}).catch((e) => {
  console.error('Failed to launch bot:', e);
  process.exit(1);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
