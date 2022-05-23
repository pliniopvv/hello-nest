import "reflect-metadata"
import { Course } from "src/courses/entity/course.entity";
import { env, log } from "src/utils/Utils.tools"
import { DataSource } from "typeorm"

let debug_tag = 'data-source.ts';

let ENV_PROD = env('ENV_PROD');
let ENV_DEV = env('ENV_DEV');
let ENV_S = env('ENV_SELECT');
let DB_SOURCE = env('DB_SOURCE');

// ENTIDADES 
let entities = [Course];
log(0, debug_tag, "Entidades cadastradas > ", entities);

log(0, debug_tag, "ENV SELECIONADO > ", ENV_S);

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