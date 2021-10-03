import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import serverlessHttp from 'serverless-http';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'
import { connector, summarise } from 'swagger-routes-express';
import YAML from 'yamljs'
import config from './config'


import * as controllers from './controllers';

// morgan 
const yamlPath = './api/swagger.yaml'

const apiDefinition = YAML.load(yamlPath)
const apiSummary = summarise(apiDefinition)
console.info(apiSummary)

const server = express();
const validatorOptions = {
  apiSpec: yamlPath,
  validateRequests: true,
  validateResponses: true
}

if (config.env !== 'lambda') {
  server.use(cors({
    optionsSuccessStatus: 200,
    credentials: true,
    origin: (_: any, callback: any) => {
      callback(undefined, true)
    }
  }))
}

server.use(OpenApiValidator.middleware(validatorOptions));
server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDefinition, {
  explorer: true
}));

server.use((err: any, _: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(err.status).json({
    error: {
      type: 'request_validation',
      message: err.message,
      errors: err.errors
    }
  })
})

const connect = connector(controllers, apiDefinition, {
  onCreateRoute: (method: string, descriptor: any[]) => {
    console.log(`${method}: ${descriptor[0]} : ${(descriptor[1] as any).name}`)
  }
})

connect(server)

export const handler = serverlessHttp(server);