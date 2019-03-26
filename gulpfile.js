let gulp = require('gulp'), //Gulp
    less = require('gulp-less'), //Плагин компиляции Less-файлов
    uglify = require('gulp-uglify'), //Плагин сжатия JS-файлов
    minifyCss = require('gulp-clean-css'), //Плагин минификации CSS-файлов
    rename = require('gulp-rename'), //Плагин переименования файлов
    autoprefixer = require('gulp-autoprefixer'), //Плагин добавления CSS-префикcов
    sourcemaps = require('gulp-sourcemaps'), //Плагин создания карты файлов
    rigger = require('gulp-rigger'), //Плагин объединения файлов
    rimraf = require('rimraf'), //Плагин удаления файлов и папок
    babel = require('gulp-babel'), //Плагин компиляции скриптов для старых браузеров
    browserSync = require('browser-sync'), //Плагин Browser Sync
    watch = require('gulp-watch'), //Плагин для отслеживания изменений в файлах
    reload = browserSync.reload; //Обновление браузера

/* JS-объект с путями к файлам исходникам, конечными путями файлов после сборки и
путями для остлеживания изменений */

let path = {

    build: { //Пути для размещения готовых файлов после сборки
        html: 'build/',
        js: 'build/js',
        css: 'build/css',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути к исходникам
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/less/main.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*' 
    },
    watch: { //Пути к отслеживаемым файлам
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/less/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        libs: 'src/libs/**/*.*'
    },
    clean: './build'
};

/* Объект настроек для локалного сервера */

let config = {
    server: {
        baseDir: './build'
    },
    host: 'localhost',
    port: 3000,
    notify: false
};

/* Таск для запуска локального сервера */

gulp.task('webserver', () => {
    browserSync(config); //Берем настройки из объекта config
});

/* Сборка HTML-файлов */

gulp.task('html:build', () => {
    gulp.src(path.src.html) //Выбор файлов
        .pipe(rigger()) //Объединение всех HTML-файлов в один
        .pipe(gulp.dest(path.build.html)) //Размещение общего файла в папке для сборки
        .pipe(reload({stream: true})); //Перезагрузка браузера
});

/* Сборка JS-файлов */

gulp.task('js:build', () => {
    gulp.src(path.src.js) //Выбор файлов
        .pipe(rigger()) //Объединение всех JS-файлов в один
        .pipe(sourcemaps.init()) //Инициализация карты
        .pipe(babel({ //Компиляция JS-файлов под старые браузеры
            presets: ['babel-preset-env']
        }))
        .pipe(uglify()) //Минификация
        .pipe(sourcemaps.write()) //Прописка карты
        .pipe(rename('main.min.js')) //Смена названия минимизированного файла
        .pipe(gulp.dest(path.build.js)) //Размещение минимизированного файла в папке для сборки
        .pipe(reload({stream: true})); //Перезагрузка браузера
});

/* Сборка LESS-файлов */

gulp.task('style:build', () => {
    gulp.src(path.src.style) //Выбор файлов
        .pipe(sourcemaps.init()) //Инициализация карты
        .pipe(less()) //Компиляция Less в CSS
        .pipe(autoprefixer({ //Добавление вендорных префиксов
        	browsers: ['last 3 versions'],
            cascade: false
            }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(path.build.css)) 
        .pipe(minifyCss()) //Минификация
        .pipe(sourcemaps.write()) //Прописка карты
        .pipe(rename('style.min.css')) //Смена названия минимизированного файла
        .pipe(gulp.dest(path.build.css)) //Размещение минимизированного файла в папке для сборки
        .pipe(reload({stream: true})); //Перезагрузка браузера
});

/* Сборка картинок */

gulp.task('image:build', () => {
    gulp.src(path.src.img) //Выбор файлов
        .pipe(gulp.dest(path.build.img)) //Перенос картинок в папку для сборки
        .pipe(reload({stream: true})); //Перезагрузка браузера
});

/* Сборка шрифтов */

gulp.task('fonts:build', () => {
    gulp.src(path.src.fonts) //Выбор файлов
        .pipe(gulp.dest(path.build.fonts)) //Перенос шрифтов в папку для сборки
});

/* Очистка */

gulp.task('clean', (cb) => {
    rimraf(path.clean, cb); //Удаление папки для сборки build
});

/* Таск для общей сборки проекта */

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

/* Таск для отслеживания изменений в файлах */

gulp.task('watch', () => {
    watch([path.watch.html], (event, cb) => {
        gulp.start('html:build');
    });
    watch([path.watch.style], (event, cb) => {
        gulp.start('style:build');
    });
    watch([path.watch.js], (event, cb) => {
        gulp.start('js:build');
    });
    watch([path.watch.img], (event, cb) => {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], (event, cb) => {
        gulp.start('fonts:build');
    });
});

/* Запуск проекта */

gulp.task('default', ['build', 'webserver', 'watch']);
