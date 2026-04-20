const pg = require('pg');
const { readFileSync } = require('fs');
const { Pool, Client } = pg
const sqlInsert = readFileSync('H:\\openalextesting\\nodesqltest.sql', 'utf8');
const sqlSelect = readFileSync('H:\\openalextesting\\paranodesqltest.sql', 'utf8');
const sqladdieauthors = readFileSync('H:\\openalextesting\\addifexistsauthors.sql', 'utf8');
const sqladdiepublications = readFileSync('H:\\openalextesting\\addifexistspublications.sql', 'utf8');
const sqladdieentities = readFileSync('H:\\openalextesting\\addifexistsentities.sql', 'utf8');
const sqladdietopics = readFileSync('H:\\openalextesting\\addifexiststopics.sql', 'utf8');
const sqladdiegrants = readFileSync('H:\\openalextesting\\addifexistsgrants.sql', 'utf8');
const sqladdierawafill = readFileSync('H:\\openalextesting\\addifexistsrawafill.sql', 'utf8');
const sqlupdatearraypubauth = readFileSync('H:\\openalextesting\\updatearraypubauthors.sql', 'utf8');
const sqlupdatearraypubauthafill = readFileSync('H:\\openalextesting\\updatearraypubauthafill.sql', 'utf8');
const sqlupdatearrayentparent = readFileSync('H:\\openalextesting\\updatearrayentparent.sql', 'utf8');
const sqlupdatearrayentchild = readFileSync('H:\\openalextesting\\updatearrayentchild.sql', 'utf8');
const sqlupdatearrayentrelated = readFileSync('H:\\openalextesting\\updatearrayentrelated.sql', 'utf8');
const sqlupdatearrayenttypes = readFileSync('H:\\openalextesting\\updatearrayenttypes.sql', 'utf8');
const sqlupdatearraypub = readFileSync('H:\\openalextesting\\updatearraypub.sql', 'utf8');
const sqlupdatearrayent = readFileSync('H:\\openalextesting\\updatearrayent.sql', 'utf8');
const sqlupdatearrayauth = readFileSync('H:\\openalextesting\\updatearrayauth.sql', 'utf8');
const sqlupdatecell = readFileSync('H:\\openalextesting\\newupdatecellpub.sql', 'utf8');
const fs = require("fs"); 
const path  = require ("path");
const {PythonShell} = require('python-shell');
const execSync = require('child_process').execSync;
const { exec } = require('node:child_process');
// import { execSync } from 'child_process';  // replace ^ if using ES modules
const directoryPath = process.argv[2];
var users;
const pool = new Pool({
  user: 'postgres',
  password: 'Th3Gr4ndL1br4ry!',
  host: 'localhost',
  port: 5432,
  database: 'nsfsecure',
})


try 
{
	const files = fs.readdirSync(directoryPath);
	console.log(files);
	console.log(files.length);
	pool.connect();
	pool.on('connect', client => {
		for ( let filenum =0; filenum < files.length; filenum++)
		{
			//console.log(filenum);
			users = fs.readFile(directoryPath + '\\' + files[filenum], function(err, data) { 
				
				// Check for errors 
				if (err) throw err; 

				// Converting to JSON 
				const preusers = JSON.parse(data); 
				const users = preusers.openalex;
				//console.log(users); // Print users 
				console.log(users.id); // Print users 
			
			  //client.query(sqlInsert);
			 /* client.query(sqlSelect,["T10112"], (err, res) => {
				if (err) throw err;
				//console.log(res);
			  });//*/
			  console.log(users.id);
			  //let tempname = Object.keys(users.results[0].abstract_inverted_index)
			  //console.log(tempname[0]);
				client.query(sqlupdatearrayentchild, (err, res)  => {
				if (err) throw err;
				//console.log(res);
				});
				client.query(sqlupdatearrayentrelated, (err, res)  => {
				if (err) throw err;
				//console.log(res);
				});
				client.query(sqlupdatearrayentparent, (err, res)  => {
				if (err) throw err;
				//console.log(res);
				});
				client.query(sqladdieentities, (err, res)  => {
				if (err) throw err;
				//console.log(res);
				});
				client.query(sqlupdatearrayenttypes, (err, res)  => {
				if (err) throw err;
				//console.log(res);
				});
				client.query('select * from uparrenttypes($1,$2,$3)',["_types",process.argv[3] , users.ror ], (err, res)  => {
				if (err) throw err;
				//console.log(res);
				}); 
				client.query('select * from addieent($1,$2,$3)',[users.id, users.display_name, users.ror ], (err, res)  => {
				if (err) throw err;
				//console.log(res);
				}); 
				for(let i = 0; i < users.roles.length; i++) 
				{
					if (users.roles[i].role == "institution")
					{
						client.query('update entities set openalexid = $1 where rorid = $2',[users.roles[i].id,users.ror], (err, res) => {
						if (err) throw err;
							//console.log(res);
						});//*/
					}
					if (users.roles[i].role == "funder")
					{
						console.log("funder id: " + users.roles[i].id);
						client.query('update entities set openalexfid = $1 where rorid = $2',[users.roles[i].id,users.ror], (err, res) => {
						if (err) throw err;
							//console.log(res);
						});//*/
					}
				}
				for(let i = 0; i < users.associated_institutions.length; i++) 
				{
					console.log("check" + users.associated_institutions[i].id);
					console.log("name" + users.associated_institutions[i].display_name);
					if(users.associated_institutions[i].relationship == "child")
					{
						client.query('select * from uparrentchild($1,$2,$3)',[users.id, users.associated_institutions[i].id, users.associated_institutions[i].ror ], (err, res)  => {
						if (err) throw err;
						console.log(i + "_" + users.associated_institutions[i].display_name);
						console.log(res.rows);
						}); 
						
						
					}
					if(users.associated_institutions[i].relationship == "parent")
					{
						client.query('select * from uparrentparent($1,$2,$3)',[users.id, users.associated_institutions[i].id, users.associated_institutions[i].ror ], (err, res)  => {
						if (err) throw err;
						//console.log(res);
						}); 				
					}
					if(users.associated_institutions[i].relationship == "related")
					{
						client.query('select * from uparrentrelated($1,$2,$3)',[users.id, users.associated_institutions[i].id, users.associated_institutions[i].ror ], (err, res)  => {
						if (err) throw err;
						//console.log(res);
						}); 				
					}

					//Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
				//client.end();
				}
				console.log("hello there" + filenum + " of " + files.length);
				//client.end();
			});
			
			//pool.end();
			//console.log(users.meta.count);
			
			//return users;
		}

	});
	console.log("Im done");
} catch (error) {
  console.error('Error reading directory:', error);
}
console.log("now its finished");