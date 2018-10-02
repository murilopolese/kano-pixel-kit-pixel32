const runSequence = require('run-sequence')
const gulp = require('gulp')
const clean = require('gulp-clean')
const markdown = require('gulp-markdown')
const layout = require('gulp-layout')
const smoosher = require('gulp-smoosher')
const gzip = require('gulp-gzip')
const htmlmin = require('gulp-htmlmin')
const minifyInline = require('gulp-minify-inline')

gulp.task('clean', () => {
    return gulp.src('./dist')
        .pipe(clean())
})

gulp.task('build-terminal', () => {
    return gulp.src('./index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(smoosher())
        .pipe(minifyInline())
        .pipe(gulp.dest('./dist'))
        .pipe(gzip())
        .pipe(gulp.dest('./dist'))
})

gulp.task('build-docs', () => {
    return gulp.src('./docs.md')
        .pipe(markdown())
        .pipe(layout({
            layout: './docs.html',
            engine: 'ejs'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(smoosher())
        .pipe(minifyInline())
        .pipe(gulp.dest('./dist'))
        .pipe(gzip())
        .pipe(gulp.dest('./dist'))
})


gulp.task('default', (cb) => {
    runSequence('clean', ['build-terminal', 'build-docs'], cb)
})
