var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');

function swallowError (error) {
    //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}


gulp.task('build', function () {
    browserify({
        entries: './src/app.jsx',
        extensions: ['.jsx'],
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(plumber({ errorHandler: swallowError }))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});