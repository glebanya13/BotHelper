import { ADMIN_ID } from '../config/env.js';
import { state, writeState } from '../storage/state.js';

export async function handleSetGuide(ctx) {
  if (ctx.from?.id !== ADMIN_ID) return;

  const reply = ctx.message?.reply_to_message;
  if (!reply || !reply.document) {
    await ctx.reply('Пришлите команду как ответ на сообщение с PDF-файлом или просто пришлите PDF — я сохраню автоматически.');
    return;
  }
  const fileId = reply.document.file_id;
  state.guideFileId = fileId;
  writeState(state);
  await ctx.reply('Гайд сохранён. Теперь бот сможет отправлять его подписчикам.');
}

export async function handleStats(ctx) {
  if (ctx.from?.id !== ADMIN_ID) return;
  await ctx.reply(
    `Статистика:\n- Выдано гайдов: ${state.deliveredUserIds.length}\n- Установлен файл: ${state.guideFileId ? 'да' : 'нет'}`
  );
}

export async function handleResetUser(ctx) {
  if (ctx.from?.id !== ADMIN_ID) return;
  const parts = ctx.message.text.trim().split(/\s+/);
  if (parts.length < 2) {
    await ctx.reply('Использование: /resetuser <telegram_user_id>');
    return;
  }
  const uid = Number(parts[1]);
  const idx = state.deliveredUserIds.indexOf(uid);
  if (idx >= 0) {
    state.deliveredUserIds.splice(idx, 1);
    writeState(state);
    await ctx.reply(`Сброшена отметка выдачи для пользователя ${uid}.`);
  } else {
    await ctx.reply('Пользователь не найден в списке получивших гайд.');
  }
}

export async function handleAdminDocument(ctx) {
  if (ctx.from?.id !== ADMIN_ID) return;
  const doc = ctx.message.document;
  const isPdf = (doc.mime_type && doc.mime_type.includes('pdf')) || (doc.file_name && doc.file_name.toLowerCase().endsWith('.pdf'));
  if (!isPdf) {
    await ctx.reply('Это не похоже на PDF. Пожалуйста, отправьте PDF-файл.');
    return;
  }
  state.guideFileId = doc.file_id;
  writeState(state);
  await ctx.reply('PDF сохранён как гайд. Теперь пользователи будут получать этот файл.');
}
