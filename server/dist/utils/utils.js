"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noResultHandler = noResultHandler;
exports.missingBodyHandler = missingBodyHandler;
exports.missingParamHandler = missingParamHandler;
exports.isValidUser = isValidUser;
exports.isValidEvent = isValidEvent;
function noResultHandler(res, origin, modelName, id) {
    const idKey = Object.keys(id)[0] || 'id';
    const idValue = id[idKey] || 'undefined';
    console.error(`Error in ${origin}: Could not find any ${modelName} with ${idKey} ${idValue}`);
    res.status(400).send({
        error: `Could not find any ${modelName} with ${idKey} ${idValue}`,
    });
}
function missingBodyHandler(res, origin, modelName) {
    console.error(`Error in ${origin}: Request for ${modelName} is missing data in its body`);
    res.status(400).send({
        error: `Request for ${modelName} is missing data in its body`,
    });
}
function missingParamHandler(res, origin, modelName, paramName) {
    console.error(`Error in ${origin}: Request for ${modelName} is missing paramater ${paramName}`);
    res.status(400).send({
        error: `Request for ${modelName} is missing paramater ${paramName}`,
    });
}
function isValidUser(body) {
    if (body.email && body.password && body.username && body.dogName)
        return true;
    return false;
}
function isValidEvent(body) {
    console.log('----inside isValid---', body);
    if (body.place_id &&
        body.park_name &&
        body.address &&
        body.date &&
        body.user &&
        body.dog_avatar)
        return true;
    return false;
}
