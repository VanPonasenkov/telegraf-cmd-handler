const { Telegraf } = require("telegraf");
const bot = new Telegraf("1842569805:AAH32qXlyTpv4vx-Bn9Sr2p68YsuXJeDrPc");
const cmdh = require("../index");

cmdh.setEdirs(
  `${__dirname}\\commands`,
  `${__dirname}/commands/`,
  `${__dirname}\\events`,
  `${__dirname}/events/`
);

cmdh.handlerInit(
  bot,
  cmdh.HANDLERENUM.COMMAND,
  `${__dirname}\\commands`,
  `${__dirname}/commands/`
);

cmdh.handlerInit(
  bot,
  cmdh.HANDLERENUM.EVENT,
  `${__dirname}\\events`,
  `${__dirname}/events/`
);

bot.launch();
