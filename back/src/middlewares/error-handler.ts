import { Request, Response } from "express";

function errorHandlerMiddleware(error: unknown, request: Request, response: Response) {
    if (error instanceof Error) {
        return response.status(500).send(error.message)
    } else {
        return response.status(500).send('Unexpected error!')
    }
}

export {
    errorHandlerMiddleware
}