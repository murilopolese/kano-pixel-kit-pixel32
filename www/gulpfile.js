const runSequence = require('run-sequence')
const gulp = require('gulp')
const clean = require('gulp-clean')
const markdown = require('gulp-markdown')
const layout = require('gulp-layout')
const smoosher = require('gulp-smoosher')
const gzip = require('gulp-gzip')
const htmlmin = require('gulp-htmlmin')
const minifyInline = require('gulp-minify-inline')
const rename = require('gulp-rename')

gulp.task('clean', () => {
    return gulp.src('./dist')
        .pipe(clean())
})

gulp.task('build', () => {
    return gulp.src('./docs.md')
        .pipe(markdown())
        .pipe(layout({
            layout: './index.html',
            engine: 'ejs'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(smoosher())
        .pipe(minifyInline())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(gzip())
        .pipe(gulp.dest('./dist'))
})

gulp.task('default', (cb) => {
    runSequence('clean', ['build'], cb)
})
