"use strict";
const gulp = require("gulp"),
    watch = require("gulp-watch"),
    autoprefixer = require("gulp-autoprefixer"),
    sass = require("gulp-sass"),
    cssmin = require("gulp-cssnano"),
    sourceMaps = require("gulp-sourcemaps"),
    rigger = require("gulp-rigger"),
    rimraf = require("rimraf"),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    babel = require("gulp-babel"),
    minify = require("gulp-minify"),
    webpack = require("webpack-stream");

const buildFolderName = "./build/";
const srcFolderName = "./src/";
const path = {
    build: {
        html: buildFolderName,
        js: buildFolderName + "js/",
        css: buildFolderName + "css/",
        images: buildFolderName + "image/",
        fonts: buildFolderName + "css/fonts/",
    },
    src: {
        html: srcFolderName + "[^_]*.html",
        js: srcFolderName + "js/**/*.js",
        css: srcFolderName + "css/**/*.{scss,css}",
        images: srcFolderName + "image/**",
        fonts: srcFolderName + "css/fonts/**",
    },
    watch: {
        html: srcFolderName + "**/*.html",
        js: srcFolderName + "js/**/*.js",
        images: srcFolderName + "image/**/*.{png,jpg,svg,gif}",
        css: srcFolderName + "css/**/*.{scss,css}",
    },
    clean: buildFolderName,
};

const webpackConfig = {
    mode: "production", //'production'
    output: {
        filename: "script.js",
    },
    watch: false,
    devtool: "none", //'none'
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage",
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
};

gulp.task("webserver", function () {
    return browserSync({
        /*proxy: "my.web.local",*/
        host: "localhost",
        port: 3000,
        tunnel: false,
        server: "./build/",
    });
});
gulp.task("html:build", function () {
    return gulp
        .src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({ stream: true }));
});
gulp.task("images:build", function () {
    return gulp
        .src(path.src.images)
        .pipe(gulp.dest(path.build.images))
        .pipe(reload({ stream: true }));
});
gulp.task("fonts:build", function () {
    return gulp
        .src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({ stream: true }));
});
gulp.task("js:build", function () {
    return gulp
        .src(path.src.js)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({ stream: true }));
});

gulp.task("style:build", function () {
    return gulp
        .src(path.src.css)
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false,
            })
        )
        .pipe(cssmin())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({ stream: true }));
});

gulp.task(
    "build",
    gulp.parallel(
        "html:build",
        "js:build",
        "style:build",
        "images:build",
        "fonts:build"
    )
);

gulp.task("watch", function () {
    watch([path.watch.js], gulp.parallel("js:build"));
    watch([path.watch.html], gulp.parallel("html:build"));
    watch([path.watch.css], gulp.parallel("style:build"));
    watch([path.watch.images], gulp.parallel("images:build"));
});
gulp.task("clean", function (callback) {
    return rimraf(path.clean, callback);
});
gulp.task("default", gulp.parallel("build", "webserver", "watch"));
