var gulp = require('gulp'),
    express = require('express'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    concat = require('gulp-concat'),
    scsslint = require('gulp-scss-lint');

var outputDir, 
    sassStyle,
    sassSources,
    sassWatch,
    fontSources, 
    htmlSources,
    jsSources, 
    cssSources;

outputDir = 'dist/';
sassStyle = 'expanded';
sassSources = [
    'app/app.scss'
];
sassWatch = [
    'app/app.scss',
    'app/scss/*.scss',
];
jsSources = [ 
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',     
    'library/jInvertScroll/dist/js/jquery.jInvertScroll.js', 
    'app/js/scroll.js'
];
cssSources = [ 
    'library/jInvertScroll/dist/css/jInvertScroll.css', 
];
fontSources = [
    'node_modules/font-awesome/fonts/',
    'node_modules/bootstrap-sass/assets/fonts/'
];
htmlSources = [
    'app/index.html'
];

gulp.task('scss', function() { 
    gulp.src(sassSources) 
        .pipe(compass({ 
            sass: 'app', 
            style: sassStyle 
        }) 
            .on('error', gutil.log))
        .pipe(minifycss())
        .pipe(gulp.dest(outputDir + 'css')) 
        .pipe(connect.reload()) 
});

gulp.task('js', function() { 
    gulp.src(jsSources) 
        .pipe(concat('script.js'))
        .pipe(uglify())
            .on('error', gutil.log)
        .pipe(gulp.dest(outputDir + 'js')) 
        .pipe(connect.reload()) 
});

gulp.task('css', function() { 
    gulp.src(cssSources)
        .pipe(minifycss())
        .pipe(gulp.dest(outputDir + 'css')); 

});

gulp.task('html', function() {
    gulp.src(htmlSources)
        .pipe(gulp.dest(outputDir));
});

gulp.task('fonts', function() { 
    gulp.src('node_modules/font-awesome/fonts/*.*') 
        .pipe(gulp.dest(outputDir + 'fonts'));
    gulp.src('node_modules/bootstrap-sass/assets/fonts/**/*')
        .pipe(gulp.dest(outputDir + 'fonts'));
  });

  gulp.task('docs', function() { 
    gulp.src('app/docs/*.*') 
        .pipe(gulp.dest(outputDir + 'docs')); 
});

gulp.task('images', function() { 
    gulp.src('app/img/*.*')
        //.pipe(imagemin({
        //    progressive: true,
        //    svgoPlugins: [{ removeViewBox: false }],
        //    use: [pngcrush()]
        //}))
            .on('error', gutil.log)
        .pipe(gulp.dest(outputDir + 'img')); 
});

gulp.task('scsslint', function() {
    gulp.src(sassWatch)
        .pipe(scsslint({
            'config': '.scss-lint.yml',
            'reporterOutput': 'scssReport.json'
        }))
        .on('error', gutil.log)
});

gulp.task('watch', function() {
    gulp.watch(sassWatch, ['scsslint']);
    gulp.watch(sassWatch, ['scss']);
    gulp.watch(jsSources, ['js']); 
    gulp.watch(cssSources, ['css']); 
    gulp.watch(htmlSources, ['html']);
});

  gulp.task('connect', function() { 
      connect.server({ 
          root: outputDir, 
          livereload: true 
      });
 });

gulp.task('default', [
    'scsslint',
    'scss',
    'js',
    'css',
    'html',
    'fonts',
    'docs',
    'images',
    'connect',
    'watch']
);