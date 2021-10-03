import * as express from 'express';
import * as service from '../services/material-service';

export async function getMaterials(_: express.Request, res: express.Response) {
  try {
    const materials = await service.getMaterials();

    res.send(materials);
  } catch (err) {
    console.error('materials::controller::getMaterials::error', err);
    res.status(500);
    res.send();
  }
}

export async function addMaterial(req: express.Request, res: express.Response) {
  try {
    const material = req.body;

    await service.addMaterial(material);

    res.send();
  } catch (err) {
    console.error('materials::controller::addMaterial::error', err);
    res.status(500);
    res.send();
  }
}