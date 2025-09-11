'use client'

import React, { useState } from 'react'
import { 
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Download,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  TrendingUp,
  Users,
  DollarSign,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Appointment type definition
type Appointment = {
  id: number
  patientId: number
  patientName: string
  patientEmail: string
  patientPhone: string
  patientAvatar: string
  date: string
  time: string
  duration: number
  type: string
  status: string
  reason: string
  notes: string
  doctor: string
  location: string
  fee: number
  paymentStatus: string
  createdAt: string
  updatedAt: string
}

// Dummy appointment data
const appointments = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Priya Sharma',
    patientEmail: 'priya.sharma@email.com',
    patientPhone: '+91 98765 43210',
    patientAvatar: '',
    date: '2024-01-20',
    time: '09:00',
    duration: 30,
    type: 'consultation',
    status: 'confirmed',
    reason: 'Diabetes follow-up',
    notes: 'Regular checkup for diabetes management',
    doctor: 'Dr. Rajesh Kumar',
    location: 'Room 101',
    fee: 500,
    paymentStatus: 'paid',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Rajesh Kumar',
    patientEmail: 'rajesh.kumar@email.com',
    patientPhone: '+91 87654 32109',
    patientAvatar: '',
    date: '2024-01-20',
    time: '10:30',
    duration: 45,
    type: 'follow-up',
    status: 'confirmed',
    reason: 'Heart condition monitoring',
    notes: 'Post-surgery follow-up appointment',
    doctor: 'Dr. Rajesh Kumar',
    location: 'Room 101',
    fee: 750,
    paymentStatus: 'pending',
    createdAt: '2024-01-16T14:30:00Z',
    updatedAt: '2024-01-16T14:30:00Z'
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'Sneha Patel',
    patientEmail: 'sneha.patel@email.com',
    patientPhone: '+91 76543 21098',
    patientAvatar: '',
    date: '2024-01-20',
    time: '14:00',
    duration: 30,
    type: 'consultation',
    status: 'pending',
    reason: 'General health checkup',
    notes: 'New patient consultation',
    doctor: 'Dr. Rajesh Kumar',
    location: 'Room 101',
    fee: 500,
    paymentStatus: 'pending',
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z'
  },
  {
    id: 4,
    patientId: 4,
    patientName: 'Amit Singh',
    patientEmail: 'amit.singh@email.com',
    patientPhone: '+91 65432 10987',
    patientAvatar: '',
    date: '2024-01-21',
    time: '11:00',
    duration: 60,
    type: 'emergency',
    status: 'confirmed',
    reason: 'Urgent consultation',
    notes: 'VIP patient - urgent medical attention required',
    doctor: 'Dr. Rajesh Kumar',
    location: 'Room 101',
    fee: 1000,
    paymentStatus: 'paid',
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: 5,
    patientId: 5,
    patientName: 'Kavya Reddy',
    patientEmail: 'kavya.reddy@email.com',
    patientPhone: '+91 54321 09876',
    patientAvatar: '',
    date: '2024-01-21',
    time: '15:30',
    duration: 30,
    type: 'consultation',
    status: 'cancelled',
    reason: 'Thyroid checkup',
    notes: 'Patient cancelled due to personal reasons',
    doctor: 'Dr. Rajesh Kumar',
    location: 'Room 101',
    fee: 500,
    paymentStatus: 'refunded',
    createdAt: '2024-01-19T11:20:00Z',
    updatedAt: '2024-01-19T11:20:00Z'
  },
  {
    id: 6,
    patientId: 6,
    patientName: 'Vikram Joshi',
    patientEmail: 'vikram.joshi@email.com',
    patientPhone: '+91 43210 98765',
    patientAvatar: '',
    date: '2024-01-22',
    time: '09:30',
    duration: 30,
    type: 'consultation',
    status: 'completed',
    reason: 'General consultation',
    notes: 'Appointment completed successfully',
    doctor: 'Dr. Rajesh Kumar',
    location: 'Room 101',
    fee: 500,
    paymentStatus: 'paid',
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-01-20T08:00:00Z'
  }
]

const AppointmentsPage = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'table' | 'grid'>('calendar')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [dateFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Filter and sort appointments
  const filteredAppointments = appointments
    .filter(appointment => {
      const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           appointment.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           appointment.patientPhone.includes(searchTerm) ||
                           appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter
      const matchesType = typeFilter === 'all' || appointment.type === typeFilter
      const matchesDate = dateFilter === 'all' || appointment.date === dateFilter
      return matchesSearch && matchesStatus && matchesType && matchesDate
    })
    .sort((a, b) => {
      let aValue: string | number | Date = a[sortBy as keyof typeof a]
      let bValue: string | number | Date = b[sortBy as keyof typeof b]
      
      if (sortBy === 'date') {
        aValue = new Date(a.date + ' ' + a.time).getTime()
        bValue = new Date(b.date + ' ' + b.time).getTime()
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default'
      case 'pending': return 'secondary'
      case 'cancelled': return 'default'
      case 'completed': return 'outline'
      default: return 'outline'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'default'
      case 'follow-up': return 'secondary'
      case 'emergency': return 'default'
      case 'checkup': return 'outline'
      default: return 'outline'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default'
      case 'pending': return 'secondary'
      case 'refunded': return 'outline'
      default: return 'outline'
    }
  }

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsEditModalOpen(true)
  }

  const handleDeleteAppointment = async (appointmentId: number) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Deleting appointment ${appointmentId}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddAppointment = async (appointmentData: Partial<Appointment>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Adding new appointment:', appointmentData)
      setIsAddModalOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateAppointment = async (appointmentData: Partial<Appointment>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Updating appointment:', appointmentData)
      setIsEditModalOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Get appointments for selected date
  const getAppointmentsForDate = (date: string) => {
    return appointments.filter(appointment => appointment.date === date)
  }

  // Get today's appointments
  const todaysAppointments = getAppointmentsForDate(selectedDate)

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
            <p className="text-muted-foreground">Manage your patient appointments and schedule</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Schedule Appointment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today&apos;s Appointments</p>
                  <p className="text-2xl font-bold text-foreground">{todaysAppointments.length}</p>
                  <p className="text-sm text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {todaysAppointments.filter(a => a.status === 'confirmed').length} confirmed
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Appointments</p>
                  <p className="text-2xl font-bold text-foreground">{appointments.length}</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {appointments.filter(a => a.status === 'completed').length} completed
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Appointments</p>
                  <p className="text-2xl font-bold text-foreground">{appointments.filter(a => a.status === 'pending').length}</p>
                  <p className="text-sm text-orange-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Awaiting confirmation
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">₹{appointments.filter(a => a.paymentStatus === 'paid').reduce((sum, a) => sum + a.fee, 0).toLocaleString()}</p>
                  <p className="text-sm text-purple-600 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    This month
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-500" />
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
                    placeholder="Search appointments by patient name, email, phone, or reason..."
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
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="checkup">Checkup</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date & Time</SelectItem>
                    <SelectItem value="patientName">Patient Name</SelectItem>
                    <SelectItem value="fee">Fee</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
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
                        variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setViewMode('calendar')}
                        className="rounded-none"
                      >
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Calendar view</p>
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
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Appointment Calendar
                </CardTitle>
                <CardDescription>Select a date to view appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <h3 className="text-lg font-semibold">January 2024</h3>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-sm font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                      const date = `2024-01-${day.toString().padStart(2, '0')}`
                      const dayAppointments = getAppointmentsForDate(date)
                      const isSelected = date === selectedDate
                      const isToday = date === new Date().toISOString().split('T')[0]
                      
                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(date)}
                          className={`
                            p-2 text-sm rounded-lg transition-colors relative
                            ${isSelected ? 'bg-primary text-primary-foreground' : 
                              isToday ? 'bg-accent text-accent-foreground' : 
                              'hover:bg-muted'}
                          `}
                        >
                          {day}
                          {dayAppointments.length > 0 && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
                <CardDescription>{todaysAppointments.length} appointments scheduled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysAppointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Appointments</h3>
                      <p className="text-muted-foreground">No appointments scheduled for this date</p>
                    </div>
                  ) : (
                    todaysAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{appointment.patientName}</p>
                          <p className="text-xs text-muted-foreground">{appointment.time} • {appointment.duration}min</p>
                          <p className="text-xs text-muted-foreground">{appointment.reason}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant={getStatusColor(appointment.status)} className="text-xs">
                            {appointment.status}
                          </Badge>
                          <Badge variant={getTypeColor(appointment.type)} className="text-xs">
                            {appointment.type}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={appointment.patientAvatar} />
                            <AvatarFallback>
                              {appointment.patientName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{appointment.patientName}</p>
                            <p className="text-sm text-muted-foreground">{appointment.patientPhone}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{new Date(appointment.date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">{appointment.time} ({appointment.duration}min)</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getTypeColor(appointment.type)}>
                          {appointment.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{appointment.reason}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          ₹{appointment.fee}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPaymentStatusColor(appointment.paymentStatus)}>
                          {appointment.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleEditAppointment(appointment)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Details</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleEditAppointment(appointment)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Appointment</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteAppointment(appointment.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete Appointment</TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {paginatedAppointments.map((appointment) => (
              <Card key={appointment.id} className="flex flex-col h-full">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={appointment.patientAvatar} />
                      <AvatarFallback>
                        {appointment.patientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{appointment.patientName}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.patientEmail}</p>
                    </div>
                    <div className="flex gap-1">
                      <Badge variant={getStatusColor(appointment.status)} className="text-xs">
                        {appointment.status}
                      </Badge>
                      <Badge variant={getTypeColor(appointment.type)} className="text-xs">
                        {appointment.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {appointment.time} ({appointment.duration}min)
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {appointment.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Stethoscope className="w-4 h-4 text-muted-foreground" />
                      {appointment.reason}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">₹{appointment.fee}</p>
                      <p className="text-xs text-muted-foreground">Fee</p>
                    </div>
                    <div className="text-center">
                      <Badge variant={getPaymentStatusColor(appointment.paymentStatus)}>
                        {appointment.paymentStatus}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">Payment</p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditAppointment(appointment)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => handleEditAppointment(appointment)}>
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAppointments.length)} of {filteredAppointments.length} appointments
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

        {/* Add Appointment Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>
                Create a new appointment with patient details
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="addPatientName">Patient Name</Label>
                <Input id="addPatientName" placeholder="Enter patient name" />
              </div>
              <div>
                <Label htmlFor="addPatientEmail">Patient Email</Label>
                <Input id="addPatientEmail" type="email" placeholder="Enter patient email" />
              </div>
              <div>
                <Label htmlFor="addPatientPhone">Patient Phone</Label>
                <Input id="addPatientPhone" placeholder="Enter patient phone" />
              </div>
              <div>
                <Label htmlFor="addDate">Appointment Date</Label>
                <Input id="addDate" type="date" />
              </div>
              <div>
                <Label htmlFor="addTime">Appointment Time</Label>
                <Input id="addTime" type="time" />
              </div>
              <div>
                <Label htmlFor="addDuration">Duration (minutes)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="addType">Appointment Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="checkup">Checkup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="addFee">Consultation Fee</Label>
                <Input id="addFee" type="number" placeholder="Enter fee amount" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="addReason">Reason for Visit</Label>
                <Input id="addReason" placeholder="Enter reason for appointment" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="addNotes">Notes</Label>
                <Textarea id="addNotes" placeholder="Add any additional notes" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleAddAppointment({})} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  'Schedule Appointment'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Appointment Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <DialogDescription>
                View and edit appointment information
              </DialogDescription>
            </DialogHeader>
            {selectedAppointment && (
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="patient">Patient</TabsTrigger>
                  <TabsTrigger value="medical">Medical</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editDate">Appointment Date</Label>
                      <Input id="editDate" type="date" defaultValue={selectedAppointment.date} />
                    </div>
                    <div>
                      <Label htmlFor="editTime">Appointment Time</Label>
                      <Input id="editTime" type="time" defaultValue={selectedAppointment.time} />
                    </div>
                    <div>
                      <Label htmlFor="editDuration">Duration</Label>
                      <Select defaultValue={selectedAppointment.duration.toString()}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="editType">Appointment Type</Label>
                      <Select defaultValue={selectedAppointment.type}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Consultation</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                          <SelectItem value="checkup">Checkup</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="editStatus">Status</Label>
                      <Select defaultValue={selectedAppointment.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="editFee">Consultation Fee</Label>
                      <Input id="editFee" type="number" defaultValue={selectedAppointment.fee} />
                    </div>
                    <div>
                      <Label htmlFor="editLocation">Location</Label>
                      <Input id="editLocation" defaultValue={selectedAppointment.location} />
                    </div>
                    <div>
                      <Label htmlFor="editPaymentStatus">Payment Status</Label>
                      <Select defaultValue={selectedAppointment.paymentStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="refunded">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="patient" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editPatientName">Patient Name</Label>
                      <Input id="editPatientName" defaultValue={selectedAppointment.patientName} />
                    </div>
                    <div>
                      <Label htmlFor="editPatientEmail">Patient Email</Label>
                      <Input id="editPatientEmail" type="email" defaultValue={selectedAppointment.patientEmail} />
                    </div>
                    <div>
                      <Label htmlFor="editPatientPhone">Patient Phone</Label>
                      <Input id="editPatientPhone" defaultValue={selectedAppointment.patientPhone} />
                    </div>
                    <div>
                      <Label htmlFor="editDoctor">Doctor</Label>
                      <Input id="editDoctor" defaultValue={selectedAppointment.doctor} />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="medical" className="space-y-4">
                  <div>
                    <Label htmlFor="editReason">Reason for Visit</Label>
                    <Input id="editReason" defaultValue={selectedAppointment.reason} />
                  </div>
                  <div>
                    <Label htmlFor="editMedicalNotes">Medical Notes</Label>
                    <Textarea id="editMedicalNotes" placeholder="Add medical notes about this appointment" />
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="space-y-4">
                  <div>
                    <Label htmlFor="editNotes">Appointment Notes</Label>
                    <Textarea id="editNotes" defaultValue={selectedAppointment.notes} placeholder="Add any additional notes about this appointment" />
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdateAppointment(selectedAppointment || {})} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Appointment'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default AppointmentsPage
  