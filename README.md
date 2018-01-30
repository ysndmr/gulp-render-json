# gulp-render-json

This application allows you to build all of your assets files with a single json file, generate a project with multiple files and files with a single JavaScript function.

## Getting Started

First of all, you must install Node.js and install the gulp command

### Prerequisites and Installing

At the top of the GulpFile.js file, you can load the gulp and all components from the comment line in one go.

```
npm install --save-dev gulp gulp-uglify gulp-concat gulp-clean-css gulp-strip-comments files-exist gulp-autoprefixer gulp-sourcemaps gulp-sass gulp-config
```


You should then change the filenames added as examples in myAssetsJson.json file to your own filenames. (For the moment, these JavaScript files are available.)

```
{
  "options": [
    {
      "project": "yourProjectName",
      "source": {
        "css": [
          "your.scss"
        ],
        "CSSOutPuthfileName": "output-mysass.css", // what you want the your output css name
        "js": {
          "header": [
            "your1.js",
            "your2.js",
            "your3.js"
          ],
          "headerOutputhFileName": "output-myjs-header.js", //what you want the your output js name
          "footer": [
             "your1.js",
            "your2.js",
            "your3.js",
          ],
          "footerOutputhFileName": "output-myjs-footer.js"  //what you want the your output js name
        }
      },
      "destination": "yourProjectDestinion"
    }
  ],
  "defaultPathsettings": {
    "cssPath": "css/",
    "jsPath": "js/",
    "assetsDir": "yourstaticpath/sass/",
    "assetsJsDir": "yourstaticpath/js"
  }
}
```

* All the names in here can change. Everything is up to you.

After all this, all you need to do is write 'gulp' the command screen and check the resulting files.

## What does script do?

* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - Install package with NPM
* [gulp-concat](https://www.npmjs.com/package/gulp-concat) - Install package with NPM
* [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-cs) - Install package with NPM
* [gulp-strip-comments](https://www.npmjs.com/package/gulp-strip-comments) - Install package with NPM
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - Install package with NPM
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - Install package with NPM
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) - Install package with NPM
* [gulp-config](https://www.npmjs.com/package/gulp-config) - Install package with NPM

## How to install?
```
npm install gulp-render-json --save-dev
```

## Author

* **Yasin Demir** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

