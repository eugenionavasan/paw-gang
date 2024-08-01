"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.badRequestHandler = badRequestHandler;
exports.isValidUser = isValidUser;
function errorHandler(err, req, res, origin) {
    console.error(`Error in ${origin}: ${err}`);
    res.status(500).send({ error: err });
}
function badRequestHandler(err, req, res, origin, modelName, identifier, value) {
    console.error(`Error in ${origin}: Could not find any ${modelName} with ${identifier} ${value}`);
    res.status(400).send({ error: err });
}
function isValidUser(body) {
    if (body.email && body.password && body.username && body.dogName)
        return true;
    else {
        return false;
    }
}
