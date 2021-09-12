import { v4 as uuidv4 } from 'uuid';
import { client } from './client';
import { Material } from '../models/material';

export async function getMaterials(): Promise<Material[]> {
  try {
    const params: any = {
      TableName: 'Materials',
    };

    const scanResults = [];
    let items;
    do{
      items =  await client.scan(params).promise();
      items.Items.forEach((item) => scanResults.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");
    
    return scanResults;
  } catch (err) {
    console.error('materials::manager::getMaterials::error', err);
    throw err;
  }
}

export async function addMaterial(material: Material): Promise<void> {
  try {
    await client.put({
      TableName: 'Materials',
      Item: {
        MaterialID: uuidv4(),
        ...material
      },
    }).promise();
  } catch (err) {
    console.error('materials::manager::addMaterial::error', err);
    throw err;
  }
}
