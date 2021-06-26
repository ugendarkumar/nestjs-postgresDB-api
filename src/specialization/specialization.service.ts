import { DbQueryBuilder } from './../dbQueryBuilder/dbQueryInitiator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpecializationService {
  private dbQueryBuilder: DbQueryBuilder;

  constructor() {
    this.dbQueryBuilder = new DbQueryBuilder();

  }
  async getSpecializationService() {
    const data = await this.dbQueryBuilder.QueryExecuter(
      'SELECT * FROM associates.specialization_master;',
      [],
    );
    return data;
  }
}
