import * as express from 'express';

export function healthcheck(_: express.Request, res: express.Response) {
  console.log('healthcheck::starting execution')
  res.end('OK')
  console.log('healthcheck::successful execution')
}
