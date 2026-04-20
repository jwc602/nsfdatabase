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
	console.log(users.meta.count); // Print users 
	pool.on('connect', client => {
	  //client.query(sqlInsert);
	 /* client.query(sqlSelect,["T10112"], (err, res) => {
		if (err) throw err;
		//console.log(res);
	  });//*/
	  console.log(users.meta.count);
	  let tempname = Object.keys(users.results[0].abstract_inverted_index)
	  console.log(tempname[0]);
		for(let i = 0; i < users.results.length; i++) {
			let obj = users.results[i];
			console.log(obj.id);
			client.query(sqladdiepublications, (err, res)  => {
				if (err) throw err;
				//console.log(res);
			}); 
			client.query(sqladdieauthors, (err, res)  => {
				if (err) throw err;
				//console.log(res);
			});
			client.query(sqladdieentities, (err, res)  => {
				if (err) throw err;
				//console.log(res);
			});
			client.query(sqlupdatearraypubent, (err, res)  => {
				if (err) throw err;
				//console.log(res);
			});
			client.query(sqlupdatearraypub, (err, res)  => {
				if (err) throw err;
				//console.log(res);
			});
			client.query(sqlupdatearraypubauthafill, (err, res)  => {
				if (err) throw err;
				//console.log(res);
			});
			client.query('select * from addiepub($1, $2, $3)',[obj.id,obj.title,obj.doi], (err, res)  => {
				if (err) throw err;
				//console.log(res);
			}); 
			let tempstr = 'update public.publications set publicationdate = '+ obj.publication_date +' where openalexid = '+ obj.id;
			console.log(tempstr);
			client.query('update public.publications set publicationdate = $1 where openalexid = $2',[obj.publication_date,obj.id], (err, res) => {
			if (err) throw err;
				//console.log(res);
			});//*/
			
			client.query('update public.publications set citedbycount = $1 where openalexid = $2',[obj.cited_by_count,obj.id], (err, res) => {
			if (err) throw err;
				//console.log(res);
			});//*/
			client.query('update public.publications set fwci = $1 where openalexid = $2',[obj.fwci,obj.id], (err, res) => {
			if (err) throw err;
				//console.log(res);
			});//*/
			client.query('update public.publications set citationnormpercent = $1 where openalexid = $2',[obj.citation_normalized_percentile.value,obj.id], (err, res) => {
			if (err) throw err;
				//console.log(res);
			});//*/
			client.query('update public.publications set pdf_url = $1 where openalexid = $2',[obj.best_oa_location.pdf_url,obj.id], (err, res) => {
			if (err) throw err;
				//console.log(res);
			});//*/
			client.query('update public.publications set journalid = $1 where openalexid = $2',[obj.primary_location.landing_page_url,obj.id], (err, res) => {
			if (err) throw err;
				//console.log(res);
			});//*/
			client.query('update public.publications set language = $1 where openalexid = $2',[obj.ids.language,obj.id], (err, res) => {
			if (err) throw err;
				//console.log(res);
			});//*/
			client.query('update public.publications set biblioextract = $1 where openalexid = $2',[obj.biblio.is_xpac,obj.id], (err, res) => {
			if (err) throw err;
				//console.log(res);
			});//*/
			client.query('update public.publications set biblioretract = $1 where openalexid = $2',[obj.biblio.is_retracted,obj.id], (err, res) => {
			if (err) throw err;
				//console.log(res);
			});//*/
			//put addtop code here we have foull details for it in jsomn
			
			for(let j = 0; j < obj.topics.length; j++)
			{
				let arrtop = obj.topics[j];
				client.query('select * from addietop($1, $2, $3, $4, $5, $6, $7, $8)',[arrtop.id, arrtop.name, arrtop.subfield.id, arrtop.subfield.name, arrtop.field.id, arrtop.field.name, arrtop.domain.id, arrtop.domain.name], (err, res)  => {
				if (err) throw err;
				//console.log(res);
				}); 
			}
			
			client.query('select * from uparrpubtop($1, $2, $3, $4)',[obj.id, obj.topics[0].id, obj.topics[1].id, obj.topics[2].id], (err, res)  => {
				if (err) throw err;
				//console.log(res);
			}); 
			//console.log(reconabstract(obj));
			client.query('update public.publications set abstract = $1 where openalexid = $2',[reconabstract(obj),obj.id], (err, res) => {
			if (err) throw err;
				//console.log(res);
			});//*/
			/*client.query('update public.publications set abstract = $1 where openalexid = $2',[reconabstract(obj),obj.id], (err, res) => {
			if (err) throw err;
				//console.log(res);
			});//*/
			console.log("ping");
			for(let j = 0; j < obj.authorships.length; j++) 
			{
				let authobj = obj.authorships[j];
				client.query('select * from addieauth($1, $2, $3)',[authobj.author.id,authobj.author.display_name,authobj.author.orcid], (err, res)  => {
				if (err) throw err;
				//console.log(res);
				}); 
				client.query('select * from addieent($1,$2,$3)',[authobj.institutions.id, authobj.institutions.display_name, authobj.institutions.ror], (err, res)  => {
				if (err) throw err;
				//console.log(res);
				});
				client.query('select * from uparrpubauth($1,$2)',[obj.id, authobj.author.id], (err, res)  => {
				if (err) throw err;
				//console.log(res);
				}); 
				console.log("pong" + authobj.institutions[0].ror);
				console.log("pang" + authobj.author.id);
				client.query('select * from uparrpubauthafill($1,$2,$3)',[obj.id, authobj.author.id, authobj.institutions[0].ror], (err, res)  => {
				if (err) throw err;
				//console.log(res);
				}); //*/
				for(let k = 0; k < authobj.affiliations.length; k++) 
				{
					let afillobj = authobj.affiliations[k];
					client.query('select * from addierawafill($1, $2)',[afillobj.raw_affiliation_string,afillobj.institution_ids], (err, res)  => {
					if (err) throw err;
					//console.log(res);
						let ress = res.rows[0].addierawafill;
						client.query('select * from uparrpub($1,$2,$3)',[obj.id, ress,'_rawafillid'], (err, res)  => {
						if (err) throw err;
						//console.log(res);
						}); 
					}); 
				}
				
				
			}
			for(let j = 0; j < obj.referenced_works.length; j++)
			{
				let refwork = obj.referenced_works[j];
				//console.log("pong" + refwork);
				client.query('select * from uparrpub($1, $2, $3)',[obj.id, refwork,'_refworks'], (err, res)  => {
				if (err) throw err;
				//console.log(res);
				}); 
			}
			for(let j = 0; j < obj.related_works.length; j++)
			{
				let relwork = obj.related_works[j];
				client.query('select * from uparrpub($1,$2,$3)',[obj.id, relwork,'_relworks'], (err, res)  => {
				if (err) throw err;
				//console.log(res);
				}); 
			}
			for(let j = 0; j < obj.grants.length; j++)
			{

				let grant = obj.grants[j];
				let ress = 1;
				client.query('select * from addiegrant($1,$2,$3)',[grant.funder, grant.funder_display_name, grant.award_id], (err, res)  => {
				if (err) throw err;
				
				//console.log(res);
				ress = res.rows[0].addiegrant;
				console.log(ress);
				console.log("ress" + ress);
					client.query('select * from uparrpub($1,$2,$3)',[obj.id, ress,'_gid'], (err, res)  => {
					if (err) throw err;
					//console.log(res);
					}); 
				}); 

			}
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
					//console.log(pos + "_ABSTR_" + abstr);
					//i=i-1;
				}
			}
			
		}
	}
	

	return abstr;
	
}


