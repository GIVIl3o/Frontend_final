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

var audio = null;

function create_new_audio(src, change_max_time) {
	audio = new Audio(src);
	audio.addEventListener("timeupdate", function () {
		document.getElementById("current_playing_music_time").value = audio.currentTime;
	});

	if (change_max_time == 1) {
		audio.addEventListener("loadeddata", function () {
			document.getElementById("current_playing_music_time").setAttribute("max", audio.duration);
		});
		audio.volume = document.getElementById("volume_range").value / 100;
	}
}

function get_player(song) {
	if (audio != null) audio.pause();

	create_new_audio(song["src"], 0);

	//var band=get_band_info(song["band_id"]);

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
	var cur = document.getElementById("play_current_song");

	cur.addEventListener("click", function () {
		audio.play();
	});

	document.getElementById("volume_range").addEventListener("change", function () {
		audio.volume = this.value / 100;
	});

	document.getElementById("current_playing_music_time").addEventListener("change", function () {
		audio.currentTime = this.value;
	});

	audio.addEventListener("loadeddata", function () {
		document.getElementById("current_playing_music_time").setAttribute("max", audio.duration);
	});
}
"use strict";

function other_music_entry(index, music_name, music_path, cover_path) {
	var html = "";
	html += "<div class='other_music_entry'>";
	html += "		<div class='other_music_centered'>";
	html += "			<span>" + index + ") " + music_name + "</span>";
	html += "			<button class='other_music_play_button other_music_passive_button' id='other_music_entryN" + index + "' name=" + index + ">play now</button>";
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

	document.getElementById("music_player").innerHTML = get_player(all_music[0]);
	add_player_listeners();
}

function add_music_player_listeners(music) {
	var cur;

	var el = document.getElementById("other_music_entryN1");
	el.classList.remove("other_music_passive_button");
	el.innerHTML = "playing";

	var music_cnt = music.length;

	for (var i = 0; i < music_cnt; i++) {
		cur = document.getElementById("other_music_entryN" + (i + 1));

		cur.addEventListener("click", function () {

			var now_playing_id = document.getElementById('now_playing_music').value;
			now_playing_id++;

			var cur_el = document.getElementById("other_music_entryN" + now_playing_id);
			cur_el.classList.add("other_music_passive_button");
			cur_el.innerHTML = "play now";

			cur_el = document.getElementById("other_music_entryN" + (i + 1));
			this.classList.remove("other_music_passive_button");
			this.innerHTML = "playing";

			var next_index = parseInt(this.getAttribute("name") - 1);
			var next_to_play = music[next_index];

			next_index++;
			document.getElementById("now_playing_name").innerHTML = document.getElementById("other_music_full_nameN" + next_index).innerHTML;
			document.getElementById("now_playing_cover_photo").src = document.getElementById("other_music_coverN" + next_index).src;

			audio.pause();

			create_new_audio(next_to_play["src"], 1);

			audio.play();
			document.getElementById("now_playing_music").setAttribute("value", this.getAttribute("name") - 1);
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