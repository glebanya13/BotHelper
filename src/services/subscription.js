import { CHANNEL_USERNAME } from '../config/env.js';

const isSubscribedStatuses = new Set(['creator', 'administrator', 'member', 'restricted']);

export async function checkSubscription(ctx, userId) {
  try {
    const member = await ctx.telegram.getChatMember(CHANNEL_USERNAME, userId);
    return isSubscribedStatuses.has(member.status);
  } catch (error) {
    if (String(error).includes('CHAT_ADMIN_REQUIRED')) {
      await safeReply(ctx, 'Бот должен быть администратором канала, чтобы проверять подписку. Попросите админа добавить бота в канал с правами администратора.');
    }
    return false;
  }
}

async function safeReply(ctx, text, extra) {
  try {
    if (ctx.updateType === 'callback_query') {
      await ctx.editMessageText(text, extra);
    } else {
      await ctx.reply(text, extra);
    }
  } catch { }
}
