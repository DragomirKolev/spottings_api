import express from 'express';
import cors from 'cors';
import { ERROR_TYPES } from '../helpers/errors';

// Set up the express app
export const app = express();
app.use(express.json());
app.use(cors());

export const handleExpressResponse = (res, promise) => {
    constructResponse(promise)
        .then((response) => {
            res.status(response.code).send(response);
        });
};

export const constructResponse = (promise) => {
    return promise.then((response) => {
        return resolvePromiseWithResponse(200, true, response);
    }).catch((err) => {
        const hasErrorType = err.type === ERROR_TYPES.VALIDATION;
        if (hasErrorType) {
            return resolvePromiseWithResponse(400, false, 'Invalid data provided.');
        }
        return resolvePromiseWithResponse(404, false, err.toString());
    });
};

/*
    code: HTTP Status Codes
    success: Boolean, did the request get executed successfully
    response: JSON / String
*/
export const resolvePromiseWithResponse = (code, success, response) => {
    return Promise.resolve({
        code: code,
        success: success,
        response: response
    });
};