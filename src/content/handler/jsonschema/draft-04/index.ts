import * as ajv from 'ajv'

export function validate (content: string): Promise<void> {
  return Promise
  .resolve()
  .then(function () {
    let data: string
    try {
      data = JSON.parse(content)
    } catch (e) {
      throw new Error('Unable to parse string into JSON.')
    }
    let validator = new ajv()
    validator.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'))
    validator.validateSchema(data)
    if (validator.errors && validator.errors.length > 0) {
      throw new Error(validator.errorsText())
    }
    return Promise.resolve()
  })
  .catch(function (error) {
    console.error(error)
    throw new Error('Schema is invalid!')
  })
}
