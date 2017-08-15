https://css-tricks.com/gulp-for-beginners/

# gulp for begginer

```bash
# npm install gulp -g

# create a package.json in root
**could be null file**

# npm init

# npm install gulp --save-dev

# npm install gulp-sass --save-dev

# commond.. 
* gulp sass 
**output css fcnpmile**

* gulp watch func
**gulp.watch() scss file changing ,and output css file immediately**
```

```bash
var gulp = require('gulp');
// 引入依赖包
var sass = require('gulp-sass');
gulp.task('sass', function(){
    //sass()方法用于转换sass到css
  return gulp.src('/app/scss/styles.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
});

//Watching Sass files for changes
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Other watchers
})
```