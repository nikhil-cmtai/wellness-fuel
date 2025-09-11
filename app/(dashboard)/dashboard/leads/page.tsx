'use client'

import React, { useState, useMemo } from 'react'
import { 
  Search, 
  Grid3X3, 
  List, 
  Edit, 
  Trash2, 
  Users,
  Phone,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Eye,
  UserPlus,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
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
const dummyLeads = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    company: "Tech Solutions Pvt Ltd",
    position: "CEO",
    source: "Website",
    status: "new",
    priority: "high",
    estimatedValue: 50000,
    notes: "Interested in premium wellness products for company employees",
    lastContact: "2024-03-15",
    createdAt: "2024-03-15",
    assignedTo: "Sales Team A"
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    company: "Health Plus Clinic",
    position: "Doctor",
    source: "Referral",
    status: "contacted",
    priority: "medium",
    estimatedValue: 25000,
    notes: "Looking for supplements for patients with specific health conditions",
    lastContact: "2024-03-14",
    createdAt: "2024-03-12",
    assignedTo: "Sales Team B"
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 76543 21098",
    company: "Fitness First Gym",
    position: "Owner",
    source: "Social Media",
    status: "qualified",
    priority: "high",
    estimatedValue: 75000,
    notes: "Wants to stock protein powders and supplements for gym members",
    lastContact: "2024-03-13",
    createdAt: "2024-03-10",
    assignedTo: "Sales Team A"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 65432 10987",
    company: "Wellness Center",
    position: "Manager",
    source: "Cold Call",
    status: "proposal",
    priority: "medium",
    estimatedValue: 30000,
    notes: "Interested in bulk orders for wellness center clients",
    lastContact: "2024-03-12",
    createdAt: "2024-03-08",
    assignedTo: "Sales Team C"
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 54321 09876",
    company: "Pharmacy Chain",
    position: "Procurement Manager",
    source: "Trade Show",
    status: "negotiation",
    priority: "high",
    estimatedValue: 100000,
    notes: "Large pharmacy chain looking for exclusive distribution rights",
    lastContact: "2024-03-11",
    createdAt: "2024-03-05",
    assignedTo: "Sales Team A"
  },
  {
    id: 6,
    name: "Anita Desai",
    email: "anita.desai@email.com",
    phone: "+91 43210 98765",
    company: "Online Health Store",
    position: "Founder",
    source: "Website",
    status: "closed-won",
    priority: "high",
    estimatedValue: 40000,
    notes: "Successfully closed deal for online store partnership",
    lastContact: "2024-03-10",
    createdAt: "2024-02-28",
    assignedTo: "Sales Team B"
  },
  {
    id: 7,
    name: "Rohit Gupta",
    email: "rohit.gupta@email.com",
    phone: "+91 32109 87654",
    company: "Corporate Wellness",
    position: "Director",
    source: "Email Campaign",
    status: "closed-lost",
    priority: "low",
    estimatedValue: 20000,
    notes: "Decided to go with competitor due to pricing",
    lastContact: "2024-03-09",
    createdAt: "2024-02-25",
    assignedTo: "Sales Team C"
  },
  {
    id: 8,
    name: "Kavita Joshi",
    email: "kavita.joshi@email.com",
    phone: "+91 21098 76543",
    company: "Nutrition Clinic",
    position: "Nutritionist",
    source: "Referral",
    status: "new",
    priority: "medium",
    estimatedValue: 15000,
    notes: "Interested in specialized nutrition products for diabetic patients",
    lastContact: "2024-03-08",
    createdAt: "2024-03-08",
    assignedTo: "Sales Team B"
  },
  {
    id: 9,
    name: "Deepak Mehta",
    email: "deepak.mehta@email.com",
    phone: "+91 10987 65432",
    company: "Sports Academy",
    position: "Coach",
    source: "Social Media",
    status: "contacted",
    priority: "medium",
    estimatedValue: 35000,
    notes: "Looking for sports nutrition products for athletes",
    lastContact: "2024-03-07",
    createdAt: "2024-03-05",
    assignedTo: "Sales Team A"
  },
  {
    id: 10,
    name: "Sunita Agarwal",
    email: "sunita.agarwal@email.com",
    phone: "+91 98765 43210",
    company: "Ayurvedic Center",
    position: "Owner",
    source: "Website",
    status: "qualified",
    priority: "high",
    estimatedValue: 60000,
    notes: "Interested in combining modern supplements with traditional Ayurveda",
    lastContact: "2024-03-06",
    createdAt: "2024-03-01",
    assignedTo: "Sales Team C"
  }
]

const leadStatuses = ["All", "new", "contacted", "qualified", "proposal", "negotiation", "closed-won", "closed-lost"]
const leadSources = ["All", "Website", "Referral", "Social Media", "Cold Call", "Trade Show", "Email Campaign"]
const leadPriorities = ["All", "low", "medium", "high"]

const LeadsPage = () => {
  const [leads, setLeads] = useState(dummyLeads)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedSource, setSelectedSource] = useState('All')
  const [selectedPriority, setSelectedPriority] = useState('All')
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedLead, setSelectedLead] = useState<typeof dummyLeads[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus
      const matchesSource = selectedSource === 'All' || lead.source === selectedSource
      const matchesPriority = selectedPriority === 'All' || lead.priority === selectedPriority
      
      return matchesSearch && matchesStatus && matchesSource && matchesPriority
    })
  }, [leads, searchTerm, selectedStatus, selectedSource, selectedPriority])

  // Pagination logic
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedStatus, selectedSource, selectedPriority])

  const handleUpdateLeadStatus = async (leadId: number, newStatus: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setLeads(leads.map(lead => 
        lead.id === leadId 
          ? { ...lead, status: newStatus, lastContact: new Date().toISOString().split('T')[0] }
          : lead
      ))
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteLead = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setLeads(leads.filter(lead => lead.id !== selectedLead!.id))
      setShowDeleteModal(false)
      setSelectedLead(null)
    } finally {
      setIsLoading(false)
    }
  }

  const openViewModal = (lead: typeof dummyLeads[0]) => {
    setSelectedLead(lead)
    setShowViewModal(true)
  }

  const openEditModal = (lead: typeof dummyLeads[0]) => {
    setSelectedLead(lead)
    setShowEditModal(true)
  }

  const openDeleteModal = (lead: typeof dummyLeads[0]) => {
    setSelectedLead(lead)
    setShowDeleteModal(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <UserPlus className="w-4 h-4" />
      case 'contacted': return <Phone className="w-4 h-4" />
      case 'qualified': return <CheckCircle className="w-4 h-4" />
      case 'proposal': return <FileText className="w-4 h-4" />
      case 'negotiation': return <TrendingUp className="w-4 h-4" />
      case 'closed-won': return <CheckCircle className="w-4 h-4" />
      case 'closed-lost': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'secondary'
      case 'contacted': return 'default'
      case 'qualified': return 'success'
      case 'proposal': return 'warning'
      case 'negotiation': return 'default'
      case 'closed-won': return 'success'
      case 'closed-lost': return 'default'
      default: return 'secondary'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'default'
      case 'medium': return 'warning'
      case 'low': return 'secondary'
      default: return 'secondary'
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leads</h1>
            <p className="text-muted-foreground">Manage sales leads and customer prospects</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold text-foreground">{leads.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New Leads</p>
                  <p className="text-2xl font-bold text-foreground">{leads.filter(l => l.status === 'new').length}</p>
                </div>
                <UserPlus className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Qualified Leads</p>
                  <p className="text-2xl font-bold text-foreground">{leads.filter(l => l.status === 'qualified').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pipeline Value</p>
                  <p className="text-2xl font-bold text-foreground">₹{leads.reduce((sum, l) => sum + l.estimatedValue, 0).toLocaleString()}</p>
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
                  placeholder="Search leads..."
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
                  {leadStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === 'All' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Source Filter */}
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {leadSources.map(source => (
                    <SelectItem key={source} value={source}>
                      {source === 'All' ? 'All Sources' : source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Priority Filter */}
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {leadPriorities.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {priority === 'All' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
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

        {/* Leads Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedLeads.map(lead => (
              <Card key={lead.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{lead.name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(lead.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        {getStatusIcon(lead.status)}
                        <span className="ml-1">{lead.status.charAt(0).toUpperCase() + lead.status.slice(1).replace('-', ' ')}</span>
                      </Badge>
                      <Badge variant={getPriorityColor(lead.priority) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{lead.company} • {lead.position}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 flex-1 flex flex-col">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Source:</span>
                      <span className="text-sm font-medium">{lead.source}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Estimated Value:</span>
                      <span className="text-lg font-bold text-foreground">₹{lead.estimatedValue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Contact:</span>
                      <span className="text-sm font-medium">{new Date(lead.lastContact).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Assigned To:</span>
                      <span className="text-sm font-medium">{lead.assignedTo}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2 mt-auto">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => openViewModal(lead)}
                          className="flex-1 gap-2"
                          size="sm"
                          variant="outline"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View lead details</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => openEditModal(lead)}
                          className="flex-1 gap-2"
                          size="sm"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit lead status</p>
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
                  <TableHead>Lead</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLeads.map(lead => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                        <p className="text-sm text-muted-foreground">{lead.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{lead.company}</p>
                        <p className="text-sm text-muted-foreground">{lead.position}</p>
                      </div>
                    </TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(lead.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        {getStatusIcon(lead.status)}
                        <span className="ml-1">{lead.status.charAt(0).toUpperCase() + lead.status.slice(1).replace('-', ' ')}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(lead.priority) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">₹{lead.estimatedValue.toLocaleString()}</TableCell>
                    <TableCell>{new Date(lead.lastContact).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openViewModal(lead)}
                              variant="ghost"
                              size="icon"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View lead</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openEditModal(lead)}
                              variant="ghost"
                              size="icon"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit lead</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => openDeleteModal(lead)}
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete lead</p>
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
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredLeads.length)} of {filteredLeads.length} leads
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

        {/* View Lead Modal */}
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Lead Details - {selectedLead?.name}</DialogTitle>
              <DialogDescription>
                Complete lead information and contact details.
              </DialogDescription>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-6">
                {/* Lead Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{selectedLead.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{selectedLead.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium">{selectedLead.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Company:</span>
                        <span className="font-medium">{selectedLead.company}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Position:</span>
                        <span className="font-medium">{selectedLead.position}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Lead Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={getStatusColor(selectedLead.status) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                          {getStatusIcon(selectedLead.status)}
                          <span className="ml-1">{selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1).replace('-', ' ')}</span>
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Priority:</span>
                        <Badge variant={getPriorityColor(selectedLead.priority) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                          {selectedLead.priority.charAt(0).toUpperCase() + selectedLead.priority.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Source:</span>
                        <span className="font-medium">{selectedLead.source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated Value:</span>
                        <span className="font-bold text-lg">₹{selectedLead.estimatedValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Assigned To:</span>
                        <span className="font-medium">{selectedLead.assignedTo}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="font-medium">{new Date(selectedLead.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Contact:</span>
                        <span className="font-medium">{new Date(selectedLead.lastContact).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                {selectedLead.notes && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{selectedLead.notes}</p>
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

        {/* Edit Lead Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Update Lead Status</DialogTitle>
              <DialogDescription>
                Change the status of lead {selectedLead?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="lead-status" className="mb-2 block">Lead Status</Label>
                  <Select 
                    value={selectedLead.status} 
                    onValueChange={(value) => setSelectedLead({...selectedLead, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {leadStatuses.slice(1).map(status => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lead-priority" className="mb-2 block">Priority</Label>
                  <Select 
                    value={selectedLead.priority} 
                    onValueChange={(value) => setSelectedLead({...selectedLead, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {leadPriorities.slice(1).map(priority => (
                        <SelectItem key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lead-notes" className="mb-2 block">Notes</Label>
                  <Textarea
                    id="lead-notes"
                    placeholder="Add lead notes"
                    value={selectedLead.notes || ''}
                    onChange={(e) => setSelectedLead({...selectedLead, notes: e.target.value})}
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
                  handleUpdateLeadStatus(selectedLead!.id, selectedLead!.status)
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
                  'Update Lead'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Lead</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete lead {selectedLead?.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteLead} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Lead'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default LeadsPage
