/**
 * Created by Administrator on 2017/4/24.
 */
var gulp = require("gulp");       //引入gulp模块
var $ = require("gulp-load-plugins")();    //引入gulp-load-plugins模块。有了这个模块引用gulp其他模块可以通过$引用，不用定义变量
var open = require("open");       //引入open模块
//声明一个全局变量，用来定义目录路径
var app ={
    srcPath: "src/",      //源文件目录
    devPath: "bulid/",     //整合后的文件，开发环境用的文件放置目录
    prdPath: "dist/"      //用于生产部署
};

//拷贝文件
/*
 gulp.task() 定制任务,第一个参数为任务，第二个参数为回调函数，函数内时执行的逻辑
 gulp.src（）读取文件
 gulp.pipe() 操作
 gulp.dest() 生成文件
 **   表示对当前文件进行深度遍历

 gulp-load-plugins模块: 本插件的功能就是帮你自动require你在package.json
            中声明的依赖。只要一句var $ = require('gulp-load-plugins')()，
            则package.json中声明的gulp-或gulp.开头的插件就会自动被放在变量$下面。
 gulp-plumber模块:       编译css或js时，一旦发生错误，不会立即中断线程，而只是抛出错误
 gulp-less模块:          编译less
 gulp-cssmin模块:        压缩css文件
 gulp-concat模块:        合并js文件
 gulp-uglify模块:        压缩js文件
 gulp-clean模块:         清楚
 gulp-imagemin模块:      图片压缩
 gulp-connect模块:      它不仅能够自动启动一个web服务器，还能实现上述的热加载的功能
 open模块:
*/

//lib文件   拷贝第三方依赖文件
gulp.task("lib",function(){
    gulp.src("bower_components/**/*.js")
        .pipe(gulp.dest(app.devPath + "vendor"))      //拷贝到app.devPath路径下，并命名为vendor
        .pipe(gulp.dest(app.prdPath + "vendor"))      //拷贝到app.prdPath路径下，并命名为vendor
        .pipe($.connect.reload());
});

//拷贝html文件
gulp.task("html",function(){
    gulp.src(app.srcPath + "**/*.html")
        .pipe(gulp.dest(app.devPath))       //拷贝到开发目录
        .pipe(gulp.dest(app.prdPath))       //拷贝到生产目录
        .pipe($.connect.reload());
});

//拷贝json文件
gulp.task("json",function(){
    gulp.src(app.srcPath + "data/**/*.json")
        .pipe(gulp.dest(app.devPath + "data"))
        .pipe(gulp.dest(app.prdPath + "data"))
        .pipe($.connect.reload());
});

//编译less文件，生成到开发目录和生产环境
gulp.task("less",function(){
    gulp.src(app.srcPath + "style/index.less")
        .pipe($.plumber())
        .pipe($.less())     //调用gulp-less模块进行编译
        .pipe(gulp.dest(app.devPath + "css"))    //编译完成后，放到开发目录
        .pipe($.cssmin())   //用于生产环境最好压缩下css文件，使用gulp-cssmin模块
        .pipe(gulp.dest(app.prdPath + "css"))   //拷贝到生产环境
        .pipe($.connect.reload());
});

//js文件
gulp.task("js",function(){
   gulp.src(app.srcPath + "script/**/*.js")
       .pipe($.plumber())
       .pipe($.concat("index.js"))               //合并js文件
       .pipe(gulp.dest(app.devPath + "js"))
       .pipe($.uglify())       //发布到生产环境前，用gulp-uglify进行压缩
       .pipe(gulp.dest(app.prdPath + "js"))
       .pipe($.connect.reload());                 //用gulp-server模块的reload（）自动刷新，重新加载
});

//image文件
gulp.task("image",function(){
    gulp.src(app.srcPath + "image/**/*")
        .pipe(gulp.dest(app.devPath + "image"))
        .pipe($.imagemin())            //发布到生产环境前，用gulp-imagemin进行图片压缩
        .pipe(gulp.dest(app.prdPath + "image"))
        .pipe($.connect.reload());
});

//写一个总的任务，包含之前定义的任务,打包整个项目时，只需要执行bulid任务
gulp.task("bulid",["lib","html","json","js","image","less"]);

//每次编译对旧文件进行清楚               任务发布完成后，对之前的目录进行清楚，避免对当前文件造成影响
gulp.task("clean",function(){
    gulp.src([app.devPath,app.prdPath])
        .pipe($.clean());
});

//编写一个服务
gulp.task("serve",["bulid"],function(){
    $.connect.server({              //用gulp-server模块的server（）创建web服务器
        root:[app.devPath],       //找到路径     读取路径
        livereload:true,          //针对高级浏览器，自动刷新
        port:6644                  //指定端口
    });

    open("http://localhost:6644");      //在指定窗口运行，自动打开浏览器，网址

    gulp.watch("bower_components/**/*",["lib"]);         //监控文件，文件修改时，自动执行对应任务
    gulp.watch(app.srcPath + "**/*.html",["html"]);       //修改源文件时自动执行构建任务
    gulp.watch(app.srcPath + "data/**/*.json",["json"]);
    gulp.watch(app.srcPath + "style/**/*.less",["less"]);
    gulp.watch(app.srcPath + "script**/*.js",["js"]);
    gulp.watch(app.srcPath + "image/**/*",["image"]);
});

gulp.task('default', ['serve']);

