const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const sass = require('gulp-sass')
const uglify = require('gulp-uglify');

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);

var basePaths = {
	src: 'src/',
	dest: 'build/',
};
var paths = {
	images: {
		src: basePaths.src + 'img/',
		dest: basePaths.dest + 'img/'
	},
	sprite: {
		src: 'src/sprite/*',
		svg: 'img/sprite.svg',
		css: 'src/styles/_sprite.scss'
	},
	templates: {
		src: 'src/img/sprite/tpl/'
	}
};

function clear(){
	return del('build/*');
}

function script(){
	return gulp.src([
			'./src/js/script.js'
        ])
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(babel({
            presets: ['@babel/env']
		}))		
		.pipe(gulpif(isDev, sourcemaps.write()))	
		.pipe(gulp.dest('./build/js'))	
		.pipe(gulpif(isSync, browserSync.stream()));
}

function jsLib(){
	return gulp.src([
			'node_modules/slick-carousel/slick/slick.js',
			'node_modules/wow.js/dist/wow.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.reload({stream: true}))
}

function styles(){
	return gulp.src([
		 	'./src/styles/style.scss'
		])
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(sass({outputStyle: 'compressed'}))
		//.pipe(concat('style.css'))
		.pipe(gcmq())
		.pipe(autoprefixer({
			overrideBrowserslist:  ['last 8 versions'],
			cascade: false
		}))
		.on('error', console.error.bind(console))
		.pipe(gulpif(isProd, cleanCSS({
			level: 2
		})))
		.pipe(gulpif(isDev, sourcemaps.write()))
		.pipe(gulp.dest('./build/styles'))
		.pipe(gulpif(isSync, browserSync.stream()));
}

function cssLib(){
	return gulp.src([
	  'node_modules/normalize.css/normalize.css',
	  'node_modules/slick-carousel/slick/slick.css',
	  'node_modules/animate.css/animate.css',
	])
	  .pipe(concat('_libs.scss'))
	  .pipe(gulp.dest('src/styles'))
	  .pipe(browserSync.reload({stream: true}))
  }

function img(){
	return gulp.src('./src/img/**/*')
		.pipe(gulp.dest('./build/img'))
}

function html(){
	return gulp.src('./src/*.html')
		.pipe(gulp.dest('./build'))
		.pipe(gulpif(isSync, browserSync.stream()));
}

function watch(){
	if(isSync){
		browserSync.init({
	        server: {
	            baseDir: "./build/",
	        }
	    });
	}
	gulp.watch('./src/js/**/*.js', script);
	gulp.watch('./src/styles/**/*.scss', styles);
	gulp.watch('./src/**/*.html', html);
	gulp.watch('./src/img/**/*', img);
}


let build = gulp.series(clear, jsLib,  cssLib, 
	gulp.parallel(styles, script,  img, html)
);
gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));


