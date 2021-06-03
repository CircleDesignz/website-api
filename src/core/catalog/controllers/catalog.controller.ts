import { Controller } from '@nestjs/common';
import { CatalogService } from '../services/catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}
}
