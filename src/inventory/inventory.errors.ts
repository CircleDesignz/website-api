class UnitConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnitConflictError";
  }
}

class UnitNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnitNotFoundError";
  }
}

class OrderConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OrderConflictError";
  }
}