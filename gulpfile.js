// External dependencies
const dotenv = require( 'dotenv' );
const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const cleanCss = require( 'gulp-clean-css' );
const rename = require( 'gulp-rename' );
const source = require( 'vinyl-source-stream' );
const browserify = require( 'browserify' );
const watchify = require( 'watchify' );
const babelify = require( 'babelify' );
const uglify = require( 'gulp-uglify' );
const streamify = require( 'gulp-streamify' );
const envify = require( 'envify' );


const environmentName = process.env.NODE_ENV || process.env.node_env || 'development';


// Load .env in development environment
if ( environmentName == 'development' ) {
  dotenv.load();
}


// Compile Sass
gulp.task( 'sass', () => {
  return gulp.src( './sass/main.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( cleanCss() )
    .pipe( rename( 'build.css' ) )
    .pipe( gulp.dest( './server/public/css' ) );
} );


// Client side JS
gulp.task( 'browserify', () => {

  const bundler = browserify( {
      entries: [ './client/index.js' ],
      transform: [ babelify.configure( { presets: [ 'react' ] } ), envify ],
      extensions: [ '.jsx' ]
  } );

  return bundler.bundle()
    .pipe( source( 'build.js' ) )
    .pipe( streamify( uglify() ) )
    .pipe( gulp.dest( './server/public/js' ) );
} );


// Watch files in development
gulp.task( 'watch', () => {
  gulp.watch( './sass/**/*.scss', [ 'sass' ] );
  gulp.watch( './client/**/*.js*', [ 'browserify' ] );
} );


// Default task list
gulp.task( 'default', [ 'sass', 'browserify', 'watch' ] );
gulp.task( 'build', [ 'sass', 'browserify' ] );
