export interface Item {
  ItemID?: string;
  Name: string;
  Category: string;
  Type: string;
  DamageRoll: string;
  Weight: number;
  Armor: Mitigation[];
  Location: string;
  Layer: string;
  Notes: string;
}

export interface Mitigation {
  Type: number;
  Value: number;
}