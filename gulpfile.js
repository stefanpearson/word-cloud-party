// External dependencies
var dotenv = require( 'dotenv' ),
    gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    cleanCss = require( 'gulp-clean-css' ),
    rename = require( 'gulp-rename' ),
    source = require( 'vinyl-source-stream' ),
    browserify = require( 'browserify' ),
    watchify = require( 'watchify' ),
    babelify = require( 'babelify' ),
    uglify = require( 'gulp-uglify' ),
    streamify = require( 'gulp-streamify' ),
    envify = require( 'envify' );


var environmentName = process.env.NODE_ENV || process.env.node_env || 'development';


// Load .env in development environment
if ( environmentName == 'development' ) {
  dotenv.load();
}


// Compile Sass
gulp.task( 'sass', function() {
  return gulp.src( './sass/main.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( cleanCss() )
    .pipe( rename( 'build.css' ) )
    .pipe( gulp.dest( './server/public/css' ) );
} );


// Client side JS
gulp.task( 'browserify', function() {
  var bundler = browserify( {
      entries: [ './client/index.js' ],
      transform: [ babelify.configure( { presets: [ 'react' ] } ), envify ],
      extensions: [ '.jsx' ]
  } );

  return bundler.bundle()
    .pipe( source( 'build.js' ) )
    //.pipe( streamify( uglify() ) )
    .pipe( gulp.dest( './server/public/js' ) );
} );


// Watch files in development
gulp.task( 'watch', function() {
  gulp.watch( './sass/**/*.scss', [ 'sass' ] );
  gulp.watch( './client/**/*.js*', [ 'browserify' ] );
} );


// Default task list
gulp.task( 'default', [ 'sass', 'browserify', 'watch' ] );
gulp.task( 'build', [ 'sass', 'browserify' ] );
