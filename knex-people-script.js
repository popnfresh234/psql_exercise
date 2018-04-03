
const settings = require('./settings');

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});


let input = process.argv.slice(2)[0];

function logResults(rows){
  rows.forEach((record, index) => {
    let indexOffset = index + 1;
    let formattedDate = record.birthdate.toISOString().slice(0,10);
    let humanString = indexOffset + ": " + record.first_name + " " + record.last_name + ", born " + "'" + formattedDate + "'";
    console.log(humanString);
  });
}

function queryAllByName(input){
  knex.select().from('famous_people')
    .asCallback((err, rows)=> {
      if ( err ){
        console.log("Query error", err);
      } else {
        logResults(rows);
        knex.destroy();
      }
    });
}

queryAllByName(input);
