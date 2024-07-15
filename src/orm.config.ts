import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_USERNAME_KEY,
} from './common/const/env-keys.const';
import { UserModel } from './user/entities/user.entity';

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    // 한 단계를 거쳐서 값을 입력하도록 한 것이 제대로 값을 읽어오지 못한 이유였나?
    // ENTITIES: [__dirname + '**/entity/*.entity.{ts}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    CLI: {
      migrationsDir: 'src/migrations',
    },
    MIGRATIONS_RUN: false,
  };

  return {
    name: 'defalut',
    type: 'mysql',
    database: process.env[ENV_DB_DATABASE_KEY],
    host: process.env[ENV_DB_HOST_KEY],
    port: parseInt(process.env[ENV_DB_PORT_KEY]),
    username: process.env[ENV_DB_USERNAME_KEY],
    password: process.env[ENV_DB_PASSWORD_KEY],
    logging: false,
    synchronize: true,
    entities: [UserModel],
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };
}

export { ormConfig };
