const fs = require("fs");
const HANDLERENUM = require("./handlerenum");
const Command = require("./command");
const Event = require("./event");
const process = require("process");

let edirs = {
  cmdDir: "",
  cmdImportDIr: "",
  evDir: "",
  evImportDIr: "",
};
const findCommand = (cmdl, commandName) => {
  for (cmd of cmdl) {
    if (cmd.aliases && cmd.aliases.includes(commandName)) {
      return cmd;
    }
  }
};

const findEv = (evl, evName) => {
  for (ev of evl) {
    if (ev[0] === evName) {
      return ev[1];
    }
  }
};

const setEdirs = (cmdDir, cmdImportDIr, evDir, evImportDIr) => {
  edirs = {
    cmdDir,
    cmdImportDIr,
    evDir,
    evImportDIr,
  };
};

const getEdirs = () => {
  return edirs;
};

const getEvents = (dirs) => {
  let events = new Map();
  const eventFiles = fs.readdirSync(dirs.evDir);
  for (const file of eventFiles) {
    const event = require(`${dirs.evImportDIr}${file}`);
    const eo = new event();
    events.set(eo.type, eo);
  }
  return events;
};

function execStickerEv(ctx, evl) {
  findEv(evl, "sticker").execute(ctx);
}

/**
 * @param {*} bot telegraf instance
 * @param {number} handlertype type of the handler, pass by using HANDLERENUM values, HANDLERENUM.COMMAND by default
 * @param {string} dir represents the directory path, '${__dirname}\\commands' by default
 * @param {string} importdir represents the directory path from which files are imported, './commands/' by default
 */

const handlerInit = (
  bot,
  handlertype = HANDLERENUM.COMMAND,
  dir = `${process.cwd()}\\commands`,
  importdir = `${process.cwd()}/commands/`
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
      console.log("e");

      console.log("e1");

      let eventsl = getEvents(getEdirs());
      if (ctx.message.sticker) {
        console.log("E#");
        execStickerEv(ctx, eventsl);
        return;
      } else if (ctx.message.photo) {
        returnl;
      }

      const message = ctx.message;
      const args = message.text.slice(1).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      const command =
        commands.get(commandName) || findCommand(commands, commandName);

      if (!command) return;
      if (command.args && !args.length) {
        return;
      }
      try {
        command.execute(ctx, message, args);
        return;
      } catch (error) {
        console.error(error);
      }
    });
    console.log("e3");
  }
  console.log("Heyyyyyyy");
  let events = getEvents(getEdirs());
  events.forEach((ev) => {
    bot.on(ev.type, (ctx) => {
      try {
        ev.execute(ctx);
      } catch (error) {
        console.error(error);
      }
    });
  });
};

module.exports = {
  handlerInit,
  HANDLERENUM,
  Command,
  Event,
  setEdirs,
  getEdirs,
};
