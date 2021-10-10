import * as express from 'express';
import * as service from '../services/material-service';

export async function getMaterials(_: express.Request, res: express.Response) {
  try {
    const materials = await service.getMaterials();

    res.status(200).send(materials);
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

    res.status(200).send();
  } catch (err) {
    console.error('materials::controller::addMaterial::error', err);
    res.status(500);
    res.send();
  }
}

export async function editMaterial(req: express.Request, res: express.Response) {
  try {
    const material = req.body;
    const id = req.params.id;

    await service.editMaterial(id as string, material);

    res.status(200).send();
  } catch (err) {
    console.error('materials::controller::editMaterial::error', err);
    res.status(500);
    res.send();
  }
}

export async function deleteMaterial(req: express.Request, res: express.Response) {
  try {
    const id = req.params.id;

    await service.deleteMaterial(id as string);

    res.status(200).send();
  } catch (err) {
    console.error('materials::controller::deleteMaterial::error', err);
    res.status(500);
    res.send();
  }
}