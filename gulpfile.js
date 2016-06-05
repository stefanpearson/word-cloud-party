// External dependencies
var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    browser = require( 'gulp-browser' ),
    rename = require( 'gulp-rename' );


// Compile Sass
gulp.task( 'sass', function() {
  return gulp.src( './sass/main.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( rename( 'build.css' ) )
    .pipe( gulp.dest( './server/public/css' ) );
} );


// Watch Sass dir
gulp.task( 'sass:watch', function() {
  gulp.watch( './sass/**/*.scss', [ 'sass' ] );
} );


// Webpack
gulp.task( 'browserify', function() {
  return gulp.src( './client/index.js' )
    .pipe( browser.browserify() )
    .pipe( rename( 'build.js' ) )
    .pipe( gulp.dest( './server/public/js' ) );
} );


// Watch client JS
gulp.task( 'browserify:watch', function() {
  gulp.watch( './client/**/*.js', [ 'browserify' ] );
} );


// Default task list
gulp.task( 'default', [ 'sass:watch', 'sass', 'browserify:watch', 'browserify' ] );
gulp.task( 'build', [ 'sass', 'browserify' ] );
