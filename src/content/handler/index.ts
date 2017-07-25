import * as Swagger2 from './swagger/2'
import * as JsonSchemaDraft4 from './jsonschema/draft-04'
import * as JsonSchemaDraft6 from './jsonschema/draft-06'

export enum ContentType {
  SwaggerYaml2 = 'swagger.yaml;version=2',
  SwaggerJson2 = 'swagger.json;version=2',
  JsonSchemaDraft4 = 'jsonschema;version=draft-04',
  JsonSchemaDraft6 = 'jsonschema;version=draft-06'
}

export class ContentHandler {
  type: ContentType
  constructor (type: ContentType) {
    this.type = type
  }
  validate (content: string): Promise<void> {
    switch (this.type) {
      case ContentType.SwaggerYaml2:
        return Swagger2.validateYaml(content)
      case ContentType.SwaggerJson2:
        return Swagger2.validateJson(content)
      case ContentType.JsonSchemaDraft4:
        return JsonSchemaDraft4.validate(content)
      case ContentType.JsonSchemaDraft6:
        return JsonSchemaDraft6.validate(content)
      default:
        throw new Error('Handler detected unsupported content type!')
    }
  }
}
