/*Install gulp and gulp plugins your system... You can copy and paste the lines starting with npm install below.*/
/*npm install --save-dev gulp gulp-uglify gulp-uncss gulp-concat gulp-clean-css gulp-strip-comments files-exist gulp-autoprefixer gulp-sourcemaps gulp-sass gulp-config gulp-jsonlint*/
/**
 * Variables
 * @type {String}
 */
var newCssArray = [],
        myJsArray = [],
        myCommonJsArray = [],
        i, fullJs,
        header = "header",
        footer = "footer";
// Set gulp and gulp plugins variable introduce
var gulp = require('gulp'),
        uglify = require('gulp-uglify'),
        config = require('C:/Users/yasindemir/Desktop/GulpSassRenderFromJsonApplication/myAssetsJson.json'),
        concat = require('gulp-concat'),
        cleanCss = require('gulp-clean-css'),
        typescript = require('gulp-typescript'),
        gutil = require('gulp-util'),
        strip = require('gulp-strip-comments'),
        filesExist = require('files-exist'),
        autoprefixer = require('gulp-autoprefixer'),
        sourcemaps = require('gulp-sourcemaps'),
        jsonlint = require("gulp-jsonlint"),
        sass = require('gulp-sass');

// run if sass variable is true
function sassSettingsRender(obj, defaultPathsettings) {
    'use strict';
        var newCssArray = [];
    if(obj.source.css.length > 0) {
        for (i = 0; i < obj.source.css.length; i++) {
            newCssArray.push(defaultPathsettings.assetsDir + defaultPathsettings.sassPath + obj.source.css[i]);
        }
        return gulp.src(filesExist(newCssArray))
                .pipe(sourcemaps.init())
                .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
                .pipe(concat(obj.source.CSSOutPuthfileName))
                .pipe(cleanCss({
                    compatibility: 'ie8',
                    restructuring: false,
                    processImport: false,
                    inline: ['none']
                }))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(defaultPathsettings.assetsDir + defaultPathsettings.cssPath + obj.destination));
    }
}
/**
 * JS Configurations
 */
function jsOptimization(obj, defaultPathsettings, type) {
    var     myJsArray = [],
            myCommonJsArray = [],
            fullJs = [];
    if (type == "header") {
        if (obj.source.js.header.length > 0) {
            for (i = 0; i < obj.source.js.header.length; i++) {
                myJsArray.push(defaultPathsettings.assetsJsDir + obj.source.js.header[i]);
            }
        gulp.src(filesExist(myJsArray))
                .pipe(concat(obj.source.js.headerOutputhFileName))
                .pipe(strip())
                .pipe(typescript({
                    target: "es5",
                    allowJs: true,
                    module: "commonjs",
                    moduleResolution: "node"
                }))
                .pipe(uglify({
                    compress: {
                        hoist_funs: false
                    }
                }))
                .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
                .pipe(gulp.dest(defaultPathsettings.assetsJsDir + obj.destination));
        }
    } else if (type == "footer") {
        //js compile
        if (obj.source.js.footer.length > 0) {
            for (i = 0; i < obj.source.js.footer.length; i++) {
                myJsArray.push(defaultPathsettings.assetsJsDir + obj.source.js.footer[i]);
            }
        }
         gulp.src(filesExist(myJsArray))
                .pipe(concat(obj.source.js.footerOutputhFileName))
                .pipe(strip())
                .pipe(typescript({
                    target: "es5",
                    allowJs: true,
                    module: "commonjs",
                    moduleResolution: "node"
                }))
                .pipe(uglify({
                    compress: {
                        hoist_funs: false
                    }
                }))
                .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
                .pipe(gulp.dest(defaultPathsettings.assetsJsDir + obj.destination));
    }
}

function readSourceSettings(obj, defaultPathsettings) {
    if (typeof obj === 'undefined') {
        return false;
    }
    sassSettingsRender(obj, defaultPathsettings);
    jsOptimization(obj, defaultPathsettings, header);
    jsOptimization(obj, defaultPathsettings, footer);
}
function jsonReporter(file){
    log('File ' + file.path + ' is not valid JSON.');
}
gulp.task('default', function () {
    gulp.src('*.json')
    .pipe(jsonlint.failOnError())
    .pipe(jsonlint.reporter(jsonReporter));
    for (var obj in config.options) {
        readSourceSettings(config.options[obj], config.defaultPathsettings);
    }
});

