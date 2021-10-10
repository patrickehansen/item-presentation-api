import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import serverlessHttp from 'serverless-http';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'
import { connector, summarise } from 'swagger-routes-express';
import YAML from 'yamljs'
import path from 'path'

import * as controllers from './controllers';

// morgan 
const yamlPath = path.join(__dirname, './api/swagger.yaml');

const apiDefinition = YAML.load(yamlPath);
const apiSummary = summarise(apiDefinition);
console.info(apiSummary)

const server = express();
const validatorOptions = {
  apiSpec: yamlPath,
  validateRequests: true,
  validateResponses: true
}

server.use(cors({
  optionsSuccessStatus: 200,
  credentials: true,
  origin: (_: any, callback: any) => {
    callback(undefined, true)
  }
}))

server.use(OpenApiValidator.middleware(validatorOptions));
server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDefinition, {
  explorer: true
}));

server.use((err: any, _: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Request validation error', err)
  res.status(err.status || 400).json({
    error: {
      type: 'request_validation',
      message: err.message,
      errors: err.errors
    }
  })
})

server.use((err: any, _req: any, res: any, _next: any) => {
  console.error('Broad error handler', err)
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.send(err.message);
});

const connect = connector(controllers, apiDefinition, {
  onCreateRoute: (method: string, descriptor: any[]) => {
    console.log(`${method}: ${descriptor[0]} : ${(descriptor[1] as any).name}`)
  }
})

connect(server)

export const handler = serverlessHttp(server);


export {server};