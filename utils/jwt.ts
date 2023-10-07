import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken')

const SECRET_TOKEN = 'test123'
const EXPIRATION_TIME = '1m'

export const generateToken = (obj: any): string => {
    const token = jwt.sign(obj, SECRET_TOKEN, {
        expiresIn: EXPIRATION_TIME,
    });
    return token
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // check if the token has been sent in the request
    if(!token){
        res.status(400).json({message: 'No Token given. Please authenticate first.'})
        return
    }

    // Decode the token and check if the encoded values are good
    const decodedToken = jwt.verify(token, SECRET_TOKEN);
    const username = decodedToken.name
    if (username !== 'ohay') {
        res.status(400).json({message: 'Token not valid for your user. Please reauthenticate.'})
        return
    }    
    
    next()
}

