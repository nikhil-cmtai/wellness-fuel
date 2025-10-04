'use client'

import React from 'react'
import { ShoppingBag, Eye, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppSelector } from '@/lib/redux/hooks'
import { 
  Order,
  selectOrders,
  selectOrderLoading,
  selectOrderError,
} from '@/lib/redux/features/orderSlice'
import { selectUser } from '@/lib/redux/features/authSlice'

const OrdersTab = () => {
  const currentUser = useAppSelector(selectUser)
  const allOrders = useAppSelector(selectOrders)
  const loading = useAppSelector(selectOrderLoading)
  const error = useAppSelector(selectOrderError)

  const handleViewOrder = (orderId: string) => {
    console.log('Viewing order:', orderId)
  }

  const handleTrackOrder = (orderId: string) => {
    console.log('Tracking order:', orderId)
  }

  // Filter orders by current user
  const orders = allOrders.filter(order => order.user === currentUser?._id)
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'success'
      case 'Shipped': return 'info'
      case 'Processing': return 'warning'
      case 'Pending': return 'secondary'
      case 'Cancelled': return 'destructive'
      case 'Returned': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Order History
          </CardTitle>
          <CardDescription>Track and manage your orders</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-2">Loading orders...</p>
            </div>
          )}

          {/* Orders List */}
          {!loading && (
            <div className="space-y-4">
            {orders.map((order: Order) => (
              <div key={order._id} className="border rounded-lg p-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold">{order.orderNumber}</h3>
                      <Badge variant={getStatusColor(order.status) as 'default' | 'secondary' | 'destructive'}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p className="font-medium">Order Date</p>
                        <p>{new Date(order.createdAt || '').toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Total Amount</p>
                        <p className="font-semibold text-foreground">₹{order.totalAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Items</p>
                        <p>{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                      </div>
                      {order.trackingNumber && (
                        <div>
                          <p className="font-medium">Tracking</p>
                          <p className="font-mono text-xs">{order.trackingNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewOrder(order._id || '')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {order.status === 'Shipped' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTrackOrder(order._id || '')}
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Track
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {orders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No orders found yet.</p>
              </div>
            )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default OrdersTab;
