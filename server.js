/**
 * This is a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 */

var express = require("express");
var request = require("request");
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");
var config = require("./src/config.json");
var os = require("os");
var port = process.env.PORT || 8888;

var client_id = config.client_id;
var client_secret = config.client_secret;
var redirect_uri = process.env.NODE_ENV
	? config.prod_redirect_uri
	: config.dev_redirect_uri;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
	var text = "";
	var possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

var stateKey = "spotify_auth_state";

var app = express();

app.use(express.static(__dirname + "/build"))
	.use(cors())
	.use(cookieParser());

app.get("/login", function (req, res) {
	var state = generateRandomString(16);
	res.cookie(stateKey, state);

	// application requests authorization
	var scope =
		"user-read-private user-read-email user-read-recently-played user-top-read user-library-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private";
	res.redirect(
		"https://accounts.spotify.com/authorize?" +
			querystring.stringify({
				response_type: "code",
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state,
				show_dialog: true,
			})
	);
});

app.get("/callback", function (req, res) {
	// application requests refresh and access tokens
	// after checking the state parameter

	var code = req.query.code || null;
	var state = req.query.state || null;
	var storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect(
			"/404" +
				querystring.stringify({
					error: "state_mismatch",
				})
		);
	} else {
		res.clearCookie(stateKey);
		var authOptions = {
			url: "https://accounts.spotify.com/api/token",
			form: {
				code: code,
				redirect_uri: redirect_uri,
				grant_type: "authorization_code",
			},
			headers: {
				Authorization:
					"Basic " +
					new Buffer(client_id + ":" + client_secret).toString(
						"base64"
					),
			},
			json: true,
		};

		request.post(authOptions, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token,
					refresh_token = body.refresh_token;

				var options = {
					url: "https://api.spotify.com/v1/me",
					headers: { Authorization: "Bearer " + access_token },
					json: true,
				};

				// use the access token to access the Spotify Web API
				request.get(options, function (error, response, body) {
					console.log(body);
				});

				// we can also pass the token to the browser to make requests from there
				res.redirect(
					"/albums?" +
						querystring.stringify({
							access_token: access_token,
							refresh_token: refresh_token,
						})
				);
			} else {
				res.redirect(
					"/404" +
						querystring.stringify({
							error: "invalid_token",
						})
				);
			}
		});
	}
});

app.get("/refresh_token", function (req, res) {
	// requesting access token from refresh token
	var refresh_token = req.query.refresh_token;
	var authOptions = {
		url: "https://accounts.spotify.com/api/token",
		headers: {
			Authorization:
				"Basic " +
				new Buffer(client_id + ":" + client_secret).toString("base64"),
		},
		form: {
			grant_type: "refresh_token",
			refresh_token: refresh_token,
		},
		json: true,
	};

	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var access_token = body.access_token;
			res.send({
				access_token: access_token,
			});
		}
	});
});

// Let react-router manage the routes
app.get("*", (req, res) => {
	res.sendFile(__dirname + "/build/index.html");
});

app.listen(port);
console.log("Listening on ", port);