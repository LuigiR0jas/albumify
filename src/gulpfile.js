"use require";
var gulp = require("gulp");
var jeditor = require("gulp-json-editor");

// fetch command line arguments
const arg = ((argList) => {
	let arg = {},
		a,
		opt,
		thisOpt,
		curOpt;
	for (a = 0; a < argList.length; a++) {
		thisOpt = argList[a].trim();
		opt = thisOpt.replace(/^\-+/, "");

		if (opt === thisOpt) {
			// argument value
			if (curOpt) arg[curOpt] = opt;
			curOpt = null;
		} else {
			// argument name
			curOpt = opt;
			arg[curOpt] = true;
		}
	}

	return arg;
})(process.argv);

gulp.task("set-version", async function () {
	if (arg.h) {
		console.log(
			"Easily set version number for project files.\nUsage: sudo gulp set-version --ver [arg]"
		);
	} else {
		let version = arg.ver;
		console.log("> Setting version " + version + " in package.json...");

		gulp.src("../package.json")
			.pipe(
				jeditor(function (json) {
					json.version = version;
					return json;
				})
			)
			.pipe(gulp.dest("../"));
		console.log("> Done");
	}
});
