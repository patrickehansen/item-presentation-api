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

export async function addMaterial(material: Material): Promise<Material> {
  try {
    const added = await manager.addMaterial(material);

    return added;
  } catch (err) {
    console.error('materials::service::addMaterial::error', err);
    throw err;
  }
}

export async function editMaterial(id: string, material: Material): Promise<void> {
  try {
    await manager.editMaterial(id, material);
  } catch (err) {
    console.error('materials::service::editMaterial::error', err);
    throw err;
  }
}

export async function deleteMaterial(id: string): Promise<void> {
  try {
    await manager.deleteMaterial(id);
  } catch (err) {
    console.error('materials::service::deleteMaterial::error', err);
    throw err;
  }
}
