'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { 
  Users, 
  Search, 
  Eye, 
  Phone, 
  MapPin, 
  Calendar, 
  Stethoscope, 
  Heart, 
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
  Grid3X3,
  List,
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

// Patient type definition
type Patient = {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  status: string
  totalVisits: number
  totalFees: number
  lastVisit: string
  joinDate: string
  location: string
  patientType: string
  age: number
  bloodGroup: string
  medicalHistory: string[]
  currentMedications: string[]
  allergies: string[]
  emergencyContact: string
  insuranceProvider: string
  tags: string[]
}

// Dummy patient data
const patients = [
  {
    id: 1,
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    avatar: '',
    status: 'active',
    totalVisits: 12,
    totalFees: 25000,
    lastVisit: '2024-01-15',
    joinDate: '2023-06-15',
    location: 'Mumbai, Maharashtra',
    patientType: 'regular',
    age: 35,
    bloodGroup: 'O+',
    medicalHistory: ['Diabetes Type 2', 'Hypertension'],
    currentMedications: ['Metformin 500mg', 'Amlodipine 5mg'],
    allergies: ['Penicillin'],
    emergencyContact: '+91 98765 43211',
    insuranceProvider: 'Star Health',
    tags: ['Regular', 'Diabetic']
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 87654 32109',
    avatar: '',
    status: 'active',
    totalVisits: 8,
    totalFees: 15000,
    lastVisit: '2024-01-10',
    joinDate: '2023-08-20',
    location: 'Delhi, NCR',
    patientType: 'regular',
    age: 42,
    bloodGroup: 'A+',
    medicalHistory: ['Heart Disease'],
    currentMedications: ['Atorvastatin 20mg', 'Aspirin 75mg'],
    allergies: ['None'],
    emergencyContact: '+91 87654 32110',
    insuranceProvider: 'HDFC ERGO',
    tags: ['Regular', 'Cardiac']
  },
  {
    id: 3,
    name: 'Sneha Patel',
    email: 'sneha.patel@email.com',
    phone: '+91 76543 21098',
    avatar: '',
    status: 'inactive',
    totalVisits: 3,
    totalFees: 5000,
    lastVisit: '2023-12-20',
    joinDate: '2023-10-05',
    location: 'Bangalore, Karnataka',
    patientType: 'new',
    age: 28,
    bloodGroup: 'B+',
    medicalHistory: ['None'],
    currentMedications: ['None'],
    allergies: ['Dust'],
    emergencyContact: '+91 76543 21099',
    insuranceProvider: 'ICICI Lombard',
    tags: ['New Patient']
  },
  {
    id: 4,
    name: 'Amit Singh',
    email: 'amit.singh@email.com',
    phone: '+91 65432 10987',
    avatar: '',
    status: 'active',
    totalVisits: 25,
    totalFees: 45000,
    lastVisit: '2024-01-18',
    joinDate: '2023-03-10',
    location: 'Pune, Maharashtra',
    patientType: 'vip',
    age: 55,
    bloodGroup: 'AB+',
    medicalHistory: ['Diabetes Type 1', 'Hypertension', 'Kidney Disease'],
    currentMedications: ['Insulin', 'Losartan 50mg', 'Furosemide 40mg'],
    allergies: ['Sulfa drugs'],
    emergencyContact: '+91 65432 10988',
    insuranceProvider: 'Bajaj Allianz',
    tags: ['VIP', 'Complex Case']
  },
  {
    id: 5,
    name: 'Kavya Reddy',
    email: 'kavya.reddy@email.com',
    phone: '+91 54321 09876',
    avatar: '',
    status: 'active',
    totalVisits: 6,
    totalFees: 12000,
    lastVisit: '2024-01-12',
    joinDate: '2023-09-15',
    location: 'Hyderabad, Telangana',
    patientType: 'regular',
    age: 31,
    bloodGroup: 'O-',
    medicalHistory: ['Thyroid Disorder'],
    currentMedications: ['Levothyroxine 50mcg'],
    allergies: ['Iodine'],
    emergencyContact: '+91 54321 09877',
    insuranceProvider: 'Reliance General',
    tags: ['Regular', 'Thyroid']
  },
  {
    id: 6,
    name: 'Vikram Joshi',
    email: 'vikram.joshi@email.com',
    phone: '+91 43210 98765',
    avatar: '',
    status: 'discharged',
    totalVisits: 2,
    totalFees: 3000,
    lastVisit: '2023-11-15',
    joinDate: '2023-11-01',
    location: 'Ahmedabad, Gujarat',
    patientType: 'new',
    age: 24,
    bloodGroup: 'A-',
    medicalHistory: ['None'],
    currentMedications: ['None'],
    allergies: ['None'],
    emergencyContact: '+91 43210 98766',
    insuranceProvider: 'None',
    tags: ['Discharged']
  }
]

const PatientsPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [patientTypeFilter, setPatientTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Filter and sort patients
  const filteredPatients = patients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.phone.includes(searchTerm) ||
                           patient.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || patient.status === statusFilter
      const matchesType = patientTypeFilter === 'all' || patient.patientType === patientTypeFilter
      return matchesSearch && matchesStatus && matchesType
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

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'inactive': return 'secondary'
      case 'discharged': return 'outline'
      case 'emergency': return 'default'
      default: return 'outline'
    }
  }

  const getPatientTypeColor = (type: string) => {
    switch (type) {
      case 'vip': return 'default'
      case 'regular': return 'secondary'
      case 'new': return 'outline'
      case 'emergency': return 'default'
      default: return 'outline'
    }
  }

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsEditModalOpen(true)
  }

  const handleDeletePatient = async (patientId: number) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Deleting patient ${patientId}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPatient = async (patientData: Partial<Patient>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Adding new patient:', patientData)
      setIsAddModalOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePatient = async (patientData: Partial<Patient>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Updating patient:', patientData)
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
            <h1 className="text-3xl font-bold text-foreground">Patients</h1>
            <p className="text-muted-foreground">Manage your patient records and medical information</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Records
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <UserPlus className="w-4 h-4" />
              Add Patient
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold text-foreground">{patients.length}</p>
                  <p className="text-sm text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +8% from last month
                  </p>
                </div>
                <Users className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Patients</p>
                  <p className="text-2xl font-bold text-foreground">{patients.filter(p => p.status === 'active').length}</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {Math.round((patients.filter(p => p.status === 'active').length / patients.length) * 100)}% of total
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
                  <p className="text-sm text-muted-foreground">VIP Patients</p>
                  <p className="text-2xl font-bold text-foreground">{patients.filter(p => p.patientType === 'vip').length}</p>
                  <p className="text-sm text-purple-600 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    High priority patients
                  </p>
                </div>
                <Star className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Visit Fee</p>
                  <p className="text-2xl font-bold text-foreground">₹{Math.round(patients.reduce((sum, p) => sum + p.totalFees, 0) / patients.reduce((sum, p) => sum + p.totalVisits, 0)).toLocaleString()}</p>
                  <p className="text-sm text-orange-600 flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    Per visit
                  </p>
                </div>
                <Heart className="w-8 h-8 text-orange-500" />
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
                    placeholder="Search patients by name, email, phone, or blood group..."
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
                    <SelectItem value="discharged">Discharged</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={patientTypeFilter} onValueChange={setPatientTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="totalVisits">Visits</SelectItem>
                    <SelectItem value="totalFees">Fees</SelectItem>
                    <SelectItem value="joinDate">Join Date</SelectItem>
                    <SelectItem value="lastVisit">Last Visit</SelectItem>
                    <SelectItem value="age">Age</SelectItem>
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

        {/* Patients Table */}
        {viewMode === 'table' ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Visits</TableHead>
                    <TableHead>Total Fees</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={patient.avatar} />
                            <AvatarFallback>
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {patient.id} • {patient.age}y • {patient.bloodGroup}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{patient.email}</p>
                          <p className="text-sm text-muted-foreground">{patient.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPatientTypeColor(patient.patientType)}>
                          {patient.patientType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Stethoscope className="w-4 h-4 text-muted-foreground" />
                          {patient.totalVisits}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-muted-foreground" />
                          ₹{patient.totalFees.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Details</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Patient</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleDeletePatient(patient.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete Patient</TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {paginatedPatients.map((patient) => (
              <Card key={patient.id} className="flex flex-col h-full">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={patient.avatar} />
                      <AvatarFallback>
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">{patient.email}</p>
                    </div>
                    <div className="flex gap-1">
                      <Badge variant={getStatusColor(patient.status)} className="text-xs">
                        {patient.status}
                      </Badge>
                      <Badge variant={getPatientTypeColor(patient.patientType)} className="text-xs">
                        {patient.patientType}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {patient.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {patient.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="w-4 h-4 text-muted-foreground" />
                      {patient.age}y • {patient.bloodGroup}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{patient.totalVisits}</p>
                      <p className="text-xs text-muted-foreground">Visits</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">₹{patient.totalFees.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Fees</p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditPatient(patient)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => handleEditPatient(patient)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPatients.length)} of {filteredPatients.length} patients
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

        {/* Add Patient Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>
                Create a new patient record with their medical information
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="addName">Full Name</Label>
                <Input id="addName" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="addEmail">Email</Label>
                <Input id="addEmail" type="email" placeholder="Enter email address" />
              </div>
              <div>
                <Label htmlFor="addPhone">Phone</Label>
                <Input id="addPhone" placeholder="Enter phone number" />
              </div>
              <div>
                <Label htmlFor="addAge">Age</Label>
                <Input id="addAge" type="number" placeholder="Enter age" />
              </div>
              <div>
                <Label htmlFor="addBloodGroup">Blood Group</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="addLocation">Location</Label>
                <Input id="addLocation" placeholder="Enter location" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="addNotes">Medical Notes</Label>
                <Textarea id="addNotes" placeholder="Add any medical notes about this patient" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleAddPatient({})} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Patient'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Patient Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Patient Details</DialogTitle>
              <DialogDescription>
                View and edit patient medical information
              </DialogDescription>
            </DialogHeader>
            {selectedPatient && (
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="medical">Medical</TabsTrigger>
                  <TabsTrigger value="visits">Visits</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editName">Full Name</Label>
                      <Input id="editName" defaultValue={selectedPatient.name} />
                    </div>
                    <div>
                      <Label htmlFor="editEmail">Email</Label>
                      <Input id="editEmail" type="email" defaultValue={selectedPatient.email} />
                    </div>
                    <div>
                      <Label htmlFor="editPhone">Phone</Label>
                      <Input id="editPhone" defaultValue={selectedPatient.phone} />
                    </div>
                    <div>
                      <Label htmlFor="editAge">Age</Label>
                      <Input id="editAge" type="number" defaultValue={selectedPatient.age} />
                    </div>
                    <div>
                      <Label htmlFor="editBloodGroup">Blood Group</Label>
                      <Select defaultValue={selectedPatient.bloodGroup}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="editLocation">Location</Label>
                      <Input id="editLocation" defaultValue={selectedPatient.location} />
                    </div>
                    <div>
                      <Label htmlFor="editStatus">Status</Label>
                      <Select defaultValue={selectedPatient.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="discharged">Discharged</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="editType">Patient Type</Label>
                      <Select defaultValue={selectedPatient.patientType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="regular">Regular</SelectItem>
                          <SelectItem value="vip">VIP</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="medical" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editEmergencyContact">Emergency Contact</Label>
                      <Input id="editEmergencyContact" defaultValue={selectedPatient.emergencyContact} />
                    </div>
                    <div>
                      <Label htmlFor="editInsurance">Insurance Provider</Label>
                      <Input id="editInsurance" defaultValue={selectedPatient.insuranceProvider} />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="editMedicalHistory">Medical History</Label>
                      <Textarea id="editMedicalHistory" defaultValue={selectedPatient.medicalHistory.join(', ')} />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="editMedications">Current Medications</Label>
                      <Textarea id="editMedications" defaultValue={selectedPatient.currentMedications.join(', ')} />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="editAllergies">Allergies</Label>
                      <Textarea id="editAllergies" defaultValue={selectedPatient.allergies.join(', ')} />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="visits" className="space-y-4">
                  <div className="text-center py-8">
                    <Stethoscope className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Visit History</h3>
                    <p className="text-muted-foreground">Patient visit records will be displayed here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="space-y-4">
                  <div>
                    <Label htmlFor="editNotes">Medical Notes</Label>
                    <Textarea id="editNotes" placeholder="Add medical notes about this patient" />
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdatePatient(selectedPatient || {})} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Patient'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

// Export as dynamic component to prevent prerendering issues
export default dynamic(() => Promise.resolve(PatientsPage), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  )
})
