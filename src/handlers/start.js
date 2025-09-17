import { subscriptionKeyboard } from '../keyboards/subscription.js';

export async function handleStart(ctx) {
  const name = ctx.from?.first_name || 'друг';
  const payload = ctx.startPayload;
  const intro = payload ? `Вы запросили «${payload}».` : '';
  await ctx.reply(
    `Привет, ${name}! ${intro}\n\nЧтобы получить PDF-гайд, подпишитесь на канал и нажмите «Проверить подписку».`,
    subscriptionKeyboard()
  );
}
