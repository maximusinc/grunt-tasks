### Разработка виджета с использованием Grunt ###

__Для старта потребуется установить:___

- `NodeJS` and `npm` [https://nodejs.org](https://nodejs.org)
- Grunt [http://gruntjs.com/getting-started](http://gruntjs.com/getting-started)
- Bower [http://bower.io/](http://bower.io/)

Для локальной разработки используется webserver с proxy который запускается при помощи Gulp, если использовать его - то необходимо установить Gulp:

- Gulp [https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
- Скопировать содержимое папки `gulp-proxy-webserver` и выполнить команды
```
npm install
```
```
gulp
```

Далее необходимо

- скопировать из репизитория с виджетом папку `webapp` в которой содержатся
	- card-info - папка с файлами виджета
	- widget.tmpl - шаблон
	- bower.json
	- Gruntfile.js
	- package.json

- перейти в нее
```
cd card-info
```
- установить зависимости
``` shell
npm install
```
- установить зависимости виджета:
	- распаковать архив с фичами в папку `bower_components` и выполнить `grunt unjar` если требуется
	- либо выполнить команду

```
grunt bwupload
```
- собрать виджет с зависимостями
```
grunt make
```

В собранном виде виджет будет доступен по адресу [http://127.0.0.1:9000/dest/card-info.html](http://127.0.0.1:9000/dest/card-info.html)

__Livereload и другие команды__

для livereload используется команда
```
grunt watch
```
для сборки фичей используется
```
grunt make:features
```
для сборки виджета используется
```
grunt make:widget
```
Если фичи уже собирались можно использовать `grunt make:widget`

__Загрука зависимотей виджета__

Для загрузки зависимостей виджета используется _Bower API_, зависимости виджета указываеются в `bower.json`.
Для загрузки используется команда:
```
grunt bwupload
```
Если в зависимостях имеются jar архивы, они автоматически распаковываются.
Для ручной распаковки jar архивов используется команда
```
grunt bwunjar
```

