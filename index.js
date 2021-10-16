const fs = require("fs");
const HANDLERENUM = require("./handlerenum");
const Command = require("./command");
const Event = require("./event");
const process = require("process");
let pdir;
let pidir;
const findCommand = (cmdl, commandName) => {
  for (cmd of cmdl) {
    if (cmd.aliases && cmd.aliases.includes(commandName)) {
      return cmd;
    }
  }
};

/**
 * @param {*} bot telegraf instance
 * @param {number} handlertype type of the handler, pass by using HANDLERENUM values, HANDLERENUM.COMMAND by default
 * @param {string} dir represents the directory path, '${__dirname}\\commands' by default
 * @param {string} importdir represents the directory path from which files are imported, './commands/' by default
 */
if(process.platform == "win32") {pdir = `${process.cwd()}\\commands`; pidir = `${process.cwd()}/commands/`}
else if (process.platform == "linux" || process.platform == "freebsd" || process.platform == "openbsd" || process.platform == "darwin") { pdir = `${process.cwd()}/commands`; pidir = `${process.cwd()}/commands/`}
const handlerInit = (
  bot,
  handlertype = HANDLERENUM.COMMAND,
  dir = pdir,
  importdir = pidir
) => {
  if (handlertype == HANDLERENUM.COMMAND) {
    let commands = new Map();
    const commandFiles = fs.readdirSync(dir);
    for (const file of commandFiles) {
      const command = require(`${importdir}${file}`);
      const co = new command();
      commands.set(co.name, co);
    }
    bot.on("message", (ctx) => {
      const message = ctx.message;
      const args = message.text.slice(1).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      const command =
        commands.get(commandName) || findCommand(commands, commandName);

      if (!command) {

        return
      };
      if (command.args && !args.length) {
        return;
      }
      try {
        command.execute(ctx, message, args);
      } catch (error) {
        console.error(error);
      }
    });
  } else if (handlertype == HANDLERENUM.EVENT) {
    let events = new Map();
    const eventFiles = fs.readdirSync(dir);
    for (const file of eventFiles) {
      const event = require(`${importdir}${file}`);
      const eo = new event();
      events.set(eo.name, eo);
    }
    events.forEach((ev) => {
      bot.on(ev.type, (ctx) => {
        try {
          ev.execute(ctx);
        } catch (error) {
          console.error(error);
        }
      });
    });
  } else {
    throw new Error("Wrong handler type, use types in HANDLERENUM!");
  }
};
module.exports = { handlerInit, HANDLERENUM, Command, Event };
