import { Request, Response } from 'express';
import Controller from "../decorators/controller.decorator";
import { Get } from "../decorators/methods.decorator";
import { BaseController } from './base.controller';
import { generateToken } from '../utils/jwt';
import { User } from '../database/entity/user.entity';

@Controller('/auth')
export default class AuthController extends BaseController {

    constructor(source: any){
        super(source);
    }

    @Get('/login')
    public async index(req: Request, res: Response): Promise<void> {
        const mail = req.body.mail
        const pwd = req.body.password

        const user = await User.findOneBy({mail: mail})

        if(user !== null){
            if(mail === user.mail && pwd !== user.password){
                res.status(400).json({message: 'Wrong password provided.'})
            }
            res.json({ token: generateToken({name:'ohay'}) });
        }else{
            res.status(400).json({message: 'User not found using this mail.'})
        }
        
    }

}