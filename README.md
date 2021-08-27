# telegraf-handlers

A simple Command and Event Handler Wrapper for telegraf.js library

# Example

```javascript
const { Telegraf } = require("telegraf");
const bot = new Telegraf("your-telegraf-token-here");
const cmdh = require("telegraf-handlers");

// Configure directories
cmdh.setEdirs(
  `${__dirname}\\commands`,
  `${__dirname}/commands/`,
  `${__dirname}\\events`,
  `${__dirname}/events/`
); // You have to use two separate paths for dir and importdir because of path issues

cmdh.handlerInit(bot, cmdh.HANDLERENUM.COMMAND); // Initialises all of the commands

cmdh.handlerInit(bot, cmdh.HANDLERENUM.EVENT); // Initialises all of the events

bot.launch();
```

# Example Command

```javascript
// /commands/testcmd.js

const { Command } = require("telegraf-handlers");

class TestCmd extends Command {
  constructor() {
    super();
    // used when invoking a command in telegram, /[name]
    this.name = "testcmd";
  }
  // this method gets executed when command is invoked
  execute(ctx, message, args) {
    ctx.reply("Test command");
  }
}

module.exports = TestCmd;
```

# Example Event

```javascript
// /events/testevent.js

const { Event } = require("telegraf-handlers");

class TestEvent extends Event {
  constructor() {
    super();
    // type of event that gets added to the listener
    this.type = "sticker";
  }
  execute(ctx) {
    ctx.reply("Test event");
  }
}

module.exports = TestEvent;
```
