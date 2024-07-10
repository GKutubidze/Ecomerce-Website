export interface Country {
  country: string;
  iso2: string;
  iso3: string;
  cities: string[];
}

export interface Address {
  country: string;
  state: string;
  city: string;
  zipCode: string;
}

export interface User {
  _id: string;
  firstname: string;
  surname: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

export interface Product {
  _id: string;
  productname: string;
  description: string;
  price: number;
  stock: number;
  images: {
    coverImage: string;
    additionalImages: string[];
  };
  category: Category;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ImageType {
  coverImage: string;
  additionalImages: string[];
}

export interface ProductType {
  _id: string;
  productname: string;
  description: string;
  price: number;
  stock: number;
  images: ImageType;
  category: Category;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
}
