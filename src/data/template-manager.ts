import { v4 as uuidv4 } from 'uuid';
import { client } from './client';
import { ItemTemplate } from '../models/template';

export async function getTemplates(): Promise<ItemTemplate[]> {
  try {
    const params: any = {
      TableName: 'ItemTemplates',
    };

    const scanResults: any[] = [];
    let items;
    do{
      items =  await client.scan(params).promise();
      (items.Items || []).forEach((item) => scanResults.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");
    
    return scanResults.map(v => ({
      ...v,
      Requirements: v.Requirements.map((r: any) => ({
        Type: r.Type,
        Count: Number(r.Count)
      }))
    }));
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

export async function editTemplate(id: string, template: ItemTemplate): Promise<void> {
  try {
    await client.update({
      TableName: 'ItemTemplates',
      Key: {
        "TemplateID": id
      },
      UpdateExpression: `
        set #n = :n,
        Category = :c,
        Type = :t,
        BaseDice = :bd,
        Handedness = :h,
        Size = :s,
        ProductionTime = :p,
        Requirements = :r
      `,
      ExpressionAttributeNames: {
        "#n": "Name"
      },
      ExpressionAttributeValues: {
        ":n" : template.Name,
        ":c" : template.Category,
        ":t" : template.Type,
        ":bd" : template.BaseDice,
        ":h" : template.Handedness,
        ":s" : template.Size,
        ":p" : template.ProductionTime,
        ":r" : template.Requirements
      }
    }).promise();
  } catch (err) {
    console.error('templates::manager::editTemplate::error', err);
    throw err;
  }
}

export async function deleteTemplate(id: string): Promise<void> {
  try {
    await client.delete({
      TableName: 'ItemTemplates',
      Key: {
        "TemplateID": id
      },
    }).promise();
  } catch (err) {
    console.error('templates::manager::deleteTemplate::error', err);
    throw err;
  }
}
