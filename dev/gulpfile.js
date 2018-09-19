var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	newer = require('gulp-newer'),
	browserSync = require("browser-sync"),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	include = require('gulp-html-tag-include'),
	bourbon = require('node-bourbon'),
	del = require('del'),
	reload = browserSync.reload;

var path = {
	src: {
		html: 'app/**/*.html',
		inc: 'app/inc/**/*.html',
		js: 'app/js/*.js',
		js_inc: 'app/js/inc/**/*.js',
		style: {
			sass: 'app/scss/**/*.{scss,sass}'
		},
		img:	 'app/images/**/*.*',
		fonts: 'app/fonts/**/*.*'
	},
	build: {
		html:	'../markup/',
		js:		'../markup/js/',
		css:	 '../markup/css/',
		img:	 '../markup/images/',
		fonts: '../markup/fonts/'
	}
};

var config = {
	server: {
		baseDir: "../markup"
	},
	port: 9000,
	logPrefix: "dev-markup"
};

gulp.task('webserver', function () {
	browserSync(config);
	gulp.watch([path.src.html, path.src.inc]).on('change', reload);
});

gulp.task('watch', ['build','webserver'], function() {
	gulp.watch(path.src.style.sass, ['styles']);
	gulp.watch([path.src.html, path.src.inc], ['html:build']);
	gulp.watch([path.src.js], ['js:build']);
	gulp.watch([path.src.img], ['image:build']);
	gulp.watch([path.src.fonts], ['fonts:build']);
});

function swallowError(error) {
	console.log(error.toString());
	this.emit('end');
}

gulp.task('styles', function() {
	gulp.src(path.src.style.sass)
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: bourbon.includePaths
		})).on('error', swallowError)
		.pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('html:build', function() {
	return gulp.src([path.src.html, '!'+path.src.inc]) /* except src.inc !!!!!!!!!!!!!! */
		.pipe(rigger())
		.pipe(include())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('js:build', function() {
	return gulp.src([path.src.js, '!'+path.src.js_inc]) /* except src.js_inc !!!!!!!!!!!!!! */
		.pipe(rigger())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
	return gulp.src(path.src.img)
		.pipe(newer(path.build.img))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
	return gulp.src(path.src.fonts/*, {read: false}*/)
		.pipe(gulp.dest(path.build.fonts))
		.pipe(reload({stream: true}));
});

gulp.task('removedist', function() {
	return del.sync(path.build.html, {force: true});
});

gulp.task('build', [
	'removedist',
	'html:build',
	'js:build',
	'styles',
	'fonts:build',
	'image:build'
]);

gulp.task('default', ['watch']);