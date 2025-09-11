'use client'

import React, { useState, useMemo } from 'react'
import { 
  Search, 
  Grid3X3, 
  List, 
  Edit, 
  Trash2, 
  Package,
  DollarSign,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Label } from '@/components/ui/label'

// Dummy data
const dummyOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    customerPhone: "+91 98765 43210",
    orderDate: "2024-03-15",
    status: "pending",
    totalAmount: 1249.95,
    items: [
      { productId: 1, name: "Premium Protein Powder", quantity: 2, price: 49.99 },
      { productId: 4, name: "Omega-3 Fish Oil", quantity: 1, price: 34.99 }
    ],
    shippingAddress: {
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India"
    },
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    trackingNumber: "TRK123456789",
    notes: "Customer requested express delivery"
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customerName: "Sarah Wilson",
    customerEmail: "sarah.wilson@email.com",
    customerPhone: "+91 87654 32109",
    orderDate: "2024-03-14",
    status: "shipped",
    totalAmount: 899.85,
    items: [
      { productId: 2, name: "Organic Green Tea", quantity: 3, price: 12.99 },
      { productId: 5, name: "Multivitamin Complex", quantity: 2, price: 19.99 },
      { productId: 6, name: "Herbal Sleep Aid", quantity: 1, price: 16.99 }
    ],
    shippingAddress: {
      street: "456 Park Avenue",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      country: "India"
    },
    paymentMethod: "UPI",
    paymentStatus: "paid",
    trackingNumber: "TRK987654321",
    notes: "Delivered to reception"
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@email.com",
    customerPhone: "+91 76543 21098",
    orderDate: "2024-03-13",
    status: "delivered",
    totalAmount: 2349.90,
    items: [
      { productId: 1, name: "Premium Protein Powder", quantity: 3, price: 49.99 },
      { productId: 3, name: "Vitamin D3 Capsules", quantity: 2, price: 24.99 },
      { productId: 4, name: "Omega-3 Fish Oil", quantity: 2, price: 34.99 }
    ],
    shippingAddress: {
      street: "789 Garden Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India"
    },
    paymentMethod: "Net Banking",
    paymentStatus: "paid",
    trackingNumber: "TRK456789123",
    notes: "Customer satisfied with delivery"
  },
  {
    id: 4,
    orderNumber: "ORD-2024-004",
    customerName: "Emily Davis",
    customerEmail: "emily.davis@email.com",
    customerPhone: "+91 65432 10987",
    orderDate: "2024-03-12",
    status: "cancelled",
    totalAmount: 599.85,
    items: [
      { productId: 2, name: "Organic Green Tea", quantity: 2, price: 12.99 },
      { productId: 6, name: "Herbal Sleep Aid", quantity: 3, price: 16.99 }
    ],
    shippingAddress: {
      street: "321 Oak Street",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001",
      country: "India"
    },
    paymentMethod: "Credit Card",
    paymentStatus: "refunded",
    trackingNumber: null,
    notes: "Customer requested cancellation due to change of mind"
  },
  {
    id: 5,
    orderNumber: "ORD-2024-005",
    customerName: "David Brown",
    customerEmail: "david.brown@email.com",
    customerPhone: "+91 54321 09876",
    orderDate: "2024-03-11",
    status: "processing",
    totalAmount: 1799.70,
    items: [
      { productId: 1, name: "Premium Protein Powder", quantity: 2, price: 49.99 },
      { productId: 4, name: "Omega-3 Fish Oil", quantity: 1, price: 34.99 },
      { productId: 5, name: "Multivitamin Complex", quantity: 3, price: 19.99 }
    ],
    shippingAddress: {
      street: "654 Pine Street",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700001",
      country: "India"
    },
    paymentMethod: "UPI",
    paymentStatus: "paid",
    trackingNumber: null,
    notes: "Processing for next day delivery"
  }
]

const orderStatuses = ["All", "pending", "processing", "shipped", "delivered", "cancelled"]
const paymentStatuses = ["All", "paid", "pending", "refunded", "failed"]

const OrdersPage = () => {
  const [orders, setOrders] = useState(dummyOrders)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('All')
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<typeof dummyOrders[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus
      const matchesPaymentStatus = selectedPaymentStatus === 'All' || order.paymentStatus === selectedPaymentStatus
      
      return matchesSearch && matchesStatus && matchesPaymentStatus
    })
  }, [orders, searchTerm, selectedStatus, selectedPaymentStatus])

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedStatus, selectedPaymentStatus])

  const handleUpdateOrderStatus = async (orderId: number, newStatus: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      ))
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteOrder = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setOrders(orders.filter(order => order.id !== selectedOrder!.id))
      setShowDeleteModal(false)
      setSelectedOrder(null)
    } finally {
      setIsLoading(false)
    }
  }

  const openViewModal = (order: typeof dummyOrders[0]) => {
    setSelectedOrder(order)
    setShowViewModal(true)
  }

  const openEditModal = (order: typeof dummyOrders[0]) => {
    setSelectedOrder(order)
    setShowEditModal(true)
  }

  const openDeleteModal = (order: typeof dummyOrders[0]) => {
    setSelectedOrder(order)
    setShowDeleteModal(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'processing': return <Package className="w-4 h-4" />
      case 'shipped': return <Truck className="w-4 h-4" />
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning'
      case 'processing': return 'secondary'
      case 'shipped': return 'default'
      case 'delivered': return 'success'
      case 'cancelled': return 'default'
      default: return 'secondary'
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground">Manage customer orders and fulfillment</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-foreground">{orders.length}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                  <p className="text-2xl font-bold text-foreground">{orders.filter(o => o.status === 'pending').length}</p>
                </div>
                <Clock className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Delivered Orders</p>
                  <p className="text-2xl font-bold text-foreground">{orders.filter(o => o.status === 'delivered').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">₹{orders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {orderStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Payment Status Filter */}
              <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment status" />
                </SelectTrigger>
                <SelectContent>
                  {paymentStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex border border-input rounded-lg overflow-hidden">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Grid view</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className="rounded-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>List view</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedOrders.map(order => (
              <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                    <Badge variant={getStatusColor(order.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    </Badge>
                  </div>
                  <CardDescription>{order.customerName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 flex-1 flex flex-col">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Order Date:</span>
                      <span className="text-sm font-medium">{new Date(order.orderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Amount:</span>
                      <span className="text-lg font-bold text-foreground">₹{order.totalAmount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Payment:</span>
                      <Badge variant={order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'refunded' ? 'default' : 'warning'}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Items:</span>
                      <span className="text-sm font-medium">{order.items.length} items</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2 mt-auto">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => openViewModal(order)}
                          className="flex-1 gap-2"
                          size="sm"
                          variant="outline"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View order details</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => openEditModal(order)}
                          className="flex-1 gap-2"
                          size="sm"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit order status</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(order.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'refunded' ? 'default' : 'warning'}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">₹{order.totalAmount}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openViewModal(order)}
                              variant="ghost"
                              size="icon"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View order</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openEditModal(order)}
                              variant="ghost"
                              size="icon"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit order</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openDeleteModal(order)}
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete order</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* View Order Modal */}
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder?.orderNumber}</DialogTitle>
              <DialogDescription>
                Complete order information and customer details.
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Order Number:</span>
                        <span className="font-medium">{selectedOrder.orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Order Date:</span>
                        <span className="font-medium">{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={getStatusColor(selectedOrder.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                          {getStatusIcon(selectedOrder.status)}
                          <span className="ml-1">{selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}</span>
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Amount:</span>
                        <span className="font-bold text-lg">₹{selectedOrder.totalAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Method:</span>
                        <span className="font-medium">{selectedOrder.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Status:</span>
                        <Badge variant={selectedOrder.paymentStatus === 'paid' ? 'success' : selectedOrder.paymentStatus === 'refunded' ? 'default' : 'warning'}>
                          {selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
                        </Badge>
                      </div>
                      {selectedOrder.trackingNumber && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tracking Number:</span>
                          <span className="font-medium">{selectedOrder.trackingNumber}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{selectedOrder.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{selectedOrder.customerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium">{selectedOrder.customerPhone}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="font-medium">{selectedOrder.shippingAddress.street}</p>
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                      <p>{selectedOrder.shippingAddress.pincode}, {selectedOrder.shippingAddress.country}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: typeof selectedOrder.items[0], index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{item.price}</p>
                            <p className="text-sm text-muted-foreground">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                {selectedOrder.notes && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{selectedOrder.notes}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Order Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Update Order Status</DialogTitle>
              <DialogDescription>
                Change the status of order {selectedOrder?.orderNumber}
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="order-status" className="mb-2 block">Order Status</Label>
                  <Select 
                    value={selectedOrder.status} 
                    onValueChange={(value) => setSelectedOrder({...selectedOrder, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {orderStatuses.slice(1).map(status => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tracking-number" className="mb-2 block">Tracking Number</Label>
                  <Input
                    id="tracking-number"
                    type="text"
                    placeholder="Enter tracking number"
                    value={selectedOrder.trackingNumber || ''}
                    onChange={(e) => setSelectedOrder({...selectedOrder, trackingNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="order-notes" className="mb-2 block">Notes</Label>
                  <Textarea
                    id="order-notes"
                    placeholder="Add order notes"
                    value={selectedOrder.notes || ''}
                    onChange={(e) => setSelectedOrder({...selectedOrder, notes: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  handleUpdateOrderStatus(selectedOrder!.id, selectedOrder!.status)
                  setShowEditModal(false)
                }} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Order'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Order</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete order {selectedOrder?.orderNumber}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteOrder} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Order'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default OrdersPage
