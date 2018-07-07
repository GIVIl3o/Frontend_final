function set_new_playlist(response,not_used){
	response=JSON.parse(response);
	document.getElementById("playlist").innerHTML="";
	document.getElementById("now_playing_playlist_index").value=0;
	
	audio.pause();
	play_next_song(response[0]);
	audio.play();

	document.getElementById("play-song").click();
	for(var i=0;i<response.length;i++){
		add_to_playlist(response[i]);
	}
}