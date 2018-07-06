
function get_cur_playlist(id,index,name){
    var html="";
    html+="<div class='playlist_entry'>";
    html+="     <i class='fas fa-play-circle fa-color  fa-lg playlist_now' id='cur_playlist_btnN"+index+"'></i>";
    html+="     <span class=''>"+index+") "+name+"</span>";
    html+="     <input type='hidden' class='hidden_id' value="+id+">";
    html+="</div>";
    return html;
}

function set_users_playlists(response,not_used){
    response=JSON.parse(response);

    var html="";
    for(var i=0;i<response.length;i++){
        html+=get_cur_playlist(response[i]["id"],i,response[i]["name"]);
    }
    document.getElementById("users_playlists").innerHTML=html;
    for(var i=0;i<response.length;i++){
        document.getElementById("cur_playlist_btnN"+i).addEventListener("click",function(){
            var cur=this.parentElement;
            var id=parseInt(cur.querySelector(".hidden_id").value);

            var data={
                playlist: id,
            };
            send_post_request("../php/get_playlist.php",JSON.stringify(data),set_new_playlist,null);
        });
    }
}

function profile_html (){
    var html = "";
    html += "   <div class='my_profile'>"
    html += "       <div class='profile-image'></div>"
    html += "       <div class='profile-content'>"
    html += "           <div class='profile-navigation-bar flex'>"
    html += "            <div class='profile-navigation-item' id='profile-playlists'>"
    html += "                   Playlists"
    html += "            </div>"
    html += "        </div>"
    html += "    </div>"
    html += "</div>"
    html += "<div id='users_playlists'></div>";
    return html;
}