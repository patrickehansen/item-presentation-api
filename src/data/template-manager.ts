import { v4 as uuidv4 } from 'uuid';
import { client } from './client';
import { ItemTemplate } from '../models/template';

export async function getTemplates(): Promise<ItemTemplate[]> {
  try {
    const params: any = {
      TableName: 'ItemTemplates',
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
    console.error('templates::manager::getTemplates::error', err);
    throw err;
  }
}

export async function addTemplate(template: ItemTemplate): Promise<void> {
  try {
    await client.put({
      TableName: 'ItemTemplates',
      Item: {
        TemplateID: uuidv4(),
        ...template
      },
    }).promise();
  } catch (err) {
    console.error('templates::manager::addTemplate::error', err);
    throw err;
  }
}
