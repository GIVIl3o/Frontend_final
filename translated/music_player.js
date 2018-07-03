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