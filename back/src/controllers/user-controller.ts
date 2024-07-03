import { Request, Response } from 'express';
import { userService } from '../services/user-service';

const userController = {
    async findUsers(req: Request, res: Response) {
        const { email, number } = req.body;
        const list = await userService.findUser(String(email), String(number).replaceAll('-', ''));

        return res.send(list)
    }
};

export {
    userController
}