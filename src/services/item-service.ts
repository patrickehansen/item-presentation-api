import * as manager from '../data/item-manager';
import { Item } from '../models/item';

export async function getItems(): Promise<Item[]> {
  try {
    const items = await manager.getItems();

    return items;
  } catch (err) {
    console.error('items::service::getItems::error', err);
    throw err;
  }
}

export async function addItem(item: Item): Promise<void> {
  try {
    await manager.addItem(item);
  } catch (err) {
    console.error('items::service::addItem::error', err);
    throw err;
  }
}
