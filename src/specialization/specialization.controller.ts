import { SpecializationService } from './specialization.service';
import { Controller, Get } from '@nestjs/common';

@Controller('specialization')
export class SpecializationController {
  constructor(private specializationService: SpecializationService) { }

  @Get()
  getSpecializationData() {
    return this.specializationService.getSpecializationService();
  }
}
