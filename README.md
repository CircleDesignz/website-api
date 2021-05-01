# Website API

Typescript backend for circle website using nestjs.
Website will probably be IO bound so node will be ok.
Will be monolith for now, might split it into microservices depending on how we deploy.

## Modules

| Module                         | Description                 |
| ------------------------------ |:---------------------------:|
| [Inventory](src/inventory)     | Tracking Individual Units   |
| [Orders](src/orders)           | Order Management            |
| [Customers](src/customers)     | Customer Data/Management    |
| Payment                        | Interface for Stripe API    |
| Shipping                       | Shipping data               |

## Deploy

Set environmental variables:

- REST\_SOCKET\_ADDR: server address for REST server to be exposed on.
- DB\_HOST: postgres host.
- DB\_PASS: postgres pass.
- DB\_NAME: postgres db name.
- DB\_PORT: postgres port.

Then `docker-compose up -d`

## REST API

- `[GET] /v1/inventory`
- `[GET] /v1/inventory/{id}`
- `[GET] /v1/inventory/check/{id}`
- `[POST] /v1/inventory`
- `[PUT] /v1/inventory/{id}`
- `[DELETE] /v1/inventory/{id}`

## TODO

- Tests
- middleware + logging
- Currently uses "synchronize: true"; switch to data base migrations in production.


## Future

- Maybe change typeorm repository calls to query builder.