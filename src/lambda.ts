import awsServerlessExpress from 'aws-serverless-express';
import { createServer } from './server';

const server = awsServerlessExpress.createServer(createServer())

export const handler = (event, context) => {
  console.log("event", event) 
  return awsServerlessExpress.proxy(server, event, context)
}