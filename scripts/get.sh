#!/bin/sh

curl -vvv -X GET http://localhost:3000/inventory | jq
