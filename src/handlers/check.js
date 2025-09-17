import { ADMIN_ID } from '../config/env.js';
import { checkSubscription } from '../services/subscription.js';
import { subscriptionKeyboard } from '../keyboards/subscription.js';
import { safeReply } from '../utils/safeReply.js';
import { state, writeState } from '../storage/state.js';

export async function handleCheckSubscription(ctx) {
  const userId = ctx.from?.id;
  if (!userId) return;

  if (userId === ADMIN_ID) {
    if (!state.guideFileId) {
      await safeReply(ctx, 'Гайд пока не загружен. Отправьте PDF как документ — я сохраню его.');
      return;
    }
    try {
      await ctx.replyWithDocument(state.guideFileId, { caption: 'Админ-режим: отправляю PDF без проверки подписки.' });
    } catch {
      await safeReply(ctx, 'Не удалось отправить файл админу.');
    }
    return;
  }

  const alreadyDelivered = state.deliveredUserIds.includes(userId);
  if (alreadyDelivered) {
    await safeReply(ctx, 'Вы уже получили гайд. Проверьте ваши сообщения от бота.');
    return;
  }

  const subscribed = await checkSubscription(ctx, userId);
  if (!subscribed) {
    await safeReply(
      ctx,
      'Пожалуйста, подпишитесь на канал, затем нажмите «Проверить подписку».',
      subscriptionKeyboard()
    );
    return;
  }

  if (!state.guideFileId) {
    await safeReply(ctx, 'Гайд пока не загружен. Администратор, используйте команду /setguide или отправьте PDF.');
    return;
  }

  try {
    await ctx.replyWithDocument(state.guideFileId, { caption: 'Спасибо за подписку! Вот ваш PDF-гайд.' });
    state.deliveredUserIds.push(userId);
    writeState(state);
  } catch {
    await safeReply(ctx, 'Не удалось отправить файл. Попробуйте позже.');
  }
}
