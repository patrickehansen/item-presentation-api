import * as express from 'express';

export function getMaterials(req: express.Request, res: express.Response) {
  try {

  } catch (err) {
    console.error('materials::controller::getMaterials::error', err);
    res.status(500);
    res.send();
  }
}

export function addMaterial(req: express.Request, res: express.Response) {
  try {

  } catch (err) {
    console.error('materials::controller::addMaterial::error', err);
    res.status(500);
    res.send();
  }
}