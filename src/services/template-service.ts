import * as manager from '../data/template-manager';
import { ItemTemplate } from '../models/template';

export async function getTemplates(): Promise<ItemTemplate[]> {
  try {
    const templates = await manager.getTemplates();

    return templates;
  } catch (err) {
    console.error('materials::service::getTemplates::error', err);
    throw err;
  }
}

export async function addTemplate(template: ItemTemplate): Promise<void> {
  try {
    await manager.addTemplate(template);
  } catch (err) {
    console.error('materials::service::addTemplate::error', err);
    throw err;
  }
}


export async function editTemplate(id: string, template: ItemTemplate) {
  try {
    await manager.editTemplate(id, template);
  } catch (err) {
    console.error('materials::service::editTemplate::error', err);
    throw err;
  }
}

export async function deleteTemplate(id: string) {
  try {
     await manager.deleteTemplate(id as string);
  } catch (err) {
    console.error('materials::service::deleteTemplate::error', err);
    throw err;
  }
}