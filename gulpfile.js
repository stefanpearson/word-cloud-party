// External dependencies
var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    rename = require( 'gulp-rename' ),
    source = require( 'vinyl-source-stream' ),
    browserify = require( 'browserify' ),
    watchify = require( 'watchify' ),
    reactify = require( 'reactify' );


// Compile Sass
gulp.task( 'sass', function() {
  return gulp.src( './sass/main.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( rename( 'build.css' ) )
    .pipe( gulp.dest( './server/public/css' ) );
} );


// Client side JS
gulp.task( 'browserify', function() {
  var bundler = browserify( {
      entries: [ './client/index.js' ],
      transform: [ reactify ],
      debug: true, // Sourcemap
      cache: {},
      packageCache: {},
      fullPaths: true
  } );

  return bundler.bundle()
    .pipe( source( 'build.js' ) )
    .pipe( gulp.dest( './server/public/js' ) );
} );


// // Watch Sass dir
// gulp.task( 'sass:watch', function() {
//   gulp.watch( './sass/**/*.scss', [ 'sass' ] );
// } );


// // Watch client JS dir
// gulp.task( 'browserify:watch', function() {
//   gulp.watch( './client/**/*.js', [ 'browserify' ] );
// } );


gulp.task( 'watch', function() {
  gulp.watch( './sass/**/*.scss', [ 'sass' ] );
  gulp.watch( './client/**/*.js', [ 'browserify' ] );
} );


// Default task list
gulp.task( 'default', [ 'sass', 'browserify', 'watch' ] );
gulp.task( 'build', [ 'sass', 'browserify' ] );
