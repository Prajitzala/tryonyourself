
export interface ClothingItem {
  id: string;
  type: 'top' | 'bottom' | 'person';
  imageUrl: string;
  name: string;
}

export interface GeneratedOutfit {
  id: string;
  imageUrl: string;
  timestamp: number;
  prompt?: string;
}

export enum AppState {
  LANDING = 'landing',
  GENERATOR = 'generator',
  WARDROBE = 'wardrobe'
}
