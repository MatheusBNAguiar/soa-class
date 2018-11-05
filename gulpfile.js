const gulp = require('gulp')
const eslint = require('gulp-eslint')
const nodemon = require('gulp-nodemon')
const log = require('./src/utils/log')
const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs')
const git = require('gulp-git')
const bump = require('gulp-bump')
const filter = require('gulp-filter')
const tagVersion = require('gulp-tag-version')

gulp.task('lint', () => gulp.src(['**/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()))

gulp.task('develop', () => {
  const stream = nodemon({
    script: 'index.js',
    ext: 'js',
    tasks: ['lint']
  })

  stream
    .on('restart', () => {
      log('info', 'restarted!')
    })
    .on('crash', () => {
      log('error', 'Application has crashed!')
      stream.emit('restart', 10)
    })
})

gulp.task('docs', () => {
  const docs = jsdoc2md.renderSync({ files: '{,!(node_modules)/**/}*.{js,json}' })
  fs.writeFileSync('./docs/docs.md', docs)
})
