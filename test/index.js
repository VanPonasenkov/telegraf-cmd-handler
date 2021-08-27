const { Telegraf } = require("telegraf");
const bot = new Telegraf("your-telegraf-token-here");
const cmdh = require("../index");

cmdh.setEdirs(
  `${__dirname}\\commands`,
  `${__dirname}/commands/`,
  `${__dirname}\\events`,
  `${__dirname}/events/`
);

cmdh.handlerInit(bot, cmdh.HANDLERENUM.COMMAND);

cmdh.handlerInit(bot, cmdh.HANDLERENUM.EVENT);

bot.launch();
