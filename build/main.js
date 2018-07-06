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
		alert("success");
	} else {
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
		data = JSON.stringify(data);
		send_post_request(document.getElementById("authentication_type").value, data, login_response, null);
	});
}
"use strict";

function add_to_playlist(music) {
	var new_audio = new Audio(music["src"]);
	new_audio.addEventListener("loadeddata", function () {
		var html = "";
		html += "<div class='playlist_music_entry'>";
		html += "		<div class='playlist_entry_text'>";
		html += "			<span class='playlist_song_name'>" + music["name"] + "</span><br>";
		html += "			<span class='playlist_song_band'>" + music["band_name"] + "</span>";
		html += "			<span class='display_none'>" + music["src"] + "</span>";
		html += "			<span class='display_none'>" + music["band_cover"] + "</span>";
		html += "		</div>";
		var duration = this.duration;
		html += "		<button class='delete_from_playlist' id='delete_playlist_entry'></button>";

		html += "		<span class='playlist_duration'>" + Math.round(duration / 60) + ":" + Math.round(duration % 60) + "</span>";
		html += "</div>";

		document.getElementById("playlist").insertAdjacentHTML("beforeend", html);
		document.getElementById("delete_playlist_entry").addEventListener("click", function () {
			this.parentElement.remove();
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
	});

	audio.addEventListener("loadeddata", function () {
		document.getElementById("music-slider").setAttribute("max", audio.duration);
		document.getElementById("playlist_current_time").innerHTML = "0:0/" + getTime(audio.duration);
	});

	//audio.volume=document.getElementById("volume_range").value/100;
}

function get_player(song) {
	if (audio != null) audio.pause();

	var html = "";
	html += "<input type='range' min='0' max='0' id='current_playing_music_time' value='0'>";
	html += "<div class='music_player' >";
	html += "<div class='player_centered'>";
	html += "<button id='play_current_song' >play</button>";
	html += "<img src=" + song["band_cover"] + " width='60' height='40' id='now_playing_cover_photo'>";
	html += "<h3 id='now_playing_name'>" + song["band_name"] + ":" + song["name"] + "</h3>";
	html += "<input type='range' min='0' max='100' id='volume_range' value='100'>";
	html += "<input type='hidden' value='0' id='now_playing_music'>";
	html += "</div>";
	html += "</div>";
	return html;
}

function add_player_listeners() {
	/*var cur=document.getElementById("play-song");
 
 cur.addEventListener("click",function(){
 		audio.play();
 });
 
 document.getElementById("volume_range").addEventListener("change",function(){
 		audio.volume=this.value/100;
 });
 
 document.getElementById("current_playing_music_time").addEventListener("change",function(){
 		audio.currentTime=this.value;
 });
 
 audio.addEventListener("loadeddata", function() {
 	document.getElementById("current_playing_music_time").setAttribute("max",audio.duration);
 });*/
}
"use strict";

function other_music_entry(index, music_name, music_path, cover_path) {
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
	html += "		</div>";
	html += "</div>";
	return html;
}

function player_right_side(music) {
	var html = "";
	html += "<div class='music_player_other_music'>";

	for (var i = 0; i < music.length; i++) {
		html += other_music_entry(i + 1, music[i]["band_name"] + ":" + music[i]["name"], music[i]["path"], music[i]["band_cover"]);
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

	create_new_audio(all_music[0]["src"]);
	document.getElementById("playlist_cover_photo").src = all_music[0]["band_cover"];
	document.getElementById("playlist_music_name").innerHTML = all_music[0]["name"] + ":" + all_music[0]["band_name"];
	add_player_listeners();
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
			var next_to_play = music[next_index];

			next_index++;
			document.getElementById("playlist_music_name").innerHTML = document.getElementById("other_music_full_nameN" + next_index).innerHTML;
			document.getElementById("playlist_cover_photo").src = document.getElementById("other_music_coverN" + next_index).src;

			audio.pause();

			create_new_audio(next_to_play["src"]);

			audio.play();
			document.getElementById("now_playing_music").setAttribute("value", this.getAttribute("name") - 1);
			document.getElementById("playlist").innerHTML = "";
		});

		cur = document.getElementById("add_to_playlistN" + (i + 1)).addEventListener("click", function () {
			var next_index = parseInt(this.getAttribute("name") - 1);
			var to_add = music[next_index];

			add_to_playlist(to_add);
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

function slider_change() {
    document.getElementById("music-slider").addEventListener("change", function () {
        audio.currentTime = document.getElementById("music-slider").value;
    });
}

function previousSong() {
    var previousSong = document.querySelector("#previous-song");
    previousSong.addEventListener("click", function () {
        console.log("previous");
    });
}

function pauseSong() {
    var playSong = document.querySelector("#play-song");
    playSong.addEventListener("click", function () {
        document.querySelector("#play-song").style = "display:none";
        document.querySelector("#pause-song").style = "display:inline";

        audio.play();
    });
}

function playSong() {
    var pauseSong = document.querySelector("#pause-song");
    pauseSong.addEventListener("click", function () {
        document.querySelector("#pause-song").style = "display:none";
        document.querySelector("#play-song").style = "display:inline";
        audio.pause();
    });
}

function nextSong() {
    var nextSong = document.querySelector("#next-song");
    nextSong.addEventListener("click", function () {
        console.log("next");
    });
}

function shuffleSong() {
    var shuffleSong = document.querySelector("#shuffle-song");
    shuffleSong.addEventListener("click", function () {
        console.log("shuffle");
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
        console.log(volume.value);
    });
}

function likeSong() {
    var likeSong = document.querySelector("#like-song");
    likeSong.addEventListener("click", function () {
        console.log("like");
    });
}

addMusicPlayerListeners();