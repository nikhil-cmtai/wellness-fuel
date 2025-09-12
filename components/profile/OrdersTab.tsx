'use client'

import React from 'react'
import { ShoppingBag, Eye, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: number
  trackingNumber?: string
  estimatedDelivery?: string
}

interface OrdersTabProps {
  orders: Order[]
  onViewOrder: (orderId: string) => void
  onTrackOrder: (orderId: string) => void
}

const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  onViewOrder,
  onTrackOrder
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success'
      case 'shipped': return 'info'
      case 'processing': return 'warning'
      case 'pending': return 'secondary'
      case 'cancelled': return 'destructive'
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
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold">{order.orderNumber}</h3>
                      <Badge variant={getStatusColor(order.status) as 'default' | 'secondary' | 'destructive'}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p className="font-medium">Order Date</p>
                        <p>{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Total Amount</p>
                        <p className="font-semibold text-foreground">₹{order.total.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Items</p>
                        <p>{order.items} item{order.items > 1 ? 's' : ''}</p>
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
                      onClick={() => onViewOrder(order.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {order.status === 'shipped' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onTrackOrder(order.id)}
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
        </CardContent>
      </Card>
    </div>
  )
}

export default OrdersTab
