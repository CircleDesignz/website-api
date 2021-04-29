curl \
  -vvv \
  -H "Content-Type: application/json" \
  --data '{"sku":"69","name":"testunit2","unitCost":0,"unitPrice":123,"currentStock":123,"weight":123,"associations": ["123", "456"]}'\
  http://localhost:3000/inventory
