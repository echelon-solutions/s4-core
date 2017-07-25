"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Swagger2 = require("./swagger/2");
const JsonSchemaDraft4 = require("./jsonschema/draft-04");
const JsonSchemaDraft6 = require("./jsonschema/draft-06");
var ContentType;
(function (ContentType) {
    ContentType["SwaggerYaml2"] = "swagger.yaml;version=2";
    ContentType["SwaggerJson2"] = "swagger.json;version=2";
    ContentType["JsonSchemaDraft4"] = "jsonschema;version=draft-04";
    ContentType["JsonSchemaDraft6"] = "jsonschema;version=draft-06";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
class ContentHandler {
    constructor(type) {
        this.type = type;
    }
    validate(content) {
        switch (this.type) {
            case ContentType.SwaggerYaml2:
                return Swagger2.validateYaml(content);
            case ContentType.SwaggerJson2:
                return Swagger2.validateJson(content);
            case ContentType.JsonSchemaDraft4:
                return JsonSchemaDraft4.validate(content);
            case ContentType.JsonSchemaDraft6:
                return JsonSchemaDraft6.validate(content);
            default:
                throw new Error('Handler detected unsupported content type!');
        }
    }
}
exports.ContentHandler = ContentHandler;
