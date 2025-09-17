import 'dotenv/config';

export const BOT_TOKEN = process.env.BOT_TOKEN;
export const CHANNEL_USERNAME = process.env.CHANNEL_USERNAME;
export const ADMIN_ID = Number(process.env.ADMIN_ID);

if (!BOT_TOKEN) {
  console.error('Missing BOT_TOKEN in environment. Create a .env file.');
  process.exit(1);
}
