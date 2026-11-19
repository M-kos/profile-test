## Приложение цифровой визитки

## Технологический стек

| Технология     | Назначение                                              |
|----------------|---------------------------------------------------------|
| Node.js 24     | Runtime                                                 |
| TypeScript     | Основной язык разработки                                |
| NestJS 12      | Backend framework                                       |
| GraphQL        | API                                                     |
| Apollo Server  | GraphQL server                                          |
| Apollo Sandbox | Интерактивный интерфейс для выполнения GraphQL-запросов |
| Prisma 7       | ORM и управление миграциями                             |
| PostgreSQL 17  | Реляционная база данных                                 |
| Docker         | Контейнеризация приложения                              |
| Docker Compose | Управление инфраструктурой                              |

## Архитектура

Приложение построено на модульной архитектуре NestJS с разделением ответственности между GraphQL API, бизнес-логикой и
доступом к данным.

```text
src/
├── app/
│   ├── app.module.ts
│   ├── app.controller.ts
│   └── app.service.ts
│
├── constants/
│   └── errors.ts
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── profile/
│   ├── entities/
│   │   ├── profile.entity.ts
│   │   ├── experience.entity.ts
│   │   ├── project.entity.ts
│   │   └── skill.entity.ts
│   │
│   ├── models/
│   │   ├── profile.model.ts
│   │   ├── experience.model.ts
│   │   ├── project.model.ts
│   │   └── skill.model.ts
│   │
│   ├── repository/
│   │   ├── profile-repository.types.ts
│   │   └── profile.repository.ts
│   │
│   ├── profile.module.ts
│   ├── profile.resolver.ts
│   └── profile.service.ts
│
└── main.ts

prisma/
├── schema/
│   ├── schema.prisma
│   ├── profile.prisma
│   ├── experience.prisma
│   ├── project.prisma
│   └── skill.prisma
├── migrations/
└── seed.ts

data/
└── profile.ts

deploy/
├── docker-compose.yaml
└── profile/
    └── Dockerfile
```

### Разделение ответственности

**Resolver**

Отвечает за GraphQL API. Принимает запросы и передаёт управление сервису.

**Service**

Содержит бизнес-логику приложения. В частности, проверяет наличие профиля и обрабатывает ситуацию, когда профиль не
найден.

**Repository**

Отвечает за получение данных из базы данных. Использует Prisma и возвращает профиль вместе со связанными сущностями.

**Entity**

Описывает структуру данных приложения независимо от GraphQL.

**GraphQL Model**

Определяет публичную структуру данных, доступную клиентам через GraphQL API.

**PrismaService**

Инкапсулирует подключение к PostgreSQL и предоставляет доступ к Prisma Client.

### Архитектурные решения

### Архитектурные решения

При проектировании приложения основное внимание уделялось разделению ответственности, поддерживаемости кода,
типобезопасности и простоте дальнейшего расширения.

#### 1. Разделение приложения на слои

Для обработки запросов используется разделение на Resolver, Service и Repository.

- **Resolver** отвечает за взаимодействие с GraphQL API: принимает запросы и передаёт управление сервису.
- **Service** содержит бизнес-логику и определяет поведение приложения. Например, именно здесь проверяется наличие
  профиля и выбрасывается `NotFoundException`, если профиль не найден.
- **Repository** отвечает за получение данных и инкапсулирует детали взаимодействия с базой данных.

Такое разделение позволяет изменять способ получения данных, не затрагивая бизнес-логику и API-слой. Кроме того, каждый
компонент можно тестировать независимо от остальных.

#### 2. Использование Repository и Dependency Injection

Для доступа к данным используется интерфейс `ProfileRepository`, а его реализация регистрируется в NestJS через токен
`PROFILE_REPOSITORY`.

Вместо прямой зависимости сервиса от `ProfileRepositoryImpl` используется абстракция.

Это позволяет:

- Заменять реализацию репозитория без изменения сервиса.
- Использовать mock-реализацию при модульном тестировании.
- Не связывать бизнес-логику с конкретной ORM.

Для небольшого приложения такая абстракция добавляет некоторую структуру, но упрощает изолированное тестирование и
дальнейшее развитие приложения.

#### 3. Разделение Entity и GraphQL Model

Внутренние типы данных (`Entity`) отделены от GraphQL-моделей (`Model`).

Entity описывает структуру данных, используемую внутри приложения, а GraphQL Model определяет публичный контракт API.

Это позволяет не привязывать внешний API напрямую к структуре базы данных и в дальнейшем изменять внутреннее
представление данных без обязательного изменения GraphQL-схемы.

Также это позволяет явно контролировать, какие поля доступны клиенту.

#### 4. Валидация конфигурации

Переменные окружения проверяются при запуске приложения с использованием `class-validator` и `class-transformer`.

Это позволяет обнаруживать отсутствующие или некорректные настройки до начала обработки запросов.

В результате ошибки конфигурации выявляются на этапе запуска, а не во время выполнения бизнес-логики.

## Структура базы данных

База данных содержит четыре основные таблицы:

### Profile

| Поле        | Тип      | Описание                |
|-------------|----------|-------------------------|
| id          | Int      | Идентификатор           |
| firstName   | String   | Имя                     |
| lastName    | String   | Фамилия                 |
| email       | String   | Email                   |
| urls        | String[] | Профессиональные ссылки |
| description | String?  | Краткое описание        |
| createdAt   | DateTime | Дата создания           |

### Skill

| Поле      | Тип      | Описание              |
|-----------|----------|-----------------------|
| id        | Int      | Идентификатор         |
| name      | String   | Название навыка       |
| profileId | Int      | Идентификатор профиля |
| createdAt | DateTime | Дата создания         |

### Experience

| Поле         | Тип      | Описание              |
|--------------|----------|-----------------------|
| id           | Int      | Идентификатор         |
| company      | String   | Компания              |
| position     | String   | Должность             |
| startDate    | DateTime | Дата начала работы    |
| endDate      | DateTime | Дата окончания работы |
| achievements | String[] | Достижения            |
| profileId    | Int      | Идентификатор профиля |
| createdAt    | DateTime | Дата создания         |

### Project

| Поле      | Тип      | Описание              |
|-----------|----------|-----------------------|
| id        | Int      | Идентификатор         |
| name      | String   | Название проекта      |
| url       | String   | Ссылка на проект      |
| profileId | Int      | Идентификатор профиля |
| createdAt | DateTime | Дата создания         |

Связи:

- Profile → Skill: один ко многим.
- Profile → Experience: один ко многим.
- Profile → Project: один ко многим.

При удалении профиля связанные записи удаляются благодаря `ON DELETE CASCADE`.

## Запуск проекта

### Требования

Для запуска необходимы:

- Docker
- Docker Compose
- Node.js 24+ (для локальной разработки)
- npm

### 1. Настройка переменных окружения

Создайте `.env` в корне проекта:

```env
PROFILE_PORT=8080
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=profile
POSTGRES_PORT=5432
POSTGRES_HOST=postgres
DATABASE_URL=postgres://root:root@postgres:5432/profile?sslmode=disable
LOG_LEVEL=log
```

Значения приведены для локального запуска.

### 2. Запуск через Docker Compose

Из корня проекта выполните:

```bash
docker compose --env-file ./.env -f ./deploy/docker-compose.yaml up -d --build
```

либо:

```bash
task docker:up
```

При запуске выполняются следующие действия:

1. Запускается контейнер PostgreSQL.
2. Docker Compose ожидает, пока база данных пройдёт healthcheck.
3. Запускается сервис `migrate`.
4. Prisma применяет все существующие миграции.
5. Выполняется заполнение базы данных через seed.
6. После успешного завершения миграций и seed запускается NestJS-приложение.

Приложение будет доступно по адресу:

```text
http://localhost:8080
```

GraphQL endpoint:

```text
http://localhost:8080/graphql
```

### 3. Остановка

```bash
docker compose --env-file ./.env -f ./deploy/docker-compose.yaml down
```

либо:

```bash
task docker:down
```

Данные PostgreSQL сохраняются в Docker volume `postgres_data`.

## Работа с GraphQL API

После запуска приложения GraphQL API доступен по адресу:

```text
http://localhost:8080/graphql
```

Для выполнения запросов можно использовать Apollo Sandbox или любой HTTP-клиент, поддерживающий GraphQL.

### Получение профиля

```graphql
query GetProfile {
    profile {
        id
        firstName
        lastName
        email
        description
        urls
        createdAt
    }
}
```

### Получение профиля с навыками

```graphql
query GetProfileSkills {
    profile {
        firstName
        lastName
        skills {
            id
            name
        }
    }
}
```

### Получение профиля с опытом работы

```graphql
query GetProfileExperience {
    profile {
        firstName
        lastName
        experience {
            company
            position
            startDate
            endDate
            achievements
        }
    }
}
```

### Получение профиля с проектами

```graphql
query GetProfileProjects {
    profile {
        firstName
        lastName
        projects {
            name
            url
        }
    }
}
```

### Получение всех данных одним запросом

```graphql
query GetFullProfile {
    profile {
        id
        firstName
        lastName
        email
        description
        urls

        skills {
            id
            name
        }

        experience {
            company
            position
            startDate
            endDate
            achievements
        }

        projects {
            name
            url
        }
    }
}
```

## Запуск проекта

### 1. Настройка окружения

Создайте `.env` в корне проекта на основе `.env.example`:

```bash
cp .env.example .env
```

Укажите необходимые переменные окружения.

### 2. Генерация Prisma Client

Сгенерируйте Prisma Client и TypeScript-типы:

```bash
npm install
npx prisma generate
```

### 3. Запуск PostgreSQL

```bash
docker compose --env-file ./.env -f ./deploy/docker-compose.yaml up -d postgres
```

либо:

```bash
task docker:up:local
```

### 4. Применение миграций

```bash
docker compose --env-file ./.env -f ./deploy/docker-compose.yaml up migrate
```

либо:

```bash
npm run migrate:dev
```

### 5. Запуск приложения

```bash
docker compose --env-file ./.env -f ./deploy/docker-compose.yaml up -d --build
```

либо:

```bash
task docker:up
```

### GraphQL endpoint:

```text
http://localhost:3000/graphql
```

### Остановка проекта

```bash
docker compose --env-file ./.env -f ./deploy/docker-compose.yaml down
```

либо:

```bash
task docker:down
```

## Локальная разработка

Установка зависимостей:

```bash
npm install
```

Запуск PostgreSQL:

```bash
docker compose --env-file ./.env -f ./deploy/docker-compose.yaml up -d postgres
```

либо:

```bash
task docker:up:local
```

Применение миграций:

```bash
npm run migrate:dev
```

Запуск приложения:

```bash
npm run start:dev
```

Примечание: локальный скрипт `migrate:dev` в текущем `package.json` использует адрес `localhost:5432` и credentials
`root/root`. Если настройки PostgreSQL отличаются, скрипт необходимо адаптировать.

## Команды проекта

| Команда                  | Описание                                     |
|--------------------------|----------------------------------------------|
| `npm run build`          | Сборка приложения                            |
| `npm run start`          | Запуск приложения                            |
| `npm run start:dev`      | Запуск в watch-режиме                        |
| `npm run lint`           | Проверка кода                                |
| `npm run test`           | Запуск unit-тестов                           |
| `npm run migrate:dev`    | Создание и применение миграций в development |
| `npm run migrate:deploy` | Применение существующих миграций             |
| `npm run migrate:reset`  | Сброс базы и повторное применение миграций   |
| `npm run db:seed`        | Заполнение базы данными                      |
