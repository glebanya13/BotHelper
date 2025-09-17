export async function safeReply(ctx, text, extra) {
  try {
    if (ctx.updateType === 'callback_query') {
      await ctx.editMessageText(text, extra);
    } else {
      await ctx.reply(text, extra);
    }
  } catch {}
}
