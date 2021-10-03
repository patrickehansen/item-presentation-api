import { v4 as uuidv4 } from 'uuid';
import { client } from './client';
import { Item } from '../models/item';

export async function getItems(): Promise<Item[]> {
  try {
    const params: any = {
      TableName: 'Items',
    };

    const scanResults: any[] = [];
    let items;
    do{
      items =  await client.scan(params).promise();
      (items.Items || []).forEach((item) => scanResults.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");
    
    return scanResults;
  } catch (err) {
    console.error('items::manager::getItems::error', err);
    throw err;
  }
}

export async function addItem(item: Item): Promise<void> {
  try {
    await client.put({
      TableName: 'Items',
      Item: {
        ItemID: uuidv4(),
        ...item
      },
    }).promise();
  } catch (err) {
    console.error('items::manager::addItem::error', err);
    throw err;
  }
}
