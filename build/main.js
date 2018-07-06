'use strict';

function send_post_request(url, data, raise_function, arg) {
	var http = new XMLHttpRequest();
	var params = data;
	http.open('post', url, false);

	http.setRequestHeader('Content-Type', 'application/json');

	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			raise_function(http.responseText, arg);
		}
	};
	http.send(params);
}
"use strict";

function authentication_html(upper_text, submit_text, url, registration) {
	var html = "";
	html += "<div class='authentication_form'>";
	html += "		<div class='centered'><span id='authentication_error' class='authentication_error' ></span></div>";
	html += "		<h3 id='authentication_text" + registration + "'>" + upper_text + "</h3>";
	html += "		<div>";
	html += "			<div class='centered'><input type='text' class='form_input' placeholder='Login' id='username'></div>";
	html += "			<div class='centered'><input type='password' class='form_input' placeholder='Password' id='password'><br></div>";
	html += "			<div class='centered' ><input class='form_submit' type='submit' value='" + submit_text + "' id='login_button" + registration + "'></div>";
	html += "			<input type='hidden' id='authentication_type' value='" + url + "'>";
	html += "		</div>";
	html += "</div>";
	return html;
}

function login_response(response, not_used) {
	if (response.length == 0) {
		window.location.href = "#profile";
	} else {
		user_name = null;
		var el = document.getElementById("authentication_error");
		el.innerHTML = response;
		el.classList.add("show_authentication_error");
		setTimeout(function () {
			document.getElementById("authentication_error").classList.remove("show_authentication_error");
		}, 3000);
	}
}

function add_login_listeners() {
	var log_button = document.getElementById("login_button0");
	if (log_button == null) log_button = document.getElementById("login_button1");
	log_button.addEventListener("click", function () {
		var data = {
			username: document.getElementById("username").value,
			password: document.getElementById("password").value
		};
		user_name = data["username"];
		data = JSON.stringify(data);
		send_post_request(document.getElementById("authentication_type").value, data, login_response, null);
	});
}
"use strict";

function add_to_playlist(music) {
	var new_audio = new Audio(music["src"]);
	new_audio.addEventListener("loadeddata", function () {
		var html = "";
		html += "<div class='playlist_music_entry flex'>";
		html += "		<div class='playlist_entry_text'>";
		html += "			<span class='playlist_song_name'>" + music["name"] + "</span><br>";
		html += "			<span class='playlist_song_band'>" + music["band_name"] + "</span>";
		html += "			<span class='display_none music_src'>" + music["src"] + "</span>";
		html += "			<span class='display_none band_cover'>" + music["band_cover"] + "</span>";
		html += "			<span class='display_none music_id'>" + music["id"] + "</span>";
		html += "		</div>";
		var duration = this.duration;
		html += "		<div>";
		html += "			<span class='playlist_duration'>" + Math.round(duration / 60) + ":" + Math.round(duration % 60) + "</span>";

		html += "		<i class='fas fa-times fa-lg delete_from_playlist' id='delete_playlist_entry'></i>";
		html += "	</div>";
		html += "</div>";

		document.getElementById("playlist").insertAdjacentHTML("beforeend", html);
		document.getElementById("delete_playlist_entry").addEventListener("click", function () {
			this.parentElement.parentElement.remove();
			document.getElementById("now_playing_playlist_index").value = -1;
			playlist_play_next();
		});
		document.getElementById("delete_playlist_entry").removeAttribute("id");
	});
}
"use strict";

var audio = null;

function getTime(time) {
	return Math.round(time / 60) + ":" + Math.round(time % 60);
}

function create_new_audio(src) {
	audio = new Audio(src);
	audio.addEventListener("timeupdate", function () {
		document.getElementById("music-slider").value = audio.currentTime;
		document.getElementById("playlist_current_time").innerHTML = getTime(audio.currentTime) + "/" + getTime(audio.duration);

		if (audio.currentTime == audio.duration) playlist_play_next();
	});

	audio.addEventListener("loadeddata", function () {
		document.getElementById("music-slider").setAttribute("max", audio.duration);
		document.getElementById("playlist_current_time").innerHTML = "0:0/" + getTime(audio.duration);
	});

	audio.volume = document.getElementById("volume-slider").value;
}
"use strict";

function other_music_entry(index, music_name, music_path, cover_path, music_id) {
	var html = "";
	html += "<div class='other_music_entry'>";
	html += "		<div class='other_music_centered'>";
	html += "			<button class='other_music_play_now' id='other_music_entryN" + index + "' name=" + index + "></button>";
	html += "			<div class='other_music_text'>";
	html += "			<span>" + music_name + "</span><br><a href='#' class='music_uploader'>author</a>";
	html += "			</div>";
	html += "			<button class='other_music_play_button' name=" + index + " id='add_to_playlistN" + index + "'>add to playlist</button>";
	html += "			<span class='display_none' id='other_music_full_nameN" + index + "'>" + music_name + "</span>";
	html += "			<img src='" + cover_path + "' class='display_none' id='other_music_coverN" + index + "'>";
	html += "			<input type='hidden' value=" + music_id + " id='secret_music_idN" + music_id + "'>";
	html += "		</div>";
	html += "</div>";
	return html;
}

function player_right_side(music) {
	var html = "";
	html += "<div class='music_player_other_music'>";

	for (var i = 0; i < music.length; i++) {
		html += other_music_entry(i + 1, music[i]["band_name"] + ":" + music[i]["name"], music[i]["path"], music[i]["band_cover"], music[i]["id"]);
	}

	html += "</div>";
	return html;
}

function get_music_player(all_music, put_html) {
	all_music = JSON.parse(all_music);

	var html = "";
	html += "<div class='possible_music'>";
	html += player_right_side(all_music);
	html += "</div>";

	put_html.innerHTML = html;
	add_music_player_listeners(all_music);

	play_next_song(all_music[0]);
	add_to_playlist(all_music[0]);
}

function add_music_player_listeners(music) {
	var cur;

	var el = document.getElementById("other_music_entryN1");
	el.classList.remove("other_music_passive_button");

	var music_cnt = music.length;

	for (var i = 0; i < music_cnt; i++) {
		cur = document.getElementById("other_music_entryN" + (i + 1));

		cur.addEventListener("click", function () {

			var next_index = parseInt(this.getAttribute("name") - 1);

			audio.pause();

			play_next_song(music[next_index]);

			next_index++;
			document.getElementById("playlist").innerHTML = "";
			document.getElementById("play-song").click();
			document.getElementById("add_to_playlistN" + next_index).click();
			document.getElementById("now_playing_playlist_index").value = 0;
		});

		cur = document.getElementById("add_to_playlistN" + (i + 1)).addEventListener("click", function () {
			var next_index = parseInt(this.getAttribute("name") - 1);
			var to_add = music[next_index];

			add_to_playlist(to_add);
			if (audio.paused) {
				play_next_song(music[next_index]);
				document.getElementById("play-song").click();
				audio.play();
			}
		});
	}
}
var translate_words = [
	{	
        id: "l-songs",
        set_type: "innerHTML",
        GEO: "სიმღერები",
        ENG:"Songs",
	},
    {	
        id: "l-albums",
        set_type: "innerHTML",
        GEO: "ალბომები",
        ENG:"Albums",
    },
    {	
        id: "l-singers",
        set_type: "innerHTML",
        GEO: "მომღერლები",
        ENG:"Singers",
    },
    {	
        id: "l-y-playlists",
        set_type: "innerHTML",
        GEO: "შენი სიები",
        ENG:"Your Playlists",
    },
    {
        id: "log-in",
        set_type: "innerHTML",
        GEO: "ავტორიზაცია",
        ENG: "Log In",
    },
    {
        id: "search-field",
        set_type: "placeholder",
        GEO: "ძებნა",
        ENG: "Search",
    },
    {
        id: "registration",
        set_type: "innerHTML",
        GEO: "რეგისტრაცია",
        ENG: "Registration",
    },
    {
        id: "authentication_text0",
        set_type: "innerHTML",
        GEO: "ექაუნთში შესვლა",
        ENG: "Log In",
    },
    {
        id: "authentication_text1",
        set_type: "innerHTML",
        GEO: "რეგისტრაცია",
        ENG: "Registration",
    },
    {
        id: "username",
        set_type: "placeholder",
        GEO: "მომხმარებლის სახელი",
        ENG: "Username",
    },
    {
        id: "password",
        set_type: "placeholder",
        GEO: "პაროლი",
        ENG: "password",
    },
    {
        id: "login_button0",
        set_type: "value",
        GEO: "შესვლა",
        ENG: "GET STARTED",
    },
    {
        id: "login_button1",
        set_type: "value",
        GEO: "რეგისტრაცია",
        ENG: "REGISTER",
    },
    {
        id: "profile-tracks",
        set_type: "innerHTML",
        GEO: "სიმღერები",
        ENG: "Tracks",
    },
    {
        id: "profile-albums",
        set_type: "innerHTML",
        GEO: "ალბომები",
        ENG: "Albums",
    },
    {
        id: "profile-playlists",
        set_type: "innerHTML",
        GEO: "სიები",
        ENG: "Playlists",
    },
    {
        id: "rofile-followers",
        set_type: "innerHTML",
        GEO: "მომყოლები",
        ENG: "Followers",
    },
    {
        id: "profile-playlists",
        set_type: "innerHTML",
        GEO: "მიყვები",
        ENG: "Following",
    },
];

function get_translate_words_ids() {
    var ids = [];
    for(var i=0; i<get_translate_words_count(); i++) {
        ids.push(translate_words[i].id);
    }
    return ids;
}

function id_get_type(id){
    for(var i=0; i<get_translate_words_count(); i++) {
        if(id==translate_words[i]["id"])
            return translate_words[i]["set_type"];
    }
    return -1;
}

function get_translate_words_eng() {
    var eng = [];
    for(var i=0; i<get_translate_words_count(); i++) {
        eng.push(translate_words[i].ENG);
    }
    return eng;
}

function get_translate_words_geo() {
    var geo = [];
    for(var i=0; i<get_translate_words_count(); i++) {
        geo.push(translate_words[i].GEO);
    }
    return geo;
}

function get_all_translate_words(){
	return translate_words;
}

function get_translate_words_count(){
	return translate_words.length;
}

function get_ith_translate_word(i){
	return translate_words[i];
}
"use strict";

function addMusicPlayerListeners() {
    previousSong();
    pauseSong();
    playSong();
    nextSong();
    shuffleSong();
    muteUnmute();
    volumeChange();
    likeSong();
    slider_change();
}

function play_next_song(song) {
    create_new_audio(song["src"]);
    document.getElementById("playlist_cover_photo").src = song["band_cover"];
    document.getElementById("playlist_music_name").innerHTML = song["name"] + ":" + song["band_name"];
}
function get_music_json(next_to_play) {
    var next_music = {
        name: next_to_play.querySelector(".playlist_song_name").innerHTML,
        src: next_to_play.querySelector(".music_src").innerHTML,
        band_name: next_to_play.querySelector(".playlist_song_band").innerHTML,
        band_cover: next_to_play.querySelector(".band_cover").innerHTML,
        id: parseInt(next_to_play.querySelector(".music_id").innerHTML)
    };
    return next_music;
}
function playlist_play_next() {
    var playlist = document.getElementById("playlist");

    var index = parseInt(document.getElementById("now_playing_playlist_index").value);

    if (playlist.childNodes.length > 0 && parseInt(document.getElementById("shuffle_playlist").value) == 1) {
        index = Math.floor(Math.random() * playlist.childNodes.length) - 1;
    }
    var next_to_play = playlist.childNodes[index + 1];

    document.getElementById("now_playing_playlist_index").value = index + 1;
    audio.pause();

    if (typeof next_to_play === "undefined") {
        document.getElementById("pause-song").click();
        return;
    }

    var next_music = get_music_json(next_to_play);
    play_next_song(next_music);
    audio.play();
}

function slider_change() {
    document.getElementById("music-slider").addEventListener("change", function () {
        audio.currentTime = document.getElementById("music-slider").value;
    });
}

function previousSong() {
    var previousSong = document.querySelector("#previous-song");
    previousSong.addEventListener("click", function () {
        var index = parseInt(document.getElementById("now_playing_playlist_index").value);
        if (index == 0) {
            audio.pause();
            document.getElementById("pause-song").click();
            return;
        }
        document.getElementById("now_playing_playlist_index").value = index - 2;
        playlist_play_next();
    });
}

function pauseSong() {
    var playSong = document.querySelector("#play-song");
    playSong.addEventListener("click", function () {

        document.getElementById("play-song").classList.remove("fas");
        document.getElementById("play-song").classList.add("show_item");
        document.getElementById("pause-song").classList.remove("show_item");
        document.getElementById("pause-song").classList.add("fas");

        audio.play();
    });
}

function playSong() {
    var pauseSong = document.querySelector("#pause-song");
    pauseSong.addEventListener("click", function () {

        document.getElementById("pause-song").classList.remove("fas");
        document.getElementById("pause-song").classList.add("show_item");
        document.getElementById("play-song").classList.remove("show_item");
        document.getElementById("play-song").classList.add("fas");
        audio.pause();
    });
}

function nextSong() {
    var nextSong = document.querySelector("#next-song");
    nextSong.addEventListener("click", function () {
        playlist_play_next();
    });
}

function shuffleSong() {
    var shuffleSong = document.querySelector("#shuffle-song");
    shuffleSong.addEventListener("click", function () {
        var val = parseInt(document.getElementById("shuffle_playlist").value);
        val = 1 - val;
        document.getElementById("shuffle_playlist").value = val;
        if (val == 1) {
            document.getElementById("shuffle-song").classList.remove("fa-color");
            document.getElementById("shuffle-song").classList.add("shuffle_color");
        } else {
            document.getElementById("shuffle-song").classList.add("fa-color");
            document.getElementById("shuffle-song").classList.remove("shuffle_color");
        }
    });
}

function muteUnmute() {
    var volume = document.querySelector("#volume");
    volume.addEventListener("click", function () {
        console.log("unmute");
    });
}

function volumeChange() {
    var volume = document.querySelector("#volume-slider");
    volume.addEventListener("change", function () {
        audio.volume = volume.value;
    });
}

function likeSong() {
    var likeSong = document.querySelector("#like-song");
    likeSong.addEventListener("click", function () {
        console.log("like");
    });
}

addMusicPlayerListeners();
"use strict";

function profile_html() {
    var html = "";
    html += "   <div class='my_profile'>";
    html += "       <div class='profile-image'></div>";
    html += "       <div class='profile-content'>";
    html += "           <div class='profile-navigation-bar flex'>";
    html += "                <div class='profile-navigation-item'>";
    html += "                    <a id='profile-tracks' href='#'>Trakcs</a>";
    html += "               </div>";
    html += "               <div class='profile-navigation-item'>";
    html += "                   <a id='profile-albums' href='#'>Albums</a>";
    html += "            </div>";
    html += "            <div class='profile-navigation-item'>";
    html += "                   <a id='profile-playlists' href='#'>Playlists</a>";
    html += "            </div>";
    html += "            <div class='profile-navigation-item'>";
    html += "                   <a id='profile-followers' href='#'>Followers</a>";
    html += "            </div>";
    html += "            <div class='profile-navigation-item'>";
    html += "                   <a id='profile-playlists' href='#'>Following</a>";
    html += "            </div>";
    html += "        </div>";
    html += "    </div>";
    html += "</div>";
    return html;
}
"use strict";

function save_playlist_response(response, not_used) {
	alert(response);
}

function save_playlist() {
	if (user_name == null) {
		alert("login");return;
	}
	var cur_playlist = document.getElementById("playlist").childNodes;

	var cur_arr = [];
	for (var i = 0; i < cur_playlist.length; i++) {
		cur_arr.push(get_music_json(cur_playlist[i])["id"]);
	}

	var new_playlist = {
		name: document.getElementById("new_playlist_name").value,
		user: user_name,
		playlist: cur_arr
	};

	send_post_request("../php/save_playlist.php", JSON.stringify(new_playlist), save_playlist_response, null);
}