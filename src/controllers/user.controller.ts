import { Request, Response } from 'express';
import Controller from "../decorators/controller.decorator";
import { Get, Post, Put, Delete } from "../decorators/methods.decorator";
import { BaseController } from './base.controller';
import { User } from '../database/entity/user.entity';

@Controller('/user')
export default class UserController extends BaseController {

    constructor(source: any){
        super(source);
    }

    @Get('')
    public async findById(req: Request, res: Response): Promise<void> {
        const all = await User.find()
        res.json({ users: all });
    }

    @Get('/:id')
    public async findAll(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const userId = Number(id);
        const user = await User.findOneBy({
            id: userId
        });
        if(user){
            res.json({user: user})
        }else{
            res.status(404).json({message: 'User not found'})
        }
    }

    @Post('')
    public async addUser(req: Request, res: Response): Promise<void> {
        const user = new User();
        user.firstName = "Timber";
        user.lastName = "Saw";
        user.age = 25;
        await user.save();
        res.json({ user: user});
    }

    @Put('/:id')
    public async updateUser(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const userId = Number(id);
        const user = await User.findOneBy({
            id: userId
        });
        if(user){
            user.firstName = req.body.firstName
            user.age = req.body.age
            user.lastName = req.body.lastName
            await user.save()
            res.json({ user: user});
        }else{
            res.status(404).json({message: 'user not found'})
        }
    }

    @Delete('/:id')
    public async deleteById(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const userId = Number(id);
        const user = await User.findOneBy({
            id: userId
        });
        if(user){
            user.remove()
            res.status(204).json();
        }else{
            res.status(404).json({message: 'user not found'})
        }
    }

}