export interface Item {
  ItemID: string;
  Name: string;
  Category: string;
  Type: string;
  DamageRoll: string;
  Weight: number;
  Armor: Mitigation[];
}

export interface Mitigation {
  Type: number;
  Value: number;
}