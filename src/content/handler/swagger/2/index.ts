import * as SwaggerParser from 'swagger-parser'
import * as YAML from 'yamljs'

export function validateYaml (content: string): Promise<void> {
  return Promise
  .resolve()
  .then(function () {
    let data: any
    try {
      data = YAML.parse(content)
    } catch (e) {
      throw new Error('Unable to parse YAML string into object.')
    }
    return SwaggerParser.validate(data)
  })
  .then(function (api) {
    // swagger specification is valid
    return
  })
  .catch(function (error) {
    console.error(error)
    throw new Error('Swagger is invalid!')
  })
}

export function validateJson (content: string): Promise<void> {
  return Promise
  .resolve()
  .then(function () {
    let data: any
    try {
      data = JSON.parse(content)
    } catch (e) {
      throw new Error('Unable to parse JSON string into object.')
    }
    return SwaggerParser.validate(data)
  })
  .then(function (api) {
    // swagger specification is valid
    return
  })
  .catch(function (error) {
    console.error(error)
    throw new Error('Swagger is invalid!')
  })
}
