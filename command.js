const { Context } = require("telegraf");

/**
 * @typedef {Context} Context
 */

/**
 * @classdesc Base Class For Events
 */
class Command {
  constructor() {
    this.args = false;
    this.aliases = [];
  }
  /**
   * Function that gets executed when the event is fired
   * @abstract
   * @param {Context} ctx context passed by telegraf
   * @param {*} message message object passeb by telegraf api
   * @param {string[]} args arguments passed to command
   */
  execute(ctx, message, args) {
    throw new Error("Execute method Not implemented!");
  }
}

module.exports = Command;
