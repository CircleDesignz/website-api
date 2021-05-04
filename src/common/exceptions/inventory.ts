export class UnitConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnitConflictError";
  }
}

export class UnitNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnitNotFoundError";
  }
}

export class OrderConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OrderConflictError";
  }
}

export class UnitNotArchivedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnitNotArchivedError";
  }
}
