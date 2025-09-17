import { Telegraf } from 'telegraf';
import { BOT_TOKEN } from './config/env.js';
import { handleStart } from './handlers/start.js';
import { handleCheckSubscription } from './handlers/check.js';
import { handleSetGuide, handleStats, handleResetUser, handleAdminDocument } from './handlers/admin.js';

export function createBot() {
  const bot = new Telegraf(BOT_TOKEN);

  bot.start(handleStart);
  bot.action('check_subscription', async (ctx) => {
    await ctx.answerCbQuery();
    await handleCheckSubscription(ctx);
  });

  bot.command('setguide', handleSetGuide);
  bot.command('stats', handleStats);
  bot.command('resetuser', handleResetUser);
  bot.on('document', handleAdminDocument);

  bot.help(async (ctx) => {
    await ctx.reply(
      'Команды:\n/start — начать\n/help — помощь\n\nАдмин-команды:\n/setguide (ответом на PDF)\n/stats\n/resetuser <id>'
    );
  });

  return bot;
}
