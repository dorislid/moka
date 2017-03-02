    'use strict'
    var gulp = require('gulp');
    var maps= require('gulp-sourcemaps');
    var watch = require('gulp-watch');
    var sass = require('gulp-sass');
    var autoprefixer = require('gulp-autoprefixer');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var order = require('gulp-order');
    var livereload = require('livereload');
    var serverLive = livereload.createServer({
        applyCSSLive:false
    });

    var path={
        html:['src/*.html'],
        img:['src/img/**/*.*'],
        sass:['src/style/style.scss'],
        libs:['src/pub/libs/*.js'],
        load_utils:['src/pub/*.js']
    };

    /***************build***************/
     gulp.task('build',['html','img','sass','libs','load_utils']);


    /***************html***************/
    gulp.task('html',function(){
        return gulp.src(path.html)
            .pipe(gulp.dest('build'))
    });

    /***************img***************/
     gulp.task('img',function(){
        return gulp.src(path.img)
            .pipe(gulp.dest('build/img'))
    });


    /***************sass***************/
    gulp.task('sass', function() {
        return gulp.src(path.sass)
            .pipe(maps.init())
            .pipe(sass({
                outputStyle: 'compressed'
            }))  //compact  compressed
            .pipe(maps.write('./'))
            .pipe(gulp.dest('./build/style'))
    });

    /***************js***************/
    gulp.task('libs',function() {
        return gulp.src(path.libs)
            .pipe(order(['react.min.js', 'react-dom.js','redux.min.js','promise.min.js']))
            .pipe(concat('lib_bundle.js'))
            .pipe(gulp.dest('./build/script/pub'))
    });

    gulp.task('load_utils',function(){
        return gulp.src(path.load_utils)
            .pipe(maps.init())
            .pipe(uglify())
            .pipe(maps.write('./'))
            .pipe(gulp.dest('./build/script/pub'))
    });

    /***************watch***************/
    gulp.task('watch',['html','img','sass','libs','load_utils'],function(){

        serverLive.watch(__dirname + "/build/script/*.js");
        serverLive.watch(__dirname + "/build/style/*.css");

        gulp.watch(path.html, ['html']);
        gulp.watch(path.img, ['img']);
        gulp.watch('src/style/*.scss', ['sass']);
        gulp.watch(path.libs, ['libs']);
        gulp.watch(path.load_utils, ['load_utils']);
    });