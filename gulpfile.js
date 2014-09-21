var gulp        = require("gulp");
var gutil       = require('gulp-util');
var less        = require("gulp-less");
var rimraf      = require('gulp-rimraf');
var filter      = require('gulp-filter');
var browserify  = require('gulp-browserify');
var uglify      = require('gulp-uglify');
var browserSync = require("browser-sync");

gulp.task('less', function () {
    return gulp.src('less/**/*.less')
        .pipe(less({sourcemap: true}))
        .pipe(gulp.dest('css'))// Write the CSS & Source maps
        .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));
});

// start server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('src/js/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'))
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


// use default task to launch BrowserSync and watch files
gulp.task('default', ['browser-sync'], function () {
    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("**/*.less", ['less', browserSync.reload]);
    gulp.watch(["*.js","partial/**/*.js"], ['js', browserSync.reload]);
    gulp.watch(["*.html","partial/**/*.html"], browserSync.reload);
});