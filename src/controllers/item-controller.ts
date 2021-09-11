import * as express from 'express';

export function getItems(req: express.Request, res: express.Response) {
  try {

  } catch (err) {
    console.error('items::controller::getItems::error', err);
    res.status(500);
    res.send();
  }
}

export function addItem(req: express.Request, res: express.Response) {
  try {

  } catch (err) {
    console.error('items::controller::addItem::error', err);
    res.status(500);
    res.send();
  }
}