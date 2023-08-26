import 'reflect-metadata';
import { MetadataKeys } from './metadata.keys';
import express, { Application as ExpressApp, Handler } from 'express';
import { IRouter } from './decorators/methods.decorator';
import { controllers } from './controllers/controllers';
import { DataSource } from 'typeorm';
import { Database } from './database/database';


class Application {
    
    private readonly _instance: ExpressApp;
    private datasource: DataSource;

    get instance(): ExpressApp {
        return this._instance;
    }

    constructor() {
        // basic init of the express server
        this._instance = express();
        this._instance.use(express.json());

        // init of the database
        const db = new Database();
        this.datasource = db.instance
        this.datasource.initialize()
            .then((e) => {
                console.log("Successfully connected to Database");
            })
            .catch((e) => {
                console.log("An error occured while connecting to Database:\n\t"+e);
            })

        this.registerRouters();
    }

    /**
     * Add all routes defined in controllers to server
     * Loop through every method using a method decorator to be used as a route
     */
    private registerRouters() {
        this._instance.get('/', (req, res) => {
            res.json({ message: 'Hello World!' });
        });
        
        const info: Array<{ route: string, handler: string }> = [];
        
        controllers.forEach((controllerClass) => {
            const controllerInstance: { [handleName: string]: Handler } = new controllerClass(this.datasource) as any;

            const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
            const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass);

            const exRouter = express.Router();

            routers.forEach(({ method, path, handlerName}) => {
                exRouter[method](path, controllerInstance[String(handlerName)].bind(controllerInstance));
                info.push({
                    route: `${method.toLocaleUpperCase()} ${basePath + path}`,
                    handler: `${controllerClass.name}.${String(handlerName)}`,
                });
            });

            this._instance.use(basePath, exRouter);
        });
        
        this._instance.get('/routes', (req, res) => {
            res.json(info);
        });
    }
}

export default Application;