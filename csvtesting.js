import fs from "node:fs";
import { parse } from "csv-parse";

const __dirname = new URL(".", import.meta.url).pathname;

const processFile = async () => {
  const records = [];
  const parser = fs.createReadStream('C:\\Users\\jwc602\\Documents\\FY2023_097_Contracts_Full_20260106\\FY2012_All_Contracts_Full_20260206_1.csv').pipe(
    parse({
      // CSV options if any
    }),
  );
  for await (const record of parser) {
    // Work with each record
	console.log(record);
    //records.push(record);
  }
  return records;
};

(async () => {
  const records = await processFile();
  console.info(records);
})();

//"C:\Users\jwc602\Documents\FY2023_097_Contracts_Full_20260106\FY2012_All_Contracts_Full_20260206_1.csv"