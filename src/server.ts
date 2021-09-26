import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { Express } from 'express-serve-static-core';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'
import { connector, summarise } from 'swagger-routes-express';
import YAML from 'yamljs'
import config from './config'

import * as controllers from './controllers';

// morgan 
const yamlPath = './api/swagger.yaml'
let server;

export async function createServer(): Promise<Express> {
  try {
    if (server) return server;
    
    const apiDefinition = YAML.load(yamlPath)
    const apiSummary = summarise(apiDefinition)
    console.info(apiSummary)

    server = express();
    const validatorOptions = {
      apiSpec: yamlPath,
      validateRequests: true,
      validateResponses: true
    }

    server.use((req, res, next) => {
      console.log('incoming request', req);
      next()
    })

    if (config.env !== 'lambda') {
      server.use(cors({
        optionsSuccessStatus: 200,
        credentials: true,
        origin: (origin: any, callback: any) => {
          callback(undefined, true)
        }
      }))
    }
    

    server.use(OpenApiValidator.middleware(validatorOptions));
    server.use(express.json());
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDefinition, {
      explorer: true
    }));

    server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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

    return server;
  } catch (err) {
    console.error('Error starting server', err);
    throw err;
  }
}