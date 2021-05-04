curl \
  -vvv \
  -H "Content-Type: application/json" \
  --data '{"sku":"69","name":"testunit2","costInCad":0,"priceInCad":123,"stock":123,"weightInKg":123, "isArchived": false}'\
  http://localhost:3000/inventory
