import fs from "node:fs";
import { parse } from "csv-parse";
//import {retgrant, sqlgrantship} from '.\\newbetternsfgrantimportparts.js';
//import pg from 'pg';
import { Pool, Client} from 'pg';
const __dirname = new URL(".", import.meta.url).pathname;
const directoryPath = 'C:\\Users\\jwc602\\Documents\\FY2023_097_Contracts_Full_20260106';

const pool = new Pool({
  user: 'postgres',
  password: 'Th3Gr4ndL1br4ry!',
  host: 'localhost',
  port: 5432,
  database: 'nsfsecure',
})


async function sqlgrantship(vecgrantkey,j,arrline,filename) {

			for(let i =0; i<vecgrantkey.length; i++)
			{
				var grantkey = vecgrantkey[i].replace("-","");
				if (arrline[2] == grantkey && arrline[10] != 0 && !isNaN(arrline[10]))
				{
					//break;
					//console.log(arrline);
					//rl.close();
					//return arrline;
					console.log("HELO THERE| grantkey: " + grantkey + " | docawardid:" + arrline[2] + " | awardid:" + vecgrantkey[i] + " | amount:" + arrline[10] + " | fundagency:" + arrline[34] + " | fundsubagency:" + arrline[36] + " | fundoffice:" + arrline[38] + " | ruei:" + arrline[48] + " | rcage:" + arrline[53] + " | rparuei:" + arrline[54] + " | psc:" + arrline[103] + " | naics:" + arrline[109] + " | popdate1:" + arrline[23] + " | popdate2:" + arrline[24] + " | i:" + i + " | j:" + j + " | file:" + filename + " | ");
					//console.log(arrline);
					if(arrline[24] > arrline[23])
					{
						await pool.query('update grants set value =cast( $1 as money), fundagency = $2, fundsubagency = $3, fundoffice = $4, psc = $5, naics = $6, ruei = $7, rcage = $8, rparuei = $9, popdate = daterange(cast($10 as date),cast($11 as date)) where awardid = $12', [arrline[10], arrline[34], arrline[36], arrline[38],arrline[103], arrline[109], arrline[48], arrline[53],arrline[54], arrline[23], arrline[24], vecgrantkey[i]]);
					}
					else if(arrline[24] =="")
					{
						await pool.query('update grants set value =cast( $1 as money), fundagency = $2, fundsubagency = $3, fundoffice = $4, psc = $5, naics = $6, ruei = $7, rcage = $8, rparuei = $9, popdate = daterange(cast($10 as date),cast($11 as date)) where awardid = $12', [arrline[10], arrline[34], arrline[36], arrline[38],arrline[103], arrline[109], arrline[48], arrline[53],arrline[54], arrline[23], arrline[23], vecgrantkey[i]]);
					}
					else if(arrline[23] =="")
					{
						await pool.query('update grants set value =cast( $1 as money), fundagency = $2, fundsubagency = $3, fundoffice = $4, psc = $5, naics = $6, ruei = $7, rcage = $8, rparuei = $9, popdate = daterange(cast($10 as date),cast($11 as date)) where awardid = $12', [arrline[10], arrline[34], arrline[36], arrline[38],arrline[103], arrline[109], arrline[48], arrline[53],arrline[54], arrline[24], arrline[24], vecgrantkey[i]]);
					}
					else
					{
						await pool.query('update grants set value =cast( $1 as money), fundagency = $2, fundsubagency = $3, fundoffice = $4, psc = $5, naics = $6, ruei = $7, rcage = $8, rparuei = $9, popdate = daterange(cast($10 as date),cast($11 as date)) where awardid = $12', [arrline[10], arrline[34], arrline[36], arrline[38],arrline[103], arrline[109], arrline[48], arrline[53],arrline[54], arrline[24], arrline[23], vecgrantkey[i]]);
					}
					const res = await pool.query('select * from grants where awardid = $1', [vecgrantkey[i]]);
					if(arrline[10] == 0) console.log(arrline);
					//console.log(res.rows[0].gid + "|" + res.rows[0].funderid + "|" + res.rows[0].fundername + "|" +res.rows[0].awardid + "|" + res.rows[0].value + "|");
					//vecgrantkey.splice(i,1);
				}
			}
}

async function retgrant()
{
		const res = await pool.query('select awardid from grants where awardid is not null order by value');
		var vecgrantkey = [];
 		for(let i =0; i<res.rows.length; i++)
		{	
				if(res.rows[i] != undefined)
				{
					vecgrantkey.push(res.rows[i].awardid);
				}
		}
		console.log("vecgrantkey");
		console.log(vecgrantkey);
		//await processLineByLine(vecgrantkey);
		return vecgrantkey;
		//console.log("and so we are at this point");		
	//}//*/
}

const processFile = async () => {
	const records = [];
	const files = fs.readdirSync(directoryPath);
	var vecgrantkey = await retgrant();
	for ( let filenum =0; filenum < files.length; filenum++)
	{
		console.log("hellow there");
		console.log(files[filenum]);
		const parser = fs.createReadStream(directoryPath + '\\' + files[filenum]).pipe(
		parse({
      // CSV options if any
			}),
		);
		//console.log(vecgrantkey);
		var j=1;
	  for await (const record of parser) {
		// Work with each record
		//console.log(record);
		//console.log(j);
		await sqlgrantship(vecgrantkey,j,record,files[filenum]);
		j++;
		//records.push(record);
	  }
	}
  return records;
};

(async () => {
  const records = await processFile();
  console.info(records);
})();

//"C:\Users\jwc602\Documents\FY2023_097_Contracts_Full_20260106\FY2012_All_Contracts_Full_20260206_1.csv"