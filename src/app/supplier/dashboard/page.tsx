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
import { Progress } from '@/components/ui/progress';

export default function SupplierDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserProfile(firebaseUser.uid);
          if (userData?.type !== 'supplier') {
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
    router.push(`/supplier${href}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🏪</div>
              <h1 className="text-2xl font-baloo font-bold text-green-600">
                BazaarBridge
              </h1>
              <Badge className="bg-green-100 text-green-600">Supplier</Badge>
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
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-green-100 text-xs">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,200</div>
              <p className="text-blue-100 text-xs">+25% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-purple-100 text-xs">In inventory</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-orange-100 text-xs">⭐ Based on 89 reviews</p>
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
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation('/inventory')}
                >
                  <span className="mr-2">📦</span>
                  Manage Inventory
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation('/orders')}
                >
                  <span className="mr-2">📋</span>
                  View Orders
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation('/analytics')}
                >
                  <span className="mr-2">📊</span>
                  Analytics
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation('/delivery')}
                >
                  <span className="mr-2">🚚</span>
                  Delivery Partners
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation('/settings')}
                >
                  <span className="mr-2">⚙️</span>
                  Settings
                </Button>
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
                  className="w-full bg-green-500 hover:bg-green-600"
                  onClick={() => handleNavigation('/inventory/add')}
                >
                  ➕ Add Product
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleNavigation('/orders')}
                >
                  📦 Process Orders
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleNavigation('/bulk-upload')}
                >
                  📄 Bulk Upload
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎯 Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Order Fulfillment</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>On-time Delivery</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Customer Satisfaction</span>
                    <span>96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Dashboard Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="orders">📦 Recent Orders</TabsTrigger>
                <TabsTrigger value="inventory">📋 Inventory</TabsTrigger>
                <TabsTrigger value="insights">📈 Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      Orders that need your attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: 'ORD001', vendor: 'Raj Chaat Corner', items: 'Onions, Tomatoes, Green Chutney', amount: '₹850', status: 'pending', time: '2 hours ago' },
                        { id: 'ORD002', vendor: 'Mumbai Vada Pav', items: 'Potatoes, Bread, Masala', amount: '₹1,200', status: 'confirmed', time: '4 hours ago' },
                        { id: 'ORD003', vendor: 'Delhi Momos Hub', items: 'Flour, Vegetables, Sauces', amount: '₹2,100', status: 'shipped', time: '1 day ago' },
                      ].map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-gray-600">{order.vendor}</p>
                              <p className="text-xs text-gray-500">{order.items}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{order.amount}</p>
                              <Badge 
                                variant={order.status === 'shipped' ? 'default' : 'secondary'}
                                className={
                                  order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                                  order.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                                  'bg-orange-100 text-orange-600'
                                }
                              >
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">{order.time}</p>
                            <div className="space-x-2">
                              {order.status === 'pending' && (
                                <>
                                  <Button size="sm" variant="outline">
                                    Decline
                                  </Button>
                                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                    Accept
                                  </Button>
                                </>
                              )}
                              {order.status === 'confirmed' && (
                                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                                  Mark Shipped
                                </Button>
                              )}
                            </div>
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

              <TabsContent value="inventory" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Status</CardTitle>
                    <CardDescription>
                      Your current stock levels and popular items
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Fresh Onions', category: 'Vegetables', stock: 45, unit: 'kg', price: '₹25/kg', status: 'good' },
                        { name: 'Tomatoes', category: 'Vegetables', stock: 12, unit: 'kg', price: '₹35/kg', status: 'low' },
                        { name: 'Garam Masala', category: 'Spices', stock: 8, unit: 'kg', price: '₹450/kg', status: 'critical' },
                        { name: 'Basmati Rice', category: 'Grains', stock: 150, unit: 'kg', price: '₹85/kg', status: 'good' },
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.category}</p>
                            <p className="text-xs text-gray-500">{item.price}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{item.stock} {item.unit}</p>
                            <Badge 
                              variant="secondary"
                              className={
                                item.status === 'good' ? 'bg-green-100 text-green-600' :
                                item.status === 'low' ? 'bg-orange-100 text-orange-600' :
                                'bg-red-100 text-red-600'
                              }
                            >
                              {item.status === 'good' ? 'In Stock' :
                               item.status === 'low' ? 'Low Stock' : 'Critical'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => handleNavigation('/inventory')}
                    >
                      Manage Inventory
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Insights</CardTitle>
                    <CardDescription>
                      Key metrics and trends for your business
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">₹45,200</div>
                          <p className="text-sm text-gray-600">This Month Revenue</p>
                          <p className="text-xs text-green-600">+25% vs last month</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">156</div>
                          <p className="text-sm text-gray-600">Orders Completed</p>
                          <p className="text-xs text-blue-600">+18% vs last month</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Top Selling Categories</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Vegetables</span>
                            <div className="flex items-center gap-2">
                              <Progress value={75} className="w-20 h-2" />
                              <span className="text-sm text-gray-500">75%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Spices</span>
                            <div className="flex items-center gap-2">
                              <Progress value={60} className="w-20 h-2" />
                              <span className="text-sm text-gray-500">60%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Grains</span>
                            <div className="flex items-center gap-2">
                              <Progress value={45} className="w-20 h-2" />
                              <span className="text-sm text-gray-500">45%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Recent Reviews</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">Raj Chaat Corner</span>
                              <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                            </div>
                            <p className="text-xs text-gray-600">"Great quality vegetables, always fresh!"</p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">Mumbai Vada Pav</span>
                              <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                            </div>
                            <p className="text-xs text-gray-600">"Fast delivery and competitive prices."</p>
                          </div>
                        </div>
                      </div>
                    </div>
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
