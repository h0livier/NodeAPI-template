import { Request, Response } from 'express';
import Controller from "../decorators/controller.decorator";
import { Get, Post } from "../decorators/methods.decorator";
import { BaseController } from './base.controller';
import { User } from '../database/entity/user.entity';

@Controller('/user')
export default class UserController extends BaseController {

    constructor(source: any){
        super(source);
    }

    @Get('')
    public async index(req: Request, res: Response): Promise<void> {
        const all = await User.find()
        res.json({ users: all });
    }

    @Post('')
    public async addUser(req: Request, res: Response): Promise<void> {
        const user = new User()
        user.firstName = "Timber"
        user.lastName = "Saw"
        user.age = 25
        await user.save()
        res.json({ user: user});
    }

}