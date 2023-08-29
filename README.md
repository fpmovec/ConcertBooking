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
 
  ### Запуск
Начнем с запуска контейнера Docker. 

В папке "Docker" находится файл docker-compose.yaml, который необходим для развертывания контейнера базы данных. Я использовал PostgreSQL
  
  Для работы с Docker установите приложение "Docker Desktop". После установки, чтобы проверить все ли хорошо установилось, в командной строке Windows выполните по очереди следующие команды:
  ```
docker --version
docker-compose --version
  ```
Если все хорошо, то результат выполнения(версии могут отличаться) будет следующим: 

![](https://github.com/fpmovec/Images/blob/main/photo_2023-08-11_18-42-12.jpg)

С консоли зайдем в папку проекта, которая называется "Docker".
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

Теперь создаем соединение для БД с именем db_concerts(все эти действия проделываем в развернутом контейнере Docker). Создаем БД под именем concertsbooking. Host устанавливаем 127.0.0.1, имя пользователя admin и пароль root. После того, как это сделали, в консоли идем в папку backend/ConcertsBooking и вводим команду 
```C#
dotnet ef database update
```
Если же вы запускаете впервые, то никаких данных в БД у вас не будет, поэтому добавьте их с помощью следующего запроса:
```SQL
INSERT INTO "Coordinates"("Longitude", "Latitude") VALUES(53.690655,26.861012)


INSERT INTO "Concerts" ("Performer", "TicketsCount", "ConcertDate", "Location", "ConcertType", "Price", "CoordinatesId") 
VALUES ('Dj Marshmallow', 25, '2023-08-18T17:51', 'Minsk', 'Party', 5, 1)

INSERT INTO "Parties"("Id", "AgeLimit") VALUES(1, 18)
```
В итоге в БД будет создан один концерт 

Далее необходимо запустить серверную часть с помощью команды командной строки в папке backend/ConcertBackend
```
dotnet run --launch-profile "https"
```
После запуска убедитесь, что порт, на котором запустилась серверная часть, равен 7235 по протоколу https:

![](https://github.com/fpmovec/Images/blob/main/photo_2023-08-18_11-19-01.jpg)

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
