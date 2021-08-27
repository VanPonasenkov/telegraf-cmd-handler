const { Command } = require("../../index");

class TESTCMD extends Command {
  constructor() {
    super();
    this.name = "testcmd";
  }
  execute(ctx, message, args) {
    ctx.reply(string(message.from.id) + " " + args[0]);
  }
}

module.exports = TESTCMD;
