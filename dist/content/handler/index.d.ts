export declare enum ContentType {
    SwaggerYaml2 = "swagger.yaml;version=2",
    SwaggerJson2 = "swagger.json;version=2",
    JsonSchemaDraft4 = "jsonschema;version=draft-04",
    JsonSchemaDraft6 = "jsonschema;version=draft-06",
}
export declare class ContentHandler {
    type: ContentType;
    constructor(type: ContentType);
    validate(content: string): Promise<void>;
}
