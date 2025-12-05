import jwt from 'jsonwebtoken'
import { User } from '../core/user/models.js'
import type { Request, Response, NextFunction } from 'express'

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

const protect = async(req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (!token) 
                throw new Error('No token found');

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

            req.user = await User.findById((decoded as any).userId);

            next()

        } catch (error) {
           console.log(error) 
           res.status(401)
           throw new Error('Acceso no autorizado')
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Acceso no autorizado, no proporcionaste el token');
    }  
}

export default protect;