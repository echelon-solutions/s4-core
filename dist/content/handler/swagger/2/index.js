"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SwaggerParser = require("swagger-parser");
const YAML = require("yamljs");
function validateYaml(content) {
    return Promise
        .resolve()
        .then(function () {
        let data;
        try {
            data = YAML.parse(content);
        }
        catch (e) {
            throw new Error('Unable to parse YAML string into object.');
        }
        return SwaggerParser.validate(data);
    })
        .then(function (api) {
        // swagger specification is valid
        return;
    })
        .catch(function (error) {
        console.error(error);
        throw new Error('Swagger is invalid!');
    });
}
exports.validateYaml = validateYaml;
function validateJson(content) {
    return Promise
        .resolve()
        .then(function () {
        let data;
        try {
            data = JSON.parse(content);
        }
        catch (e) {
            throw new Error('Unable to parse JSON string into object.');
        }
        return SwaggerParser.validate(data);
    })
        .then(function (api) {
        // swagger specification is valid
        return;
    })
        .catch(function (error) {
        console.error(error);
        throw new Error('Swagger is invalid!');
    });
}
exports.validateJson = validateJson;
