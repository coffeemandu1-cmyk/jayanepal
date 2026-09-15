export type Language = 'ne' | 'en';

export interface Product {
  id: string;
  nameNe: string;
  nameEn: string;
  category: string;
  sku: string;
  descriptionNe: string;
  descriptionEn: string;
  imageUrl: string;
  featuresNe: string[];
  featuresEn: string[];
  specifications: { [key: string]: string };
  certification: string[]; // e.g. ['ISO 13485', 'CE', 'DDA Nepal Registered']
  packaging: string;
  inStock: boolean;
  popular?: boolean;
  urgentAvailable?: boolean;
}

export interface Category {
  id: string;
  nameNe: string;
  nameEn: string;
  iconName: string;
  descriptionNe: string;
  descriptionEn: string;
  count: number;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface HospitalService {
  id: string;
  titleNe: string;
  titleEn: string;
  descNe: string;
  descEn: string;
  icon: string;
  pointsNe: string[];
  pointsEn: string[];
}

export interface ClientPartner {
  name: string;
  location: string;
  type: string;
}
