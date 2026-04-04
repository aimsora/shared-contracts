# contracts

Единые контракты платформы NPPWEB.

## Что хранится в каталоге

- `graphql/schema.graphql` - GraphQL-контракт для `npp-backend` и `npp-web`.
- `events/source-raw.v1.json` - схема сырого события.
- `events/source-normalized.v1.json` - схема нормализованного события.
- `queue-messages/` - примеры сообщений для интеграционных тестов и локальной отладки.

## Проверка

```bash
npm install
npm run validate
```

## Кто использует

- `npp-backend` реализует GraphQL-контракт.
- `scrape-helper` и `processing-worker` используют event-схемы.
- `npp-web` ориентируется на GraphQL-схему API.
