import { generatePgConnectionConfig } from './config/dbConfig';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { Pool } from 'pg';

async function bootstrap() {
  const pool = new Pool(generatePgConnectionConfig());
  const client = await pool.connect();
  try {
    const app = await NestFactory.create(AppModule, { logger: true });
    const dbConnection = await client.query('SELECT NOW()');
    console.log(dbConnection);
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    await app.listen(3000);
  } catch (e) {
    console.log(e);
  } finally {
    await client.release();
  }
}
bootstrap();
