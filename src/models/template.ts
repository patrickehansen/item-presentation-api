export interface ItemTemplateRequirement {
  Type: string;
  Count: number;
}

export interface ItemTemplate {
  TemplateID?: string;
  Name: string;
  Category: string;
  Type: string;
  BaseDice: string;
  Handedness: string;
  Size: string;
  ProductionTime: string;
  Requirements: ItemTemplateRequirement[];
}
