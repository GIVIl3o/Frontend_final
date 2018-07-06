
module.exports=function(grunt){
	grunt.registerTask('speak',function(){
		console.log("hello");
	});

	grunt.initConfig({
		concat:{
			js:{
				src: ["translated/send_php_request.js","translated/authentication.js","translated/playlist.js","translated/real_music_player.js","translated/music_player.js", 
				"other/database/language.js", "translated/music-player.js","translated/profile.js","translated/save_playlist.js","translated/change_playlist.js"],
				dest: "build/main.js",
			},
			css:{
				src: ["css/music_player.css","css/profile.css", "css/real_music_player.css","css/header.css","css/main.css", "css/responsive.css",
				"css/authentication.css", "css/recent-music.css", "css/music-player.css","css/playlist.css", "css/albums.css","css/profile.css"],
				dest: "build/styles.css",
			},
		},
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
};