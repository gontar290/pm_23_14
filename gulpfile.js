const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const file_include = require('gulp-file-include');

// Динамічний імпорт gulp-imagemin
let imagemin;

async function loadImagemin() {
    imagemin = (await import('gulp-imagemin')).default;
}

// HTML processing
function html() {
    return gulp.src('./app/*.html', { allowEmpty: true })
        .pipe(file_include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.stream());
}

// Compile Sass to CSS, add prefixes, and minify the code
function sassTask() {
    return gulp.src("./app/scss/*.scss", { allowEmpty: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
}

// Combine and minify JS files
function scripts() {
    return gulp.src("./app/js/*.js", { allowEmpty: true })
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./dist/js"))
        .pipe(browserSync.stream());
}

// Compress img
async function imgs() {
    await loadImagemin();
    return gulp.src("./app/img/*.{jpg,jpeg,png,gif}", { encoding: false })
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("./dist/img"))
        .pipe(browserSync.stream());
}

// Process data.json
function json() {
    return gulp.src("./app/json/*.json", { allowEmpty: true })
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./dist/json"))
        .pipe(browserSync.stream());
}

// Initialize BrowserSync server
function browserSyncInit(done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        cache: false
    });
    done();
}

// Watch for changes in files
function watchFiles() {
    gulp.watch("./app/*.html", html);
    gulp.watch("./app/scss/*.scss", sassTask);
    gulp.watch("./app/js/*.js", scripts);
    gulp.watch("./app/img/*.{jpg,jpeg,png,gif}", imgs);
    gulp.watch("./app/json/*.json", json);
}

exports.html = html;
exports.sass = sassTask;
exports.scripts = scripts;
exports.imgs = imgs;
exports.json = json;
exports.watch = gulp.parallel(watchFiles, browserSyncInit);

// Default task to run BrowserSync and watch for changes
exports.default = gulp.series(
    gulp.parallel(html, sassTask, scripts, imgs, json),
    gulp.parallel(watchFiles, browserSyncInit)
);

