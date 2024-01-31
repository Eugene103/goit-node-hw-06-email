import { Telegraf } from "telegraf"
import { Message } from "'telegraf/filters'"
import "dotenv/config"

const {TELEGRAM_BOT_API} = process.env
const bot = new Telegraf(TELEGRAM_BOT_API)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()