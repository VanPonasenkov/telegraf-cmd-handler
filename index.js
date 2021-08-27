const fs = require("fs");
const HANDLERENUM = require("./handlerenum");
const Command = require("./command");
const Event = require("./event");
const process = require("process");

/**
 * @description Config Object (Modify by using setEdirs function)
 */
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

const getCommands = (dirs) => {
  let commands = new Map();
  const commandFiles = fs.readdirSync(dirs.evDir);
  for (const file of commandFiles) {
    const command = require(`${dirs.evImportDIr}${file}`);
    const co = new command();
    commands.set(co.name, co);
  }
  return commands;
};

function execStickerEv(ctx, evl) {
  findEv(evl, "sticker").execute(ctx);
}

function execPhotoEv(ctx, evl) {
  findEv(evl, "photo").execute(ctx);
}

function execAudioEv(ctx, evl) {
  findEv(evl, "audio").execute(ctx);
}

/**
 * @param {*} bot telegraf instance
 * @param {number} handlertype type of the handler, pass by using HANDLERENUM values, HANDLERENUM.COMMAND by default
 */

const handlerInit = (bot, handlertype = HANDLERENUM.COMMAND) => {
  if (handlertype == HANDLERENUM.COMMAND) {
    let commands = getCommands(getEdirs);
    bot.on("message", (ctx) => {
      let eventsl = getEvents(getEdirs());
      if (ctx.message.sticker) {
        execStickerEv(ctx, eventsl);
        return;
      } else if (ctx.message.photo) {
        execPhotoEv(ctx, eventsl);
        return;
      } else if (ctx.message.audio) {
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
  }
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
  getEdirs, // for debugging purposes only
};
