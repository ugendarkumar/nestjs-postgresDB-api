import { Associate } from './../interfaces/associates';
import { AssociatesService } from './associates.service';
import { Controller, Post, Body, Get, Put } from '@nestjs/common';

@Controller('associates')
export class AssociatesController {
  constructor(private associatesService: AssociatesService) { }
  @Post()
  saveAssociatesInfo(@Body() requestData: Associate) {
    return this.associatesService.saveAssociate(requestData);
  }
  @Get()
  fetchAssociatesInfo() {
    return this.associatesService.fetchAssociate();
  }
  @Put()
  deleteAssociateInfo(@Body() requestBody: { id: string }) {
    return this.associatesService.deleteAssociate(requestBody);
  }
  @Put('/update')
  updateAssociateInfo(@Body() requestBody: Associate) {
    return this.associatesService.updateAssociate(requestBody);
  }
}
