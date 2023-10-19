const fs = require("fs");
const pdfjs = require("pdfjs-dist");

const createRangeArray = require("../helpers/createRangeArray");

/* EXTRACT ALL CLASSES TEXT */

const filePath = "/mnt/c/Users/bellu/Desktop/dnd/dnd5eng.pdf";

const file = new Uint8Array(fs.readFileSync(filePath));

const CLASSES_DATA = {
  barbarian: {
    name: "Barbarian",
    startPage: 40,
    endPage: 44,
    source: "PHB",
  },
  bard: {
    name: "Bard",
    startPage: 45,
    endPage: 49,
    source: "PHB",
  },
  cleric: {
    name: "Cleric",
    startPage: 50,
    endPage: 57,
    source: "PHB",
  },
  druid: {
    name: "Druid",
    startPage: 58,
    endPage: 63,
    source: "PHB",
  },
  fighter: {
    name: "Fighter",
    startPage: 64,
    endPage: 69,
    source: "PHB",
  },
  monk: {
    name: "Monk",
    startPage: 64,
    endPage: 69,
    source: "PHB",
  },
  paladin: {
    name: "Paladin",
    startPage: 76,
    endPage: 82,
    source: "PHB",
  },
  ranger: {
    name: "Ranger",
    startPage: 83,
    endPage: 87,
    source: "PHB",
  },
  rogue: {
    name: "Rogue",
    startPage: 88,
    endPage: 92,
    source: "PHB",
  },
  sorcerer: {
    name: "Sorcerer",
    startPage: 93,
    endPage: 98,
    source: "PHB",
  },
  warlock: {
    name: "Warlock",
    startPage: 99,
    endPage: 105,
    source: "PHB",
  },
  wizard: {
    name: "Wizard",
    startPage: 106,
    endPage: 113,
    source: "PHB",
  },
};

const scrapClasses = async () => {
  const document = await pdfjs.getDocument(file).promise;
  const classesKeys = Object.keys(CLASSES_DATA);
  for (const playerClassKey of classesKeys) {
    console.log(`starting parse of ${playerClassKey} into raw text`);
    const playerClass = CLASSES_DATA[playerClassKey];
    const classContent = [];
    const pageRange = createRangeArray(
      playerClass.startPage,
      playerClass.endPage
    );
    for (const pageIndex of pageRange) {
      const page = await document.getPage(pageIndex);
      const content = await page.getTextContent();
      const text = content.items.map((item) => item.str).join("");
      classContent.push(text);
    }
    playerClass.rawText = classContent.join("\n");
    console.log(
      `${playerClass.name} has been parsed into raw text successfully`
    );
  }
  fs.appendFileSync("./dist/classes.json", JSON.stringify(CLASSES_DATA));
};

module.exports = scrapClasses;
