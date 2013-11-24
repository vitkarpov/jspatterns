module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mocha: {
            src: ['src/*/*.html']
        }
    });

    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('default', 'mocha');
};