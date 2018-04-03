
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


let firstName = process.argv.slice(2)[0];
let lastName = process.argv.slice(2)[1];
let dob = process.argv.slice(2)[2];

function insertOne(first_name, last_name, dob){
  knex('famous_people')
  .insert({
    first_name: first_name,
    last_name: last_name,
    birthdate: dob
  }).asCallback((err)=>{
    if ( err ) {
      console.log("Insert error", error);
    } else {
      console.log("Success");
      knex.destroy();
    }
  });
}

insertOne(firstName, lastName, dob);