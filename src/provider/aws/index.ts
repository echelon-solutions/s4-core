import { Component, ResourceType } from '../../'

import * as CloudFormation from 'aws-sdk/clients/cloudformation'
import * as S3 from 'aws-sdk/clients/s3'

let cloudformation = new CloudFormation({ apiVersion: '2010-05-15', region: 'us-east-1' })
let s3 = new S3({ apiVersion: '2006-03-01' })

/* Initializes the cloud environment for the specified component */
export function initialize (component: Component): Promise<void> {
  return Promise
  .resolve()
  .then(function (): Promise<boolean> {
    console.log('Checking if stack named [%s] exists ...', component.name)
    return cloudformation
    .describeStacks({
      StackName: component.name
    })
    .promise()
    .then(function (stack) {
      if (stack && stack.Stacks && stack.Stacks.length > 0) {
        console.log('The [%s] stack exists.', component.name)
        return true
      }
      return false
    })
    .catch(function (error) {
      if (error) {
        if (error.code === 'ValidationError') {
          console.log('The [%s] stack does not exist.', component.name)
          return false
        }
        console.error(error.message)
      }
      throw new Error('Unable to query if the stack exists in AWS.')
    })
  })
  .then(function (exists: boolean): Promise<void> {
    if (exists) {
      return Promise.resolve()
    } else {
      console.log('Creating the stack ...')
      return cloudformation.createStack({
        StackName: component.name,
        OnFailure: 'DELETE',
        Tags: [
          {
            Key: 'Name',
            Value: 'specification.cloud storage bucket'
          }
        ],
        TemplateBody: `
          AWSTemplateFormatVersion: '2010-09-09'
          Description: 'This stack contains the specification.cloud s4 resources.'
          Resources:
            Bucket:
              Type: 'AWS::S3::Bucket'
          Outputs:
            BucketUrl:
              Value: !Join [ '', [ 'https://', !GetAtt Bucket.DomainName ] ]
        `
      })
      .promise()
      .then(function (output) {
        console.log('Stack creation in progress ...')
        return
      })
      .catch(function (error) {
        console.error(error.message)
        throw new Error('Unable to create the stack.')
      })
    }
  })
  .then(function (): Promise<void> {
    console.log('Waiting for a valid stack state ...')
    return cloudformation.waitFor('stackCreateComplete', {
      StackName: component.name
    })
    .promise()
    .then(function (output) {
      console.log('Stack is in a valid state.')
      return
    })
    .catch(function (error) {
      console.error(error.message)
      throw new Error('Stack is in an invalid state.')
    })
  })
  .catch(function (error) {
    if (error) {
      console.error(error)
    }
    throw new Error('Unable to initialize the AWS provider for the specified component.')
  })
}

/* Deploys an item to S3 */
export function deploy (component: Component): Promise<void> {
  return Promise
  .resolve()
  .then(function () {
    return cloudformation.describeStackResource({
      StackName: component.name,
      LogicalResourceId: 'Bucket'
    })
    .promise()
  })
  .then(function (output) {
    if (!output || !output.StackResourceDetail || !output.StackResourceDetail.PhysicalResourceId) {
      throw new Error('No data received from AWS')
    }
    let uploads: Array<Promise<S3.PutObjectOutput>> = []
    for (let resource of component.resources) {
      uploads.push(s3.putObject({
        Body: resource.content, 
        Bucket: output.StackResourceDetail.PhysicalResourceId, 
        Key: ResourceType[resource.type] + '/' + resource.name 
        // ServerSideEncryption: "AES256"
        // Tagging: "key1=value1&key2=value2"
      })
      .promise())
    }
    return Promise.all(uploads)
  })
  .then(function (output) {
    console.log(output)
    console.log('Items uploaded successfully.')
    return
  })
  .catch(function (error) {
    console.error(error)
    throw new Error('Unable to deploy items.')
  })
}
