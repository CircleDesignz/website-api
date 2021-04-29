# Website API

Typescript backend for circle website using nestjs.
Website will probably be IO bound so node will be ok.
Will be monolith for now, might split it into microservices depending on how we deploy.

## Modules

| Module                                       | Description                 |
| -------------------------------------------- |:---------------------------:|
| [Inventory](src/modules/inventory/README.md) | Tracking Individual Units   |
| [Orders](orders)                             | Order Management            |
| Customers                                    | Customer Data/Management    |
| Payment                | Interface for Stripe API    |
| Shipping               | Shipping data               |

## Deploy

Set environmental variables:

- GRPC\_SOCKET\_ADDR: server address for gRPC server to be exposed on.
- REST\_SOCKET\_ADDR: server address for REST server to be exposed on.
- DB\_HOST: postgres host.
- DB\_PASS: postgres pass.
- DB\_NAME: postgres db name.
- DB\_PORT: postgres port.

Then `docker-compose up -d`

## gRPC API

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ----------- |
| CreateUnit | StockUnit | StockUnit | Adds a unit to the store. Returns the unit added. |
| ListUnits | Empty | ListUnitsResponse | Returns a list of all units in the store. |
| GetUnit | GetUnitRequest | StockUnit | Gets a unit from store by id (SKU). |
| UpdateUnit | UpdateUnitRequest | StockUnit | Updates A unit in store. |
| DeleteUnit | DeleteUnitRequest | Empty | Deletes unit from store. |
| SKUExists | SKUExistsRequest | SKUExistsResponse | Checks if and id (SKU) already exists. |

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
