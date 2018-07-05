'use strict';

function send_post_request(url, data, raise_function, arg) {
	var http = new XMLHttpRequest();
	var params = data;
	http.open('post', url, false);

	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			var obj = JSON.parse(http.responseText);
			raise_function(obj, arg);
		}
	};
	http.send(params);
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
        GEO: "სიმღერები",
        ENG:"Songs",
	},
    {	
        id: "l-albums",
        GEO: "ალბომები",
        ENG:"Albums",
    },
    {	
        id: "l-singers",
        GEO: "მომღერლები",
        ENG:"Singers",
    },
    {	
        id: "l-y-playlists",
        GEO: "შენი სიები",
        ENG:"Your Playlists",
    },
];

function get_translate_words_ids() {
    var ids = [];
    for(var i=0; i<get_translate_words_count(); i++) {
        ids.push(translate_words[i].id);
    }
    return ids;
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