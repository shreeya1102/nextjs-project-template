'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserProfile, signOutUser } from '@/lib/auth';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DEFAULT_TRENDING_ITEMS, NAV_ITEMS } from '@/lib/constants';

export default function VendorDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserProfile(firebaseUser.uid);
          if (userData?.type !== 'vendor') {
            router.push('/');
            return;
          }
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          router.push('/auth/login');
        }
      } else {
        router.push('/auth/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigation = (href: string) => {
    router.push(`/vendor${href}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
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
              <Badge className="bg-orange-100 text-orange-600">Vendor</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome back! 👋
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-orange-100 text-xs">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2,450</div>
              <p className="text-green-100 text-xs">Compared to market price</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-blue-100 text-xs">In your area</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250</div>
              <p className="text-purple-100 text-xs">Redeem for discounts</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Navigation & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🧭 Quick Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <Button
                    key={item.key}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleNavigation(item.href)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⚡ Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  onClick={() => handleNavigation('/browse')}
                >
                  🔍 Browse Suppliers
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleNavigation('/cart')}
                >
                  🛒 View Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleNavigation('/analytics')}
                >
                  📊 View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Dashboard Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="trending" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trending">🔥 Trending</TabsTrigger>
                <TabsTrigger value="orders">📦 Recent Orders</TabsTrigger>
                <TabsTrigger value="suppliers">🚚 Suppliers</TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Trending Street Foods</CardTitle>
                    <CardDescription>
                      Popular items in your region and required ingredients
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {DEFAULT_TRENDING_ITEMS.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-600">
                            {item.popularity}% popular
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          📍 {item.region} • {item.category}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.ingredients.map((ingredient, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          size="sm" 
                          className="mt-2 bg-green-500 hover:bg-green-600"
                          onClick={() => handleNavigation('/browse')}
                        >
                          Find Suppliers
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      Your latest orders and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: 'ORD001', supplier: 'Fresh Veggies Co.', amount: '₹850', status: 'delivered', date: '2 days ago' },
                        { id: 'ORD002', supplier: 'Spice Master', amount: '₹1,200', status: 'shipped', date: '1 day ago' },
                        { id: 'ORD003', supplier: 'Grain Depot', amount: '₹2,100', status: 'confirmed', date: 'Today' },
                      ].map((order) => (
                        <div key={order.id} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.supplier}</p>
                            <p className="text-xs text-gray-500">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{order.amount}</p>
                            <Badge 
                              variant={order.status === 'delivered' ? 'default' : 'secondary'}
                              className={
                                order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                                'bg-orange-100 text-orange-600'
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => handleNavigation('/orders')}
                    >
                      View All Orders
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="suppliers" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Nearby Suppliers</CardTitle>
                    <CardDescription>
                      Suppliers in your area with good ratings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Fresh Veggies Co.', category: 'Vegetables', rating: 4.8, distance: '2.5 km', delivery: 'Same day' },
                        { name: 'Spice Master', category: 'Masalas', rating: 4.9, distance: '1.8 km', delivery: '2 hours' },
                        { name: 'Grain Depot', category: 'Grains', rating: 4.7, distance: '3.2 km', delivery: 'Next day' },
                      ].map((supplier, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{supplier.name}</p>
                            <p className="text-sm text-gray-600">{supplier.category}</p>
                            <p className="text-xs text-gray-500">
                              ⭐ {supplier.rating} • 📍 {supplier.distance} • 🚚 {supplier.delivery}
                            </p>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => handleNavigation('/browse')}
                          >
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => handleNavigation('/browse')}
                    >
                      Browse All Suppliers
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
