import { Markup } from 'telegraf';
import { CHANNEL_USERNAME } from '../config/env.js';

export function subscriptionKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.url('Подписаться на канал', `https://t.me/${CHANNEL_USERNAME.replace('@', '')}`)],
    [Markup.button.callback('Проверить подписку ✅', 'check_subscription')]
  ]);
}
