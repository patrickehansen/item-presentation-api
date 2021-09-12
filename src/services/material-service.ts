import * as manager from '../data/material-manager';
import { Material } from '../models/material';

export async function getMaterials(): Promise<Material[]> {
  try {
    const materials = await manager.getMaterials();

    return materials;
  } catch (err) {
    console.error('materials::service::getMaterials::error', err);
    throw err;
  }
}

export async function addMaterial(material: Material): Promise<void> {
  try {
    await manager.addMaterial(material);
  } catch (err) {
    console.error('materials::service::addMaterial::error', err);
    throw err;
  }
}
