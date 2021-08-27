const { Command } = require("../../index");

class TESTCMD extends Command {
  constructor() {
    super();
    this.name = "testcmd";
  }
  execute(ctx) {
    ctx.reply("testjroejf");
  }
}

module.exports = TESTCMD;
