import { DataSource } from "typeorm"
import { entities } from "./entity/entities"
import {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, DB_TYPE} from "./config"

export class Database {

    private source: DataSource

    get instance(): DataSource{
        return this.source
    }

    constructor(){
        this.source = this.getPostgresConnection();
    }

    private getPostgresConnection(): DataSource{
        return new DataSource({
            type: DB_TYPE,
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            synchronize: true,
            logging: true,
            entities: entities,
            subscribers: [],
            migrations: [],
        })
    }

}