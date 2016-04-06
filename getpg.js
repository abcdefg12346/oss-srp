
  var pgp = require('pg-promise')(/*options*/);

  var cn = {
    host: 'localhost',
    port: 5432,
    database: 'oss-srp',
    user: 'eve',
    password: 'oss'
  };

  var db = pgp(cn); // database instance;


function query(sql){
  db.query(sql)
    .then(function (user) {
        console.log('found data');
    })
    .catch(function (error) {
        console.log(error);
    });
}


