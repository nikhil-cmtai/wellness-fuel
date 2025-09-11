'use client'

import React, { useState } from 'react'
import { 
  FileText,
  Plus,
  Search,
  Eye,
  Trash2,
  Download,
  Printer,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Pill,
  Calendar,
  CheckCircle,
  Activity,
  TrendingUp,
  DollarSign,
  Package
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

// Product type definition
type Product = {
  id: number
  name: string
  genericName: string
  category: string
  dosage: string
  unit: string
  price: number
  description: string
  sideEffects: string[]
  contraindications: string[]
  manufacturer: string
  prescriptionRequired: boolean
  stock: number
  image: string
}

// Prescription type definition
type Prescription = {
  id: number
  patientId: number
  patientName: string
  patientEmail: string
  patientPhone: string
  patientAge: number
  patientGender: string
  doctorName: string
  doctorLicense: string
  date: string
  diagnosis: string
  symptoms: string
  medications: PrescriptionMedication[]
  instructions: string
  followUpDate: string
  status: string
  createdAt: string
  updatedAt: string
}

// Prescription medication type
type PrescriptionMedication = {
  id: number
  productId: number
  productName: string
  dosage: string
  frequency: string
  duration: string
  timing: string
  instructions: string
  quantity: number
  price: number
}

// Dummy products data
const products = [
  {
    id: 1,
    name: 'Metformin 500mg',
    genericName: 'Metformin Hydrochloride',
    category: 'Antidiabetic',
    dosage: '500',
    unit: 'mg',
    price: 25,
    description: 'Used to treat type 2 diabetes',
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset'],
    contraindications: ['Kidney disease', 'Liver disease'],
    manufacturer: 'Sun Pharma',
    prescriptionRequired: true,
    stock: 100,
    image: ''
  },
  {
    id: 2,
    name: 'Amlodipine 5mg',
    genericName: 'Amlodipine Besylate',
    category: 'Antihypertensive',
    dosage: '5',
    unit: 'mg',
    price: 18,
    description: 'Used to treat high blood pressure',
    sideEffects: ['Dizziness', 'Swelling', 'Fatigue'],
    contraindications: ['Severe aortic stenosis'],
    manufacturer: 'Cipla',
    prescriptionRequired: true,
    stock: 150,
    image: ''
  },
  {
    id: 3,
    name: 'Atorvastatin 20mg',
    genericName: 'Atorvastatin Calcium',
    category: 'Antilipidemic',
    dosage: '20',
    unit: 'mg',
    price: 35,
    description: 'Used to lower cholesterol',
    sideEffects: ['Muscle pain', 'Liver problems', 'Digestive issues'],
    contraindications: ['Active liver disease', 'Pregnancy'],
    manufacturer: 'Dr. Reddy\'s',
    prescriptionRequired: true,
    stock: 80,
    image: ''
  },
  {
    id: 4,
    name: 'Insulin Glargine',
    genericName: 'Insulin Glargine',
    category: 'Antidiabetic',
    dosage: '100',
    unit: 'units/ml',
    price: 450,
    description: 'Long-acting insulin for diabetes',
    sideEffects: ['Hypoglycemia', 'Weight gain', 'Injection site reactions'],
    contraindications: ['Hypoglycemia'],
    manufacturer: 'Sanofi',
    prescriptionRequired: true,
    stock: 25,
    image: ''
  },
  {
    id: 5,
    name: 'Losartan 50mg',
    genericName: 'Losartan Potassium',
    category: 'Antihypertensive',
    dosage: '50',
    unit: 'mg',
    price: 22,
    description: 'Used to treat high blood pressure and heart failure',
    sideEffects: ['Dizziness', 'Cough', 'High potassium'],
    contraindications: ['Pregnancy', 'Bilateral renal artery stenosis'],
    manufacturer: 'Torrent',
    prescriptionRequired: true,
    stock: 120,
    image: ''
  },
  {
    id: 6,
    name: 'Levothyroxine 50mcg',
    genericName: 'Levothyroxine Sodium',
    category: 'Thyroid',
    dosage: '50',
    unit: 'mcg',
    price: 15,
    description: 'Used to treat hypothyroidism',
    sideEffects: ['Weight loss', 'Insomnia', 'Irregular heartbeat'],
    contraindications: ['Hyperthyroidism', 'Adrenal insufficiency'],
    manufacturer: 'Abbott',
    prescriptionRequired: true,
    stock: 200,
    image: ''
  }
]

// Dummy prescriptions data
const prescriptions = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Priya Sharma',
    patientEmail: 'priya.sharma@email.com',
    patientPhone: '+91 98765 43210',
    patientAge: 35,
    patientGender: 'Female',
    doctorName: 'Dr. Rajesh Kumar',
    doctorLicense: 'MH-12345',
    date: '2024-01-20',
    diagnosis: 'Type 2 Diabetes Mellitus',
    symptoms: 'Increased thirst, frequent urination, fatigue',
    medications: [
      {
        id: 1,
        productId: 1,
        productName: 'Metformin 500mg',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '30 days',
        timing: 'After meals',
        instructions: 'Take with food to reduce stomach upset',
        quantity: 60,
        price: 25
      },
      {
        id: 2,
        productId: 2,
        productName: 'Amlodipine 5mg',
        dosage: '5mg',
        frequency: 'Once daily',
        duration: '30 days',
        timing: 'Morning',
        instructions: 'Take at the same time each day',
        quantity: 30,
        price: 18
      }
    ],
    instructions: 'Monitor blood sugar levels regularly. Follow diabetic diet. Exercise daily.',
    followUpDate: '2024-02-20',
    status: 'active',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Rajesh Kumar',
    patientEmail: 'rajesh.kumar@email.com',
    patientPhone: '+91 87654 32109',
    patientAge: 42,
    patientGender: 'Male',
    doctorName: 'Dr. Rajesh Kumar',
    doctorLicense: 'MH-12345',
    date: '2024-01-19',
    diagnosis: 'Hypertension',
    symptoms: 'High blood pressure, headaches',
    medications: [
      {
        id: 3,
        productId: 3,
        productName: 'Atorvastatin 20mg',
        dosage: '20mg',
        frequency: 'Once daily',
        duration: '30 days',
        timing: 'Evening',
        instructions: 'Take with or without food',
        quantity: 30,
        price: 35
      }
    ],
    instructions: 'Monitor blood pressure daily. Reduce salt intake. Regular exercise.',
    followUpDate: '2024-02-19',
    status: 'active',
    createdAt: '2024-01-19T14:30:00Z',
    updatedAt: '2024-01-19T14:30:00Z'
  }
]

const PrescriptionsPage = () => {
  const [viewMode, setViewMode] = useState<'products' | 'prescriptions'>('prescriptions')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<PrescriptionMedication[]>([])

  // Filter and sort prescriptions
  const filteredPrescriptions = prescriptions
    .filter(prescription => {
      const matchesSearch = prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prescription.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue: string | number | Date | boolean | object[] = a[sortBy as keyof typeof a]
      let bValue: string | number | Date | boolean | object[] = b[sortBy as keyof typeof b]
      
      if (sortBy === 'date') {
        aValue = new Date(a.date as string).getTime()
        bValue = new Date(b.date as string).getTime()
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  // Filter products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
      return matchesSearch && matchesCategory
    })

  const totalPages = Math.ceil(filteredPrescriptions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPrescriptions = filteredPrescriptions.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'completed': return 'secondary'
      case 'cancelled': return 'destructive'
      default: return 'outline'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Antidiabetic': return 'default'
      case 'Antihypertensive': return 'secondary'
      case 'Antilipidemic': return 'outline'
      case 'Thyroid': return 'outline'
      default: return 'outline'
    }
  }

  const handleEditPrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription)
    setIsEditModalOpen(true)
  }

  const handleDeletePrescription = async (prescriptionId: number) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Deleting prescription ${prescriptionId}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPrescription = async (prescriptionData: Partial<Prescription>) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Adding new prescription:', prescriptionData)
      setIsAddModalOpen(false)
      setSelectedProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePrescription = async (prescriptionData: Partial<Prescription>) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Updating prescription:', prescriptionData)
      setIsEditModalOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const addProductToPrescription = (product: Product) => {
    const newMedication: PrescriptionMedication = {
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      dosage: product.dosage + product.unit,
      frequency: 'Once daily',
      duration: '7 days',
      timing: 'Morning',
      instructions: '',
      quantity: 1,
      price: product.price
    }
    setSelectedProducts([...selectedProducts, newMedication])
  }

  const removeProductFromPrescription = (medicationId: number) => {
    setSelectedProducts(selectedProducts.filter(med => med.id !== medicationId))
  }

  const updateMedication = (medicationId: number, field: string, value: string | number) => {
    setSelectedProducts(selectedProducts.map(med => 
      med.id === medicationId ? { ...med, [field]: value } : med
    ))
  }

  const handlePrintPrescription = (prescription: Prescription) => {
    // Create a new window with print content
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (printWindow) {
      // Find the prescription data
      const prescriptionData = prescriptions.find(p => p.id === prescription.id)
      if (prescriptionData) {
        
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Prescription - ${prescriptionData.patientName}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: white;
                color: #000;
              }
              .header { 
                text-align: center; 
                border-bottom: 2px solid #000; 
                padding-bottom: 20px; 
                margin-bottom: 30px; 
              }
              .clinic-name { 
                font-size: 24px; 
                font-weight: bold; 
                margin-bottom: 10px; 
              }
              .clinic-info { 
                font-size: 12px; 
                color: #666; 
              }
              .prescription-header { 
                display: flex; 
                justify-content: space-between; 
                margin-bottom: 30px; 
              }
              .prescription-id { 
                text-align: right; 
              }
              .section { 
                margin-bottom: 25px; 
              }
              .section-title { 
                font-size: 16px; 
                font-weight: bold; 
                margin-bottom: 10px; 
                border-bottom: 1px solid #ccc; 
                padding-bottom: 5px; 
              }
              .patient-info, .doctor-info { 
                display: inline-block; 
                width: 48%; 
                vertical-align: top; 
              }
              .medication { 
                border: 1px solid #ccc; 
                padding: 15px; 
                margin-bottom: 15px; 
                border-radius: 5px; 
              }
              .medication-header { 
                margin-bottom: 10px; 
              }
              .medication-details { 
                display: grid; 
                grid-template-columns: 1fr 1fr; 
                gap: 15px; 
                font-size: 13px; 
                margin-bottom: 10px;
              }
              .timing-instructions {
                background: #f8f9fa;
                padding: 10px;
                border-radius: 5px;
                border-left: 4px solid #007bff;
                font-size: 12px;
                margin-top: 8px;
              }
              .instructions { 
                background: #f5f5f5; 
                padding: 15px; 
                border-radius: 5px; 
                margin: 20px 0; 
              }
              .footer { 
                border-top: 2px solid #000; 
                padding-top: 20px; 
                margin-top: 30px; 
                display: flex; 
                justify-content: space-between; 
              }
              .signature { 
                width: 200px; 
                height: 80px; 
                border: 1px solid #000; 
                text-align: center; 
                line-height: 80px; 
                font-size: 12px; 
              }
              .total-amount { 
                text-align: right; 
              }
              .disclaimer { 
                font-size: 10px; 
                text-align: center; 
                margin-top: 20px; 
                color: #666; 
              }
              @media print {
                body { margin: 0; padding: 15px; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="clinic-name">🏥 Wellness Fuel Medical Center</div>
              <div class="clinic-info">
                123 Medical Street, Health City, HC 12345<br>
                Phone: +91 98765 43210 | Email: info@wellnessfuel.com<br>
                License No: MH-MED-2024-001
              </div>
            </div>

            <div class="prescription-header">
              <div>
                <h2>PRESCRIPTION</h2>
                <p>Date: ${new Date(prescriptionData.date).toLocaleDateString('en-IN')}</p>
              </div>
              <div class="prescription-id">
                <p>Prescription ID</p>
                <p style="font-size: 18px; font-weight: bold;">#${prescriptionData.id.toString().padStart(6, '0')}</p>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Patient Information</div>
              <div class="patient-info">
                <p><strong>Name:</strong> ${prescriptionData.patientName}</p>
                <p><strong>Age:</strong> ${prescriptionData.patientAge} years</p>
                <p><strong>Gender:</strong> ${prescriptionData.patientGender}</p>
                <p><strong>Phone:</strong> ${prescriptionData.patientPhone}</p>
                <p><strong>Email:</strong> ${prescriptionData.patientEmail}</p>
              </div>
              <div class="doctor-info">
                <p><strong>Doctor:</strong> ${prescriptionData.doctorName}</p>
                <p><strong>License:</strong> ${prescriptionData.doctorLicense}</p>
                <p><strong>Specialization:</strong> Internal Medicine</p>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Medical Information</div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                  <p><strong>Diagnosis:</strong></p>
                  <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${prescriptionData.diagnosis}</p>
                </div>
                <div>
                  <p><strong>Symptoms:</strong></p>
                  <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${prescriptionData.symptoms}</p>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Prescribed Medications</div>
              ${prescriptionData.medications.map((medication, index) => {
                // Generate better timing instructions based on frequency and timing
                let timingInstruction = '';
                if (medication.frequency === 'Once daily' && medication.timing === 'Morning') {
                  timingInstruction = 'Take 1 tablet every morning before breakfast (30 minutes before meal)';
                } else if (medication.frequency === 'Once daily' && medication.timing === 'Evening') {
                  timingInstruction = 'Take 1 tablet every evening after dinner (30 minutes after meal)';
                } else if (medication.frequency === 'Twice daily' && medication.timing === 'After meals') {
                  timingInstruction = 'Take 1 tablet twice daily - once after breakfast and once after dinner (30 minutes after each meal)';
                } else if (medication.frequency === 'Three times daily') {
                  timingInstruction = 'Take 1 tablet three times daily - after breakfast, after lunch, and after dinner (30 minutes after each meal)';
                } else if (medication.frequency === 'Four times daily') {
                  timingInstruction = 'Take 1 tablet four times daily - after breakfast, after lunch, after evening snack, and after dinner (30 minutes after each meal)';
                } else if (medication.timing === 'Before meals') {
                  timingInstruction = `Take 1 tablet ${medication.frequency.toLowerCase()} before meals (30 minutes before eating)`;
                } else if (medication.timing === 'After meals') {
                  timingInstruction = `Take 1 tablet ${medication.frequency.toLowerCase()} after meals (30 minutes after eating)`;
                } else if (medication.timing === 'At bedtime') {
                  timingInstruction = `Take 1 tablet ${medication.frequency.toLowerCase()} at bedtime (30 minutes before sleeping)`;
                } else {
                  timingInstruction = `Take 1 tablet ${medication.frequency.toLowerCase()} - ${medication.timing.toLowerCase()}`;
                }

                return `
                <div class="medication">
                  <div class="medication-header">
                    <h4>${index + 1}. ${medication.productName}</h4>
                    <p><strong>Dosage:</strong> ${medication.dosage}</p>
                  </div>
                  <div class="medication-details">
                    <div><strong>Frequency:</strong> ${medication.frequency}</div>
                    <div><strong>Duration:</strong> ${medication.duration}</div>
                    <div><strong>Quantity:</strong> ${medication.quantity} tablets</div>
                    <div><strong>Timing:</strong> ${medication.timing}</div>
                  </div>
                  <div class="timing-instructions">
                    <strong>📅 When to take:</strong> ${timingInstruction}
                  </div>
                  ${medication.instructions ? `
                    <div style="margin-top: 10px; padding: 8px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 3px;">
                      <strong>⚠️ Special Instructions:</strong>
                      <p style="margin-top: 5px; font-size: 12px;">${medication.instructions}</p>
                    </div>
                  ` : ''}
                </div>
              `;
              }).join('')}
            </div>

            <div class="section">
              <div class="section-title">General Instructions</div>
              <div class="instructions">
                ${prescriptionData.instructions}
              </div>
            </div>

            <div class="section">
              <div class="section-title">Follow-up Information</div>
              <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                <div>
                  <p><strong>Next Appointment:</strong> ${new Date(prescriptionData.followUpDate).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
            </div>

            <div class="footer">
              <div>
                <div class="signature">Doctor's Signature</div>
                <p style="margin-top: 10px;"><strong>${prescriptionData.doctorName}</strong></p>
                <p style="font-size: 12px;">License: ${prescriptionData.doctorLicense}</p>
              </div>
              <div style="text-align: right;">
                <p style="font-size: 12px; color: #666;">Date: ${new Date(prescriptionData.date).toLocaleDateString('en-IN')}</p>
              </div>
            </div>

            <div class="disclaimer">
              <p><strong>Disclaimer:</strong> This prescription is valid for 30 days from the date of issue. Please consult your doctor before making any changes to the medication. In case of any adverse reactions, contact your doctor immediately.</p>
            </div>

            <script>
              // Auto-print when window loads
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                }, 500);
              }
            </script>
          </body>
          </html>
        `)
        printWindow.document.close()
      }
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Prescriptions</h1>
            <p className="text-muted-foreground">Manage patient prescriptions and medication orders</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              New Prescription
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Prescriptions</p>
                  <p className="text-2xl font-bold text-foreground">{prescriptions.length}</p>
                  <p className="text-sm text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +15% this month
                  </p>
                </div>
                <FileText className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Prescriptions</p>
                  <p className="text-2xl font-bold text-foreground">{prescriptions.filter(p => p.status === 'active').length}</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Currently active
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
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold text-foreground">{products.length}</p>
                  <p className="text-sm text-purple-600 flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    Available medicines
                  </p>
                </div>
                <Package className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Prescription Value</p>
                  <p className="text-2xl font-bold text-foreground">₹{Math.round(prescriptions.reduce((sum, p) => sum + p.medications.reduce((medSum, med) => medSum + (med.price * med.quantity), 0), 0) / prescriptions.length).toLocaleString()}</p>
                  <p className="text-sm text-orange-600 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    Per prescription
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Toggle */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search prescriptions by patient name, email, or diagnosis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {viewMode === 'prescriptions' ? (
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Antidiabetic">Antidiabetic</SelectItem>
                      <SelectItem value="Antihypertensive">Antihypertensive</SelectItem>
                      <SelectItem value="Antilipidemic">Antilipidemic</SelectItem>
                      <SelectItem value="Thyroid">Thyroid</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="patientName">Patient Name</SelectItem>
                    <SelectItem value="diagnosis">Diagnosis</SelectItem>
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
                        variant={viewMode === 'prescriptions' ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setViewMode('prescriptions')}
                        className="rounded-none"
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Prescriptions view</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={viewMode === 'products' ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setViewMode('products')}
                        className="rounded-none"
                      >
                        <Package className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Products view</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prescriptions View */}
        {viewMode === 'prescriptions' && (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Medications</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Follow-up</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="" />
                            <AvatarFallback>
                              {prescription.patientName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{prescription.patientName}</p>
                            <p className="text-sm text-muted-foreground">{prescription.patientPhone}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{new Date(prescription.date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">{prescription.doctorName}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{prescription.diagnosis}</p>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{prescription.medications.length} medications</p>
                          <div className="flex flex-wrap gap-1">
                            {prescription.medications.slice(0, 2).map((med) => (
                              <Badge key={med.id} variant="outline" className="text-xs">
                                {med.productName}
                              </Badge>
                            ))}
                            {prescription.medications.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{prescription.medications.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {new Date(prescription.followUpDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleEditPrescription(prescription)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Details</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handlePrintPrescription(prescription)}>
                                <Printer className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Print Prescription</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleDeletePrescription(prescription.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete Prescription</TooltipContent>
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

        {/* Products View */}
        {viewMode === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col h-full">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Pill className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.genericName}</p>
                    </div>
                    <Badge variant={getCategoryColor(product.category)} className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      {product.dosage}{product.unit}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      ₹{product.price}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      Stock: {product.stock}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={() => addProductToPrescription(product)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Prescription
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {viewMode === 'prescriptions' && totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPrescriptions.length)} of {filteredPrescriptions.length} prescriptions
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

        {/* Add Prescription Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Prescription</DialogTitle>
              <DialogDescription>
                Create a new prescription with patient details and medications
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="patient" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="patient">Patient Details</TabsTrigger>
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="patient" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input id="patientName" placeholder="Enter patient name" />
                  </div>
                  <div>
                    <Label htmlFor="patientEmail">Patient Email</Label>
                    <Input id="patientEmail" type="email" placeholder="Enter patient email" />
                  </div>
                  <div>
                    <Label htmlFor="patientPhone">Patient Phone</Label>
                    <Input id="patientPhone" placeholder="Enter patient phone" />
                  </div>
                  <div>
                    <Label htmlFor="patientAge">Patient Age</Label>
                    <Input id="patientAge" type="number" placeholder="Enter patient age" />
                  </div>
                  <div>
                    <Label htmlFor="patientGender">Gender</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Input id="diagnosis" placeholder="Enter diagnosis" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="symptoms">Symptoms</Label>
                    <Textarea id="symptoms" placeholder="Describe patient symptoms" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="medications" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Available Products */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Available Products</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.dosage}{product.unit} • ₹{product.price}</p>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => addProductToPrescription(product)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Selected Medications */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Selected Medications</h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {selectedProducts.map((medication) => (
                        <div key={medication.id} className="p-4 border rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{medication.productName}</h4>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeProductFromPrescription(medication.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs">Dosage</Label>
                              <Input 
                                value={medication.dosage}
                                onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                                className="text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Frequency</Label>
                              <Select value={medication.frequency} onValueChange={(value) => updateMedication(medication.id, 'frequency', value)}>
                                <SelectTrigger className="text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Once daily">Once daily</SelectItem>
                                  <SelectItem value="Twice daily">Twice daily</SelectItem>
                                  <SelectItem value="Three times daily">Three times daily</SelectItem>
                                  <SelectItem value="Four times daily">Four times daily</SelectItem>
                                  <SelectItem value="As needed">As needed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs">Duration</Label>
                              <Select value={medication.duration} onValueChange={(value) => updateMedication(medication.id, 'duration', value)}>
                                <SelectTrigger className="text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="3 days">3 days</SelectItem>
                                  <SelectItem value="7 days">7 days</SelectItem>
                                  <SelectItem value="14 days">14 days</SelectItem>
                                  <SelectItem value="30 days">30 days</SelectItem>
                                  <SelectItem value="60 days">60 days</SelectItem>
                                  <SelectItem value="90 days">90 days</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs">Timing</Label>
                              <Select value={medication.timing} onValueChange={(value) => updateMedication(medication.id, 'timing', value)}>
                                <SelectTrigger className="text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Morning">Morning</SelectItem>
                                  <SelectItem value="Afternoon">Afternoon</SelectItem>
                                  <SelectItem value="Evening">Evening</SelectItem>
                                  <SelectItem value="Before meals">Before meals</SelectItem>
                                  <SelectItem value="After meals">After meals</SelectItem>
                                  <SelectItem value="At bedtime">At bedtime</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-2">
                              <Label className="text-xs">Instructions</Label>
                              <Input 
                                value={medication.instructions}
                                onChange={(e) => updateMedication(medication.id, 'instructions', e.target.value)}
                                placeholder="Special instructions"
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {selectedProducts.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <Pill className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No medications selected</p>
                          <p className="text-sm">Add medications from the available products</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="instructions" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="followUpDate">Follow-up Date</Label>
                    <Input id="followUpDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="instructions">General Instructions</Label>
                    <Textarea id="instructions" placeholder="Add general instructions for the patient" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleAddPrescription({})} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Prescription'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Prescription Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Prescription Details</DialogTitle>
              <DialogDescription>
                View and edit prescription information
              </DialogDescription>
            </DialogHeader>
            {selectedPrescription && (
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="patient">Patient</TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editDate">Prescription Date</Label>
                      <Input id="editDate" type="date" defaultValue={selectedPrescription.date} />
                    </div>
                    <div>
                      <Label htmlFor="editDiagnosis">Diagnosis</Label>
                      <Input id="editDiagnosis" defaultValue={selectedPrescription.diagnosis} />
                    </div>
                    <div>
                      <Label htmlFor="editStatus">Status</Label>
                      <Select defaultValue={selectedPrescription.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="editFollowUp">Follow-up Date</Label>
                      <Input id="editFollowUp" type="date" defaultValue={selectedPrescription.followUpDate} />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="editSymptoms">Symptoms</Label>
                      <Textarea id="editSymptoms" defaultValue={selectedPrescription.symptoms} />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="patient" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editPatientName">Patient Name</Label>
                      <Input id="editPatientName" defaultValue={selectedPrescription.patientName} />
                    </div>
                    <div>
                      <Label htmlFor="editPatientEmail">Patient Email</Label>
                      <Input id="editPatientEmail" type="email" defaultValue={selectedPrescription.patientEmail} />
                    </div>
                    <div>
                      <Label htmlFor="editPatientPhone">Patient Phone</Label>
                      <Input id="editPatientPhone" defaultValue={selectedPrescription.patientPhone} />
                    </div>
                    <div>
                      <Label htmlFor="editPatientAge">Patient Age</Label>
                      <Input id="editPatientAge" type="number" defaultValue={selectedPrescription.patientAge} />
                    </div>
                    <div>
                      <Label htmlFor="editPatientGender">Gender</Label>
                      <Select defaultValue={selectedPrescription.patientGender}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="editDoctor">Doctor</Label>
                      <Input id="editDoctor" defaultValue={selectedPrescription.doctorName} />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="medications" className="space-y-4">
                  <div className="space-y-4">
                    {selectedPrescription.medications.map((medication) => (
                      <div key={medication.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-3">{medication.productName}</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm">Dosage</Label>
                            <Input defaultValue={medication.dosage} className="text-sm" />
                          </div>
                          <div>
                            <Label className="text-sm">Frequency</Label>
                            <Input defaultValue={medication.frequency} className="text-sm" />
                          </div>
                          <div>
                            <Label className="text-sm">Duration</Label>
                            <Input defaultValue={medication.duration} className="text-sm" />
                          </div>
                          <div>
                            <Label className="text-sm">Timing</Label>
                            <Input defaultValue={medication.timing} className="text-sm" />
                          </div>
                          <div>
                            <Label className="text-sm">Quantity</Label>
                            <Input defaultValue={medication.quantity} type="number" className="text-sm" />
                          </div>
                          <div>
                            <Label className="text-sm">Price</Label>
                            <Input defaultValue={medication.price} type="number" className="text-sm" />
                          </div>
                          <div className="col-span-2">
                            <Label className="text-sm">Instructions</Label>
                            <Input defaultValue={medication.instructions} className="text-sm" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="instructions" className="space-y-4">
                  <div>
                    <Label htmlFor="editInstructions">General Instructions</Label>
                    <Textarea id="editInstructions" defaultValue={selectedPrescription.instructions} />
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdatePrescription(selectedPrescription || {})} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Prescription'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default PrescriptionsPage
        