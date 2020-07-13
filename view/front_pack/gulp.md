# Gulp
> [参考](https://css-tricks.com/gulp-for-beginners/)

#### 1.安装
```bash
# 全局安装gulp
 npm install gulp -g
```

```bash
npm init
npm install gulp --save-dev
npm install gulp-sass --save-dev
```

#### 2.命令
```bash
#	编译指定路径下的sass文件为css文件
gulp sass

# 监听指定路径下[.scss]文件变化,并立刻输出最新的css文件
gulp watch
```

#### 3.gulpfile.js
```js
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
  // gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/sass/*.scss', gulp.series('sass')); // gulp 4.0
  // Other watchers
})
```
