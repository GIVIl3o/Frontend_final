

module.exports=function(grunt){
	grunt.registerTask('speak',function(){
		console.log("hello");
	});

	grunt.initConfig({
		concat:{
			js:{
				"other/database/language.js", "translated/music-player.js"],
				dest: "build/main.js",
			},
			css:{
				src: ["css/music_player.css","css/profile.css", "css/real_music_player.css","css/header.css","css/main.css", "css/responsive.css",
				dest: "build/styles.css",
			},
		},
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
};