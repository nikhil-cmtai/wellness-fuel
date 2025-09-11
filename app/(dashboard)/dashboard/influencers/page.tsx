'use client'

import React, { useState } from 'react'
import { 
  Megaphone, 
  Search, 
  Eye, 
  MapPin, 
  Users, 
  Star, 
  UserPlus, 
  Download,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Share2,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Percent,
  BarChart3,
  Grid3X3,
  List
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Influencer type definition
type Influencer = {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  status: string
  platform: string
  followers: number
  engagement: number
  category: string
  joinDate: string
  location: string
  referralCode: string
  totalReferrals: number
  totalIncome: number
  commissionRate: number
  lastPayment: string
  socialLinks: {
    instagram?: string
    youtube?: string
    twitter?: string
    facebook?: string
    tiktok?: string
  }
  tags: string[]
}

// Dummy influencer data
const influencers = [
  {
    id: 1,
    name: 'Priya Wellness',
    email: 'priya.wellness@email.com',
    phone: '+91 98765 43210',
    avatar: '',
    status: 'active',
    platform: 'Instagram',
    followers: 125000,
    engagement: 4.2,
    category: 'Health & Fitness',
    joinDate: '2023-06-15',
    location: 'Mumbai, Maharashtra',
    referralCode: 'PRIYA20',
    totalReferrals: 245,
    totalIncome: 125000,
    commissionRate: 15,
    lastPayment: '2024-01-15',
    socialLinks: {
      instagram: 'https://instagram.com/priyawellness',
      youtube: 'https://youtube.com/priyawellness',
      twitter: 'https://twitter.com/priyawellness'
    },
    tags: ['Top Performer', 'Health Expert']
  },
  {
    id: 2,
    name: 'Rajesh Fitness',
    email: 'rajesh.fitness@email.com',
    phone: '+91 87654 32109',
    avatar: '',
    status: 'active',
    platform: 'YouTube',
    followers: 89000,
    engagement: 3.8,
    category: 'Fitness',
    joinDate: '2023-08-20',
    location: 'Delhi, NCR',
    referralCode: 'RAJESH15',
    totalReferrals: 180,
    totalIncome: 89000,
    commissionRate: 12,
    lastPayment: '2024-01-10',
    socialLinks: {
      youtube: 'https://youtube.com/rajeshfitness',
      instagram: 'https://instagram.com/rajeshfitness'
    },
    tags: ['Fitness Guru', 'Regular Performer']
  },
  {
    id: 3,
    name: 'Sneha Nutrition',
    email: 'sneha.nutrition@email.com',
    phone: '+91 76543 21098',
    avatar: '',
    status: 'inactive',
    platform: 'TikTok',
    followers: 156000,
    engagement: 5.1,
    category: 'Nutrition',
    joinDate: '2023-10-05',
    location: 'Bangalore, Karnataka',
    referralCode: 'SNEHA25',
    totalReferrals: 95,
    totalIncome: 45000,
    commissionRate: 20,
    lastPayment: '2023-12-20',
    socialLinks: {
      tiktok: 'https://tiktok.com/@snehanutrition',
      instagram: 'https://instagram.com/snehanutrition'
    },
    tags: ['Nutrition Expert', 'New Influencer']
  },
  {
    id: 4,
    name: 'Amit Wellness',
    email: 'amit.wellness@email.com',
    phone: '+91 65432 10987',
    avatar: '',
    status: 'active',
    platform: 'Instagram',
    followers: 210000,
    engagement: 4.8,
    category: 'Wellness',
    joinDate: '2023-03-10',
    location: 'Pune, Maharashtra',
    referralCode: 'AMIT30',
    totalReferrals: 320,
    totalIncome: 180000,
    commissionRate: 18,
    lastPayment: '2024-01-18',
    socialLinks: {
      instagram: 'https://instagram.com/amitwellness',
      youtube: 'https://youtube.com/amitwellness',
      facebook: 'https://facebook.com/amitwellness'
    },
    tags: ['Top Performer', 'Wellness Expert']
  },
  {
    id: 5,
    name: 'Kavya Health',
    email: 'kavya.health@email.com',
    phone: '+91 54321 09876',
    avatar: '',
    status: 'active',
    platform: 'YouTube',
    followers: 67000,
    engagement: 3.5,
    category: 'Health',
    joinDate: '2023-09-15',
    location: 'Hyderabad, Telangana',
    referralCode: 'KAVYA12',
    totalReferrals: 120,
    totalIncome: 55000,
    commissionRate: 10,
    lastPayment: '2024-01-12',
    socialLinks: {
      youtube: 'https://youtube.com/kavyahealth',
      instagram: 'https://instagram.com/kavyahealth'
    },
    tags: ['Health Expert', 'Regular Performer']
  },
  {
    id: 6,
    name: 'Vikram Supplements',
    email: 'vikram.supplements@email.com',
    phone: '+91 43210 98765',
    avatar: '',
    status: 'pending',
    platform: 'Instagram',
    followers: 45000,
    engagement: 2.8,
    category: 'Supplements',
    joinDate: '2023-11-01',
    location: 'Ahmedabad, Gujarat',
    referralCode: 'VIKRAM8',
    totalReferrals: 35,
    totalIncome: 12000,
    commissionRate: 8,
    lastPayment: '2023-11-15',
    socialLinks: {
      instagram: 'https://instagram.com/vikramsupplements'
    },
    tags: ['New Influencer', 'Supplements']
  }
]

const InfluencersPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Filter and sort influencers
  const filteredInfluencers = influencers
    .filter(influencer => {
      const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           influencer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           influencer.phone.includes(searchTerm) ||
                           influencer.referralCode.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || influencer.status === statusFilter
      const matchesPlatform = platformFilter === 'all' || influencer.platform === platformFilter
      const matchesCategory = categoryFilter === 'all' || influencer.category === categoryFilter
      return matchesSearch && matchesStatus && matchesPlatform && matchesCategory
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a]
      let bValue = b[sortBy as keyof typeof b]
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  const totalPages = Math.ceil(filteredInfluencers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedInfluencers = filteredInfluencers.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'inactive': return 'secondary'
      case 'pending': return 'outline'
      default: return 'outline'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return Instagram
      case 'youtube': return Youtube
      case 'twitter': return Twitter
      case 'facebook': return Facebook
      default: return Megaphone
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'health & fitness': return 'default'
      case 'fitness': return 'secondary'
      case 'nutrition': return 'outline'
      case 'wellness': return 'default'
      case 'health': return 'secondary'
      case 'supplements': return 'outline'
      default: return 'outline'
    }
  }

  const handleEditInfluencer = (influencer: Influencer) => {
    setSelectedInfluencer(influencer)
    setIsEditModalOpen(true)
  }

  const handleDeleteInfluencer = async (influencerId: number) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Deleting influencer ${influencerId}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddInfluencer = async (influencerData: Partial<Influencer>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Adding new influencer:', influencerData)
      setIsAddModalOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateInfluencer = async (influencerData: Partial<Influencer>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Updating influencer:', influencerData)
      setIsEditModalOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const getTotalIncome = () => {
    return influencers.reduce((sum, influencer) => sum + influencer.totalIncome, 0)
  }

  const getTotalReferrals = () => {
    return influencers.reduce((sum, influencer) => sum + influencer.totalReferrals, 0)
  }

  const getAverageCommission = () => {
    return (influencers.reduce((sum, influencer) => sum + influencer.commissionRate, 0) / influencers.length).toFixed(1)
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Influencers</h1>
            <p className="text-muted-foreground">Manage your influencer network and track performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <UserPlus className="w-4 h-4" />
              Add Influencer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Influencers</p>
                  <p className="text-2xl font-bold text-foreground">{influencers.length}</p>
                  <p className="text-sm text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +15% from last month
                  </p>
                </div>
                <Megaphone className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Referrals</p>
                  <p className="text-2xl font-bold text-foreground">{getTotalReferrals()}</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <Share2 className="w-3 h-3" />
                    {Math.round(getTotalReferrals() / influencers.length)} avg per influencer
                  </p>
                </div>
                <Share2 className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold text-foreground">₹{getTotalIncome().toLocaleString()}</p>
                  <p className="text-sm text-purple-600 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    Generated by influencers
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Commission</p>
                  <p className="text-2xl font-bold text-foreground">{getAverageCommission()}%</p>
                  <p className="text-sm text-orange-600 flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    Commission rate
                  </p>
                </div>
                <Percent className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search influencers by name, email, phone, or referral code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Health & Fitness">Health & Fitness</SelectItem>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                    <SelectItem value="Nutrition">Nutrition</SelectItem>
                    <SelectItem value="Wellness">Wellness</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Supplements">Supplements</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="followers">Followers</SelectItem>
                    <SelectItem value="totalReferrals">Referrals</SelectItem>
                    <SelectItem value="totalIncome">Income</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="commissionRate">Commission</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </Button>
                
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
                        variant={viewMode === 'table' ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setViewMode('table')}
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
            </div>
          </CardContent>
        </Card>

        {/* Influencers Table */}
        {viewMode === 'table' ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Influencer</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Followers</TableHead>
                    <TableHead>Referrals</TableHead>
                    <TableHead>Income</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInfluencers.map((influencer) => {
                    const PlatformIcon = getPlatformIcon(influencer.platform)
                    return (
                      <TableRow key={influencer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={influencer.avatar} />
                              <AvatarFallback>
                                {influencer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{influencer.name}</p>
                              <p className="text-sm text-muted-foreground">{influencer.referralCode}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <PlatformIcon className="w-4 h-4 text-muted-foreground" />
                            <span>{influencer.platform}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(influencer.status)}>
                            {influencer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            {influencer.followers.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Share2 className="w-4 h-4 text-muted-foreground" />
                            {influencer.totalReferrals}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            ₹{influencer.totalIncome.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Percent className="w-4 h-4 text-muted-foreground" />
                            {influencer.commissionRate}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleEditInfluencer(influencer)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View Details</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleEditInfluencer(influencer)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit Influencer</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteInfluencer(influencer.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete Influencer</TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedInfluencers.map((influencer) => {
              const PlatformIcon = getPlatformIcon(influencer.platform)
              return (
                <Card key={influencer.id} className="flex flex-col h-full">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={influencer.avatar} />
                        <AvatarFallback>
                          {influencer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{influencer.name}</h3>
                        <p className="text-sm text-muted-foreground">{influencer.referralCode}</p>
                      </div>
                      <Badge variant={getStatusColor(influencer.status)} className="text-xs">
                        {influencer.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <PlatformIcon className="w-4 h-4 text-muted-foreground" />
                        {influencer.platform} • {influencer.followers.toLocaleString()} followers
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant={getCategoryColor(influencer.category)} className="text-xs">
                          {influencer.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {influencer.engagement}% engagement
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {influencer.location}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{influencer.totalReferrals}</p>
                        <p className="text-xs text-muted-foreground">Referrals</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">₹{influencer.totalIncome.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Income</p>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditInfluencer(influencer)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditInfluencer(influencer)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredInfluencers.length)} of {filteredInfluencers.length} influencers
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Add Influencer Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Influencer</DialogTitle>
              <DialogDescription>
                Register a new influencer with their social media details
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="addName">Full Name</Label>
                <Input id="addName" placeholder="Influencer Name" />
              </div>
              <div>
                <Label htmlFor="addEmail">Email</Label>
                <Input id="addEmail" type="email" placeholder="influencer@email.com" />
              </div>
              <div>
                <Label htmlFor="addPhone">Phone</Label>
                <Input id="addPhone" placeholder="+91 98765 43210" />
              </div>
              <div>
                <Label htmlFor="addPlatform">Platform</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="addFollowers">Followers</Label>
                <Input id="addFollowers" type="number" placeholder="100000" />
              </div>
              <div>
                <Label htmlFor="addCategory">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Health & Fitness">Health & Fitness</SelectItem>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                    <SelectItem value="Nutrition">Nutrition</SelectItem>
                    <SelectItem value="Wellness">Wellness</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Supplements">Supplements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="addCommission">Commission Rate (%)</Label>
                <Input id="addCommission" type="number" placeholder="15" />
              </div>
              <div>
                <Label htmlFor="addLocation">Location</Label>
                <Input id="addLocation" placeholder="City, State" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="addSocialLinks">Social Media Links</Label>
                <Textarea id="addSocialLinks" placeholder="https://instagram.com/username" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleAddInfluencer({})} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Influencer'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Influencer Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Influencer Details</DialogTitle>
              <DialogDescription>
                View and edit influencer information and performance
              </DialogDescription>
            </DialogHeader>
            {selectedInfluencer && (
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="referrals">Referrals</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editName">Full Name</Label>
                      <Input id="editName" defaultValue={selectedInfluencer.name} />
                    </div>
                    <div>
                      <Label htmlFor="editEmail">Email</Label>
                      <Input id="editEmail" type="email" defaultValue={selectedInfluencer.email} />
                    </div>
                    <div>
                      <Label htmlFor="editPhone">Phone</Label>
                      <Input id="editPhone" defaultValue={selectedInfluencer.phone} />
                    </div>
                    <div>
                      <Label htmlFor="editPlatform">Platform</Label>
                      <Select defaultValue={selectedInfluencer.platform}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="YouTube">YouTube</SelectItem>
                          <SelectItem value="TikTok">TikTok</SelectItem>
                          <SelectItem value="Twitter">Twitter</SelectItem>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="editFollowers">Followers</Label>
                      <Input id="editFollowers" type="number" defaultValue={selectedInfluencer.followers} />
                    </div>
                    <div>
                      <Label htmlFor="editEngagement">Engagement (%)</Label>
                      <Input id="editEngagement" type="number" defaultValue={selectedInfluencer.engagement} />
                    </div>
                    <div>
                      <Label htmlFor="editCategory">Category</Label>
                      <Select defaultValue={selectedInfluencer.category}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Health & Fitness">Health & Fitness</SelectItem>
                          <SelectItem value="Fitness">Fitness</SelectItem>
                          <SelectItem value="Nutrition">Nutrition</SelectItem>
                          <SelectItem value="Wellness">Wellness</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Supplements">Supplements</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="editCommission">Commission Rate (%)</Label>
                      <Input id="editCommission" type="number" defaultValue={selectedInfluencer.commissionRate} />
                    </div>
                    <div>
                      <Label htmlFor="editLocation">Location</Label>
                      <Input id="editLocation" defaultValue={selectedInfluencer.location} />
                    </div>
                    <div>
                      <Label htmlFor="editStatus">Status</Label>
                      <Select defaultValue={selectedInfluencer.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="editReferralCode">Referral Code</Label>
                    <Input id="editReferralCode" defaultValue={selectedInfluencer.referralCode} />
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{selectedInfluencer.totalReferrals}</p>
                          <p className="text-sm text-muted-foreground">Total Referrals</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold">₹{selectedInfluencer.totalIncome.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Total Income</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{selectedInfluencer.commissionRate}%</p>
                          <p className="text-sm text-muted-foreground">Commission Rate</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                    <p className="text-muted-foreground">Detailed performance charts will be displayed here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="referrals" className="space-y-4">
                  <div className="text-center py-8">
                    <Share2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Referral History</h3>
                    <p className="text-muted-foreground">Referral details and tracking will be displayed here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="space-y-4">
                  <div>
                    <Label htmlFor="editNotes">Notes</Label>
                    <Textarea id="editNotes" placeholder="Add notes about this influencer" />
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdateInfluencer(selectedInfluencer || {})} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Influencer'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default InfluencersPage