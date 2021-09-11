import * as express from 'express';

export function getTemplates(req: express.Request, res: express.Response) {
  try {

  } catch (err) {
    console.error('templates::controller::getTemplates::error', err);
    res.status(500);
    res.send();
  }
}

export function addTemplate(req: express.Request, res: express.Response) {
  try {

  } catch (err) {
    console.error('templates::controller::addTemplate::error', err);
    res.status(500);
    res.send();
  }
}