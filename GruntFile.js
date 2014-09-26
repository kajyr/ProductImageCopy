module.exports = function(grunt) {


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		coffee: {
			compile: {
				expand: true,
				flatten: false,
				cwd: 'src/coffee',
				src: ['**/*.coffee'],
				dest: 'src/js',
				ext: '.js'
			}
		},
		watch: {
			scripts: {
				files: ['src/coffee/**/*.coffee'],
				tasks: ['coffee'],
				options: {
					spawn: false
				}
			}
		},
		nodewebkit: {
			options: {
				platforms: ['win'],
				buildDir: 'webkitbuilds',
			},
			src: ['cache/build/**']
		},
		copy: {
			main: {
				files: [
					{expand: true, src: ['src/**', 'package.json'], dest: 'cache/build/'},
				]
			}
		},
		clean: {
			build: ["cache/build"],
		},

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-node-webkit-builder');


	grunt.registerTask('build', [ 'clean', 'coffee', 'copy', 'nodewebkit']);

};