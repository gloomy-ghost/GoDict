var fs = require('fs');
var pump = require('pump');
var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');

gulp.task('babel', function (cb) {
    pump([
        gulp.src('src/**/*.js'),
        babel(),
        gulp.dest('dist')
    ],
    cb
    );
});


gulp.task('browserify', function (cb) {
    pump([
        browserify()
        .transform(babelify)
            .require('./src/page/main-panel.js', { entry: true })
            .bundle(),
        fs.createWriteStream('./dist/bundle.js')
    ],
    cb
    );
});
