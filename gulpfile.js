// ####################### PATHS ########################
const name = "%%project_name%%"

const wp = false

const path = {
    inputs:{
        styles: "dev/stylesheets/**/*.sass",
        js: "dev/javascript/"
    },
    outputs:{
        styles: "www/assets/stylesheets/",
        js: "www/assets/javascript/",
    }
}


// ####################### REQUIRES #######################
const gulp       = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel        = require('gulp-babel'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    livereload   = require('gulp-livereload')


// ####################### TASKS #########################
gulp.task('styles',  () =>
gulp.src(path.inputs.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 10 versions', '> 1%', 'Explorer 9'],
        cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.outputs.styles))
    .pipe(livereload())
)

gulp.task('vendorsJs', () =>
gulp.src(path.inputs.js + 'vendor/**/*.js')
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(gulp.dest(path.outputs.js))
    .pipe(livereload())
)

gulp.task('scriptsJs', () =>
gulp.src(path.inputs.js + 'app/**/*.js')
    // .pipe(babel({presets: ['es2015']}))
    .on('error', swallowError)
    .pipe(concat('app.min.js'))
    .on('error', swallowError)
    //        .pipe(uglify())
    .pipe(gulp.dest(path.outputs.js))
    .pipe(livereload())
)

gulp.task('watch', () => {
    livereload.listen()
    gulp.watch(path.inputs.styles, ['styles'])
    gulp.watch(path.inputs.js + 'app/**/*.js', ['scriptsJs'])
    gulp.watch(path.inputs.js + 'vendor/**/*.js', ['vendorsJs'])
})

gulp.task('default', ['styles','vendorsJs','scriptsJs'])

function swallowError (error) {
    console.log(error.toString())
    this.emit('end')
}