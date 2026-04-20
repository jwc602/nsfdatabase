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
			//console.log("hellow there");
			console.log(files[filenum]);
			const data = fs.readFileSync(directoryPath + '\\' + files[filenum], function(err, data) {if (err) throw err;  return JSON.parse(data);}); 
				
				// Check for errors 
				

				// Converting to JSON 
				const preusers = JSON.parse(data); 

				//console.log(users); // Print users 
				console.log("meta" + preusers.openalex.results[0].doi);
				//console.log(users.meta.db_response_time_ms);			// Print users 
			
				console.log("meep");
				for( let resultnum =0; resultnum< preusers.openalex.results.length; resultnum++)
				{
					users = preusers.openalex.results[resultnum];
				  //client.query(sqlInsert);
				 /* client.query(sqlSelect,["T10112"], (err, res) => {
					if (err) throw err;
					//console.log(res);
				  });//*/
					console.log("plswork");
					console.log(users.doi);
					if(users.abstract_inverted_index != null)
					{
						let tempname = Object.keys(users.abstract_inverted_index)
						//console.log(tempname[0]);
					}
					//for(let i = 0; i < users.results.length; i++) {
						let obj = users;
						console.log("bloody hell" + obj);
						if(!(Object.keys(obj).length === 0))
						{
							let objres =0;	
							
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
							
							if(obj.citation_normalized_percentile != undefined)
							{
								objres = obj.citation_normalized_percentile.value;
							}
							else
							{
								objres = -1;
							}
							client.query('update public.publications set citationnormpercent = $1 where openalexid = $2',[objres || "NULL" ,obj.id], (err, res) => {
							if (err) throw err;
								//console.log(res);
							});//*/
							client.query('update public.publications set tracker = $1 where openalexid = $2',[6 ,obj.id], (err, res) => {
							if (err) throw err;
								//console.log(res);
							});//*/
							client.query('update public.publications set pdf_url = $1 where openalexid = $2',[obj.primary_location.pdf_url,obj.id], (err, res) => {
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
							client.query('update public.publications set biblioextract = $1 where openalexid = $2',[obj.is_xpac,obj.id], (err, res) => {
							if (err) throw err;
								//console.log(res);
							});//*/
							//console.log("extract " + obj.biblio.is_xpac);
							//console.log("extractid " + obj.id);
							client.query('update public.publications set biblioretract = $1 where openalexid = $2',[obj.is_retracted,obj.id], (err, res) => {
							if (err) throw err;
								//console.log(res);
							});//*/
							//put addtop code here we have foull details for it in jsomn
							
							for(let j = 0; j < obj.topics.length; j++)
							{
								let arrtop = obj.topics[j];
								client.query('select * from addietop($1, $2, $3, $4, $5, $6, $7, $8)',[arrtop.id, arrtop.subfield.id, arrtop.field.id, arrtop.domain.id, arrtop.display_name, arrtop.subfield.display_name, arrtop.field.display_name, arrtop.domain.display_name], (err, res)  => {
								if (err) throw err;
								//console.log(res);
								}); 
							}
							if(obj.topics[0] == undefined)
							{
								objtop0 = "NULL";
							}
							else
							{
								objtop0 = obj.topics[0].id;	
							}
							if(obj.topics[1] == undefined)
							{
								objtop1 = "NULL";
							}
							else
							{
								objtop1 = obj.topics[1].id;	
							}
							if(obj.topics[2] == undefined)
							{
								objtop2 = "NULL";
							}
							else
							{
								objtop2 = obj.topics[2].id;	
							}
							client.query('select * from uparrpubtop($1, $2, $3, $4)',[obj.id, objtop0, objtop1, objtop2], (err, res)  => {
								if (err) throw err;
								//console.log(res);
							}); 
							//console.log(reconabstract(obj));
							if(users.abstract_inverted_index != null)
							{
								client.query('update public.publications set abstract = $1 where openalexid = $2',[reconabstract(obj),obj.id], (err, res) => {
								if (err) throw err;
									//console.log(res);
								});//*/
							}
							/*client.query('update public.publications set abstract = $1 where openalexid = $2',[reconabstract(obj),obj.id], (err, res) => {
							if (err) throw err;
								//console.log(res);
							});//*/
							console.log("ping");
							for(let j = 0; j < obj.authorships.length; j++) 
							{
								let authobj = obj.authorships[j];
								let instress =0;
								if(authobj.institutions.length == 0)
								{
										
										console.log("its a null institutions");
										instress = {ror:"NULL", display_name:"NULL", id:"NULL",country_code:"NULL",type:"NULL"};
								}
								else
								{
									instress = authobj.institutions[0];
								}
								client.query('select * from addieauth($1, $2, $3)',[authobj.author.id,authobj.author.display_name,authobj.author.orcid], (err, res)  => {
								if (err) throw err;
								//console.log(res);
								}); 
								console.log(instress.display_name);
								client.query('select * from addieent($1,$2,$3)',[instress.id, instress.display_name, instress.ror], (err, res)  => {
								if (err) throw err;
								//console.log(res);
								});
								client.query('select * from uparrpubauth($1,$2)',[obj.id, authobj.author.id], (err, res)  => {
								if (err) throw err;
								//console.log(res);
								}); 
								console.log("authobj num: " + j);
								console.log("authobj doc doi: " + users.doi);
								client.query('update public.entities set tracker = $1 where openalexid = $2',[6 ,instress.id], (err, res) => {
								if (err) throw err;
									//console.log(res);
								});//*/
								console.log("pong" + instress.ror);
								console.log("pang" + authobj.author.id);
								client.query('select * from uparrpubauthafill($1,$2,$3)',[obj.id, authobj.author.id, instress.ror], (err, res)  => {
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
							for(let j = 0; j < obj.awards.length; j++)
							{

								let grant = obj.awards[j];
								let ress = 1;
								if (grant.funder_award_id == null)
								{
									ress = grant.funder_id;
								}							
								else
								{
									ress = grant.funder_award_id;
								}
								client.query('select * from addiegrant($1,$2,$3)',[grant.funder_id, grant.funder_display_name, ress], (err, res)  => {
								if (err) throw err;
								
								//console.log(res);
								ress = res.rows[0].addiegrant;
								console.log("fileid " + files[filenum] + " resss " + ress + " obj " + obj.id + " resultnum " + resultnum + " of " + preusers.openalex.results.length);
								//console.log("resss " + ress);
								//console.log("obj " + obj.id);
									client.query('select * from uparrpub($1,$2,$3)',[obj.id, ress,'_gid'], (err, res)  => {
									if (err) throw err;
									//console.log(res);
									}); 
								}); 
							}
						}
					//}
					//client.end();
				}
				
				//pool.end();
				//console.log(users.meta.count);
			
			console.log("I got here");
			//return preusers;
		}
		console.log("Im done");
	});//we are going to move this one
	
} catch (error) {
  console.error('Error reading directory:', error);
}
console.log("now its finished");
	



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


