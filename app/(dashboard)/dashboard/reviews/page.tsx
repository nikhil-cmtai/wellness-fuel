'use client'

import React, { useState, useMemo } from 'react'
import { 
  Search, 
  Grid3X3, 
  List, 
  Edit, 
  Trash2, 
  Star,
  MessageSquare,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Package,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

// Dummy data
const dummyReviews = [
  {
    id: 1,
    customerName: "Rajesh Kumar",
    customerEmail: "rajesh.kumar@email.com",
    productName: "Premium Protein Powder",
    productId: 1,
    rating: 5,
    title: "Excellent quality protein powder!",
    review: "This protein powder is amazing! Great taste, mixes well, and I can see the results. Highly recommended for anyone serious about fitness.",
    status: "approved",
    verified: true,
    helpful: 12,
    notHelpful: 1,
    images: [
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop"
    ],
    createdAt: "2024-03-15",
    updatedAt: "2024-03-15"
  },
  {
    id: 2,
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@email.com",
    productName: "Organic Green Tea",
    productId: 2,
    rating: 4,
    title: "Good quality tea",
    review: "The green tea is good quality and has a nice flavor. Packaging could be better but overall satisfied with the purchase.",
    status: "approved",
    verified: true,
    helpful: 8,
    notHelpful: 2,
    images: [],
    createdAt: "2024-03-14",
    updatedAt: "2024-03-14"
  },
  {
    id: 3,
    customerName: "Amit Patel",
    customerEmail: "amit.patel@email.com",
    productName: "Vitamin D3 Capsules",
    productId: 3,
    rating: 5,
    title: "Great supplement",
    review: "Been taking these for 3 months now. My vitamin D levels have improved significantly. Doctor recommended and I'm very happy with the results.",
    status: "approved",
    verified: true,
    helpful: 15,
    notHelpful: 0,
    images: [],
    createdAt: "2024-03-13",
    updatedAt: "2024-03-13"
  },
  {
    id: 4,
    customerName: "Sneha Reddy",
    customerEmail: "sneha.reddy@email.com",
    productName: "Omega-3 Fish Oil",
    productId: 4,
    rating: 3,
    title: "Average product",
    review: "The fish oil is okay but I've had better. The capsules are quite large and sometimes cause burping. Not bad but not great either.",
    status: "pending",
    verified: false,
    helpful: 3,
    notHelpful: 5,
    images: [],
    createdAt: "2024-03-12",
    updatedAt: "2024-03-12"
  },
  {
    id: 5,
    customerName: "Vikram Singh",
    customerEmail: "vikram.singh@email.com",
    productName: "Multivitamin Complex",
    productId: 5,
    rating: 4,
    title: "Good multivitamin",
    review: "Comprehensive multivitamin with all essential nutrients. Easy to swallow and no aftertaste. Would recommend for daily use.",
    status: "approved",
    verified: true,
    helpful: 9,
    notHelpful: 1,
    images: [],
    createdAt: "2024-03-11",
    updatedAt: "2024-03-11"
  },
  {
    id: 6,
    customerName: "Anita Desai",
    customerEmail: "anita.desai@email.com",
    productName: "Herbal Sleep Aid",
    productId: 6,
    rating: 2,
    title: "Didn't work for me",
    review: "I tried this for a month but didn't notice any improvement in my sleep. Maybe it works for others but not for me. Disappointed with the results.",
    status: "rejected",
    verified: true,
    helpful: 2,
    notHelpful: 8,
    images: [],
    createdAt: "2024-03-10",
    updatedAt: "2024-03-10"
  },
  {
    id: 7,
    customerName: "Rohit Gupta",
    customerEmail: "rohit.gupta@email.com",
    productName: "Premium Protein Powder",
    productId: 1,
    rating: 5,
    title: "Best protein powder I've used!",
    review: "Amazing quality! The taste is perfect, mixes easily, and I've seen great muscle gains. Worth every penny. Will definitely buy again!",
    status: "approved",
    verified: true,
    helpful: 20,
    notHelpful: 0,
    images: [
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
    ],
    createdAt: "2024-03-09",
    updatedAt: "2024-03-09"
  },
  {
    id: 8,
    customerName: "Kavita Joshi",
    customerEmail: "kavita.joshi@email.com",
    productName: "Turmeric Curcumin",
    productId: 10,
    rating: 4,
    title: "Good anti-inflammatory",
    review: "Helps with joint pain and inflammation. Takes a few weeks to see results but definitely helps. Good quality product.",
    status: "approved",
    verified: true,
    helpful: 7,
    notHelpful: 1,
    images: [],
    createdAt: "2024-03-08",
    updatedAt: "2024-03-08"
  },
  {
    id: 9,
    customerName: "Deepak Mehta",
    customerEmail: "deepak.mehta@email.com",
    productName: "Collagen Peptides",
    productId: 16,
    rating: 5,
    title: "Great for skin and joints",
    review: "Been using this for 2 months and my skin looks better. Also helps with joint flexibility. Mixes well in coffee. Highly recommended!",
    status: "approved",
    verified: true,
    helpful: 11,
    notHelpful: 0,
    images: [],
    createdAt: "2024-03-07",
    updatedAt: "2024-03-07"
  },
  {
    id: 10,
    customerName: "Sunita Agarwal",
    customerEmail: "sunita.agarwal@email.com",
    productName: "Ashwagandha Root",
    productId: 13,
    rating: 3,
    title: "Mild effects",
    review: "Helps with stress but effects are mild. Takes time to work. Good quality but expected more noticeable results.",
    status: "pending",
    verified: false,
    helpful: 4,
    notHelpful: 3,
    images: [],
    createdAt: "2024-03-06",
    updatedAt: "2024-03-06"
  }
]

const reviewStatuses = ["All", "pending", "approved", "rejected"]
const ratingFilters = ["All", "5", "4", "3", "2", "1"]

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(dummyReviews)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedRating, setSelectedRating] = useState('All')
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState<typeof dummyReviews[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.review.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'All' || review.status === selectedStatus
      const matchesRating = selectedRating === 'All' || review.rating.toString() === selectedRating
      
      return matchesSearch && matchesStatus && matchesRating
    })
  }, [reviews, searchTerm, selectedStatus, selectedRating])

  // Pagination logic
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedStatus, selectedRating])

  const handleUpdateReviewStatus = async (reviewId: number, newStatus: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setReviews(reviews.map(review => 
        review.id === reviewId 
          ? { ...review, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
          : review
      ))
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteReview = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setReviews(reviews.filter(review => review.id !== selectedReview!.id))
      setShowDeleteModal(false)
      setSelectedReview(null)
    } finally {
      setIsLoading(false)
    }
  }

  const openViewModal = (review: typeof dummyReviews[0]) => {
    setSelectedReview(review)
    setShowViewModal(true)
  }

  const openEditModal = (review: typeof dummyReviews[0]) => {
    setSelectedReview(review)
    setShowEditModal(true)
  }

  const openDeleteModal = (review: typeof dummyReviews[0]) => {
    setSelectedReview(review)
    setShowDeleteModal(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning'
      case 'approved': return 'success'
      case 'rejected': return 'default'
      default: return 'secondary'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-amber-500 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reviews</h1>
            <p className="text-muted-foreground">Manage customer reviews and ratings</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reviews</p>
                  <p className="text-2xl font-bold text-foreground">{reviews.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-2xl font-bold text-foreground">{reviews.filter(r => r.status === 'pending').length}</p>
                </div>
                <Clock className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved Reviews</p>
                  <p className="text-2xl font-bold text-foreground">{reviews.filter(r => r.status === 'approved').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold text-foreground">{(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
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
                  placeholder="Search reviews..."
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
                  {reviewStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === 'All' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Rating Filter */}
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {ratingFilters.map(rating => (
                    <SelectItem key={rating} value={rating}>
                      {rating === 'All' ? 'All Ratings' : `${rating} Star${rating !== '1' ? 's' : ''}`}
                    </SelectItem>
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

        {/* Reviews Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedReviews.map(review => (
              <Card key={review.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg line-clamp-1">{review.title}</CardTitle>
                    <Badge variant={getStatusColor(review.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                      {getStatusIcon(review.status)}
                      <span className="ml-1">{review.status.charAt(0).toUpperCase() + review.status.slice(1)}</span>
                    </Badge>
                  </div>
                  <CardDescription>{review.productName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 flex-1 flex flex-col">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Customer:</span>
                      <span className="text-sm font-medium">{review.customerName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rating:</span>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="text-sm font-medium ml-1">({review.rating})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Verified:</span>
                      <Badge variant={review.verified ? 'success' : 'secondary'}>
                        {review.verified ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Helpful:</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3 text-green-500" />
                          <span className="text-sm">{review.helpful}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsDown className="w-3 h-3 text-red-500" />
                          <span className="text-sm">{review.notHelpful}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="text-sm font-medium">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">{review.review}</p>
                  </div>
                  <div className="flex gap-2 pt-2 mt-auto">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => openViewModal(review)}
                          className="flex-1 gap-2"
                          size="sm"
                          variant="outline"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View review details</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => openEditModal(review)}
                          className="flex-1 gap-2"
                          size="sm"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit review status</p>
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
                  <TableHead>Review</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedReviews.map(review => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{review.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{review.review}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{review.productName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{review.customerName}</p>
                        <p className="text-sm text-muted-foreground">{review.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="text-sm font-medium ml-1">({review.rating})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(review.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        {getStatusIcon(review.status)}
                        <span className="ml-1">{review.status.charAt(0).toUpperCase() + review.status.slice(1)}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(review.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openViewModal(review)}
                              variant="ghost"
                              size="icon"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View review</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openEditModal(review)}
                              variant="ghost"
                              size="icon"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit review</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openDeleteModal(review)}
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete review</p>
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
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredReviews.length)} of {filteredReviews.length} reviews
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

        {/* View Review Modal */}
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review Details - {selectedReview?.title}</DialogTitle>
              <DialogDescription>
                Complete review information and customer details.
              </DialogDescription>
            </DialogHeader>
            {selectedReview && (
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Title:</span>
                        <span className="font-medium">{selectedReview.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex items-center gap-1">
                          {renderStars(selectedReview.rating)}
                          <span className="font-medium ml-1">({selectedReview.rating}/5)</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={getStatusColor(selectedReview.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                          {getStatusIcon(selectedReview.status)}
                          <span className="ml-1">{selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1)}</span>
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verified:</span>
                        <Badge variant={selectedReview.verified ? 'success' : 'secondary'}>
                          {selectedReview.verified ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Helpful Votes:</span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4 text-green-500" />
                            <span className="font-medium">{selectedReview.helpful}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsDown className="w-4 h-4 text-red-500" />
                            <span className="font-medium">{selectedReview.notHelpful}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{selectedReview.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{selectedReview.customerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Product:</span>
                        <span className="font-medium">{selectedReview.productName}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Review Content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Review Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{selectedReview.review}</p>
                  </CardContent>
                </Card>

                {/* Review Images */}
                {selectedReview.images && selectedReview.images.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedReview.images.map((image, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                            <Image
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-full h-full object-cover"
                              fill
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="font-medium">{new Date(selectedReview.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Updated:</span>
                        <span className="font-medium">{new Date(selectedReview.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Review Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Update Review Status</DialogTitle>
              <DialogDescription>
                Change the status of review by {selectedReview?.customerName}
              </DialogDescription>
            </DialogHeader>
            {selectedReview && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="review-status" className="mb-2 block">Review Status</Label>
                  <Select 
                    value={selectedReview.status} 
                    onValueChange={(value) => setSelectedReview({...selectedReview, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {reviewStatuses.slice(1).map(status => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="review-verified" className="mb-2 block">Verified Purchase</Label>
                  <Select 
                    value={selectedReview.verified ? 'true' : 'false'} 
                    onValueChange={(value) => setSelectedReview({...selectedReview, verified: value === 'true'})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select verification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Verified</SelectItem>
                      <SelectItem value="false">Not Verified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  handleUpdateReviewStatus(selectedReview!.id, selectedReview!.status)
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
                  'Update Review'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Review</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the review by {selectedReview?.customerName}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteReview} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Review'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default ReviewsPage