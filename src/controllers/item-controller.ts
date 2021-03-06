import * as express from 'express';
import * as service from '../services/item-service';

export async function getItems(_: express.Request, res: express.Response) {
  try {
    const items = await service.getItems();

    res.status(200).send(items);
  } catch (err) {
    console.error('items::controller::getItems::error', err);
    res.status(500);
    res.send();
  }
}

export async function addItem(req: express.Request, res: express.Response) {
  try {
    const item = req.body;

    await service.addItem(item);

    res.status(200).send();
  } catch (err) {
    console.error('items::controller::addItem::error', err);
    res.status(500);
    res.send();
  }
}
