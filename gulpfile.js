const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const copy = require('gulp-copy');

gulp.task('compile-sass', () => {
  return gulp.src('./src/scss/**/*.scss')
  .pipe(sass({outputSyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('./src/css'));
});

gulp.task('clean:css', () => {
  return del([
    'src/css'
  ]);
});

gulp.task('js', () => {
  return gulp.src(scripts)
  .pipe(concat('min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('src/js'));
});

gulp.task('copy', () => {
  return gulp.src(srcDirs)
  .pipe(copy('dist', {prefix: 1}))
  .pipe(gulp.dest('dist'));
})

gulp.task('sass', gulp.series(['clean:css', 'compile-sass']));
gulp.task('sass:watch', () => {gulp.watch('./src/scss/*.scss', ['sass']);});
gulp.task('build', gulp.series(['copy']));

const scripts = [
  "src/jsLib/jquery-min.js",
  "src/jsLib/popper.min.js",
  "src/jsLib/bootstrap.min.js",
  "src/jsLib/owl.carousel.js",
  "src/jsLib/jquery.mixitup.js",
  "src/jsLib/jquery.nav.js",
  "src/jsLib/scrolling-nav.js",
  "src/jsLib/jquery.easing.min.js",
  "src/jsLib/wow.js",
  "src/jsLib/jquery.counterup.min.js",
  "src/jsLib/nivo-lightbox.js",
  "src/jsLib/jquery.magnific-popup.min.js",
  "src/jsLib/waypoints.min.js",
  "src/jsLib/form-validator.min.js",
  "src/jsLib/contact-form-script.js",
  "src/jsLib/main.js"
];

const srcDirs = [
  "src/css/*.*",
  "src/fonts/*.*",
  "src/img/**/*.*",
  "src/js/*.*",
  "src/index.html"
];