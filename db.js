# Database Connection to postgresql-database
# TODO: databse is still a shit

var pg = require('pg')
var auth = "postgres://YourUserName:YourPassword@localhost:5432/YourDatabase"

var client = new pg.Client(auth)


