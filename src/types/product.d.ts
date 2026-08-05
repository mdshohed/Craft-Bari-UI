import { TUser } from "./user";

declare namespace PRODUCT_TYPE {

  export type Categories = {
    id: string;
    name: string;
    description: string;
    status?: Status;
  };

  export type Products = {
    id: string;
    name: string;
    description: string;
    salePrice: number, 
    purchasePrice: number,
    quantity: number,
    inStock: boolean,
    images: string,
    discounts: number,
    category?: Categories,
    categoryId?: Categories,
    user?: TUser
  };

  export type IProductFilterRequest = {
    searchTerm?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    category?: string | undefined; 
  };
  

  enum Status {
    ACTIVE,
    INACTIVE
  }

}
