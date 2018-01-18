/*Install gulp and gulp plugins your system... You can copy and paste the lines starting with npm install below.*/
/*npm install --save-dev gulp gulp-uglify gulp-concat gulp-clean-css gulp-strip-comments files-exist gulp-autoprefixer gulp-sourcemaps gulp-sass gulp-config*/
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
        strip = require('gulp-strip-comments'),
        filesExist = require('files-exist'),
        autoprefixer = require('gulp-autoprefixer'),
        sourcemaps = require('gulp-sourcemaps'),
        sass = require('gulp-sass');

// run if sass variable is true
function sassSettingsRender(obj, defaultPathsettings) {
    'use strict';
        var newCssArray = [];
    if(obj.source.css.length > 0) {
        for (i = 0; i < obj.source.css.length; i++) {
            newCssArray.push(defaultPathsettings.assetsDir + obj.source.css[i]);
        }
        return gulp.src(filesExist(newCssArray))
                .pipe(sourcemaps.init())
                .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
                .pipe(sourcemaps.write('./maps'))
                .pipe(autoprefixer())
                .pipe(concat(obj.source.CSSOutPuthfileName))
                .pipe(cleanCss({
                    compatibility: 'ie8',
                    restructuring: false,
                    processImport: false,
                    inline: ['none']
                }))
                .pipe(gulp.dest(defaultPathsettings.assetsDir + defaultPathsettings.customV3 + obj.destination));
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
                .pipe(uglify({
                    preserveComments: 'license',
                    compress: {
                        hoist_funs: false
                    }
                }))
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
                .pipe(uglify({
                    preserveComments: 'license',
                    compress: {
                        hoist_funs: false
                    }
                }))
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
gulp.task('default', function () {
    for (var obj in config.options) {
        readSourceSettings(config.options[obj], config.defaultPathsettings);
    }
});

