import * as express from 'express';
import * as service from '../services/template-service';

export async function getTemplates(_: express.Request, res: express.Response) {
  try {
    const templates = await service.getTemplates();

    res.status(200).send(templates);
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

    res.status(200).send();
  } catch (err) {
    console.error('templates::controller::addTemplate::error', err);
    res.status(500);
    res.send();
  }
}

export async function editTemplate(req: express.Request, res: express.Response) {
  try {
    const template = req.body;
    const id = req.params.id;

    const created = await service.editTemplate(id as string, template);

    res.status(200).send(created);
  } catch (err) {
    console.error('templates::controller::editTemplate::error', err);
    res.status(500);
    res.send();
  }
}

export async function deleteTemplate(req: express.Request, res: express.Response) {
  try {
    const id = req.params.id;

    const created = await service.deleteTemplate(id as string);

    res.status(200).send(created);
  } catch (err) {
    console.error('templates::controller::deleteTemplate::error', err);
    res.status(500);
    res.send();
  }
}