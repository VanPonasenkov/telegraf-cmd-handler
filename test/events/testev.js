const { Event } = require("../../index");

class TESTEV extends Event {
  constructor() {
    super();
    this.type = "sticker";
  }
  execute(ctx) {
    ctx.reply("TESTEV");
  }
}

module.exports = TESTEV;
