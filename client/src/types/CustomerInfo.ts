export interface Address {
  street: string;
  city: string;
  postalCode: string;
}

export interface CustomerInfo {
  email: string;
  phone: string;
  address: Address;
  paymentMethod: 'cash' | 'card';
  specialInstructions?: string;
}
