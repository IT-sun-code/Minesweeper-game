# Minesweeper-game

Разработанная для ВКонтакте игра Сапер по приложенному ТЗ и спрайту
<br>Результат: https://it-sun-code.github.io/Minesweeper-game/

## Инструкция для запуска файла

### Для того, чтобы запустить данный проект на своем компьютере, есть два способа: загрузка архива и клонирование репозитория.

1. Загрузка архива:

   1.1 Нажмите кнопку "Code" в верхней части страницы рядом с именем репозитория.

   1.2 В выпадающем меню выберите "Download ZIP".

   1.3 Архив со всем содержимым репозитория загрузится на ваш компьютер.

   1.4 Распакуйте архив.

   1.5 После распаковки архива пользователь сможет открыть проект в любом редакторе кода и запустить его на своем компьютере.

   1.6 Для запуска перейдите в файл "index.html", нажмите правой кнопкой мыши на открытый HTML-файл и выберите "Open in Default Browser" в контекстном меню. Это откроет HTML-файл в вашем браузере по умолчанию. Или же выберите в контекстном меню "Open with Live Server" (Для начала нужно установить расширение "Live Server"). Ваш браузер откроет HTML-файл в новой вкладке и будет автоматически перезагружаться при внесении изменений в файл.

2. Клонирование репозитория:

   2.1 Нажмите кнопку "Code" в верхней части страницы рядом с именем репозитория.

   2.2 В выпадающем меню выберите "HTTPS" или "SSH", чтобы скопировать URL-адрес репозитория.

   2.3 Откройте терминал на компьютере и перейдите в папку, куда хотите клонировать репозиторий.

   2.4 Введите команду git clone и вставьте скопированный URL-адрес репозитория, например: `git clone https://github.com/имя-пользователя/название-репозитория.git`.

   2.5 Нажмите "Enter", чтобы начать клонирование репозитория.

   2.6 Клонированный репозиторий появится в выбранной папке на компьютере.

   2.7 После клонирования репозитория вы сможете открыть проект в любом редакторе кода и запустить его на своем компьютере.

   2.8 Для запуска перейдите в файл "index.html", нажмите правой кнопкой мыши на открытый HTML-файл и выберите "Open in Default Browser" в контекстном меню. Это откроет HTML-файл в вашем браузере по умолчанию. Или же выберите в контекстном меню "Open with Live Server" (Для начала нужно установить расширение "Live Server"). Ваш браузер откроет HTML-файл в новой вкладке и будет автоматически перезагружаться при внесении изменений в файл.

## Описание игры

- Игровое поле состоит из клеток (16 на 16), некоторые из которых содержат мины (всего 40 мин).

- Цель игры - расставить флажки на всех клетках, под которыми скрыты мины, и открыть все клетки, которые не содержат мины.

- Игрок может открыть клетку, кликнув на нее левой кнопкой мыши. Если в клетке находится мина, игрок проигрывает. Если в клетке нет мины, то открывается число, указывающее на количество мин в соседних клетках.

- Если игрок уверен, что в клетке находится мина, он может поставить на нее флажок, кликнув на нее правой кнопкой мыши.

- Существует также возможность отмечать клетки вопросительным знаком, если игрок не уверен, есть ли в этой клетке мина или нет.

- Игрок выигрывает, когда все клетки, не содержащие мины, открыты.

- Если игрок ошибается и открывает клетку, в которой находится мина, он проигрывает игру. Если таймер доходит до 999 секунд, игра также заканчивается проигрышем.

## Инструкция для запуска игры

1. При открытии или после перезагрузки страницы требуется ввести имя игрока. В случае отказа вводить имя, вам будет установлено имя по умолчанию.

2. Сверху страницы расположена подсказка "ПРАВИЛА ИГРЫ", при клике на которую появляется выпадающий список с правилами игры Сапер. При повторном клике на подсказку он закрывается.

3. Чтобы начать играть, кликните левой кнопкой мыши на любой клетку поля, после чего он откроется, сгенерируются мины под оставшимися неоткрытыми клетками. Справа от смайлика запустится таймер до 999 секунд.

4. С помощью левого клика вы можете открыть любые клетки кроме помеченных флажками или знаками вопросов.

5. Чтобы поставить флажок, кликните правой кнопкой мыши по нужной, еще закрытой клетке. Количество флажков ограничено 40 штуками. При каждом проставлении флажка, количество доступных флажков уменьшается на 1. Их оставшееся количество можно увидеть слева от смайлика.

6. Чтобы поменять флажок на знак вопроса, кликните по клетке с флажком правой кнопкой мыши. Тогда количество доступных флажков увеличится на 1.

7. Чтобы убрать знак вопроса, кликните на клетку с ним правой кнопкой мыши еще раз. Теперь вы можете открыть эту клетку левой кнопкой мыши, при желании.

8. Если вы открыли все поля без мин, игра заканчивается вашей победой, улыбающийся смайлик меняется на смайлик в очках, таймер останавливается, во весь экран раскрывается модальное окно с поздравлением. Его можно закрыть, кликнув по его правому верхнему крестику.

9. Если вы открыли мину, улыбающийся смайлик заменится на грустный, таймер останавливается, вам откроется карта мин, во весь экран раскрывается модальное окно с информацией о проигрыше. Его также можно закрыть, кликнув по его правому верхнему крестику.

10. Снизу игрового поля появятся ваши результаты игры. Они будут обновляться после каждой игры и учитывать информацию по предыдущим играм.

11. Чтобы перезапустить игру, кликните левой кнопкой мыши по смайлику. Также вы можете нажать пробел (Space) на клавиатуре.

12. Чтобы обнулить все результаты за все игры, кликните левой кнопкой мыши на кнопку "ОБНУЛИТЬ" либо нажмите Backspace на клавиатуре.

## Адаптивность и запуск с мобильного устройства

1. Игра может быть отображена для устройств с шириной:

   - 270-300px
   - 300-400px
   - 400-500px
   - 500-600px
   - 600+

2. Правый и левый клик для мобильных устройств
   - Правый клик - долгое зажатие клетки поля пальцем
   - Левый клик - короткое нажатие клетки поля пальцем

## Приятной игры! 😊
