const { watch, task, src, dest, series } = require('gulp')

const gulpLess = require('gulp-less')
const gulpLessChanged = require('gulp-less-changed')


function less() {
  return src('./*.less')
    .pipe(dest('./less'))
    .pipe(gulpLessChanged())
    .pipe(gulpLess({
      paths: ['./less/*.less']
    }))
    .pipe(dest('./dist'))
}

watch(['./*.less'], less);

task('default', less)
