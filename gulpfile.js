var browserify = require('browserify'),
    concat = require('gulp-concat'),
    es6ify = require('es6ify'),
    gulp = require('gulp'),
    bower = require('gulp-bower'),
    csslint = require('gulp-csslint');
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    nodemon = require('gulp-nodemon'),
    path = require('path'),
    rev = require('gulp-rev'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    stringify = require('stringify'),
    uglify = require('gulp-uglify'),
    karma = require('gulp-karma'),
    exit = require('gulp-exit'),
    watchify = require('watchify'),
    protractor = require('gulp-protractor').protractor,
    mocha = require('gulp-mocha');
 
var paths = {
    public: 'public/**',
    jade: 'app/**/*.jade',
    scripts: 'app/**/*.js',
    staticFiles: [ 
      '!app/**/*.+(less|css|jade|js)',
      'app/**/*.*'
    ],
    libTest: ['lib/tests/service.spec.js'],
    unitTest: [
      'public/lib/ng-file-upload/angular-file-upload-shim.min.js',
      'public/lib/angular/angular.js',
      'public/lib/ng-file-upload/angular-file-upload.min.js',
      'public/lib/angular-mocks/angular-mocks.js',
      'public/lib/moment/moment.js',
      'public/lib/firebase/firebase.js',
      'public/lib/angular-aria/angular-aria.js',
      'public/lib/angular-ui-router/release/angular-ui-router.min.js',
      'public/lib/hammerjs/hammer.min.js',
      'public/lib/angular-material/angular-material.js',
      'public/lib/angular-route/angular-route.js',
      'public/lib/angular-cookies/angular-cookies.js',
      'public/lib/angular-bootstrap/ui-bootstrap.js',
      'public/lib/angular-animate/angular-animate.js',
      'public/lib/angular-sanitize/angular-sanitize.js',
      'public/lib/angularfire/dist/angularfire.js',
      'public/lib/lodash/dist/lodash.min.js',
      'public/js/index.js',
      'app/test/**/*.js'
    ],
    styles: 'app/styles/*.+(less|css)'
};

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib/'));
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('css', function() {
  gulp.src('app/styles/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('jade', function() {
    gulp.src('./app/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./public/'));
});

gulp.task('less', function() {
    gulp.src(paths.styles)
        .pipe(less({
            paths: [path.join(__dirname, 'styles')]
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('nodemon', function() {
    nodemon({
            script: 'index.js',
            ext: 'js',
            ignore: ['public/']
        })
        .on('change', ['lint'])
        .on('restart', function() {
            console.log('>> node restart');
        });
});


gulp.task('watch', function() {
    // livereload.listen({ port: 35729 });
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.styles, ['less']);
    gulp.watch(paths.scripts, ['browserify']);
    // gulp.watch(paths.public).on('change', livereload.changed);
});

gulp.task('static-files', function() {
   return gulp.src(paths.staticFiles)
    .pipe(gulp.dest('public/'));
});

gulp.task('watchify', function() {
    var bundler = watchify(browserify('./app/application.js', watchify.args));

    bundler.transform(stringify(['.html']));
    // bundler.transform(es6ify);

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            // log errors if they happen
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('index.js'))
            .pipe(gulp.dest('./public/js'));
    }

    return rebundle();
});

gulp.task('browserify', function() {
 var b = browserify();
 b.add('./app/application.js');
 return b.bundle()
 .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
 .on('error', gutil.log.bind(gutil, 'Browserify Error: in browserify gulp task'))
 .pipe(source('index.js'))
 .pipe(gulp.dest('./public/js'));
});

gulp.task('test:lib', function() {
    return gulp.src(paths.libTest)
        .pipe(mocha({
            reporter: 'dot',
            timeout: 60000
        }));
});

gulp.task('test:ui',['browserify'], function() {
    // Be sure to return the stream
    return gulp.src(paths.unitTest)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .pipe(exit());
});


gulp.task('protractor',function(cb){
  gulp.src(["./e2e/*_spec.js"])
  .pipe(protractor({
      configFile: "e2e/protractor.conf.js",
      args: ['--baseUrl', 'http://127.0.0.1:8000']
  }))    
  .on('error', function(e) {
        console.log(e);
  })
  .on('end', cb);    
});


gulp.task('test:one', ['browserify'], function() {

   var argv = process.argv.slice(3);
   console.log(argv);

   var testPaths = paths.unitTest;
   testPaths = testPaths.splice(0,testPaths.length-1);

   if(argv[0] === '--file' && argv[1] !== undefined) {
     testPaths.push('app/test/' + argv[1].trim());
   }

   return gulp.src(testPaths)
   .pipe(karma({
     configFile: 'karma.conf.js',
     action: 'run'
   }))
   .on('error', function(err) {
     // Make sure failed tests cause gulp to exit non-zero
     throw err;
   });
});

gulp.task('test',['test:ui','test:lib']);
gulp.task('build', ['jade', 'less', 'browserify','static-files','bower']);
gulp.task('production', ['nodemon','build']);
gulp.task('e2e',['protractor']);
gulp.task('heroku:production', ['build']);
gulp.task('default', ['nodemon', 'watch', 'build']);

