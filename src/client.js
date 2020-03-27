(function() {
	var query = document.getElementById("query"),
		response_field = document.getElementById("response_field"),
		searchbutton = document.getElementById("search"),
		tracklist = [];

	if (localStorage.getItem("tracklist") !== null) {
		$("#get-tracks").hide();
		populateAlbumList();
	}

	// General utillity function for interacting with the spotify api
	function sendquery() {
		console.log("Sending query...");
		$.ajax({
			url: "https://api.spotify.com/v1/" + query.value,
			headers: {
				Authorization: "Bearer " + access_token
			},
			success: function(response) {
				console.log("Response received");
				console.log(response);
			},
			error: function(response) {
				console.log("Error: " + response.responseText);
			}
		});
	}
	searchbutton.onclick = sendquery;

	// Get all the added tracks from user
	function _initGetTracks() {
		$("#get-tracks").hide();
		getTracks();
	}

	function getTracks(next = undefined) {
		let url;

		// If the function is not called within the context of the recursion, start from the beggining
		next == undefined
			? (url = "https://api.spotify.com/v1/me/tracks?limit=50")
			: (url = next);

		$.ajax({
			url: url,
			headers: {
				Authorization: "Bearer " + access_token
			},
			success: function(response) {
				console.log("Received response from the api, as follows:");
				console.log(response);

				// populate tracklist
				for (let object of response.items) {
					let track = object.track;
					tracklist.push({
						name: track.name,
						album: track.album,
						artists: track.artists,
						uri: track.uri
					});
				}

				// console.log("Current state of the tracklist:")
				// console.log(tracklist)
				// console.log(response.offset)
				if (response.next !== null) {
					console.log(
						"There are songs left to retrieve. Requesting..."
					);
					getTracks(response.next);
				} else {
					console.log("Complete tracklist created");

					// for testing purposes, let's save the tracklist in local storage
					localStorage.setItem(
						"tracklist",
						JSON.stringify(tracklist)
					);
					populateAlbumList(localStorage.getItem("tracklist"));
				}
			},
			error: function(error) {
				console.log(error);
				$("#alert")
					.show()
					.text(error.responseText);
			}
		});
	}
	$("#get-tracks").click(_initGetTracks);

	function populateAlbumList(tracklist) {
		tracklist = JSON.parse(localStorage.getItem("tracklist"));
		let albumList = [];

		console.log(
			"Proceeding to populate albumlist with the following tracklist:"
		);
		console.log(tracklist);
		for (track of tracklist) {
			// console.log("For album " + track.album.name)

			// automatically add the first album
			if (track.album.total_tracks > 6) {
				if (albumList.length == 0) {
					albumList.push({
						name: track.album.name,
						album: track.album,
						likedTracks: [track],
						likes: 1,
						totalTracks: track.album.total_tracks,
						get ratio() {
							return (
								Math.round(
									(this.likes / this.totalTracks) * 10000
								) / 10000
							);
						}
					});
					console.log("This is the first album");
				} else {
					for (let i = 0; i < albumList.length; i++) {
						if (albumList[i].album.name == track.album.name) {
							albumList[i].likedTracks.push(track);
							albumList[i].likes++;

							// Adjust ratio
							albumList[i].ratio =
								albumList[i].likes / albumList[i].totalTracks;
							// console.log("Album already added, current number of liked tracks: " + albumList[i].likedTracks)
							break;
						}
						if (i == albumList.length - 1) {
							albumList.push({
								name: track.album.name,
								album: track.album,
								likedTracks: [track],
								likes: 1,
								totalTracks: track.album.total_tracks,
								get ratio() {
									return (
										Math.round(
											(this.likes / this.totalTracks) *
												10000
										) / 10000
									);
								}
							});
							// console.log("New entry added to the list")
							break;
						}
					}
				}
			}
		}
		console.log("Albumlist population finished");
		console.log(albumList);
		albumListSort(albumList);
	}

	//TODO album sorting by ratio
	function albumListSort(albumList) {
		var sortedAlbumList = albumList.sort(function(a, b) {
			if (a.ratio < b.ratio) {
				return 1;
			}
			if (a.ratio > b.ratio) {
				return -1;
			}
			return 0;
		});
		console.log("Sorting finished");
		console.log(sortedAlbumList);
	}

	/**
	 * Obtains parameters from the hash of the URL
	 * @return Object
	 */
	function getHashParams() {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while ((e = r.exec(q))) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	var params = getHashParams();

	var access_token = params.access_token,
		refresh_token = params.refresh_token,
		error = params.error;

	if (error) {
		alert("There was an error during the authentication");
	} else {
		if (access_token) {
			$.ajax({
				url: "https://api.spotify.com/v1/me",
				headers: {
					Authorization: "Bearer " + access_token
				},
				success: function(response) {
					console.log(response);
					render(response);
					$("#login").hide();
					$("#loggedin").show();
					$("#tools").show();
				}
			});
		} else {
			// render initial screen
			$("#login").show();
			$("#loggedin").hide();
			$("#tools").hide();
		}

		// document.getElementById('obtain-new-token').addEventListener('click', function() {
		//     $.ajax({
		//         url: '/refresh_token',
		//         data: {
		//             'refresh_token': refresh_token
		//         }
		//     }).done(function(data) {
		//         access_token = data.access_token;
		//         oauthPlaceholder.innerHTML = oauthTemplate({
		//             access_token: access_token,
		//             refresh_token: refresh_token
		//         });
		//     });
		// }, false);
	}

	function render(object) {
		$("#profile-photo").attr("src", object.images[0].url);
		$("#display-name").text("Logged in as " + object.display_name);
		$("#id").text(object.id);
		$("#email").text(object.email);
		$("#uri").text(object.uri);
		$("#country").text(object.country);
	}
})();
