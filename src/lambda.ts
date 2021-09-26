import { configure as  awsServerlessExpress } from '@vendia/serverless-express';
import { createServer } from './server';

let serverlessExpressInstance

async function setup (event, context) {
  const app = await createServer()

  serverlessExpressInstance = awsServerlessExpress({ app })
  return serverlessExpressInstance(event, context)
}

function handler (event, context) {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context)

  return setup(event, context)
}

exports.handler = handler;