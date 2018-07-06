
function save_playlist_response(response,not_used){
	//alert(response);
}

function save_playlist(){
	if(user_name==null){alert("login");return;}
	var cur_playlist=document.getElementById("playlist").childNodes;

	var cur_arr=[];
	for(var i=0;i<cur_playlist.length;i++){
		cur_arr.push(get_music_json(cur_playlist[i])["id"]);
	}

	var new_playlist={
		name: document.getElementById("new_playlist_name").value,
		user: user_name,
		playlist:cur_arr,
	};

	 send_post_request("../php/save_playlist.php",JSON.stringify(new_playlist),save_playlist_response,null);
}