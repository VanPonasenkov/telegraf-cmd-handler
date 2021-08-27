const { Context } = require("telegraf");

/**
 * @typedef {Context} Context
 */

/**
 * @classdesc Base Class For Events
 */
class Event {
  constructor() {
    /** @type {boolean} */
    this.once = false;
    /** @type {string} */
    this.type = "message"; // (not recomended) use the command handler instead
  }
  /**
   * Function that gets executed when the event is fired
   * @abstract
   * @param {Context} ctx
   */
  execute(ctx) {
    throw new Error("Execute method Not implemented!");
  }
}

module.exports = Event;
