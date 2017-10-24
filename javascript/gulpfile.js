/**
 * Created by Administrator on 2017/2/9.
 */
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    babel = require("gulp-babel"),
    sass = require('gulp-ruby-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    uglify=require('gulp-uglify'),
    browserSync = require('browser-sync'),
    nano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    concat  = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean');


//如果又其他端口开启服务，使用$ browser-sync start --proxy "http://localhost:3011/" 可以代理其他端口
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        },
        ui: {
            port: 4002,/*PC端的UI控制界面端口*/
            weinre: {
                port: 4003/*手机端的UI控制界面端口*/
            }
        },
        port: 4001,/*手机端是192.168.1.110.4001*/
    });
});
gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.reload({stream: true}));//自动刷新
});
gulp.task('sass', function() {
    sass('./src/sass/*.scss')
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(['last 2 versions','iOS >= 7', 'Android >= 4.1'])]))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(nano({
            zindex: false,
            autoprefixer: false
        }))
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest('./public/css'))
});
gulp.task('css', function() {
    gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('js', function() {
    gulp.src([
        './src/js/*.js',
        // './src/js/IIFE/*.js',
        // './src/js/commonJs/*.js'
        './src/js/AMD/*.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'))
        .pipe(sourcemaps.write())
        .pipe(browserSync.reload({stream: true}))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest('./public/js'))
});
gulp.task('dist-js', function() {
    gulp.src('./src/dist-js/*.js')
        .pipe(gulp.dest('./public/js'))
});
gulp.task('image', function() {
    gulp.src('./src/image/*.{png,jpeg,jpg,gif,svg,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/image'))
});
gulp.task('release', ['sass','css', 'html','js','dist-js','image']);

gulp.task('watch', function() {
    gulp.watch('src/sass/*.scss', ['sass']); //监控scss文件
    gulp.watch('src/css/*.css', ['css']); //监控css文件
    gulp.watch(['src/*.html'], ['html']); //监控html文件
    gulp.watch([
        'src/js/*.js',
        // 'src/js/IIFE/*.js',
        // './src/js/commonJs/*.js',
        './src/js/AMD/*.js',
    ], ['js']); //监控js文件
    gulp.watch(['src/image/*'], ['image']); //监控图片文件
});

gulp.task('clean', function(){
    return gulp.src('./public/')
        .pipe(clean());
});

gulp.task('default', ['clean'],function () {
    gulp.start('release', 'server','watch');
});