"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    if (err instanceof Error) {
        console.error(`Error: ${err}`);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
    else {
        console.error(`Error: ${err}`);
        res.status(500).send({ error: err });
    }
}
