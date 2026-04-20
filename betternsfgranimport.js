const pg = require('pg');
const { readFileSync } = require('fs');
const { Pool, Client } = pg;

const fs = require("fs"); 
const parse = require("csv-parse");
const path  = require ("path");
const readline = require('readline');
const directoryPath = 'C:\\Users\\jwc602\\Documents\\FY2023_097_Contracts_Full_20260106';
//import fs from "node:fs";
//import { parse } from "csv-parse";
var users;
const pool = new Pool({
  user: 'postgres',
  password: 'Th3Gr4ndL1br4ry!',
  host: 'localhost',
  port: 5432,
  database: 'nsfsecure',
})
 
var retarrline;
async function processLineByLine(vecgrantkey) {
	const files = fs.readdirSync(directoryPath);
	for ( let filenum =0; filenum < files.length; filenum++)
	{
		//console.log("hellow there");
		console.log(files[filenum]);
		//const data = fs.readFileSync(directoryPath + '\\' + files[filenum], function(err, data) {if (err) throw err;  return JSON.parse(data);}); 
		const parser = fs.createReadStream(directoryPath + '\\' + files[filenum]).pipe(parse({}),);
		//const fileStream = fs.createReadStream(directoryPath + '\\' + files[filenum]);
		var arrline;
		//const parser = filestream.parse({
		//}); 
		// Note: we use the crlfDelay option to recognize all instances of CR LF
		// ('\r\n') in input.txt as a single line break.
		var j=1;
		for await (const arrline of parser) 
		{
			// Each line in input.txt will be successively available here as `line`.
			//arrline = line.split(",");
			//console.log(`Line from file: ${line}`);
			//process.stdout.write(i + "|" + files[filenum] + "|");
			j++;
			//console.log(j + "|" + files[filenum] + "|");
			console.log(arrline);
			for(let i =0; i<vecgrantkey.length; i++)
			{
				grantkey = vecgrantkey[i].replace("-","");
				if (arrline[2] == grantkey && arrline[10] != 0 && !isNaN(arrline[10]))
				{
					//break;
					console.log(arrline);
					//rl.close();
					//return arrline;
					console.log("HELO THERE| grantkey: " + grantkey + " | docawardid:" + arrline[2] + " | awardid:" + vecgrantkey[i] + " | amount:" + arrline[10] + " | fundagency:" + arrline[34] + " | fundsubagency:" + arrline[36] + " | fundoffice:" + arrline[38] + " | ruei:" + arrline[48] + " | rcage:" + arrline[53] + " | rparuei:" + arrline[54] + " | psc:" + arrline[103] + " | naics:" + arrline[109] + " | popdate1:" + arrline[23] + " | popdate2:" + arrline[24] + " | i:" + i + " | j:" + j + " | file:" + files[filenum] + " | ");
					//console.log(arrline);
					await pool.query('update grants set value =cast( $1 as money), fundagency = $2, fundsubagency = $3, fundoffice = $4, psc = $5, naics = $6, ruei = $7, rcage = $8, rparuei = $9, popdate = daterange(cast($10 as date),cast($11 as date)) where awardid = $12', [arrline[10], arrline[34], arrline[36], arrline[38],arrline[103], arrline[109], arrline[48], arrline[53],arrline[54], arrline[23], arrline[24], vecgrantkey[i]]);
					const res = await pool.query('select * from grants where awardid = $1', [vecgrantkey[i]]);
					if(arrline[10] == 0) console.log(arrline);
					//console.log(res.rows[0].gid + "|" + res.rows[0].funderid + "|" + res.rows[0].fundername + "|" +res.rows[0].awardid + "|" + res.rows[0].value + "|");
					//vecgrantkey.splice(i,1);
				}
			}
		}
		rl.close();
	}
	//rl.close();
	console.log("okay we got here");
  //console.log(arrline);
}

//processLineByLine("SPE2DM23FZ6MH");
importgrant();
async function importgrant()
{
	//pool.connect();
	//console.log(await processLineByLine("W912GB23F0415"))
	//retarrline = await processLineByLine("W912GB23F0415");
	//const splitarrline = retarrline.split(",");
	//console.log(retarrline[2]);
	//console.log(retarrline[10]);
	//pool.query('update grants set value = $1 where awardid = $2', [retarrline[10], retarrline[2]]);
	//console.log(await processLineByLine("W911NF2220205"))
	//const ress = await pool.query('select openalexid from publications');
	//console.log(ress);
	//for(let j =0; j<ress.rows.length; j++)
	//{
		//console.log(ress.rows[j].openalexid);
		const res = await pool.query('select awardid from grants where awardid is not null order by value');
		//const res = await pool.query('select pid,gid,funderid,awardid from grants,publications where grants.gid = any(publications._gid) and publications.openalexid = $1 order by awardid desc',[ress.rows[j].openalexid]);
		//const res = await pool.query('select * from grants where awardid ilike $1',["W9%"]);
		var vecgrantkey = [];
 		for(let i =0; i<res.rows.length; i++)
		{	
			
			//var k = i+5;
			//for(i =i; i<k; i++)
			//{
				//console.log(res.rows);
				if(res.rows[i] != undefined)
				{
					vecgrantkey.push(res.rows[i].awardid);
				}
			//}

/* 			//console.log("hello there" + res.rows[0]);
			console.log(res.rows[i].awardid.replace("-",""));
			retarrline = await processLineByLine(res.rows[i].awardid.replace("-",""));
			console.log(retarrline);
			if(retarrline != undefined)
			{
				pool.query('update grants set value = $1 where awardid = $2', [retarrline[10], res.rows[i].awardid]);
			}
			//const splitarrline = retarrline.split(",");
			//console.log(retarrline); */
		}
		console.log("vecgrantkey");
		console.log(vecgrantkey);
		await processLineByLine(vecgrantkey);
		console.log("and so we are at this point");		
	//}//*/
}

/* async function importgrantpacket(grantkey)
{
	//console.log("hello there" + res.rows[0]);
	console.log("grantkey");
	console.log(grantkey);
	if(grantkey != undefined || grantkey != null)
	{
		retarrline = await processLineByLine(grantkey.replace("-",""));
	}
	else return;
	console.log("retarrline");
	console.log(retarrline);
	if(retarrline != undefined)
	{
		console.log("HELO THERE");
		const res = await pool.query('update grants set value = $1 where awardid = $2', [retarrline[10], grantkey]);
		console.log(res);
		
	}
	return 0;
}

async function importgrantbatch(vecgrantkey)
{
	for(let i =0; i<vecgrantkey.length; i++)
	{
		importgrantpacket(vecgrantkey[i]);
	}
	await console.log("and now we are here.");
	return 0;
} */