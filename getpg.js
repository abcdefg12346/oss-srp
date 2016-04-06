var pgp = require('pg-promise')(/*options*/);

var cn = {
    host: 'localhost', 
    port: 5432,
    database: 'oss-srp',
    user: 'eve',
    password: 'oss'
};

var db = pgp(cn); // database instance;
// select and return ship name from id:
var sql = "SELECT * FROM skinLicense"
db.one(sql)
    .then(function (user) {
        console.log("ficken: " + user.name); // print user name;
    })
    .catch(function (error) {
        console.log(error); // print why failed;
    });
