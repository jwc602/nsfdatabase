const pg = require('pg');
const { readFileSync } = require('fs');
const { Pool, Client } = pg
const sqlInsert = readFileSync('H:\\openalextesting\\obligationimportv2.sql', 'utf8');

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
async function importoblig()
{
	console.log("meep");
	const res = await pool.query('select * from addieobligg($1,$2,$3,$4)',[process.argv[2],process.argv[3],process.argv[4],process.argv[5]], (err, res)  => {
	if (err) throw err;
	//console.log(res);
	}); 
	return 0;
}

importoblig();