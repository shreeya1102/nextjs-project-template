'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserProfile } from '@/lib/auth';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEFAULT_TRENDING_ITEMS, COLORS } from '@/lib/constants';

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserProfile(firebaseUser.uid);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGetStarted = () => {
    router.push('/auth/register');
  };

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  const handleDashboard = () => {
    if (user?.type === 'vendor') {
      router.push('/vendor/dashboard');
    } else if (user?.type === 'supplier') {
      router.push('/supplier/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🏪</div>
              <h1 className="text-2xl font-baloo font-bold text-orange-600">
                BazaarBridge
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.type === 'vendor' ? 'Vendor' : 'Supplier'}!
                  </span>
                  <Button onClick={handleDashboard} className="bg-orange-500 hover:bg-orange-600">
                    Dashboard
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button variant="outline" onClick={handleSignIn}>
                    Sign In
                  </Button>
                  <Button onClick={handleGetStarted} className="bg-orange-500 hover:bg-orange-600">
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🍛🥘🍜</div>
            <h2 className="text-4xl md:text-6xl font-baloo font-bold text-gray-900 mb-6">
              Connect Street Food
              <span className="text-orange-500"> Vendors </span>
              with
              <span className="text-green-600"> Suppliers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              BazaarBridge brings together Indian street food vendors and local raw material suppliers 
              on one platform. Find ingredients, compare prices, and grow your food business.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
            >
              🏪 Join as Vendor
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleGetStarted}
              className="border-green-500 text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
            >
              🚚 Join as Supplier
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🔍</div>
                <CardTitle className="text-orange-600">Browse Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find local suppliers for vegetables, masalas, grains, and more. 
                  Filter by location, price, and vendor type.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💰</div>
                <CardTitle className="text-green-600">Compare Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get the best deals by comparing prices across multiple suppliers. 
                  Save money and increase your profit margins.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📊</div>
                <CardTitle className="text-blue-600">Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track your expenses, analyze purchasing patterns, and make 
                  data-driven decisions for your business.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trending Items Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-baloo font-bold text-gray-900 mb-4">
              🔥 Trending Street Foods
            </h3>
            <p className="text-gray-600">
              See what's popular in different regions and get the ingredients you need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DEFAULT_TRENDING_ITEMS.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-600">
                      {item.popularity}% popular
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    📍 {item.region} • {item.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Required Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.ingredients.map((ingredient, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Language Support Section */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-baloo font-bold text-gray-900 mb-4">
            🌐 Multi-Language Support
          </h3>
          <p className="text-gray-600 mb-8">
            Use BazaarBridge in your preferred language
          </p>
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">🇮🇳</div>
              <p className="font-medium">English</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🇮🇳</div>
              <p className="font-medium">हिंदी</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🇮🇳</div>
              <p className="font-medium">मराठी</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">🏪</div>
                <h4 className="text-xl font-baloo font-bold">BazaarBridge</h4>
              </div>
              <p className="text-gray-400">
                Connecting street food vendors with suppliers across India.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">For Vendors</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Browse Suppliers</li>
                <li>Compare Prices</li>
                <li>Track Orders</li>
                <li>Analytics</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">For Suppliers</h5>
              <ul className="space-y-2 text-gray-400">
                <li>List Products</li>
                <li>Manage Inventory</li>
                <li>Process Orders</li>
                <li>Delivery Partners</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BazaarBridge. Made with ❤️ for Indian street food vendors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
