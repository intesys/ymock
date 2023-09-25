const { worker } = require("./mocks/browser");
const { ymock } = require("../src/index");

worker.start();
ymock.load({ worker, handlers }).open();
