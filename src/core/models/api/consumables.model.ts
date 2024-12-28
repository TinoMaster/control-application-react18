export interface ConsumableModel {
    id: number;
    name: string;
    description: string;
    price: number;
    unit: string;
    stock: number;
    businessId: number;
    createdAt: Date;
    updatedAt: Date;
}