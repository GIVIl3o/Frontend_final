"use strict";

function profile_html() {
    var html = "";
    html += "<div class='wrapper'>";
    html += "   <div class='container'>";
    html += "       <div class='profile-image'></div>";
    html += "       <div class='profile-content'>";
    html += "           <div class='profile-navigation-bar flex'>";
    html += "                <div class='profile-navigation-item'>";
    html += "                    <a id='profile-tracks' href='#'>Trakcs</a>";
    html += "               </div>";
    html += "               <div class='profile-navigation-item'>";
    html += "                   <a id='profile-albums' href='#'>Albums</a>";
    html += "            </div>";
    html += "            <div class='profile-navigation-item'>";
    html += "                   <a id='profile-playlists' href='#'>Playlists</a>";
    html += "            </div>";
    html += "            <div class='profile-navigation-item'>";
    html += "                   <a id='profile-followers' href='#'>Followers</a>";
    html += "            </div>";
    html += "            <div class='profile-navigation-item'>";
    html += "                   <a id='profile-playlists' href='#'>Following</a>";
    html += "            </div>";
    html += "        </div>";
    html += "    </div>";
    html += "</div>";
    html += "</div>";
    return html;
}