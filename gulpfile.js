var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var prefix       = require('gulp-autoprefixer');
var cp           = require('child_process');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var cssnano      = require('gulp-cssnano');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('_scss/main.sass')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

/**
 * Concat JS files
 */
gulp.task('scripts', function() {
    return gulp.src(['_scripts/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('_site/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('js'));;
  });

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_scss/*/*.sass', { interval: 500 }, ['sass']);
    gulp.watch('_scripts/*/*.js', { interval: 500 }, ['scripts']);
    gulp.watch(['*.md', '*/*/*.md',  '*/*.md', '*.html', '*/*/*.html', '*/*.html', '_layouts/*/*.html', '_posts/*/*', '_includes/*/*'], { interval: 500 }, ['jekyll-rebuild']);
});

gulp.task('sass-prod', function () {
    return gulp.src('_sass/styles.scss')
    .pipe(sass({
      includePaths: ['scss'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cssnano())
    .pipe(gulp.dest('_site/css'))
    .pipe(gulp.dest('css'));
  });

  gulp.task('scripts-prod', function() {
    return gulp.src(['_scripts/*/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('_site/js'))
    .pipe(gulp.dest('js'));;
  });

  gulp.task('jekyll-prod', function (done){
    //var jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";
    return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
gulp.task('build', ['scripts-prod', 'sass-prod', 'jekyll-prod']);
