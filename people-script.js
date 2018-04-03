const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

let input = process.argv.slice(2)[0];

function logResults(result){
  result.rows.forEach((record, index) => {
    let indexOffset = index + 1;
    let humanString = indexOffset + ": " + record.first_name + " " + record.last_name + ", born " + "'" + record.birthdate + "'";
    console.log(humanString);
  });
}

function queryAllByName(input){
  client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name=$1", [input], (err, result) => {
    if ( err ) {
      console.log("Query error", error);
    } else {
      logResults(result);
      client.end();
      console.log("Done");
    }
  });}

  client.connect((err) => {
    if ( err) {
      console.log("Connection error", err);
    } else {
      console.log("Searching...");
      queryAllByName(input);
    }
  });