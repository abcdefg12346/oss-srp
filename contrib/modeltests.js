var app = require("../server/app");

cm = app.get("characterModel");

cm.down().then(function() {
	return cm.up();
}).then(function() {
	return cm.upsert({
		"CharacterID":92911416,
		"CharacterName":"Enta Ozuwara",
		"ExpiresOn":"2016-04-20T06:48:31",
		"Scopes":"",
		"TokenType":"Character",
		"CharacterOwnerHash":"2tshRX0NZ/bri51x2ucFRl0mkd8=",
		"IntellectualProperty":"EVE"
	})
}).then(function(arg) {
	console.dir(arg);
}).catch(function(e) {
	console.dir(e);
})
