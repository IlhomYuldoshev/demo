import { NextFunction, Request, Response } from "express";

function checkUserSearchBody(request: Request, response: Response, next: NextFunction) {
    console.log(request.body);

    if (request.body.email == null || request.body.number == null) {
        return response.status(400).send('Validation error');
    } else {
        next()
    }
}

export {
    checkUserSearchBody
}