import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST ?? 'mysql',
  port: Number(process.env.DB_PORT) ?? 3306,
  username: process.env.DB_USERNAME ?? 'jsquota',
  password: process.env.DB_PASSWORD ?? 'jsquota_pass',
  database: process.env.DB_DATABASE ?? 'jsquota',
  entities: ['dist/libs/core/src/entities/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
