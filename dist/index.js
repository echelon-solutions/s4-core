"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceType;
(function (ResourceType) {
    ResourceType[ResourceType["schemas"] = 0] = "schemas";
    ResourceType[ResourceType["scenarios"] = 1] = "scenarios";
    ResourceType[ResourceType["specifications"] = 2] = "specifications";
    ResourceType[ResourceType["services"] = 3] = "services";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
class Resource {
    constructor(name, type, content, contentType) {
        this.name = name;
        this.type = type;
        this.content = content;
        this.contentType = contentType;
    }
}
exports.Resource = Resource;
class Component {
    constructor(name, resources) {
        this.name = name;
        this.resources = resources;
    }
}
exports.Component = Component;
/* Usage:

Promise
.resolve()
.then(function () {
  return provider.initialize(component)
})
.then(function () {
  return provider.deploy(component)
})
.catch(function (error) {
  console.error(error)
})

*/
