'use client'

import React, { useState, useMemo } from 'react'
import { 
  Search, 
  Grid3X3, 
  List, 
  Edit, 
  Trash2, 
  UserPlus,
  User,
  Star,
  Eye,
  Loader2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  Crown,
  Stethoscope,
  Megaphone,
  ShoppingBag,
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
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Dummy user data
const dummyUsers = [
  {
    id: 1,
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@wellnessfuel.com",
    phone: "+91 98765 43210",
    role: "admin",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    address: "123 Wellness Street, Health District, Mumbai, Maharashtra 400001",
    dateOfBirth: "1985-06-15",
    joinDate: "2020-01-15",
    lastLogin: "2024-03-15T10:30:00Z",
    bio: "Founder and CEO of Wellness Fuel. Passionate about health and wellness.",
    verified: true,
    totalOrders: 0,
    totalSpent: 0,
    rating: 0,
    followers: 0
  },
  {
    id: 2,
    firstName: "Dr. Priya",
    lastName: "Sharma",
    email: "dr.priya@wellnessfuel.com",
    phone: "+91 98765 43211",
    role: "doctor",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    address: "456 Medical Center, Health Plaza, Delhi, Delhi 110001",
    dateOfBirth: "1980-03-22",
    joinDate: "2021-02-10",
    lastLogin: "2024-03-14T14:20:00Z",
    bio: "Certified nutritionist and wellness expert with 15+ years of experience.",
    verified: true,
    totalOrders: 12,
    totalSpent: 25000,
    rating: 4.8,
    followers: 1250
  },
  {
    id: 3,
    firstName: "Amit",
    lastName: "Patel",
    email: "amit.patel@email.com",
    phone: "+91 98765 43212",
    role: "customer",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    address: "789 Fitness Lane, Sports Complex, Bangalore, Karnataka 560001",
    dateOfBirth: "1990-11-08",
    joinDate: "2022-05-20",
    lastLogin: "2024-03-15T09:15:00Z",
    bio: "Fitness enthusiast and health-conscious individual.",
    verified: true,
    totalOrders: 25,
    totalSpent: 45000,
    rating: 4.5,
    followers: 0
  },
  {
    id: 4,
    firstName: "Sneha",
    lastName: "Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 98765 43213",
    role: "influencer",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    address: "321 Wellness Avenue, Health Hub, Chennai, Tamil Nadu 600001",
    dateOfBirth: "1992-08-14",
    joinDate: "2021-08-15",
    lastLogin: "2024-03-15T16:45:00Z",
    bio: "Wellness influencer and content creator. Sharing healthy lifestyle tips.",
    verified: true,
    totalOrders: 8,
    totalSpent: 15000,
    rating: 4.9,
    followers: 50000
  },
  {
    id: 5,
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.singh@email.com",
    phone: "+91 98765 43214",
    role: "customer",
    status: "inactive",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    address: "654 Health Street, Wellness Center, Pune, Maharashtra 411001",
    dateOfBirth: "1988-12-03",
    joinDate: "2022-01-10",
    lastLogin: "2024-02-28T11:30:00Z",
    bio: "Health-conscious individual focused on natural wellness.",
    verified: false,
    totalOrders: 15,
    totalSpent: 28000,
    rating: 4.2,
    followers: 0
  },
  {
    id: 6,
    firstName: "Dr. Anita",
    lastName: "Desai",
    email: "dr.anita@wellnessfuel.com",
    phone: "+91 98765 43215",
    role: "doctor",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    address: "987 Medical Plaza, Health District, Hyderabad, Telangana 500001",
    dateOfBirth: "1975-04-18",
    joinDate: "2020-11-05",
    lastLogin: "2024-03-14T13:20:00Z",
    bio: "Senior nutritionist and wellness consultant with expertise in holistic health.",
    verified: true,
    totalOrders: 18,
    totalSpent: 32000,
    rating: 4.7,
    followers: 2100
  }
]

const userRoles = ["All", "admin", "doctor", "influencer", "customer"]
const userStatuses = ["All", "active", "inactive", "suspended"]

const UsersPage = () => {
  const [users, setUsers] = useState(dummyUsers)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<typeof dummyUsers[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.phone.includes(searchTerm)
      const matchesRole = selectedRole === 'All' || user.role === selectedRole
      const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus
      
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, searchTerm, selectedRole, selectedStatus])

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedRole, selectedStatus])

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4" />
      case 'doctor': return <Stethoscope className="w-4 h-4" />
      case 'influencer': return <Megaphone className="w-4 h-4" />
      case 'customer': return <ShoppingBag className="w-4 h-4" />
      default: return <User className="w-4 h-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'outline'
      case 'doctor': return 'default'
      case 'influencer': return 'secondary'
      case 'customer': return 'outline'
      default: return 'secondary'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'inactive': return <Clock className="w-4 h-4" />
      case 'suspended': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'inactive': return 'warning'
      case 'suspended': return 'destructive'
      default: return 'secondary'
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser || selectedUser.role === 'admin') return
    
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setUsers(users.filter(user => user.id !== selectedUser.id))
      setShowDeleteModal(false)
      setSelectedUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const openViewModal = (user: typeof dummyUsers[0]) => {
    setSelectedUser(user)
    setShowViewModal(true)
  }

  const openEditModal = (user: typeof dummyUsers[0]) => {
    setSelectedUser(user)
    setShowEditModal(true)
  }

  const openDeleteModal = (user: typeof dummyUsers[0]) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Users</h1>
            <p className="text-muted-foreground">Manage user accounts and permissions</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">{users.length}</p>
                </div>
                <User className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-foreground">{users.filter(u => u.status === 'active').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Doctors</p>
                  <p className="text-2xl font-bold text-foreground">{users.filter(u => u.role === 'doctor').length}</p>
                </div>
                <Stethoscope className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Influencers</p>
                  <p className="text-2xl font-bold text-foreground">{users.filter(u => u.role === 'influencer').length}</p>
                </div>
                <Megaphone className="w-8 h-8 text-purple-500" />
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Role Filter */}
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {userRoles.map(role => (
                    <SelectItem key={role} value={role}>
                      {role === 'All' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {userStatuses.map(status => (
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

        {/* Users Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedUsers.map(user => (
              <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                        <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{user.firstName} {user.lastName}</CardTitle>
                        <CardDescription className="text-sm">{user.email}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge variant={getRoleColor(user.role) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        {getRoleIcon(user.role)}
                        <span className="ml-1">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                      </Badge>
                      <Badge variant={getStatusColor(user.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        {getStatusIcon(user.status)}
                        <span className="ml-1">{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 flex-1 flex flex-col">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Phone:</span>
                      <span className="text-sm font-medium">{user.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Verified:</span>
                      <Badge variant={user.verified ? 'success' : 'secondary'}>
                        {user.verified ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Join Date:</span>
                      <span className="text-sm font-medium">{new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                    {user.role === 'customer' && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Orders:</span>
                        <span className="text-sm font-medium">{user.totalOrders}</span>
                      </div>
                    )}
                    {user.role === 'influencer' && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Followers:</span>
                        <span className="text-sm font-medium">{user.followers.toLocaleString()}</span>
                      </div>
                    )}
                    {user.role === 'doctor' && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500 fill-current" />
                          <span className="text-sm font-medium">{user.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 pt-2 mt-auto">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => openViewModal(user)}
                          className="flex-1 gap-2"
                          size="sm"
                          variant="outline"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View user profile</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => openEditModal(user)}
                          className="flex-1 gap-2"
                          size="sm"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit user details</p>
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
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                          <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleColor(user.role) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        {getRoleIcon(user.role)}
                        <span className="ml-1">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(user.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        {getStatusIcon(user.status)}
                        <span className="ml-1">{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openViewModal(user)}
                              variant="ghost"
                              size="icon"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View user</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openEditModal(user)}
                              variant="ghost"
                              size="icon"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit user</p>
                          </TooltipContent>
                        </Tooltip>
                        {user.role !== 'admin' && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={() => openDeleteModal(user)}
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete user</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
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
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
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

        {/* View User Modal */}
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>User Profile - {selectedUser?.firstName} {selectedUser?.lastName}</DialogTitle>
              <DialogDescription>
                Complete user information and account details.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                {/* User Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{selectedUser.firstName} {selectedUser.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{selectedUser.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium">{selectedUser.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date of Birth:</span>
                        <span className="font-medium">{new Date(selectedUser.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Address:</span>
                        <span className="font-medium text-right max-w-[200px]">{selectedUser.address}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Role:</span>
                        <Badge variant={getRoleColor(selectedUser.role) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                          {getRoleIcon(selectedUser.role)}
                          <span className="ml-1">{selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}</span>
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={getStatusColor(selectedUser.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                          {getStatusIcon(selectedUser.status)}
                          <span className="ml-1">{selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}</span>
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verified:</span>
                        <Badge variant={selectedUser.verified ? 'success' : 'secondary'}>
                          {selectedUser.verified ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Join Date:</span>
                        <span className="font-medium">{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Login:</span>
                        <span className="font-medium">{new Date(selectedUser.lastLogin).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bio */}
                <Card>
                  <CardHeader>
                    <CardTitle>Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{selectedUser.bio}</p>
                  </CardContent>
                </Card>

                {/* Role-specific Information */}
                {selectedUser.role === 'customer' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{selectedUser.totalOrders}</p>
                          <p className="text-sm text-muted-foreground">Total Orders</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">₹{selectedUser.totalSpent.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Total Spent</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedUser.role === 'influencer' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Influencer Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{selectedUser.followers.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Followers</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{selectedUser.totalOrders}</p>
                          <p className="text-sm text-muted-foreground">Orders</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{selectedUser.rating}</p>
                          <p className="text-sm text-muted-foreground">Rating</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedUser.role === 'doctor' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Doctor Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{selectedUser.rating}</p>
                          <p className="text-sm text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{selectedUser.followers}</p>
                          <p className="text-sm text-muted-foreground">Followers</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{selectedUser.totalOrders}</p>
                          <p className="text-sm text-muted-foreground">Consultations</p>
                        </div>
                      </div>
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

        {/* Edit User Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit User - {selectedUser?.firstName} {selectedUser?.lastName}</DialogTitle>
              <DialogDescription>
                Update user information and account settings.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={selectedUser.firstName}
                      onChange={(e) => setSelectedUser({...selectedUser, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={selectedUser.lastName}
                      onChange={(e) => setSelectedUser({...selectedUser, lastName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={selectedUser.phone}
                      onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select 
                      value={selectedUser.role} 
                      onValueChange={(value) => setSelectedUser({...selectedUser, role: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="influencer">Influencer</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={selectedUser.status} 
                      onValueChange={(value) => setSelectedUser({...selectedUser, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={selectedUser.dateOfBirth}
                      onChange={(e) => setSelectedUser({...selectedUser, dateOfBirth: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="verified">Verified</Label>
                    <Select 
                      value={selectedUser.verified ? 'true' : 'false'} 
                      onValueChange={(value) => setSelectedUser({...selectedUser, verified: value === 'true'})}
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
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={selectedUser.address}
                    onChange={(e) => setSelectedUser({...selectedUser, address: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={selectedUser.bio}
                    onChange={(e) => setSelectedUser({...selectedUser, bio: e.target.value})}
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
                  // Update user in the list
                  setUsers(users.map(user => 
                    user.id === selectedUser!.id ? selectedUser! : user
                  ))
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
                  'Update User'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add User Modal */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account with the required information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="newFirstName">First Name</Label>
                  <Input
                    id="newFirstName"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="newLastName">Last Name</Label>
                  <Input
                    id="newLastName"
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <Label htmlFor="newEmail">Email</Label>
                  <Input
                    id="newEmail"
                    type="email"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="newPhone">Phone</Label>
                  <Input
                    id="newPhone"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="newRole">Role</Label>
                  <Select defaultValue="customer">
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="influencer">Influencer</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="newStatus">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="newDateOfBirth">Date of Birth</Label>
                  <Input
                    id="newDateOfBirth"
                    type="date"
                  />
                </div>
                <div>
                  <Label htmlFor="newVerified">Verified</Label>
                  <Select defaultValue="false">
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
              <div>
                <Label htmlFor="newAddress">Address</Label>
                <Textarea
                  id="newAddress"
                  placeholder="Enter address"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="newBio">Bio</Label>
                <Textarea
                  id="newBio"
                  placeholder="Enter bio"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  // Add new user logic here
                  setShowAddModal(false)
                }} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create User'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedUser?.firstName} {selectedUser?.lastName}? This action cannot be undone.
                {selectedUser?.role === 'admin' && (
                  <span className="block mt-2 text-destructive font-medium">
                    Admin users cannot be deleted.
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteUser} 
                disabled={isLoading || selectedUser?.role === 'admin'}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete User'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default UsersPage