const fs = require("fs");
const pdfjs = require("pdfjs-dist");
const dotenv = require("dotenv");
const scrapClasses = require("./PHB/classes");

dotenv.config();

const main = async () => {
  await scrapClasses();
};

main();
