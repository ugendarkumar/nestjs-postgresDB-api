import { generatePgConnectionConfig } from './../config/dbConfig';
import { Pool } from 'pg';

export class DbQueryBuilder {
  private pool: Pool;
  private client: any;
  constructor() {
    this.pool = new Pool(generatePgConnectionConfig());
  }

  private async connectClient() {
    this.client = await this.pool.connect();
  }


  async QueryExecuter(queryString: string, value: any[]) {
    try {
      await this.connectClient();
      const dbResult = await this.pool.query(queryString, value);
      return dbResult.rows;
    } catch (e) {
      throw new Error(e);
    }
  }
}
