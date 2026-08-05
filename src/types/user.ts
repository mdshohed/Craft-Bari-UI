export type TUser = {
  id?: string,
  name?: string,
  email?: string,
  phone?: string,
  role?: string,
  address?: string,
  password?: string,
  cpassword?: string,
  isActive?: boolean
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  profilePhoto?: string;
  contactNumber?: string;
  gender?: string;
  isDeleted?: boolean
}

export interface UserRole {
  SUPER_ADMIN: String; 
  ADMIN: string;
  VENDOR: string;
  CUSTOMER: string
}

export type IShop = {
  shopName: string,
  ownerName: string,
  companyName: string,
  shopAddress: string,
  postalCode: string,
  logoImage: string,
  bannerImage?: string,
  shopCategory: string,
  createdAt: string
}


export enum UserRoleEnum {
  SUPER_ADMIN,
  ADMIN,
  VENDOR,
  CUSTOMER
}

export enum UserStatusEnum {
  ACTIVE,
  BLOCKED,
  DELETED
}