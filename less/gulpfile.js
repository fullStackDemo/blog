const { watch, task, src, dest, series } = require('gulp')

const gulpLess = require('gulp-less')


function less() {
  return src('./*.less')
    .pipe(dest('./less'))
    .pipe(gulpLess({
      paths: ['./less/*.less']
    }))
    .pipe(dest('./dist'))
}

watch(['./*.less'], less);

task('default', less)
