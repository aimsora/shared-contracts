# shared-contracts

![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions&logoColor=white)
![Versioning](https://img.shields.io/badge/Versioning-SemVer-3fb950)
![API](https://img.shields.io/badge/Contracts-GraphQL%20%2B%20JSON%20Schema-orange)

Репозиторий единых контрактов для всех сервисов платформы.

## Что делает этот репозиторий

- хранит GraphQL-схему для API-контракта;
- хранит JSON Schema для событий очередей;
- задает единый формат обмена между сервисами.

## Черновая реализация

- `graphql/schema.graphql`;
- `events/source-raw.v1.json`;
- `events/source-normalized.v1.json`;
- `queue-messages/` с реалистичными сообщениями для очередей;
- скрипт `npm run validate` для базовой проверки контрактов;
- CI workflow для автоматической проверки.

## Реальные сообщения для очередей

- `queue-messages/source.raw.v1.json` - пример сырого сообщения от `scraper-service` в очередь `source.raw.v1`;
- `queue-messages/source.normalized.v1.json` - пример нормализованного сообщения от `processing-worker` в очередь `source.normalized.v1`.

Эти файлы можно использовать как фикстуры для интеграционных тестов и отладки пайплайна.

## Локальный запуск проверки

```bash
npm install
npm run validate
```

## Связи с другими репозиториями

- `backend-api` реализует GraphQL-контракт;
- `scraper-service` и `processing-worker` используют event-схемы;
- `frontend-app` ориентируется на схему API.
