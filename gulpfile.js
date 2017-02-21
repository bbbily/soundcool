const gulp = require("gulp");
const concat = require("gulp-concat");
const babel = require("gulp-babel");

gulp.task("js", function() {
  gulp.src("./js/**/*.js")
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(concat("bundle.js"))
  .pipe(gulp.dest("./dist"))
})
