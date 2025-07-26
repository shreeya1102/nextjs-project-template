// Indian Theme Colors
export const COLORS = {
  primary: '#FF6B35', // Saffron
  secondary: '#2E8B57', // Indian Green
  accent: '#FFD700', // Gold
  background: '#FFF8DC', // Cornsilk
  text: '#2F1B14', // Dark Brown
  white: '#FFFFFF',
  gray: {
    100: '#F7F7F7',
    200: '#E5E5E5',
    300: '#D1D1D1',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  }
};

// Vendor Types
export const VENDOR_TYPES = [
  { value: 'idli-stall', label: 'Idli Stall', hindi: 'इडली स्टॉल', marathi: 'इडली स्टॉल' },
  { value: 'chaat-wala', label: 'Chaat Wala', hindi: 'चाट वाला', marathi: 'चाट वाला' },
  { value: 'momo-vendor', label: 'Momo Vendor', hindi: 'मोमो विक्रेता', marathi: 'मोमो विक्रेता' },
  { value: 'vada-pav', label: 'Vada Pav', hindi: 'वड़ा पाव', marathi: 'वडा पाव' },
  { value: 'dosa-stall', label: 'Dosa Stall', hindi: 'डोसा स्टॉल', marathi: 'डोसा स्टॉल' },
  { value: 'other', label: 'Other', hindi: 'अन्य', marathi: 'इतर' },
];

// Item Categories
export const ITEM_CATEGORIES = [
  { value: 'vegetables', label: 'Vegetables', hindi: 'सब्जियां', marathi: 'भाज्या' },
  { value: 'masalas', label: 'Masalas', hindi: 'मसाले', marathi: 'मसाले' },
  { value: 'grains', label: 'Grains', hindi: 'अनाज', marathi: 'धान्य' },
  { value: 'dairy', label: 'Dairy', hindi: 'डेयरी', marathi: 'दुग्धजन्य' },
  { value: 'other', label: 'Other', hindi: 'अन्य', marathi: 'इतर' },
];

// Payment Methods
export const PAYMENT_METHODS = [
  { value: 'upi', label: 'UPI', icon: '📱' },
  { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
  { value: 'wallet', label: 'Wallet', icon: '💳' },
  { value: 'bnpl', label: 'Buy Now Pay Later', icon: '⏰' },
];

// Languages
export const LANGUAGES = [
  { value: 'en', label: 'English', native: 'English' },
  { value: 'hi', label: 'Hindi', native: 'हिंदी' },
  { value: 'mr', label: 'Marathi', native: 'मराठी' },
];

// Order Status
export const ORDER_STATUS = [
  { value: 'pending', label: 'Pending', color: '#FFA500' },
  { value: 'confirmed', label: 'Confirmed', color: '#32CD32' },
  { value: 'shipped', label: 'Shipped', color: '#1E90FF' },
  { value: 'delivered', label: 'Delivered', color: '#228B22' },
  { value: 'cancelled', label: 'Cancelled', color: '#DC143C' },
];

// Indian States
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep',
  'Andaman and Nicobar Islands'
];

// Popular Street Foods by Region
export const REGIONAL_STREET_FOODS = {
  'North India': ['Chole Bhature', 'Aloo Tikki', 'Gol Gappa', 'Kulfi', 'Tandoori Momos'],
  'South India': ['Idli Sambar', 'Dosa', 'Vada', 'Uttapam', 'Filter Coffee'],
  'West India': ['Vada Pav', 'Pav Bhaji', 'Bhel Puri', 'Sev Puri', 'Dabeli'],
  'East India': ['Puchka', 'Kathi Roll', 'Fish Fry', 'Mishti Doi', 'Jhal Muri'],
  'Central India': ['Poha', 'Jalebi', 'Samosa', 'Kachori', 'Bhutte ka Kees'],
};

// Common Ingredients for Street Foods
export const STREET_FOOD_INGREDIENTS = {
  'Vada Pav': ['Potato', 'Bread', 'Green Chutney', 'Tamarind Chutney', 'Fried Gram Flour'],
  'Pav Bhaji': ['Mixed Vegetables', 'Pav Bread', 'Butter', 'Onions', 'Pav Bhaji Masala'],
  'Dosa': ['Rice', 'Urad Dal', 'Fenugreek Seeds', 'Coconut Chutney', 'Sambar'],
  'Chaat': ['Sev', 'Chutneys', 'Yogurt', 'Onions', 'Tomatoes', 'Chaat Masala'],
  'Momos': ['Flour', 'Vegetables/Meat', 'Ginger', 'Garlic', 'Soy Sauce'],
};

// Default Trending Items
export const DEFAULT_TRENDING_ITEMS = [
  {
    id: '1',
    name: 'Tandoori Momos',
    category: 'Street Food',
    popularity: 95,
    region: 'Delhi',
    ingredients: ['Flour', 'Vegetables', 'Tandoori Masala', 'Yogurt'],
  },
  {
    id: '2',
    name: 'Cheese Vada Pav',
    category: 'Street Food',
    popularity: 88,
    region: 'Mumbai',
    ingredients: ['Potato', 'Cheese', 'Bread', 'Green Chutney'],
  },
  {
    id: '3',
    name: 'Masala Dosa',
    category: 'South Indian',
    popularity: 92,
    region: 'Bangalore',
    ingredients: ['Rice', 'Urad Dal', 'Potato', 'Coconut Chutney'],
  },
];

// Navigation Items
export const NAV_ITEMS = [
  { key: 'home', href: '/', icon: '🏠' },
  { key: 'browse', href: '/browse', icon: '🔍' },
  { key: 'orders', href: '/orders', icon: '📦' },
  { key: 'analytics', href: '/analytics', icon: '📊' },
  { key: 'cart', href: '/cart', icon: '🛒' },
  { key: 'settings', href: '/settings', icon: '⚙️' },
];
