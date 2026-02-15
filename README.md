# Дипломный проект Автоматизация тестирования 5 поток JS + Playwright 

## Содержание
- [Описание](#Описание)
- [Технологический стек](#Технологический-стек)
- [Запуск тестов через GitHub Actions](#Запуск-тестов-через-GitHub-Actions)
- [Локальный запуск тестов и генерация отчётов](#Локальный_запуск-тестов-и-генерация-отчётов)
- [Пример сформированного allure отчёта](#-Пример-сформированного-allure-отчёта)
- [Отчёт в ТестОпс](#-Отчёт-в-ТестОпс)
- [Уведомления в Telegram](#-Уведомления-в-Telegram)


## Описание
Данный дипломный проект разработан в рамках курса по автоматизации тестирования. Репозиторий содержит набор UI и API тестов, написанных на языке JavaScript с использованием фреймворка Playwright. В качестве системы непрерывной интеграции и доставки применён Jenkins, выполняющий автоматический запуск тестов, формирование отчетов Allure, интеграцию с ТестОпс и отправку уведомлений в Telegram.

Объектами тестирования служат:

**realworld.qa.guru** — веб-приложение для практики UI тестирования.

**api.nasa.gov** — учебный сервис, предназначенный для освоения и отработки навыков тестирования API.

## Технологический стек
<img src="media/javascript.png" title="JavaScript" width="50" height="50"/><img src="media/playwright.jpg" title="Playwrite" width="50" height="50"/><img src="media/git.svg" alt="Git" width="50" height="50"/><img src="media/github.png" title="GitHub" alt="GitHub" width="50" height="50"/><img src="media/allure framework.png" alt="Allure Framework" width="50" height="50"/><img src="media/testops.svg" alt="ТестОпс" width="45" height="45" /><img src="media/fakerjs.svg" alt="Fakerjs" width="50" height="50"/><img src="media/telegram.png" title="Telegram" width="50" height="50"/><img src="media/jenkins.png" title="JavaScript" width="50" height="50"/>

## Запуск тестов через Jenkins
Для запуска тестов необходимо авторизоваться на Jenkins и перейти джобе 005-dushkovvs-diploma и выбрать Build now.

После завершения выполнения тестов будет автоматически сформирован Allure-отчет, содержащий детальную информацию о результатах тестирования.

Результаты тестирования автоматически загружаются в ТестОпс для дальнейшего анализа и отслеживания метрик качества.

Уведомление о статусе выполнения тестов со ссылкой на Allure-отчет автоматически отправляется в Telegram, что позволяет оперативно отслеживать результаты прогона и быстро реагировать на возникшие проблемы.

## Локальный запуск тестов и генерация отчётов

Команда для локального запуска тестов
```
npm run test
```
Команда для локального формирования отчёта
```
npm run allureFile
```

## Пример сформированного Allure отчёта
![img.png](img/allure_testops_report_example.png)

## Отчёт в ТестОпс
[Ссылка на проект](https://allure.autotests.cloud/project/4995/launches)
![img.png](img/allure_report_example.png)

## Уведомления в Telegram
![img.png](img/tg_report_example.png)