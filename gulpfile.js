var gulp = require('gulp');
var nodemon = require('gulp-nodemon')		//本地服务
var img = require('gulp-css-spriter');
var Proxy = require('gulp-connect-proxy');
var connect = require('gulp-connect');
//node本地服务
gulp.task('run',function(){
	nodemon({
		script:'index.js',
	})
})

gulp.task("server", function () {
    connect.server({
        root: "app",
        port: 8000,
        livereload: true,
        middleware: function (connect, opt) {
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    });
});

gulp.task('img',function(){
	return gulp.src('css/test.css')
		   .pipe(img({
			   "spriteSheet":'image/index.png',
			   "pathToSpriteSheetFromCSS":'image/index.png'
		   }))
		   .pipe(gulp.dest('css/test2.css'))
})