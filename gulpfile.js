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
            'NODE_ENV': isProduction ? 'production' : 'development'
        }
    });
});

gulp.task('browser-sync', function() {
    if (!isProduction) {
        browserSync.init(null, {
            proxy: 'localhost:' + PORT,
            open: false,
            files: ['dist/assets/css/main.css', 'dist/js/build.js']
        });
    }
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
            .pipe(gulp.dest(jsDist));
});


gulp.task('css', function () {
    var processors = [
        require('postcss-import'),
        require('postcss-for'),
        require('postcss-math'),
        require('postcss-simple-vars'),
        require('postcss-simple-extend'),
        require('postcss-inline-comment'),
        require('postcss-discard-comments'),
        require('postcss-nested'),
        require('css-mqpacker'),
        autoprefixer({ 
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        })
    ];
        
    if (isProduction) {
        processors.push(require('cssnano'))
    }

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

gulp.task('js-watch', ['scripts'], browserSync.reload);

gulp.task('watch', function () {
    gulp.watch(viewsSrc, browserSync.reload);
    gulp.watch( jsSrc + '**/*.js', ['js-watch']);
    gulp.watch( assetsSrc + 'precss/**/*.css', ['css']);
    gulp.watch( assetsSrc + 'images/**/*', ['images']);
});


gulp.task('copy', function() {
    gulp.src(assetsSrc + 'fonts/*.{ttf,woff,eot,svg}')
        .pipe(gulp.dest( assetsDist + 'fonts'));

    gulp.src(jsSrc + 'vendor/**/*.js')
        .pipe(gulp.dest( jsDist + 'vendor'));
});

gulp.task('clean', function () {
    return gulp.src([ publicDist + '*' ], { read: false })
            .pipe(clean());
});

gulp.task('build', ['clean'], function () {
    gulp.start('scripts', 'css', 'images', 'copy');
});

gulp.task('hash', function () {
    var auth = require('./auth/auth'),
        email = args.email;

    console.log(auth.createValidHash(email));
});

gulp.task('default', ['serve', 'browser-sync', 'build', 'watch' ]);