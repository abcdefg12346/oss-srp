const app = require("../app");
const cm = app.get("characterModel");
const argv = require("yargs").argv;

if (!argv.cid || !argv.flags) {
	console.log("command needs --cid and --flags");
}

cm.setFlags(argv.cid, argv.flags).then(function() {
	console.log("done!");
	process.exit();
})