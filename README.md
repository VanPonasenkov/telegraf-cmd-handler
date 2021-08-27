# telegraf-handlers

A simple Command and Event Handler Wrapper for telegraf.js library

# Example

```javascript
const { Telegraf } = require("telegraf");
const bot = new Telegraf("your-telegraf-token-here");
const cmdh = require("telegraf-cmd-handler");

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
