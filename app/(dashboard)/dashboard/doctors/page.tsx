'use client'

import React, { useState } from 'react'
import { 
  Stethoscope, 
  Search, 
  Eye, 
  MapPin, 
  Calendar, 
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
  CheckCircle,
  Award,
  GraduationCap,
  Shield,
  Heart,
  Brain,
  Bone,
  Eye as EyeIcon,
  Baby,
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

// Doctor type definition
type Doctor = {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  status: string
  specialization: string
  experience: number
  rating: number
  totalPatients: number
  consultationFee: number
  joinDate: string
  location: string
  qualifications: string
  hospital: string
  availability: string
  languages: string[]
  tags: string[]
}

// Dummy doctor data
const doctors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@wellnessfuel.com',
    phone: '+91 98765 43210',
    avatar: '',
    status: 'active',
    specialization: 'Cardiology',
    experience: 8,
    rating: 4.9,
    totalPatients: 1250,
    consultationFee: 1500,
    joinDate: '2023-06-15',
    location: 'Mumbai, Maharashtra',
    qualifications: 'MBBS, MD Cardiology',
    hospital: 'Apollo Hospital',
    availability: 'Mon-Fri 9AM-6PM',
    languages: ['English', 'Hindi', 'Marathi'],
    tags: ['Senior Doctor', 'Cardiology Expert']
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@wellnessfuel.com',
    phone: '+91 87654 32109',
    avatar: '',
    status: 'active',
    specialization: 'Neurology',
    experience: 12,
    rating: 4.8,
    totalPatients: 980,
    consultationFee: 2000,
    joinDate: '2023-08-20',
    location: 'Delhi, NCR',
    qualifications: 'MBBS, MD Neurology, DM Neurology',
    hospital: 'Fortis Hospital',
    availability: 'Mon-Sat 10AM-7PM',
    languages: ['English', 'Hindi'],
    tags: ['Neurology Specialist', 'Senior Consultant']
  },
  {
    id: 3,
    name: 'Dr. Sneha Patel',
    email: 'sneha.patel@wellnessfuel.com',
    phone: '+91 76543 21098',
    avatar: '',
    status: 'inactive',
    specialization: 'Pediatrics',
    experience: 5,
    rating: 4.7,
    totalPatients: 650,
    consultationFee: 1200,
    joinDate: '2023-10-05',
    location: 'Bangalore, Karnataka',
    qualifications: 'MBBS, MD Pediatrics',
    hospital: 'Manipal Hospital',
    availability: 'Mon-Fri 8AM-5PM',
    languages: ['English', 'Hindi', 'Kannada'],
    tags: ['Pediatrician', 'Child Specialist']
  },
  {
    id: 4,
    name: 'Dr. Amit Singh',
    email: 'amit.singh@wellnessfuel.com',
    phone: '+91 65432 10987',
    avatar: '',
    status: 'active',
    specialization: 'Orthopedics',
    experience: 15,
    rating: 4.9,
    totalPatients: 1800,
    consultationFee: 1800,
    joinDate: '2023-03-10',
    location: 'Pune, Maharashtra',
    qualifications: 'MBBS, MS Orthopedics',
    hospital: 'Sahyadri Hospital',
    availability: 'Mon-Sat 9AM-6PM',
    languages: ['English', 'Hindi', 'Marathi'],
    tags: ['Orthopedic Surgeon', 'Senior Doctor']
  },
  {
    id: 5,
    name: 'Dr. Kavya Reddy',
    email: 'kavya.reddy@wellnessfuel.com',
    phone: '+91 54321 09876',
    avatar: '',
    status: 'active',
    specialization: 'Dermatology',
    experience: 6,
    rating: 4.6,
    totalPatients: 720,
    consultationFee: 1300,
    joinDate: '2023-09-15',
    location: 'Hyderabad, Telangana',
    qualifications: 'MBBS, MD Dermatology',
    hospital: 'Continental Hospital',
    availability: 'Mon-Fri 10AM-6PM',
    languages: ['English', 'Hindi', 'Telugu'],
    tags: ['Dermatologist', 'Skin Specialist']
  },
  {
    id: 6,
    name: 'Dr. Vikram Joshi',
    email: 'vikram.joshi@wellnessfuel.com',
    phone: '+91 43210 98765',
    avatar: '',
    status: 'pending',
    specialization: 'Ophthalmology',
    experience: 4,
    rating: 4.4,
    totalPatients: 420,
    consultationFee: 1100,
    joinDate: '2023-11-01',
    location: 'Ahmedabad, Gujarat',
    qualifications: 'MBBS, MS Ophthalmology',
    hospital: 'Zydus Hospital',
    availability: 'Mon-Fri 9AM-5PM',
    languages: ['English', 'Hindi', 'Gujarati'],
    tags: ['Eye Specialist', 'New Doctor']
  }
]

const DoctorsPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [specializationFilter, setSpecializationFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Filter and sort doctors
  const filteredDoctors = doctors
    .filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.phone.includes(searchTerm) ||
                           doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || doctor.status === statusFilter
      const matchesSpecialization = specializationFilter === 'all' || doctor.specialization === specializationFilter
      return matchesSearch && matchesStatus && matchesSpecialization
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

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'inactive': return 'secondary'
      case 'pending': return 'outline'
      default: return 'outline'
    }
  }

  const getSpecializationIcon = (specialization: string) => {
    switch (specialization.toLowerCase()) {
      case 'cardiology': return Heart
      case 'neurology': return Brain
      case 'orthopedics': return Bone
      case 'ophthalmology': return EyeIcon
      case 'pediatrics': return Baby
      case 'dermatology': return Shield
      default: return Stethoscope
    }
  }

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setIsEditModalOpen(true)
  }

  const handleDeleteDoctor = async (doctorId: number) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Deleting doctor ${doctorId}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddDoctor = async (doctorData: Partial<Doctor>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Adding new doctor:', doctorData)
      setIsAddModalOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateDoctor = async (doctorData: Partial<Doctor>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Updating doctor:', doctorData)
      setIsEditModalOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Doctors</h1>
            <p className="text-muted-foreground">Manage your medical professionals and specialists</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <UserPlus className="w-4 h-4" />
              Add Doctor
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Doctors</p>
                  <p className="text-2xl font-bold text-foreground">{doctors.length}</p>
                  <p className="text-sm text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +8% from last month
                  </p>
                </div>
                <Stethoscope className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Doctors</p>
                  <p className="text-2xl font-bold text-foreground">{doctors.filter(d => d.status === 'active').length}</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {Math.round((doctors.filter(d => d.status === 'active').length / doctors.length) * 100)}% of total
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Specializations</p>
                  <p className="text-2xl font-bold text-foreground">{new Set(doctors.map(d => d.specialization)).size}</p>
                  <p className="text-sm text-purple-600 flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Medical fields
                  </p>
                </div>
                <Award className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  <p className="text-2xl font-bold text-foreground">{(doctors.reduce((sum, d) => sum + d.rating, 0) / doctors.length).toFixed(1)}</p>
                  <p className="text-sm text-orange-600 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Out of 5.0
                  </p>
                </div>
                <Star className="w-8 h-8 text-orange-500" />
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
                    placeholder="Search doctors by name, email, phone, or specialization..."
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
                <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Ophthalmology">Ophthalmology</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="specialization">Specialization</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="totalPatients">Patients</SelectItem>
                    <SelectItem value="consultationFee">Fee</SelectItem>
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

        {/* Doctors Table */}
        {viewMode === 'table' ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Patients</TableHead>
                    <TableHead>Consultation Fee</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedDoctors.map((doctor) => {
                    const SpecializationIcon = getSpecializationIcon(doctor.specialization)
                    return (
                      <TableRow key={doctor.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={doctor.avatar} />
                              <AvatarFallback>
                                {doctor.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{doctor.name}</p>
                              <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <SpecializationIcon className="w-4 h-4 text-muted-foreground" />
                            <span>{doctor.specialization}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(doctor.status)}>
                            {doctor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <GraduationCap className="w-4 h-4 text-muted-foreground" />
                            {doctor.experience} years
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {doctor.rating}/5.0
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            {doctor.totalPatients}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">₹{doctor.consultationFee}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleEditDoctor(doctor)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View Details</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleEditDoctor(doctor)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit Doctor</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteDoctor(doctor.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete Doctor</TooltipContent>
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
            {paginatedDoctors.map((doctor) => {
              const SpecializationIcon = getSpecializationIcon(doctor.specialization)
              return (
                <Card key={doctor.id} className="flex flex-col h-full">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={doctor.avatar} />
                        <AvatarFallback>
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                      </div>
                      <Badge variant={getStatusColor(doctor.status)} className="text-xs">
                        {doctor.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <SpecializationIcon className="w-4 h-4 text-muted-foreground" />
                        {doctor.specialization}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        {doctor.experience} years experience
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {doctor.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {doctor.rating}/5.0 rating
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{doctor.totalPatients}</p>
                        <p className="text-xs text-muted-foreground">Patients</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">₹{doctor.consultationFee}</p>
                        <p className="text-xs text-muted-foreground">Consultation</p>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditDoctor(doctor)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditDoctor(doctor)}>
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDoctors.length)} of {filteredDoctors.length} doctors
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

        {/* Add Doctor Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
              <DialogDescription>
                Register a new doctor with their medical credentials
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="addName">Full Name</Label>
                <Input id="addName" placeholder="Dr. Full Name" />
              </div>
              <div>
                <Label htmlFor="addEmail">Email</Label>
                <Input id="addEmail" type="email" placeholder="doctor@email.com" />
              </div>
              <div>
                <Label htmlFor="addPhone">Phone</Label>
                <Input id="addPhone" placeholder="+91 98765 43210" />
              </div>
              <div>
                <Label htmlFor="addSpecialization">Specialization</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Ophthalmology">Ophthalmology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="addExperience">Experience (Years)</Label>
                <Input id="addExperience" type="number" placeholder="5" />
              </div>
              <div>
                <Label htmlFor="addFee">Consultation Fee</Label>
                <Input id="addFee" type="number" placeholder="1500" />
              </div>
              <div>
                <Label htmlFor="addHospital">Hospital</Label>
                <Input id="addHospital" placeholder="Hospital Name" />
              </div>
              <div>
                <Label htmlFor="addLocation">Location</Label>
                <Input id="addLocation" placeholder="City, State" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="addQualifications">Qualifications</Label>
                <Textarea id="addQualifications" placeholder="MBBS, MD, etc." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleAddDoctor({})} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Doctor'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Doctor Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Doctor Details</DialogTitle>
              <DialogDescription>
                View and edit doctor information and credentials
              </DialogDescription>
            </DialogHeader>
            {selectedDoctor && (
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="patients">Patients</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editName">Full Name</Label>
                      <Input id="editName" defaultValue={selectedDoctor.name} />
                    </div>
                    <div>
                      <Label htmlFor="editEmail">Email</Label>
                      <Input id="editEmail" type="email" defaultValue={selectedDoctor.email} />
                    </div>
                    <div>
                      <Label htmlFor="editPhone">Phone</Label>
                      <Input id="editPhone" defaultValue={selectedDoctor.phone} />
                    </div>
                    <div>
                      <Label htmlFor="editSpecialization">Specialization</Label>
                      <Select defaultValue={selectedDoctor.specialization}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cardiology">Cardiology</SelectItem>
                          <SelectItem value="Neurology">Neurology</SelectItem>
                          <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="Dermatology">Dermatology</SelectItem>
                          <SelectItem value="Ophthalmology">Ophthalmology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="editExperience">Experience</Label>
                      <Input id="editExperience" type="number" defaultValue={selectedDoctor.experience} />
                    </div>
                    <div>
                      <Label htmlFor="editFee">Consultation Fee</Label>
                      <Input id="editFee" type="number" defaultValue={selectedDoctor.consultationFee} />
                    </div>
                    <div>
                      <Label htmlFor="editHospital">Hospital</Label>
                      <Input id="editHospital" defaultValue={selectedDoctor.hospital} />
                    </div>
                    <div>
                      <Label htmlFor="editLocation">Location</Label>
                      <Input id="editLocation" defaultValue={selectedDoctor.location} />
                    </div>
                    <div>
                      <Label htmlFor="editStatus">Status</Label>
                      <Select defaultValue={selectedDoctor.status}>
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
                    <div>
                      <Label htmlFor="editAvailability">Availability</Label>
                      <Input id="editAvailability" defaultValue={selectedDoctor.availability} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="editQualifications">Qualifications</Label>
                    <Textarea id="editQualifications" defaultValue={selectedDoctor.qualifications} />
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-4">
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Schedule Management</h3>
                    <p className="text-muted-foreground">Doctor&apos;s schedule and availability will be displayed here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="patients" className="space-y-4">
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Patient List</h3>
                    <p className="text-muted-foreground">Doctor&apos;s patients will be displayed here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="space-y-4">
                  <div>
                    <Label htmlFor="editNotes">Notes</Label>
                    <Textarea id="editNotes" placeholder="Add notes about this doctor" />
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdateDoctor(selectedDoctor || {})} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Doctor'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default DoctorsPage
   