import { DataSource } from "typeorm"
import { entities } from "./entity/entities"

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
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "Docker",
            password: "Test123*",
            database: "Database",
            synchronize: true,
            logging: true,
            entities: entities,
            subscribers: [],
            migrations: [],
        })
    }

}