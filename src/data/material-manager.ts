import { v4 as uuidv4 } from 'uuid';
import { client } from './client';
import { Material } from '../models/material';

export async function getMaterials(): Promise<Material[]> {
  try {
    const params: any = {
      TableName: 'Materials',
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
    console.error('materials::manager::getMaterials::error', err);
    throw err;
  }
}

export async function addMaterial(material: Material): Promise<Material> {
  try {
    const added = await client.put({
      TableName: 'Materials',
      Item: {
        MaterialID: uuidv4(),
        ...material
      },
    }).promise();

    return added.Attributes as Material;
  } catch (err) {
    console.error('materials::manager::addMaterial::error', err);
    throw err;
  }
}

export async function editMaterial(id: string, material: Material): Promise<void> {
  try {
    await client.update({
      TableName: 'Materials',
      Key: {
        "MaterialID": id
      },
      UpdateExpression: `
        set #n = :n,
        Category = :c,
        MeltingTemperature = :melttemp,
        CraftingDifficulty = :cd,
        Hardness = :h,
        Damage = :d,
        Armor = :a,
        Weight = :w
      `,
      ExpressionAttributeNames: {
        "#n": "Name"
      },
      ExpressionAttributeValues: {
        ":n" : material.Name,
        ":c" : material.Category,
        ":melttemp" : material.MeltingTemperature,
        ":cd" : material.CraftingDifficulty,
        ":h" : material.Hardness,
        ":d" : material.Damage,
        ":a" : material.Armor,
        ":w" : material.Weight,
      }
    }).promise();
  } catch (err) {
    console.error('materials::manager::editMaterial::error', err);
    throw err;
  }
}

export async function deleteMaterial(id: string): Promise<void> {
  try {
    await client.delete({
      TableName: 'Materials',
      Key: {
        "MaterialID": id
      },
    }).promise();
  } catch (err) {
    console.error('materials::manager::deleteMaterial::error', err);
    throw err;
  }
}
