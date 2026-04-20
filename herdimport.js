const pg = require('pg');
const { readFileSync } = require('fs');
const { Pool, Client } = pg
const sqlInsert = readFileSync('H:\\openalextesting\\herdimportfed.sql', 'utf8');

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
async function importherd()
{
	console.log("meep");
	const res = await pool.query('select * from addieherdfedd($1,$2,$3,$4,$5,$6,$7,$8,$9)',[process.argv[2],process.argv[3],process.argv[4],process.argv[5],process.argv[6],process.argv[7],process.argv[8],process.argv[9],process.argv[10]], (err, res)  => {
	if (err) throw err;
	//console.log(res);
	}); 
	return 0;
}

importherd();