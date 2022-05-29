import "reflect-metadata"
import { Course } from "src/courses/entity/course.entity";
import { Token } from "src/token/entity/token.entity";
import { User } from "src/user/entity/user.entity";
import { env, log } from "src/utils/Utils.tools"
import { DataSource } from "typeorm"

let debug_tag = 'data-source.ts';

let ENV_PROD = env('ENV_PROD');
let ENV_DEV = env('ENV_DEV');
let ENV_S = env('ENV_SELECT');
let DB_SOURCE = env('DB_SOURCE');

// ENTIDADES 
let entities = [Course, User, Token];
log(0, debug_tag, "Entidades cadastradas > ", entities);

log(0, debug_tag, "ENV SELECIONADO > ", ENV_S);

// export class DataSourceAdapter {

//     private static dataSource: DataSource;

//     constructor(dataSource: DataSource = AppDataSource) {
//             DataSourceAdapter.dataSource = dataSource;
//     }

//     get get(): DataSource {
//         return DataSourceAdapter.dataSource;
//     }

//     set set(dataSource: DataSource) {
//         DataSourceAdapter.dataSource = dataSource;
//     }
// }

let configSelection = null;
if (ENV_S == ENV_PROD) {
    configSelection = {
        type: "mysql",
        host: "localhost",
        port: 5432,
        username: "test",
        password: "test",
        database: "test",
        synchronize: false,
        logging: false,
        entities: entities,
        migrations: [],
        subscribers: [],
    };
} else if (ENV_S == ENV_DEV) {
    configSelection = {
        type: "sqlite",
        database: DB_SOURCE,
        synchronize: true,
        logging: false,
        entities: entities,
        migrations: [],
        subscribers: [],
    };
}

export const AppDataSource = new DataSource(configSelection);

if (!AppDataSource.isInitialized)
AppDataSource.initialize().then(() => {
  log(0, debug_tag, 'Banco de dados inicializado.');
});