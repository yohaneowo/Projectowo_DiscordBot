

const EventEmitter = require("events")

class EventManager extends EventEmitter {}




// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'eventManag... Remove this comment to see the full error message
const eventManager = new EventManager()



module.exports = eventManager
