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
  FileText,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  TrendingUp,
  CheckCircle,
  Clock,
  Sparkles,
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

// Types
interface BlogWithEditableTags {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: string
  category: string
  tags: string | string[]
  status: string
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  readTime: string
  views: number
  likes: number
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  canonicalUrl: string
  ogTitle: string
  ogDescription: string
  ogImage: string
}

// Dummy data
const dummyBlogs = [
  {
    id: 1,
    title: "10 Essential Vitamins for Optimal Health",
    slug: "10-essential-vitamins-optimal-health",
    excerpt: "Discover the most important vitamins your body needs for optimal health and wellness.",
    content: "Vitamins are essential nutrients that our bodies need to function properly. In this comprehensive guide, we'll explore the 10 most important vitamins for optimal health...",
    featuredImage: "https://images.unsplash.com/photo-1582719478173-df2d3d6a8d8c?w=800&h=400&fit=crop",
    author: "Dr. Sarah Johnson",
    category: "Nutrition",
    tags: ["vitamins", "health", "nutrition", "wellness"],
    status: "published",
    publishedAt: "2024-03-15",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-15",
    readTime: "8 min read",
    views: 1250,
    likes: 89,
    metaTitle: "10 Essential Vitamins for Optimal Health | Wellness Fuel",
    metaDescription: "Discover the 10 most important vitamins for optimal health and wellness. Expert guide to essential nutrients your body needs daily.",
    metaKeywords: "vitamins, health, nutrition, wellness, essential nutrients, vitamin guide, health tips",
    canonicalUrl: "https://wellnessfuel.com/blog/10-essential-vitamins-optimal-health",
    ogTitle: "10 Essential Vitamins for Optimal Health",
    ogDescription: "Discover the 10 most important vitamins for optimal health and wellness.",
    ogImage: "https://images.unsplash.com/photo-1582719478173-df2d3d6a8d8c?w=1200&h=630&fit=crop"
  },
  {
    id: 2,
    title: "The Complete Guide to Protein Powders",
    slug: "complete-guide-protein-powders",
    excerpt: "Everything you need to know about protein powders - types, benefits, and how to choose the right one.",
    content: "Protein powders have become a staple in many fitness enthusiasts' diets. But with so many options available, choosing the right one can be overwhelming...",
    featuredImage: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=400&fit=crop",
    author: "Mike Chen",
    category: "Fitness",
    tags: ["protein", "fitness", "muscle building", "supplements"],
    status: "published",
    publishedAt: "2024-03-12",
    createdAt: "2024-03-08",
    updatedAt: "2024-03-12",
    readTime: "12 min read",
    views: 2100,
    likes: 156,
    metaTitle: "Complete Guide to Protein Powders | Types, Benefits & Selection",
    metaDescription: "Comprehensive guide to protein powders including types, benefits, and expert tips on choosing the right protein supplement for your goals.",
    metaKeywords: "protein powder, whey protein, casein protein, plant protein, muscle building, fitness supplements",
    canonicalUrl: "https://wellnessfuel.com/blog/complete-guide-protein-powders",
    ogTitle: "The Complete Guide to Protein Powders",
    ogDescription: "Everything you need to know about protein powders - types, benefits, and selection guide.",
    ogImage: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=1200&h=630&fit=crop"
  },
  {
    id: 3,
    title: "Natural Ways to Boost Your Immune System",
    slug: "natural-ways-boost-immune-system",
    excerpt: "Learn effective natural methods to strengthen your immune system and stay healthy year-round.",
    content: "A strong immune system is your body's first line of defense against illness. Here are proven natural ways to boost your immunity...",
    featuredImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
    author: "Dr. Emily Rodriguez",
    category: "Wellness",
    tags: ["immune system", "health", "natural remedies", "wellness"],
    status: "published",
    publishedAt: "2024-03-10",
    createdAt: "2024-03-05",
    updatedAt: "2024-03-10",
    readTime: "6 min read",
    views: 1800,
    likes: 134,
    metaTitle: "Natural Ways to Boost Your Immune System | Health Tips",
    metaDescription: "Discover effective natural methods to strengthen your immune system. Expert tips for staying healthy and boosting immunity naturally.",
    metaKeywords: "immune system, natural immunity, health tips, wellness, immune boost, natural remedies",
    canonicalUrl: "https://wellnessfuel.com/blog/natural-ways-boost-immune-system",
    ogTitle: "Natural Ways to Boost Your Immune System",
    ogDescription: "Learn effective natural methods to strengthen your immune system and stay healthy.",
    ogImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop"
  },
  {
    id: 4,
    title: "Understanding Omega-3 Fatty Acids",
    slug: "understanding-omega-3-fatty-acids",
    excerpt: "A deep dive into omega-3 fatty acids, their benefits, and the best sources for optimal health.",
    content: "Omega-3 fatty acids are essential fats that play crucial roles in brain function, heart health, and inflammation reduction...",
    featuredImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=400&fit=crop",
    author: "Dr. James Wilson",
    category: "Nutrition",
    tags: ["omega-3", "fish oil", "heart health", "brain health"],
    status: "draft",
    publishedAt: null,
    createdAt: "2024-03-18",
    updatedAt: "2024-03-20",
    readTime: "10 min read",
    views: 0,
    likes: 0,
    metaTitle: "Understanding Omega-3 Fatty Acids | Benefits & Sources",
    metaDescription: "Complete guide to omega-3 fatty acids including health benefits, best sources, and expert recommendations for optimal intake.",
    metaKeywords: "omega-3, fish oil, heart health, brain health, essential fatty acids, nutrition",
    canonicalUrl: "https://wellnessfuel.com/blog/understanding-omega-3-fatty-acids",
    ogTitle: "Understanding Omega-3 Fatty Acids",
    ogDescription: "A comprehensive guide to omega-3 fatty acids, their benefits, and best sources.",
    ogImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=630&fit=crop"
  },
  {
    id: 5,
    title: "The Science of Sleep and Recovery",
    slug: "science-sleep-recovery",
    excerpt: "Explore the scientific connection between quality sleep and optimal recovery for athletes and fitness enthusiasts.",
    content: "Sleep is not just rest - it's when your body performs critical recovery processes. Understanding the science can help optimize your results...",
    featuredImage: "https://images.unsplash.com/photo-1518976024611-28bf5f4f9d9d?w=800&h=400&fit=crop",
    author: "Dr. Lisa Park",
    category: "Fitness",
    tags: ["sleep", "recovery", "fitness", "performance"],
    status: "published",
    publishedAt: "2024-03-08",
    createdAt: "2024-03-03",
    updatedAt: "2024-03-08",
    readTime: "9 min read",
    views: 1650,
    likes: 98,
    metaTitle: "The Science of Sleep and Recovery | Athletic Performance",
    metaDescription: "Discover the scientific connection between quality sleep and optimal recovery. Expert insights for athletes and fitness enthusiasts.",
    metaKeywords: "sleep science, recovery, athletic performance, fitness, sleep optimization, sports science",
    canonicalUrl: "https://wellnessfuel.com/blog/science-sleep-recovery",
    ogTitle: "The Science of Sleep and Recovery",
    ogDescription: "Explore the scientific connection between quality sleep and optimal recovery.",
    ogImage: "https://images.unsplash.com/photo-1518976024611-28bf5f4f9d9d?w=1200&h=630&fit=crop"
  },
  {
    id: 6,
    title: "Ayurvedic Herbs for Modern Wellness",
    slug: "ayurvedic-herbs-modern-wellness",
    excerpt: "Discover how ancient Ayurvedic herbs can enhance your modern wellness routine.",
    content: "Ayurveda, the ancient Indian system of medicine, offers powerful herbs that can complement modern wellness practices...",
    featuredImage: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&h=400&fit=crop",
    author: "Dr. Priya Sharma",
    category: "Wellness",
    tags: ["ayurveda", "herbs", "traditional medicine", "wellness"],
    status: "published",
    publishedAt: "2024-03-05",
    createdAt: "2024-02-28",
    updatedAt: "2024-03-05",
    readTime: "11 min read",
    views: 1450,
    likes: 112,
    metaTitle: "Ayurvedic Herbs for Modern Wellness | Traditional Medicine",
    metaDescription: "Discover powerful Ayurvedic herbs that can enhance your modern wellness routine. Expert guide to traditional medicine benefits.",
    metaKeywords: "ayurveda, ayurvedic herbs, traditional medicine, wellness, natural remedies, holistic health",
    canonicalUrl: "https://wellnessfuel.com/blog/ayurvedic-herbs-modern-wellness",
    ogTitle: "Ayurvedic Herbs for Modern Wellness",
    ogDescription: "Discover how ancient Ayurvedic herbs can enhance your modern wellness routine.",
    ogImage: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1200&h=630&fit=crop"
  }
]

const blogStatuses = ["All", "published", "draft", "archived"]
const blogCategories = ["All", "Nutrition", "Fitness", "Wellness", "Supplements", "Lifestyle"]

const BlogsPage = () => {
  const [blogs, setBlogs] = useState(dummyBlogs)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<BlogWithEditableTags | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // New blog state
  const [newBlog, setNewBlog] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: '',
    category: '',
    tags: '',
    status: 'draft',
    readTime: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  })

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = selectedStatus === 'All' || blog.status === selectedStatus
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory
      
      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [blogs, searchTerm, selectedStatus, selectedCategory])

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedStatus, selectedCategory])

  const handleAddBlog = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const blog = {
        id: blogs.length + 1,
        ...newBlog,
        tags: newBlog.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag),
        views: 0,
        likes: 0,
        publishedAt: newBlog.status === 'published' ? new Date().toISOString().split('T')[0] : null,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      
      setBlogs([...blogs, blog])
      setShowAddModal(false)
      setNewBlog({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        author: '',
        category: '',
        tags: '',
        status: 'draft',
        readTime: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        canonicalUrl: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: ''
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditBlog = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setBlogs(blogs.map(blog => 
        blog.id === selectedBlog!.id 
          ? { 
              ...blog, 
              ...selectedBlog, 
              tags: typeof selectedBlog!.tags === 'string' 
                ? (selectedBlog!.tags as string).split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
                : selectedBlog!.tags as string[],
              publishedAt: selectedBlog!.status === 'published' && !blog.publishedAt 
                ? new Date().toISOString().split('T')[0] 
                : blog.publishedAt,
              updatedAt: new Date().toISOString().split('T')[0] 
            }
          : blog
      ))
      setShowEditModal(false)
      setSelectedBlog(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteBlog = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setBlogs(blogs.filter(blog => blog.id !== selectedBlog!.id))
      setShowDeleteModal(false)
      setSelectedBlog(null)
    } finally {
      setIsLoading(false)
    }
  }

  const openEditModal = (blog: typeof dummyBlogs[0]) => {
    setSelectedBlog({
      ...blog,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags as string)
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (blog: typeof dummyBlogs[0]) => {
    setSelectedBlog(blog)
    setShowDeleteModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'success'
      case 'draft': return 'warning'
      case 'archived': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
            <p className="text-muted-foreground">Manage blog posts, SEO, and content strategy</p>
          </div>
          <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setShowAddModal(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Blog Post
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a new blog post</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={() => window.location.href = '/dashboard/blogs/addBlogs'} 
                className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Sparkles className="w-4 h-4" />
                AI Add Blog
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add blog post using AI image analysis</p>
            </TooltipContent>
          </Tooltip>
        </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold text-foreground">{blogs.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold text-foreground">{blogs.filter(b => b.status === 'published').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-bold text-foreground">{blogs.filter(b => b.status === 'draft').length}</p>
                </div>
                <Clock className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold text-foreground">{blogs.reduce((sum, b) => sum + b.views, 0).toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
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
                  placeholder="Search blog posts..."
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
                  {blogStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === 'All' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {blogCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'All' ? 'All Categories' : category}
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

        {/* Blogs Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedBlogs.map(blog => (
              <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant={getStatusColor(blog.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                      {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{blog.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{blog.category}</Badge>
                    <span className="text-sm text-muted-foreground">{blog.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">{blog.views} views</span>
                      <span className="text-muted-foreground">{blog.likes} likes</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => openEditModal(blog)}
                          className="flex-1 gap-2"
                          size="sm"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit blog post</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => openDeleteModal(blog)}
                          className="flex-1 gap-2 text-destructive border border-destructive hover:bg-destructive/10 hover:text-destructive-foreground"
                          size="sm"
                          variant="ghost"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete blog post</p>
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
                  <TableHead>Blog Post</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBlogs.map(blog => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden">
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground line-clamp-1">{blog.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{blog.excerpt}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {blog.tags.slice(0, 2).map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {blog.tags.length > 2 && (
                              <span className="text-xs text-muted-foreground">+{blog.tags.length - 2}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{blog.author}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{blog.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(blog.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{blog.views.toLocaleString()}</TableCell>
                    <TableCell>
                      {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openEditModal(blog)}
                              variant="ghost"
                              size="icon"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit blog post</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openDeleteModal(blog)}
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete blog post</p>
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
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredBlogs.length)} of {filteredBlogs.length} blog posts
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

        {/* Add Blog Modal */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Blog Post</DialogTitle>
              <DialogDescription>
                Create a new blog post with comprehensive SEO optimization.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Basic Information</h3>
                <div>
                  <Label htmlFor="add-blog-title" className="mb-2 block">Blog Title</Label>
                  <Input
                    id="add-blog-title"
                    type="text"
                    placeholder="Enter blog title"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-blog-slug" className="mb-2 block">Slug</Label>
                  <Input
                    id="add-blog-slug"
                    type="text"
                    placeholder="blog-post-slug"
                    value={newBlog.slug}
                    onChange={(e) => setNewBlog({...newBlog, slug: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-blog-excerpt" className="mb-2 block">Excerpt</Label>
                  <Textarea
                    id="add-blog-excerpt"
                    placeholder="Brief description of the blog post"
                    value={newBlog.excerpt}
                    onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="add-blog-content" className="mb-2 block">Content</Label>
                  <Textarea
                    id="add-blog-content"
                    placeholder="Write your blog post content here..."
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                    rows={8}
                  />
                </div>
                <div>
                  <Label htmlFor="add-blog-image" className="mb-2 block">Featured Image URL</Label>
                  <Input
                    id="add-blog-image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={newBlog.featuredImage}
                    onChange={(e) => setNewBlog({...newBlog, featuredImage: e.target.value})}
                  />
                </div>
              </div>

              {/* Author & Category */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Author & Category</h3>
                <div>
                  <Label htmlFor="add-blog-author" className="mb-2 block">Author</Label>
                  <Input
                    id="add-blog-author"
                    type="text"
                    placeholder="Author name"
                    value={newBlog.author}
                    onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-blog-category" className="mb-2 block">Category</Label>
                  <Select value={newBlog.category} onValueChange={(value) => setNewBlog({...newBlog, category: value})}>
                    <SelectTrigger id="add-blog-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {blogCategories.slice(1).map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="add-blog-tags" className="mb-2 block">Tags (comma separated)</Label>
                  <Input
                    id="add-blog-tags"
                    type="text"
                    placeholder="tag1, tag2, tag3"
                    value={newBlog.tags}
                    onChange={(e) => setNewBlog({...newBlog, tags: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-blog-status" className="mb-2 block">Status</Label>
                  <Select value={newBlog.status} onValueChange={(value) => setNewBlog({...newBlog, status: value})}>
                    <SelectTrigger id="add-blog-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="add-blog-read-time" className="mb-2 block">Read Time</Label>
                  <Input
                    id="add-blog-read-time"
                    type="text"
                    placeholder="e.g., 5 min read"
                    value={newBlog.readTime}
                    onChange={(e) => setNewBlog({...newBlog, readTime: e.target.value})}
                  />
                </div>
              </div>

              {/* SEO Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">SEO Settings</h3>
                <div>
                  <Label htmlFor="add-blog-meta-title" className="mb-2 block">Meta Title</Label>
                  <Input
                    id="add-blog-meta-title"
                    type="text"
                    placeholder="SEO optimized title (50-60 characters)"
                    value={newBlog.metaTitle}
                    onChange={(e) => setNewBlog({...newBlog, metaTitle: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-blog-meta-description" className="mb-2 block">Meta Description</Label>
                  <Textarea
                    id="add-blog-meta-description"
                    placeholder="SEO description (150-160 characters)"
                    value={newBlog.metaDescription}
                    onChange={(e) => setNewBlog({...newBlog, metaDescription: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="add-blog-meta-keywords" className="mb-2 block">Meta Keywords</Label>
                  <Input
                    id="add-blog-meta-keywords"
                    type="text"
                    placeholder="keyword1, keyword2, keyword3"
                    value={newBlog.metaKeywords}
                    onChange={(e) => setNewBlog({...newBlog, metaKeywords: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-blog-canonical" className="mb-2 block">Canonical URL</Label>
                  <Input
                    id="add-blog-canonical"
                    type="url"
                    placeholder="https://wellnessfuel.com/blog/post-slug"
                    value={newBlog.canonicalUrl}
                    onChange={(e) => setNewBlog({...newBlog, canonicalUrl: e.target.value})}
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Social Media</h3>
                <div>
                  <Label htmlFor="add-blog-og-title" className="mb-2 block">Open Graph Title</Label>
                  <Input
                    id="add-blog-og-title"
                    type="text"
                    placeholder="Social media title"
                    value={newBlog.ogTitle}
                    onChange={(e) => setNewBlog({...newBlog, ogTitle: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="add-blog-og-description" className="mb-2 block">Open Graph Description</Label>
                  <Textarea
                    id="add-blog-og-description"
                    placeholder="Social media description"
                    value={newBlog.ogDescription}
                    onChange={(e) => setNewBlog({...newBlog, ogDescription: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="add-blog-og-image" className="mb-2 block">Open Graph Image URL</Label>
                  <Input
                    id="add-blog-og-image"
                    type="url"
                    placeholder="https://example.com/og-image.jpg"
                    value={newBlog.ogImage}
                    onChange={(e) => setNewBlog({...newBlog, ogImage: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleAddBlog} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Blog Post'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Blog Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Blog Post</DialogTitle>
              <DialogDescription>
                Update blog post information and SEO settings.
              </DialogDescription>
            </DialogHeader>
            {selectedBlog && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Basic Information</h3>
                  <div>
                    <Label htmlFor="edit-blog-title" className="mb-2 block">Blog Title</Label>
                    <Input
                      id="edit-blog-title"
                      type="text"
                      placeholder="Enter blog title"
                      value={selectedBlog.title}
                      onChange={(e) => setSelectedBlog({...selectedBlog, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-slug" className="mb-2 block">Slug</Label>
                    <Input
                      id="edit-blog-slug"
                      type="text"
                      placeholder="blog-post-slug"
                      value={selectedBlog.slug}
                      onChange={(e) => setSelectedBlog({...selectedBlog, slug: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-excerpt" className="mb-2 block">Excerpt</Label>
                    <Textarea
                      id="edit-blog-excerpt"
                      placeholder="Brief description of the blog post"
                      value={selectedBlog.excerpt}
                      onChange={(e) => setSelectedBlog({...selectedBlog, excerpt: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-content" className="mb-2 block">Content</Label>
                    <Textarea
                      id="edit-blog-content"
                      placeholder="Write your blog post content here..."
                      value={selectedBlog.content}
                      onChange={(e) => setSelectedBlog({...selectedBlog, content: e.target.value})}
                      rows={8}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-image" className="mb-2 block">Featured Image URL</Label>
                    <Input
                      id="edit-blog-image"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={selectedBlog.featuredImage}
                      onChange={(e) => setSelectedBlog({...selectedBlog, featuredImage: e.target.value})}
                    />
                  </div>
                </div>

                {/* Author & Category */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Author & Category</h3>
                  <div>
                    <Label htmlFor="edit-blog-author" className="mb-2 block">Author</Label>
                    <Input
                      id="edit-blog-author"
                      type="text"
                      placeholder="Author name"
                      value={selectedBlog.author}
                      onChange={(e) => setSelectedBlog({...selectedBlog, author: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-category" className="mb-2 block">Category</Label>
                    <Select value={selectedBlog.category} onValueChange={(value) => setSelectedBlog({...selectedBlog, category: value})}>
                      <SelectTrigger id="edit-blog-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {blogCategories.slice(1).map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-tags" className="mb-2 block">Tags (comma separated)</Label>
                    <Input
                      id="edit-blog-tags"
                      type="text"
                      placeholder="tag1, tag2, tag3"
                      value={Array.isArray(selectedBlog.tags) ? selectedBlog.tags.join(', ') : (selectedBlog.tags as string)}
                      onChange={(e) => setSelectedBlog({...selectedBlog, tags: e.target.value as string})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-status" className="mb-2 block">Status</Label>
                    <Select value={selectedBlog.status} onValueChange={(value) => setSelectedBlog({...selectedBlog, status: value})}>
                      <SelectTrigger id="edit-blog-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-read-time" className="mb-2 block">Read Time</Label>
                    <Input
                      id="edit-blog-read-time"
                      type="text"
                      placeholder="e.g., 5 min read"
                      value={selectedBlog.readTime}
                      onChange={(e) => setSelectedBlog({...selectedBlog, readTime: e.target.value})}
                    />
                  </div>
                </div>

                {/* SEO Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">SEO Settings</h3>
                  <div>
                    <Label htmlFor="edit-blog-meta-title" className="mb-2 block">Meta Title</Label>
                    <Input
                      id="edit-blog-meta-title"
                      type="text"
                      placeholder="SEO optimized title (50-60 characters)"
                      value={selectedBlog.metaTitle}
                      onChange={(e) => setSelectedBlog({...selectedBlog, metaTitle: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-meta-description" className="mb-2 block">Meta Description</Label>
                    <Textarea
                      id="edit-blog-meta-description"
                      placeholder="SEO description (150-160 characters)"
                      value={selectedBlog.metaDescription}
                      onChange={(e) => setSelectedBlog({...selectedBlog, metaDescription: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-meta-keywords" className="mb-2 block">Meta Keywords</Label>
                    <Input
                      id="edit-blog-meta-keywords"
                      type="text"
                      placeholder="keyword1, keyword2, keyword3"
                      value={selectedBlog.metaKeywords}
                      onChange={(e) => setSelectedBlog({...selectedBlog, metaKeywords: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-canonical" className="mb-2 block">Canonical URL</Label>
                    <Input
                      id="edit-blog-canonical"
                      type="url"
                      placeholder="https://wellnessfuel.com/blog/post-slug"
                      value={selectedBlog.canonicalUrl}
                      onChange={(e) => setSelectedBlog({...selectedBlog, canonicalUrl: e.target.value})}
                    />
                  </div>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Social Media</h3>
                  <div>
                    <Label htmlFor="edit-blog-og-title" className="mb-2 block">Open Graph Title</Label>
                    <Input
                      id="edit-blog-og-title"
                      type="text"
                      placeholder="Social media title"
                      value={selectedBlog.ogTitle}
                      onChange={(e) => setSelectedBlog({...selectedBlog, ogTitle: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-og-description" className="mb-2 block">Open Graph Description</Label>
                    <Textarea
                      id="edit-blog-og-description"
                      placeholder="Social media description"
                      value={selectedBlog.ogDescription}
                      onChange={(e) => setSelectedBlog({...selectedBlog, ogDescription: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-blog-og-image" className="mb-2 block">Open Graph Image URL</Label>
                    <Input
                      id="edit-blog-og-image"
                      type="url"
                      placeholder="https://example.com/og-image.jpg"
                      value={selectedBlog.ogImage}
                      onChange={(e) => setSelectedBlog({...selectedBlog, ogImage: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleEditBlog} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Blog Post'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Blog Post</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete blog post &quot;{selectedBlog?.title}&quot;? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteBlog} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Blog Post'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default BlogsPage