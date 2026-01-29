## Graphql-engine

```bash version: "3.9"
services:
  hasura:
    image: hasura/graphql-engine:v2.25.1
    network_mode: "host"
    environment:
      HASURA_GRAPHQL_DATABASE_URL: postgres://graphql:graphql@127.0.0.1:5433/cexplorer_db
      HASURA_GRAPHQL_ENABLE_CONSOLE: "false"
      HASURA_GRAPHQL_DEV_MODE: "false"
      HASURA_GRAPHQL_ADMIN_SECRET: "xyz"
```
docker compose up # -d
