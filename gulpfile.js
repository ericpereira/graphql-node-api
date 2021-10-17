const gulp = require('gulp')
const clean = require('gulp-clean')
const ts = require('gulp-typescript')

//usa as configurações do tsconfig
const tsProject = ts.createProject('tsconfig.json')

//cria uma tarefa com o gulp
gulp.task('scripts', ['static'], () => {
    const tsResult = tsProject.src()
        .pipe(tsProject()) //compila o projeto

    return tsResult.js
        .pipe(gulp.dest('dist')) //compila nessa pasta
})

gulp.task('static', ['clean'], () => {
    return gulp
        .src(['src/**/*.json'])
        .pipe(gulp.dest('dist'))
})

gulp.task('clean', () => {
    return gulp
        .src('dist')
        .pipe(clean())
})

gulp.task('build', ['scripts'])

gulp.task('watch', ['build'], () => {
    return gulp.watch(['src/**/*.ts', 'src/**/*.json'], ['build'])
})

gulp.task('default', ['watch'])