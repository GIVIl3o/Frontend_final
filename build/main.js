"use strict";

var audio = null;

function create_new_audio(src, change_max_time) {
	audio = new Audio(src);
	audio.addEventListener("timeupdate", function () {
		document.getElementById("current_playing_music_time").value = audio.currentTime;
	});

	if (change_max_time == 1) audio.addEventListener("loadeddata", function () {
		document.getElementById("current_playing_music_time").setAttribute("max", audio.duration);
	});
}

function get_player(song) {
	if (audio != null) audio.pause();

	create_new_audio(song["src"], 0);

	var band = get_band_info(song["band_id"]);

	var html = "";
	html += "<input type='range' min='0' max='0' id='current_playing_music_time' value='0'>";
	html += "<div class='music_player' >";
	html += "<div class='player_centered'>";
	html += "<button id='play_current_song' >play</button>";
	html += "<img src=" + band["cover"] + " width='60' height='40' id='now_playing_cover_photo'>";
	html += "<h3 id='now_playing_name'>" + band["name"] + ":" + song["name"] + "</h3>";
	html += "<input type='range' min='0' max='100' id='volume_range'>";
	html += "<input type='hidden' value='" + song["music_id"] + "' id='now_playing_music'>";
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


var all_music = [
	{	
		music_id: 0,
		name: "Crawling",
		src: "../other/music/crawling.mp3",
		band_id: 0, 
	},
	{	
		music_id: 1,
		name: "Runaway",
		src: "../other/music/runaway.mp3",
		band_id: 0,
	},
	{	
		music_id: 2,
		name: "PaperCut",
		src: "../other/music/PaperCut.mp3",
		band_id: 0,
	},
];

function get_all_music(){
	return all_music;
}

function get_music_count(){
	return all_music.length;
}

function get_ith_music(i){
	return all_music[i];
}


var bands_info = [
	{	
		name: "Linkin Park",
		cover: "../other/covers/linkin_park.jpg",
	},
	{	
		name: "test",
		cover: "../other/covers/test.jpg",
	},
];


function get_band_info(index){
	return bands_info[index];
}
"use strict";

function other_music_entry(index, music_name, music_path) {
	var html = "";
	html += "<div class='other_music_entry'>";
	html += "		<div class='other_music_centered'>";
	html += "			<span>" + index + ") " + music_name + "</span>";
	html += "			<button class='other_music_play_button other_music_passive_button' id='other_music_entryN" + index + "' name=" + index + ">play now</button>";
	html += "		</div>";
	html += "</div>";
	return html;
}

function player_right_side(music) {
	var html = "";
	html += "<div class='music_player_other_music'>";

	for (var i = 0; i < music.length; i++) {
		var band = get_band_info(music[i]["band_id"]);
		html += other_music_entry(i + 1, band["name"] + ":" + music[i]["name"], music[i]["path"]);
	}

	html += "</div>";
	return html;
}

function get_music_player() {
	var music = get_all_music();

	var html = "";
	html += "<div class='possible_music'>";
	html += player_right_side(music);
	html += "</div>";

	return html;
}

function add_music_player_listeners() {
	var cur;

	var el = document.getElementById("other_music_entryN1");
	el.classList.remove("other_music_passive_button");
	el.innerHTML = "playing";

	var music_cnt = get_music_count();
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

			var next_to_play = get_ith_music(parseInt(this.getAttribute("name")) - 1);
			var band = get_band_info(next_to_play["band_id"]);
			document.getElementById("now_playing_name").innerHTML = band["name"] + ":" + next_to_play["name"];
			document.getElementById("now_playing_cover_photo").src = band["cover"];

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