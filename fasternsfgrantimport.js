const pg = require('pg');
const { readFileSync } = require('fs');
const { Pool, Client } = pg
const sqlInsert = readFileSync('nodesqltest.sql', 'utf8');
const sqlSelect = readFileSync('paranodesqltest.sql', 'utf8');
const sqladdieauthors = readFileSync('addifexistsauthors.sql', 'utf8');
const sqladdiepublications = readFileSync('addifexistspublications.sql', 'utf8');
const sqladdieentities = readFileSync('addifexistsentities.sql', 'utf8');
const sqladdietopics = readFileSync('addifexiststopics.sql', 'utf8');
const sqladdiegrants = readFileSync('addifexistsgrants.sql', 'utf8');
const sqladdierawafill = readFileSync('addifexistsrawafill.sql', 'utf8');
const sqlupdatearraypubauth = readFileSync('updatearraypubauthors.sql', 'utf8');
const sqlupdatearraypubauthafill = readFileSync('updatearraypubauthafill.sql', 'utf8');
const sqlupdatearraypubent = readFileSync('updatearraypubent.sql', 'utf8');
const sqlupdatearraypub = readFileSync('updatearraypub.sql', 'utf8');
const sqlupdatearrayent = readFileSync('updatearrayent.sql', 'utf8');
const sqlupdatearrayauth = readFileSync('updatearrayauth.sql', 'utf8');
const sqlupdatecell = readFileSync('newupdatecellpub.sql', 'utf8');
const fs = require("fs"); 
const path  = require ("path");
const readline = require('readline');
const directoryPath = 'C:\\Users\\jwc602\\Documents\\FY2023_097_Contracts_Full_20260106';
var users;
const pool = new Pool({
  user: 'postgres',
  password: 'Th3Gr4ndL1br4ry!',
  host: 'localhost',
  port: 5432,
  database: 'nsfsecure',
})
 
var retarrline;
async function processLineByLine(grantkey) {
	const files = fs.readdirSync(directoryPath);
	for ( let filenum =0; filenum < files.length; filenum++)
	{
		//console.log("hellow there");
		console.log(grantkey + '_' + files[filenum]);
		//const data = fs.readFileSync(directoryPath + '\\' + files[filenum], function(err, data) {if (err) throw err;  return JSON.parse(data);}); 
		const fileStream = fs.createReadStream(directoryPath + '\\' + files[filenum]);
		var arrline;
		const rl = readline.createInterface({
			input: fileStream,
			crlfDelay: Infinity
		});
		// Note: we use the crlfDelay option to recognize all instances of CR LF
		// ('\r\n') in input.txt as a single line break.
		var i=1;
		for await (const line of rl) 
		{
			// Each line in input.txt will be successively available here as `line`.
			arrline = line.split(",");
			//console.log(`Line from file: ${line}`);
			//process.stdout.write(i + "|" + files[filenum] + "|");
			i++;
			if (arrline[2] == grantkey)
			{
				//break;
				//console.log(arrline);
				rl.close();
				return arrline;
			}
		}
		if (arrline[2] == grantkey)
		{
			break;
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
	const ress = await pool.query('select openalexid from publications');
	//console.log(ress);
	//for(let j =0; j<ress.rows.length; j++)
	//{
		//console.log(ress.rows[j].openalexid);
		const res = await pool.query('select * from grants');
		//const res = await pool.query('select pid,gid,funderid,awardid from grants,publications where grants.gid = any(publications._gid) and publications.openalexid = $1 order by awardid desc',[ress.rows[j].openalexid]);
		//const res = await pool.query('select * from grants where awardid ilike $1',["W9%"]);
 		for(let i =0; i<res.rows.length; i++)
		{	
			var vecgrantkey = [];
			var k = i+5;
			for(i =i; i<k; i++)
			{
				//console.log(res.rows);
				if(res.rows[i] != undefined)
				{
					vecgrantkey.push(res.rows[i].awardid);
				}
			}
			console.log("vecgrantkey");
			console.log(vecgrantkey);
			await importgrantbatch(vecgrantkey);
			console.log("and so we are at this point");
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
	//}//*/
}

async function importgrantpacket(grantkey)
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
}