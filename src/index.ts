import * as provider from './provider/aws'

export enum ContentType {
  SwaggerVersion2 = 'swagger.yaml;version=2',
  JsonSchemaVersion4 = 'jsonschema;version=4'
}

export enum ResourceType {
  schemas,
  scenarios,
  specifications,
  services
}

export class Resource {
  name: string
  type: ResourceType
  content: string
  contentType: ContentType
  constructor(name: string, type: ResourceType, content: string, contentType: ContentType) {
    this.name = name
    this.type = type
    this.content = content
    this.contentType = contentType
  }
}

export class Component {
  name: string
  resources: Array<Resource>
  constructor(name: string, resources: Array<Resource>) {
    this.name = name
    this.resources = resources
  }
}

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
