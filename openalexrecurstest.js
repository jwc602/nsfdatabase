const pg = require('pg');
const { readFileSync } = require('fs');
const { Pool, Client } = pg
const fs = require("fs"); 
const path  = require ("path");
const {PythonShell} = require('python-shell');
const execSync = require('child_process').execSync;
const { exec } = require('node:child_process');
// import { execSync } from 'child_process';  // replace ^ if using ES modules
const directoryPath = 'H:\\openalextesting\\fox_in_the_henhouse\\json_publications';
//var users;
console.log('JS' + process.argv[2]);
const jsusers = fs.readFileSync(process.argv[2], 'utf8', function(err, data) { 
    
    // Check for errors 
    if (err) throw err; 

    // Converting to JSON 
    const preusers = JSON.parse(data); 
	const users = preusers.openalex;
    console.log("inner" + users.id); // Print users 
	//console.log(users.id); // Print users 
	return users;
});
const preusers = JSON.parse(jsusers);
const users = preusers.openalex;
console.log(users.id);

async function recurspy (users)
{
	var argres = process.argv[5] +1;
	for(let i = 0; i < users.associated_institutions.length; i++) 
	{
		console.log(users.associated_institutions[i].id);		
		// || users.associated_institutions[i].relationship == "related") && !arrres.includes(users.associated_institutions[i].id)
		if(users.associated_institutions[i].relationship == "child" || (users.associated_institutions[i].relationship == "related" && argres <2 ))
		{

			let options = {
				mode: 'text',
				pythonOptions: ['-u'],
				args: [users.associated_institutions[i].id, process.argv[3], process.argv[4],argres]
			};
			
			await PythonShell.run('H:\\openalextesting\\json_dumbrecurs.py', options).then(messages=>{
				// results is an array consisting of messages collected during execution
				console.log('results: %j', i, messages);
			});
			let ms = 10 * 1;
			const sleep = ms => new Promise(r => setTimeout(r, ms));
			
			
		}
		if(users.associated_institutions[i].relationship == "parent")
		{	

		}
		if(users.associated_institutions[i].relationship == "related")
		{
			
		}

		//Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
	//client.end();
	}
}

console.log(recurspy(users));
//console.log("and now we are finally done");
return 0;