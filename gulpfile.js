'use strict';

var gulp =      require('gulp'), 
    plumber =   require('gulp-plumber'),
    uglify =    require('gulp-uglify'),
    rename =    require('gulp-rename'),
    
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    minifyCSS = require('gulp-minify-css'),

    imagemin =  require('gulp-imagemin'),
    clean =     require('gulp-clean'),
    gutil =     require('gulp-util'),
    source =    require('vinyl-source-stream'),
    buffer =    require('vinyl-buffer'),
    browserify = require('browserify'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    reload = browserSync.reload,
    babelify =  require('babelify'),
    gulpIf = require('gulp-if'),
    args = require('yargs').argv;

var viewsSrc = './views/*',
    publicSrc = './public/src/',
    publicDist = './public/dist/',
    assetsSrc = publicSrc + 'assets/',
    assetsDist = publicDist + 'assets/',
    jsSrc = publicSrc + 'js/',
    jsDist = publicDist + 'js/',
    mainJs = 'app.js',
    bundleJs = 'build.js',

    imageMinConfig = {
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    },

    isProduction = args.env === 'production',
    PORT = isProduction ? 80 : 1234;


gulp.task('serve', function () {
    nodemon({
        script: 'app.js',
        env: {
            'PORT': PORT,
            'NODE_ENV': 'development'
        }
    });
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: 'localhost:' + PORT
    });
});

function handleError (err) {  
    gutil.beep();
    console.log(err.message || err);
};

gulp.task('scripts', function () {
    
    return browserify({ sourceType: 'module', entries: [ jsSrc + mainJs], debug: true })
            .transform(babelify, { presets: [ 'es2015', 'react' ] })
            .bundle()
            .pipe(plumber(handleError))
            .pipe(source(mainJs))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(rename(bundleJs))
            .pipe(gulpIf(isProduction, uglify()))
            .pipe(gulp.dest(jsDist))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(jsDist))
            .on('end', function () {
                reload();
            });
});


gulp.task('css', function () {
    var processors = [
        autoprefixer({ 
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }),
        require('postcss-import'),
        require('postcss-simple-vars'),
        require('postcss-inline-comment'),
        require('postcss-nested'),
        require('postcss-simple-extend'),
        require('css-mqpacker'),
       // require('cssnano')
    ];

    return gulp.src([ assetsSrc + 'precss/**/main.css' ])
        .pipe(plumber(handleError))
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest( assetsDist + 'css' ))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src( assetsSrc + 'images/**/*' )
        .pipe(gulpIf(isProduction, imagemin(imageMinConfig)))
        .pipe(gulp.dest( assetsDist + 'images'));
});

gulp.task('watch', function () {
    gulp.watch(viewsSrc, reload);
    gulp.watch( jsSrc + '**/*.js', ['scripts']);
    gulp.watch( assetsSrc + 'precss/**/*.css', ['css']);
    gulp.watch( assetsSrc + 'images/**/*', ['images']);
});


gulp.task('clean', function () {
    return gulp.src([ publicDist + '*' ], { read: false })
            .pipe(clean());
});

gulp.task('build', ['clean'], function () {
    gulp.start('scripts', 'css', 'images');
});

gulp.task('default', ['serve', 'browser-sync', 'build', 'watch' ]);