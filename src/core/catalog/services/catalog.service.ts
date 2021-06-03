import { Injectable } from '@nestjs/common';
import { CatalogRepository } from '../repositories/catalog.repository';

@Injectable()
export class CatalogService {
  constructor(private readonly catalogRepository: CatalogRepository) {}
}
