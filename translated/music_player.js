"use strict";

function player_left_side() {
	var html = "";
	html += "<div class='player_left_side'>";
	html += "		<img src='player.jpg' width='300'>";
	html += "		<div class='player_left_bottom'>";
	html += "			<audio controls id='music_player_audio'>";
	html += "				<source src='../other/break.mp3' type='audio/mpeg'>";
	html += "			</audio>";
	html += "			<input type='range' min='0' max='100' class='music_player_volume display_none' id='music_player_volume'>";
	html += "			<div class='music_player_placeholder' id='music_player_placeholder'></div>";
	html += "		</div>";
	html += "</div>";
	return html;
}

function other_music_entry(index, music_name, music_path) {
	var html = "";
	html += "<div class='other_music_entry'>";
	html += "		<div class='other_music_centered'>";
	html += "			<span>" + index + "." + music_name + "</span>";
	html += "			<button class='float_right'>play again</button>";
	html += "		</div>";
	html += "</div>";
	return html;
}

function player_right_side() {
	var html = "";
	html += "<div class='music_player_other_music'>";

	for (var i = 1; i <= 5; i++) {
		html += other_music_entry(i, "random music name", "music name");
	}

	html += "</div>";
	return html;
}

function get_music_player() {
	var html = "";
	html += "<div class='music_player'>";
	html += player_left_side();
	html += player_right_side();
	html += "</div>";
	return html;
}

function add_music_player_listeners() {
	var cur;
	cur = document.getElementById("music_player_volume");
	cur.addEventListener("mouseout", function () {
		this.classList.add("display_none");
	});

	cur.addEventListener("change", function () {
		document.getElementById('music_player_audio').volume = this.value / 100;
	});

	cur = document.getElementById("music_player_placeholder");

	cur.addEventListener("mouseover", function () {
		document.getElementById('music_player_volume').classList.remove("display_none");
	});
}