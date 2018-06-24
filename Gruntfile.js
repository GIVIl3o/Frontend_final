

module.exports=function(grunt){
	grunt.registerTask('speak',function(){
		console.log("hello");
	});

	grunt.initConfig({
		concat:{
			js:{
				src: ["translated/asd.js","translated/test.js"],
				dest: "build/main.js",
			},
		},
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
};