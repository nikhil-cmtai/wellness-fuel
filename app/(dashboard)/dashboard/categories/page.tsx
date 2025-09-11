'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { 
  Plus, 
  Search, 
  Grid3X3, 
  List, 
  Edit, 
  Trash2, 
  Package,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Tag,
  TrendingUp,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Label } from '@/components/ui/label'

// Dummy data
const dummyCategories = [
  // ... (same as before)
  {
    id: 1,
    name: "Supplements",
    slug: "supplements",
    description: "Nutritional supplements including vitamins, minerals, and dietary supplements",
    image: "https://images.unsplash.com/photo-1582719478173-df2d3d6a8d8c?w=300&h=300&fit=crop",
    status: "active",
    productCount: 45,
    parentCategory: null,
    metaTitle: "Premium Supplements - Wellness Fuel",
    metaDescription: "High-quality nutritional supplements for optimal health and wellness",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-15"
  },
  // ... (rest unchanged)
  {
    id: 2,
    name: "Protein Powders",
    slug: "protein-powders",
    description: "High-quality protein powders for muscle building and recovery",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop",
    status: "active",
    productCount: 23,
    parentCategory: "Supplements",
    metaTitle: "Protein Powders - Build Muscle Naturally",
    metaDescription: "Premium protein powders for athletes and fitness enthusiasts",
    createdAt: "2024-01-20",
    updatedAt: "2024-03-10"
  },
  {
    id: 3,
    name: "Vitamins & Minerals",
    slug: "vitamins-minerals",
    description: "Essential vitamins and minerals for daily health support",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
    status: "active",
    productCount: 18,
    parentCategory: "Supplements",
    metaTitle: "Vitamins & Minerals - Daily Health Support",
    metaDescription: "Essential vitamins and minerals for optimal health",
    createdAt: "2024-01-25",
    updatedAt: "2024-03-08"
  },
  {
    id: 4,
    name: "Wellness",
    slug: "wellness",
    description: "General wellness products for overall health and lifestyle",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    status: "active",
    productCount: 32,
    parentCategory: null,
    metaTitle: "Wellness Products - Healthy Lifestyle",
    metaDescription: "Products to support your overall wellness journey",
    createdAt: "2024-02-01",
    updatedAt: "2024-03-12"
  },
  {
    id: 5,
    name: "Beverages",
    slug: "beverages",
    description: "Healthy beverages including teas, smoothies, and functional drinks",
    image: "https://images.unsplash.com/photo-1518976024611-28bf5f4f9d9d?w=300&h=300&fit=crop",
    status: "active",
    productCount: 15,
    parentCategory: null,
    metaTitle: "Healthy Beverages - Natural Drinks",
    metaDescription: "Natural and healthy beverages for daily consumption",
    createdAt: "2024-02-05",
    updatedAt: "2024-03-05"
  },
  {
    id: 6,
    name: "Herbal Teas",
    slug: "herbal-teas",
    description: "Organic herbal teas for relaxation and health benefits",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop",
    status: "active",
    productCount: 12,
    parentCategory: "Beverages",
    metaTitle: "Herbal Teas - Natural Wellness",
    metaDescription: "Organic herbal teas for natural wellness and relaxation",
    createdAt: "2024-02-10",
    updatedAt: "2024-03-01"
  },
  {
    id: 7,
    name: "Sports Nutrition",
    slug: "sports-nutrition",
    description: "Specialized nutrition products for athletes and active individuals",
    image: "https://images.unsplash.com/photo-1600180758895-f3be1b5a9e1a?w=300&h=300&fit=crop",
    status: "active",
    productCount: 28,
    parentCategory: null,
    metaTitle: "Sports Nutrition - Athletic Performance",
    metaDescription: "High-performance nutrition for athletes and fitness enthusiasts",
    createdAt: "2024-02-15",
    updatedAt: "2024-03-18"
  },
  {
    id: 8,
    name: "Weight Management",
    slug: "weight-management",
    description: "Products to support healthy weight management goals",
    image: "https://images.unsplash.com/photo-1598971639058-6b43f5e26d0e?w=300&h=300&fit=crop",
    status: "active",
    productCount: 20,
    parentCategory: null,
    metaTitle: "Weight Management - Healthy Goals",
    metaDescription: "Natural products to support healthy weight management",
    createdAt: "2024-02-20",
    updatedAt: "2024-03-20"
  },
  {
    id: 9,
    name: "Beauty & Skincare",
    slug: "beauty-skincare",
    description: "Natural beauty and skincare products for healthy skin",
    image: "https://images.unsplash.com/photo-1603398938378-447b2a3a6a6e?w=300&h=300&fit=crop",
    status: "inactive",
    productCount: 8,
    parentCategory: null,
    metaTitle: "Beauty & Skincare - Natural Care",
    metaDescription: "Natural beauty products for healthy, glowing skin",
    createdAt: "2024-02-25",
    updatedAt: "2024-03-22"
  },
  {
    id: 10,
    name: "Ayurvedic",
    slug: "ayurvedic",
    description: "Traditional Ayurvedic products for holistic wellness",
    image: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=300&h=300&fit=crop",
    status: "active",
    productCount: 16,
    parentCategory: null,
    metaTitle: "Ayurvedic Products - Traditional Wellness",
    metaDescription: "Authentic Ayurvedic products for traditional wellness",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-25"
  }
]

const categoryStatuses = ["All", "active", "inactive"]

const CategoriesPage = () => {
  const [categories, setCategories] = useState(dummyCategories)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<typeof dummyCategories[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // New category state
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    status: 'active',
    parentCategory: 'none',
    metaTitle: '',
    metaDescription: ''
  })

  // Filter categories
  const filteredCategories = useMemo(() => {
    return categories.filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.slug.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'All' || category.status === selectedStatus
      
      return matchesSearch && matchesStatus
    })
  }, [categories, searchTerm, selectedStatus])

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCategories = filteredCategories.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedStatus])

  const handleAddCategory = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const category = {
        id: categories.length + 1,
        ...newCategory,
        parentCategory: newCategory.parentCategory === 'none' ? null : newCategory.parentCategory,
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      
      setCategories([...categories, category])
      setShowAddModal(false)
      setNewCategory({
        name: '',
        slug: '',
        description: '',
        image: '',
        status: 'active',
        parentCategory: 'none',
        metaTitle: '',
        metaDescription: ''
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditCategory = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCategories(categories.map(category => 
        category.id === selectedCategory!.id 
          ? { 
              ...category, 
              ...selectedCategory, 
              parentCategory: selectedCategory!.parentCategory === 'none' ? null : selectedCategory!.parentCategory,
              updatedAt: new Date().toISOString().split('T')[0] 
            }
          : category
      ))
      setShowEditModal(false)
      setSelectedCategory(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteCategory = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCategories(categories.filter(category => category.id !== selectedCategory!.id))
      setShowDeleteModal(false)
      setSelectedCategory(null)
    } finally {
      setIsLoading(false)
    }
  }

  const openEditModal = (category: typeof dummyCategories[0]) => {
    setSelectedCategory({
      ...category,
      parentCategory: category.parentCategory || 'none'
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (category: typeof dummyCategories[0]) => {
    setSelectedCategory(category)
    setShowDeleteModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'inactive': return 'default'
      default: return 'secondary'
    }
  }

  const getParentCategories = () => {
    return categories.filter(cat => !cat.parentCategory).map(cat => cat.name)
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Product Categories</h1>
            <p className="text-muted-foreground">Manage product categories and organization</p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setShowAddModal(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add new product category</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Categories</p>
                  <p className="text-2xl font-bold text-foreground">{categories.length}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Categories</p>
                  <p className="text-2xl font-bold text-foreground">{categories.filter(c => c.status === 'active').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold text-foreground">{categories.reduce((sum, c) => sum + c.productCount, 0)}</p>
                </div>
                <Tag className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Parent Categories</p>
                  <p className="text-2xl font-bold text-foreground">{categories.filter(c => !c.parentCategory).length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
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
                  placeholder="Search categories..."
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
                  {categoryStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === 'All' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
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

        {/* Categories Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedCategories.map(category => (
              <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant={getStatusColor(category.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                      {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Slug:</span>
                        <span className="text-sm font-medium">{category.slug}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Products:</span>
                        <span className="text-lg font-bold text-foreground">{category.productCount}</span>
                      </div>
                      {category.parentCategory && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Parent:</span>
                          <span className="text-sm font-medium">{category.parentCategory}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 pt-2 mt-auto">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => openEditModal(category)}
                            className="flex-1 gap-2"
                            size="sm"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit category</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => openDeleteModal(category)}
                            className="flex-1 gap-2 text-destructive border border-destructive hover:bg-destructive/10 hover:text-destructive-foreground"
                            size="sm"
                            variant="ghost"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete category</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCategories.map(category => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{category.name}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{category.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{category.slug}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(category.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{category.productCount}</TableCell>
                    <TableCell>{category.parentCategory || '-'}</TableCell>
                    <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openEditModal(category)}
                              variant="default"
                              size="icon"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit category</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openDeleteModal(category)}
                              variant="default"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete category</p>
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
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredCategories.length)} of {filteredCategories.length} categories
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

        {/* Add Category Modal */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new product category with all necessary details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Basic Information</h3>
                <div>
                  <Label htmlFor="add-category-name" className="mb-2 block">Category Name</Label>
                  <Input
                    id="add-category-name"
                    type="text"
                    placeholder="Enter category name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-category-slug" className="mb-2 block">Slug</Label>
                  <Input
                    id="add-category-slug"
                    type="text"
                    placeholder="category-slug"
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-category-description" className="mb-2 block">Description</Label>
                  <Textarea
                    id="add-category-description"
                    placeholder="Enter category description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="add-category-image" className="mb-2 block">Image URL</Label>
                  <Input
                    id="add-category-image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={newCategory.image}
                    onChange={(e) => setNewCategory({...newCategory, image: e.target.value})}
                  />
                </div>
              </div>

              {/* Category Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Category Settings</h3>
                <div>
                  <Label htmlFor="add-category-status" className="mb-2 block">Status</Label>
                  <Select value={newCategory.status} onValueChange={(value) => setNewCategory({...newCategory, status: value})}>
                    <SelectTrigger id="add-category-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="add-category-parent" className="mb-2 block">Parent Category</Label>
                  <Select value={newCategory.parentCategory} onValueChange={(value) => setNewCategory({...newCategory, parentCategory: value})}>
                    <SelectTrigger id="add-category-parent">
                      <SelectValue placeholder="Select parent category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (Root Category)</SelectItem>
                      {getParentCategories().map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="add-category-meta-title" className="mb-2 block">Meta Title</Label>
                  <Input
                    id="add-category-meta-title"
                    type="text"
                    placeholder="SEO meta title"
                    value={newCategory.metaTitle}
                    onChange={(e) => setNewCategory({...newCategory, metaTitle: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-category-meta-description" className="mb-2 block">Meta Description</Label>
                  <Textarea
                    id="add-category-meta-description"
                    placeholder="SEO meta description"
                    value={newCategory.metaDescription}
                    onChange={(e) => setNewCategory({...newCategory, metaDescription: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Category'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Category Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update category information and settings.
              </DialogDescription>
            </DialogHeader>
            {selectedCategory && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Basic Information</h3>
                  <div>
                    <Label htmlFor="edit-category-name" className="mb-2 block">Category Name</Label>
                    <Input
                      id="edit-category-name"
                      type="text"
                      placeholder="Enter category name"
                      value={selectedCategory.name}
                      onChange={(e) => setSelectedCategory({...selectedCategory, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category-slug" className="mb-2 block">Slug</Label>
                    <Input
                      id="edit-category-slug"
                      type="text"
                      placeholder="category-slug"
                      value={selectedCategory.slug}
                      onChange={(e) => setSelectedCategory({...selectedCategory, slug: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category-description" className="mb-2 block">Description</Label>
                    <Textarea
                      id="edit-category-description"
                      placeholder="Enter category description"
                      value={selectedCategory.description}
                      onChange={(e) => setSelectedCategory({...selectedCategory, description: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category-image" className="mb-2 block">Image URL</Label>
                    <Input
                      id="edit-category-image"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={selectedCategory.image}
                      onChange={(e) => setSelectedCategory({...selectedCategory, image: e.target.value})}
                    />
                  </div>
                </div>

                {/* Category Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Category Settings</h3>
                  <div>
                    <Label htmlFor="edit-category-status" className="mb-2 block">Status</Label>
                    <Select value={selectedCategory.status} onValueChange={(value) => setSelectedCategory({...selectedCategory, status: value})}>
                      <SelectTrigger id="edit-category-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-category-parent" className="mb-2 block">Parent Category</Label>
                    <Select value={selectedCategory.parentCategory || 'none'} onValueChange={(value) => setSelectedCategory({...selectedCategory, parentCategory: value})}>
                      <SelectTrigger id="edit-category-parent">
                        <SelectValue placeholder="Select parent category (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None (Root Category)</SelectItem>
                        {getParentCategories().filter(cat => cat !== selectedCategory.name).map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-category-meta-title" className="mb-2 block">Meta Title</Label>
                    <Input
                      id="edit-category-meta-title"
                      type="text"
                      placeholder="SEO meta title"
                      value={selectedCategory.metaTitle}
                      onChange={(e) => setSelectedCategory({...selectedCategory, metaTitle: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category-meta-description" className="mb-2 block">Meta Description</Label>
                    <Textarea
                      id="edit-category-meta-description"
                      placeholder="SEO meta description"
                      value={selectedCategory.metaDescription}
                      onChange={(e) => setSelectedCategory({...selectedCategory, metaDescription: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleEditCategory} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Category'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Category</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete category &quot;{selectedCategory?.name}&quot;? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteCategory} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Category'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default CategoriesPage