const pg = require('pg');
const { readFileSync } = require('fs');
const { Pool, Client } = pg
const sqlInsert = readFileSync('nodesqltest.sql', 'utf8');
const sqlSelect = readFileSync('paranodesqltest.sql', 'utf8');
const sqladdieauthors = readFileSync('addifexistsauthors.sql', 'utf8');
const sqladdiepublications = readFileSync('addifexistspublications.sql', 'utf8');
const sqladdieentities = readFileSync('addifexistsentities.sql', 'utf8');
const sqlupdatearraypubauth = readFileSync('updatearraypubauthors.sql', 'utf8');
const sqlupdatearraypubent = readFileSync('updatearraypubent.sql', 'utf8');
const sqlupdatearraypub = readFileSync('updatearraypub.sql', 'utf8');
const sqlupdatearrayent = readFileSync('updatearrayent.sql', 'utf8');
const sqlupdatearrayauth = readFileSync('updatearrayauth.sql', 'utf8');
const sqlupdatecell = readFileSync('newupdatecellpub.sql', 'utf8');
const fs = require("fs"); 
var users;
const pool = new Pool({
  user: 'postgres',
  password: 'Th3Gr4ndL1br4ry!',
  host: 'localhost',
  port: 5432,
  database: 'nsfsecure',
})
 

pool.connect();

users = fs.readFile("henhousetestpub.json", function(err, data) { 
    
    // Check for errors 
    if (err) throw err; 

    // Converting to JSON 
    const users = JSON.parse(data); 
    //console.log(users); // Print users 
	//console.log(users.meta.count); // Print users 
	pool.on('connect', client => {
	  //client.query(sqlInsert);
	 /* client.query(sqlSelect,["T10112"], (err, res) => {
		if (err) throw err;
		console.log(res);
	  });//*/
	  //console.log(users.meta.count);
	  let tempname = Object.keys(users.results[0].abstract_inverted_index)
	  console.log(tempname[0]);
		for(let i = 0; i < users.results.length; i++) {
			let obj = users.results[i];
			console.log(obj.id);
			console.log(reconabstract(obj));
			console.log("foo");
		}
		//client.end();
	});
	//pool.end();
	//console.log(users.meta.count);
	
	return users;
});


function reconabstract (argobj)
{
	var abstr ="";
	var i=0;
	var j =0;
	var pos =0;
	var chk =1;
	let arrabstrindex = argobj.abstract_inverted_index;
	let arrabstrkey = Object.keys(argobj.abstract_inverted_index);
	while (chk ==1)
	{
		chk =0;
		console.log(chk);
		//console.log(arrabstrindex.length);
		//console.log(arrabstrkey.length);
		//console.log(arrabstrkey[0]);
		let tempword = arrabstrkey[0];
		let tempval = arrabstrindex[tempword];
		//console.log(tempval.length);
		//console.log(arrabstrindex[arrabstrkey[0]].length);
		//arrabstrindex.forEach(console.log(item));
		for (let i=0; i<arrabstrkey.length; i++)
		{
			let arrkey = arrabstrkey[i];
			//console.log(arrkey);
			let arrword = arrabstrindex[arrkey];
			//console.log(arrword.length);
			//console.log(pos + "_pass_" + arrword[j]);
			for (let j=0; j<arrword.length; j++)
			{	
				//console.log(pos + "_CHK_" + arrword[j]);
				//console.log(arrword[j] + "_" + arrabstrkey[i]);
				if(arrword[j] == pos)
				{
					abstr = abstr + arrabstrkey[i] + " " ;
					pos = pos +1;
					chk = 1;
					console.log(pos + "_ABSTR_" + abstr);
					//i=i-1;
				}
			}
			
		}
	}
	

	return abstr;
	
}


