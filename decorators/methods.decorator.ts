import 'reflect-metadata';
import { MetadataKeys } from '../metadata.keys';

export enum Methods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE= 'delete'
}

export interface IRouter {
    method: Methods;
    middlewares?: any[];
    path: string;
    handlerName: string | symbol;
}

const methodDecoratorFactory = (method: Methods) => {
    return (path: string, middlewares?: any[]): MethodDecorator => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor;
            const routers: IRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass) ?
            Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) : [];
            routers.push({
                method,
                middlewares,
                path,
                handlerName: propertyKey,
            });
            Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
        }
    }
}

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Put = methodDecoratorFactory(Methods.PUT);
export const Delete = methodDecoratorFactory(Methods.DELETE);