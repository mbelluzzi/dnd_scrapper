const dotenv = require("dotenv");
const scrapPHBClasses = require("./PHB/classes");

dotenv.config();

const main = async () => {
  await scrapPHBClasses();
};

main();
