# Authentication

Authentication is handled via OAuth2 through Github. Accounts associated with the Circle discord org will be able to access admin routes.

Sessions persist to a Redis client instance. Account info stored in PostgreSQL.

## TODO

- Dockerize for prod
- Protect routes (maybe with roles)