import pg from 'pg'
import fs from 'fs'
const { Pool, Client } = pg
 

function processSQLFile(fileName) {

  // Extract SQL queries from files. Assumes no ';' in the fileNames
  var queries = fs.readFileSync(fileName).toString()
    .replace(/(\r\n|\n|\r)/gm," ") // remove newlines
    .replace(/\s+/g, ' ') // excess white space
    .split(";") // split into all statements
    .map(Function.prototype.call, String.prototype.trim)
    .filter(function(el) {return el.length != 0}); // remove any empty ones

  // Execute each SQL query sequentially
  queries.forEach(function(query) {
    batch.push(function(done) {
      if (query.indexOf("COPY") === 0) { // COPY - needs special treatment
        var regexp = /COPY\ (.*)\ FROM\ (.*)\ DELIMITERS/gmi;
        var matches = regexp.exec(query);
        var table = matches[1];
        var fileName = matches[2];
        var copyString = "COPY " + table + " FROM STDIN DELIMITERS ',' CSV HEADER";
        var stream = client.copyFrom(copyString);
        stream.on('close', function () {
          done();
        });
        var csvFile = __dirname + '/' + fileName;
        var str = fs.readFileSync(csvFile);
        stream.write(str);
        stream.end();
      } else { // Other queries don't need special treatment
        client.query(query, function(result) {
          done();
        });
      }
    });
  });
}
 
const pool = new Pool({
  user: 'postgres',
  password: 'Th3Gr4ndL1br4ry!',
  host: 'localhost',
  port: 5432,
  database: 'nsfsecure',
})
 
console.log(await pool.query('SELECT NOW()'))
 
const client = new Client({
  user: 'postgres',
  password: 'Th3Gr4ndL1br4ry!',
  host: 'localhost',
  port: 5432,
  database: 'nsfsecure',
})
 
await client.connect()
 
console.log(await client.query('SELECT NOW()'))
console.log(await client.query('SELECT * FROM public.publications ORDER BY pid ASC LIMIT 5'))

console.log(processSQLFile("nodesqltest.sql"))
 
await client.end()