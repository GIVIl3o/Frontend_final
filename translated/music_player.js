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