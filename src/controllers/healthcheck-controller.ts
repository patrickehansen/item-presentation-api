import * as express from 'express';

export function healthcheck(req: express.Request, res: express.Response) {
  res.send('OK')
}
