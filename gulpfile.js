var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var del = require('del');


gulp.task('clean', function() {
  return del('./app/css/**/*');
})

gulp.task('sass', ['clean'], function(){
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});


gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/sass/**/*.scss', ['sass']); 
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('default', ['browserSync', 'sass']);