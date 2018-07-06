

var audio=null;

function getTime(time){
	return Math.round(time/60)+":"+Math.round(time%60);
}

function create_new_audio(src){
	audio=new Audio(src);
	audio.addEventListener("timeupdate",function(){
		document.getElementById("music-slider").value=audio.currentTime;
		document.getElementById("playlist_current_time").innerHTML=getTime(audio.currentTime)+"/"+getTime(audio.duration);

		if(audio.currentTime==audio.duration)playlist_play_next();
	});

	audio.addEventListener("loadeddata", function() {
		document.getElementById("music-slider").setAttribute("max",audio.duration);
		document.getElementById("playlist_current_time").innerHTML="0:0/"+getTime(audio.duration);
	});

	audio.volume=document.getElementById("volume-slider").value;
}
