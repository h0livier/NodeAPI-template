import { Request, Response } from 'express';
import Controller from "../decorators/controller.decorator";
import { Get, Post } from "../decorators/methods.decorator";
import { BaseController } from './base.controller';

@Controller('/cats')
export default class CatController extends BaseController {
    
    private cats: Array<{ name: string }> = [
        { name: 'Tom' },
        { name: 'Kitty' },
    ];

    constructor(source: any){
        super(source);
    }

    @Get('')
    public index(req: Request, res: Response): void {
        res.json({ cats: this.cats });
    }

    @Post('')
    public add(req: Request, res: Response): void {
        this.cats.push(req.body);
        res.status(204).json();
    }

    @Get('/:name')
    public findByName(req: Request, res: Response): unknown {
        const { name } = req.params;
        const foundCat = this.cats.find((c) => c.name === name);
        if (foundCat) {
            return res.json({ cat: foundCat });
        }
        return res.status(404).json({ message: 'Cat not found!' });
    }

}