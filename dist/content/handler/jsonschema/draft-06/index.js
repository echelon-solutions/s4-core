"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ajv = require("ajv");
function validate(content) {
    return Promise
        .resolve()
        .then(function () {
        let data;
        try {
            data = JSON.parse(content);
        }
        catch (e) {
            throw new Error('Unable to parse string into JSON.');
        }
        let validator = new ajv();
        validator.validateSchema(data);
        if (validator.errors && validator.errors.length > 0) {
            throw new Error(validator.errorsText());
        }
        return Promise.resolve();
    })
        .catch(function (error) {
        console.error(error);
        throw new Error('Schema is invalid!');
    });
}
exports.validate = validate;
