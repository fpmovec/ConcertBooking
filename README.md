# ConcertBooking
Intership project. Maksim Kryvets

Questions List: https://docs.google.com/spreadsheets/d/1zIT7-HcCIwe_fNAu3jAm2PdwKgv7wT9mRvziExSJvxc/edit#gid=653690040

## Запуск приложения

* Склонируйте репозиторий путем ввода команды: 
   ```
  git clone https://github.com/fpmovec/ConcertBooking.git
  ```
   Переключитесь на ветку под названием "intership".
   
  Структура проекта выглядит следующим образом:
  
  ![](https://github.com/fpmovec/Images/blob/main/photo_2023-08-11_18-30-11.jpg)

  - backend - папка с серверной частью
  - frontend - папка с клиентской частью
  - Docker - файлы docker-compose
### Установка зависимостей
Сначала установим зависимости для клиентской части. В командной строке заходим в папку "frontend" и вводим следующую команду:
```
yarn install
```
Таким образом мы установили все необходимые зависимости для клиентской части
### Docker
  В папке "Docker" находится файл docker-compose.yaml, который необходим для развертывания контейнера базы данных. Я использовал PostgreSQL
  
  Для работы с Docker установите приложение "Docker Desktop". После установки, чтобы проверить все ли хорошо установилось, в командной строке Windows выполните по очереди следующие команды:
  ```
docker --version
docker-compose --version
  ```
Если все хорошо, то результат выполнения(версии могут отличаться) будет следующим: 

![](https://github.com/fpmovec/Images/blob/main/photo_2023-08-11_18-42-12.jpg)

  ### Запуск
Начнем с запуска контейнера Docker. С консоли зайдем в папку проекта, которая называется "Docker".
Если это ваш первый запуск, то вводим команду 
```
docker-compose up --build
```
Если же это не первый запуск, то вводим команду
```
docker-compose up
```
После всех загрузок в последних строках консоли должны появиться следующие строки(убедитесь, что порт равен 5432)

![](https://github.com/fpmovec/Images/blob/main/photo_2023-08-11_18-50-51.jpg)

Далее необходимо запустить серверную часть.
После запуска убедитесь, что порт, на котором запустилась серверная часть, равен 7235 по протоколу https:

![](https://github.com/fpmovec/Images/blob/main/photo_2023-08-11_18-56-31.jpg)

Затем в консоли переходим в папку "frontend" и вводим команду
```
yarn dev
```
После запуска убедитесь, что порт раавен 5173:

![](https://github.com/fpmovec/Images/blob/main/photo_2023-08-11_19-00-42.jpg)

После этого запуститься клиентская часть приложения
## Роли
Admin Account:
   - Email: 10.maks.10k@gmail.com
   - Password: M11052004m!

Возможности: добавление/удаление промокода, добавление/удаление концертов

User Account: 
   - Email: dampdamp186@gmail.com
   - Password: M11052004m!

Возможности: бронирование билетов, покупка через PayPal

PayPal Account for pay:
   - Email: sb-kd947526925916@personal.example.com
   - Password: @dr?U7+y

Авторизация и регистрация реализованы с помощью сервиса Auth0
