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