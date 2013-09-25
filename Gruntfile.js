module.exports = function( grunt ) {
	grunt.initConfig( {
		watch: {
			src: {
				files: [ 'src/BadgeAnimator.js' ],
				tasks: [ 'copy-to-ext' ]
			}
		}
	} );

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask( 'copy-to-ext', 'Copy src/BadgeAnimator.js to sampleext.', function () {
		grunt.file.copy( 'src/BadgeAnimator.js', 'sampleext/BadgeAnimator.js' );
	} );

	// Default task(s).
	grunt.registerTask( 'default', ['watch'] );
};