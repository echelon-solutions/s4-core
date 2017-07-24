export declare enum ContentType {
    SwaggerVersion2 = "swagger.yaml;version=2",
    JsonSchemaVersion4 = "jsonschema;version=4",
}
export declare enum ResourceType {
    schemas = 0,
    scenarios = 1,
    specifications = 2,
    services = 3,
}
export declare class Resource {
    name: string;
    type: ResourceType;
    content: string;
    contentType: ContentType;
    constructor(name: string, type: ResourceType, content: string, contentType: ContentType);
}
export declare class Component {
    name: string;
    resources: Array<Resource>;
    constructor(name: string, resources: Array<Resource>);
}
