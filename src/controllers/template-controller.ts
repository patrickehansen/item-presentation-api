import * as express from 'express';
import * as service from '../services/template-service';

export async function getTemplates(req: express.Request, res: express.Response) {
  try {
    const templates = await service.getTemplates();

    res.send(templates);
  } catch (err) {
    console.error('templates::controller::getTemplates::error', err);
    res.status(500);
    res.send();
  }
}

export async function addTemplate(req: express.Request, res: express.Response) {
  try {
    const template = req.body;

    await service.addTemplate(template);

    res.send();
  } catch (err) {
    console.error('templates::controller::addTemplate::error', err);
    res.status(500);
    res.send();
  }
}