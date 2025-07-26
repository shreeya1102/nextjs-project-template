// User Types
export interface User {
  id: string;
  email: string;
  phone: string;
  type: 'vendor' | 'supplier';
  language: 'hi' | 'mr' | 'en';
  createdAt: Date;
  updatedAt: Date;
}

// Vendor Types
export interface VendorProfile {
  userId: string;
  businessName: string;
  vendorType: 'idli-stall' | 'chaat-wala' | 'momo-vendor' | 'vada-pav' | 'dosa-stall' | 'other';
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: [number, number];
  };
  preferences: string[];
  referralCode: string;
  rewardPoints: number;
}

// Supplier Types
export interface SupplierProfile {
  userId: string;
  businessName: string;
  items: string[];
  serviceAreas: string[];
  deliveryPartners: string[];
  deliveryHours: {
    start: string;
    end: string;
  };
  inventory: InventoryItem[];
  rating: number;
  totalOrders: number;
}

// Inventory Types
export interface InventoryItem {
  id: string;
  supplierId: string;
  name: string;
  category: 'vegetables' | 'masalas' | 'grains' | 'dairy' | 'other';
  price: number;
  unit: string;
  imageUrl: string;
  available: boolean;
  targetVendorTypes: string[];
  bundleDeals?: BundleDeal[];
}

export interface BundleDeal {
  id: string;
  name: string;
  items: string[];
  discountPercentage: number;
  minQuantity: number;
}

// Order Types
export interface Order {
  id: string;
  vendorId: string;
  supplierId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'upi' | 'cod' | 'wallet' | 'bnpl';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: Address;
  estimatedDelivery: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  coordinates?: [number, number];
}

// Trending Types
export interface TrendingItem {
  id: string;
  name: string;
  category: string;
  popularity: number;
  region: string;
  ingredients: string[];
  imageUrl?: string;
}

// Report Types
export interface QualityReport {
  id: string;
  orderId: string;
  vendorId: string;
  supplierId: string;
  rating: number;
  issue: 'quality' | 'delivery' | 'pricing' | 'other';
  description: string;
  imageUrl?: string;
  createdAt: Date;
}

// Analytics Types
export interface VendorAnalytics {
  monthlyExpenses: {
    month: string;
    amount: number;
  }[];
  categoryBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  topItems: {
    name: string;
    quantity: number;
    amount: number;
  }[];
  orderHistory: Order[];
}

// Cart Types
export interface CartItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  supplierId: string;
  supplierName: string;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}
