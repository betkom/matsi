 var browserify = require('browserify'),
    concat = require('gulp-concat'),
    es6ify = require('es6ify'),
    gulp = require('gulp'),
    bower = require('gulp-bower'),
    recess = require('gulp-recess'),
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
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
      'public/lib/angular/angular.min.js',
      'public/lib/ng-file-upload/ng-file-upload-shim.min.js',
      'public/lib/ng-file-upload/ng-file-upload.min.js',
      'public/lib/angular-mocks/angular-mocks.js',
      'public/lib/moment/moment.js',
      'public/lib/firebase/firebase.js',
      'public/lib/angular-aria/angular-aria.min.js',
      'public/lib/angular-ui-router/release/angular-ui-router.min.js',
      'public/lib/hammerjs/hammer.min.js',
      'public/lib/angular-material/angular-material.min.js',
      'public/lib/angular-cookies/angular-cookies.min.js',
      'public/lib/angular-bootstrap/ui-bootstrap.js',
      'public/lib/angular-animate/angular-animate.min.js',
      'public/lib/angular-sanitize/angular-sanitize.min.js',
      'public/lib/angularfire/dist/angularfire.min.js',
      'public/lib/lodash/lodash.min.js',
      'public/js/index.js',
      'app/test/**/*.js'
    ],
    styles: 'app/styles/*.+(less|css)'
};

gulp.task('bower', function(done) {
  return bower()
    .pipe(gulp.dest('public/lib/'));
    done();
});

gulp.task('lint:js', function(done) {
   gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
    done();
});

gulp.task('lint:less', function (done) {
    gulp.src('app/styles/*.less')
        .pipe(recess())
        .pipe(recess.reporter());
    done();
});

gulp.task('jade', function(done) {
    gulp.src('./app/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./public/'));
    done();
});

gulp.task('less', function(done) {
    gulp.src(paths.styles)
        .pipe(less({
            paths: [path.join(__dirname, 'styles')]
        }))
        .pipe(gulp.dest('./public/css'));
    done();
});

gulp.task('nodemon', function(done) {
    nodemon({
            script: 'index.js',
            ext: 'js',
            ignore: ['public/lib/**']
        })
        .on('change', ['lint'])
        .on('restart', function() {
            console.log('>> node restart');
        });
    done();
});


gulp.task('watch', function(done) {
    // livereload.listen({ port: 35729 });
    gulp.watch(paths.jade, gulp.series('jade'));
    gulp.watch(paths.styles, gulp.series('less'));
    gulp.watch(paths.scripts, gulp.series('browserify'));
    // gulp.watch(paths.public).on('change', livereload.changed);
    done();
});

gulp.task('static-files', function(done) {
   return gulp.src(paths.staticFiles)
    .pipe(gulp.dest('public/'));
    done();
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

gulp.task('browserify', function(done) {
 var b = browserify();
 b.add('./app/application.js');
 return b.bundle()
 .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
 .on('error', gutil.log.bind(gutil, 'Browserify Error: in browserify gulp task'))
 .pipe(source('index.js'))
 .pipe(gulp.dest('./public/js'));
 
 done();
});

gulp.task('test:lib', function(done) {
    return gulp.src(paths.libTest)
        .pipe(mocha({
            reporter: 'spec',
            timeout: 60000
        }));
    done();
});

gulp.task('test:ui', gulp.series('browserify', function(done) {
    // Be sure to return the stream
    return gulp.src(paths.unitTest)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .pipe(exit());
    done();
}));


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


gulp.task('test:one', gulp.series('browserify', function(done) {

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
   done()
}));

gulp.task('test', gulp.series('test:ui','test:lib'));
gulp.task('build', gulp.series('jade', 'less', 'browserify','static-files'));
gulp.task('production', gulp.series('nodemon','build'));
gulp.task('e2e', gulp.series('protractor'));
gulp.task('heroku:production', gulp.series('build'));
gulp.task('default', gulp.series('nodemon', 'watch', 'build', function(done) {
    done();
}));
gulp.task('lint', gulp.series('lint:less','lint:js'));

