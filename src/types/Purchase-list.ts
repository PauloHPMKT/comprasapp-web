export namespace PurchaseList {
  export interface ItemToAdd {
    name: string;
    quantity: string;
    category: string;
  }

  export interface ToCreate {
    title: string;
    description?: string;
    products: {
      name: string;
      quantity: number;
      category: string;
      price: number;
      unitPrice: number;
      totalPrice: number;
    }[];
    totalListPrice: number;
  }
}
