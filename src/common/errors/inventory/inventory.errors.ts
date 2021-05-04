export const InventoryErrors = {
  UnitConflict: {
    apiErrorCode: 'I-01',
    errorMessage: 'Unit already exists',
    reason: 'Unit with given SKU already exists in DB'
  },
  NotFound: {
    apiErrorCode: 'I-02',
    errorMessage: 'Unit not found',
    reason: 'Unit with SKU not found in DB'
  },
  OrderConflict: {
    apiErrorCode: 'I-03',
    errorMessage: 'Order conflict',
    reason: 'Cannot archive unit with pending orders'
  },
  NotArchived: {
    apiErrorCode: 'I-04',
    errorMessage: 'Not archived',
    reason: 'Cannot delete unit that is not archived'
  }
}