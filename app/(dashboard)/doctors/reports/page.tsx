'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { 
  BarChart3,
  Download,
  RefreshCw,
  FileText,
  PieChart,
  LineChart,
  DollarSign,
  Users,
  Calendar,
  Pill,
  AlertCircle,
  CheckCircle,
  Star,
  Loader2,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Doctor Reports Page Component
const DoctorReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedReport, setSelectedReport] = useState('overview')
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState('pdf')

  // Dummy data for medical reports
  const medicalStats = {
    totalAppointments: 1247,
    totalPatients: 342,
    totalPrescriptions: 892,
    totalRevenue: 45680,
    avgConsultationTime: 25,
    patientSatisfaction: 4.8,
    emergencyCases: 23,
    followUpRate: 78
  }

  const appointmentData = [
    { date: '2024-01-01', appointments: 12, revenue: 2400, patients: 10 },
    { date: '2024-01-02', appointments: 15, revenue: 3000, patients: 12 },
    { date: '2024-01-03', appointments: 8, revenue: 1600, patients: 7 },
    { date: '2024-01-04', appointments: 18, revenue: 3600, patients: 15 },
    { date: '2024-01-05', appointments: 14, revenue: 2800, patients: 11 },
    { date: '2024-01-06', appointments: 20, revenue: 4000, patients: 16 },
    { date: '2024-01-07', appointments: 16, revenue: 3200, patients: 13 }
  ]

  const patientAnalytics = [
    { condition: 'Hypertension', count: 45, percentage: 18.2, trend: 'up' },
    { condition: 'Diabetes', count: 38, percentage: 15.4, trend: 'up' },
    { condition: 'Respiratory Issues', count: 32, percentage: 12.9, trend: 'down' },
    { condition: 'Cardiovascular', count: 28, percentage: 11.3, trend: 'stable' },
    { condition: 'Mental Health', count: 25, percentage: 10.1, trend: 'up' },
    { condition: 'Digestive Issues', count: 22, percentage: 8.9, trend: 'stable' }
  ]

  const prescriptionData = [
    { medication: 'Metformin', prescriptions: 45, patients: 38, cost: 1200 },
    { medication: 'Lisinopril', prescriptions: 42, patients: 35, cost: 980 },
    { medication: 'Atorvastatin', prescriptions: 38, patients: 32, cost: 1150 },
    { medication: 'Amlodipine', prescriptions: 35, patients: 28, cost: 850 },
    { medication: 'Omeprazole', prescriptions: 32, patients: 25, cost: 720 }
  ]

  const reportTypes = [
    { id: 'overview', name: 'Overview Report', description: 'Complete practice overview', icon: BarChart3 },
    { id: 'appointments', name: 'Appointment Analytics', description: 'Appointment trends and patterns', icon: Calendar },
    { id: 'patients', name: 'Patient Analytics', description: 'Patient demographics and conditions', icon: Users },
    { id: 'prescriptions', name: 'Prescription Report', description: 'Medication usage and costs', icon: Pill },
    { id: 'revenue', name: 'Revenue Analysis', description: 'Financial performance metrics', icon: DollarSign },
    { id: 'satisfaction', name: 'Patient Satisfaction', description: 'Patient feedback and ratings', icon: Star },
    { id: 'emergency', name: 'Emergency Cases', description: 'Emergency case analysis', icon: AlertCircle },
    { id: 'followup', name: 'Follow-up Tracking', description: 'Patient follow-up compliance', icon: CheckCircle }
  ]

  const exportFormats = [
    { value: 'pdf', label: 'PDF Report', icon: FileText },
    { value: 'excel', label: 'Excel Spreadsheet', icon: BarChart3 },
    { value: 'csv', label: 'CSV Data', icon: FileText },
    { value: 'json', label: 'JSON Data', icon: FileText }
  ]

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
  }

  const handleExportReport = async () => {
    setIsExporting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsExporting(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and insights for your medical practice
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleGenerateReport} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleExportReport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medicalStats.totalAppointments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medicalStats.totalPatients.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${medicalStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patient Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medicalStats.patientSatisfaction}/5.0</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.2</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>
            Customize your report parameters and export settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      <div className="flex items-center gap-2">
                        <report.icon className="w-4 h-4" />
                        {report.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timePeriod">Time Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exportFormat">Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {exportFormats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      <div className="flex items-center gap-2">
                        <format.icon className="w-4 h-4" />
                        {format.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {selectedPeriod === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromDate">From Date</Label>
                <Input
                  id="fromDate"
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toDate">To Date</Label>
                <Input
                  id="toDate"
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((report) => (
          <Card 
            key={report.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedReport === report.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <report.icon className="w-5 h-5 text-primary" />
                <CardTitle className="text-sm">{report.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{report.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
          <CardDescription>
            Preview of your selected report with current data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detailed">Detailed View</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Appointment Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Appointment Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {appointmentData.slice(-5).map((day, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{new Date(day.date).toLocaleDateString()}</p>
                            <p className="text-sm text-muted-foreground">{day.patients} patients</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{day.appointments} appointments</p>
                            <p className="text-sm text-green-600">${day.revenue}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Patient Conditions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Patient Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {patientAnalytics.slice(0, 5).map((condition, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="font-medium">{condition.condition}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{condition.count} patients</span>
                            <Badge variant="outline">{condition.percentage}%</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="detailed" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Prescription Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Prescriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prescriptionData.map((med, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{med.medication}</p>
                            <p className="text-sm text-muted-foreground">{med.patients} patients</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{med.prescriptions} prescriptions</p>
                            <p className="text-sm text-green-600">${med.cost}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Practice Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Practice Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Avg. Consultation Time</span>
                        <Badge variant="secondary">{medicalStats.avgConsultationTime} min</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Emergency Cases</span>
                        <Badge variant="destructive">{medicalStats.emergencyCases}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Follow-up Rate</span>
                        <Badge variant="default">{medicalStats.followUpRate}%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Patient Satisfaction</span>
                        <Badge variant="default">{medicalStats.patientSatisfaction}/5.0</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="charts" className="space-y-4">
              <Alert>
                <BarChart3 className="h-4 w-4" />
                <AlertDescription>
                  Interactive charts and visualizations will be displayed here. 
                  This feature requires additional charting library integration.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appointment Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 mx-auto mb-2" />
                        <p>Pie Chart Placeholder</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <LineChart className="w-12 h-12 mx-auto mb-2" />
                        <p>Line Chart Placeholder</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="export" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Export Options</CardTitle>
                    <CardDescription>
                      Choose your preferred export format and settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Export Format</Label>
                      <Select value={exportFormat} onValueChange={setExportFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {exportFormats.map((format) => (
                            <SelectItem key={format.value} value={format.value}>
                              <div className="flex items-center gap-2">
                                <format.icon className="w-4 h-4" />
                                {format.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Include Charts</Label>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="includeCharts" defaultChecked />
                        <Label htmlFor="includeCharts" className="text-sm">
                          Include visual charts and graphs
                        </Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Include Raw Data</Label>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="includeRawData" />
                        <Label htmlFor="includeRawData" className="text-sm">
                          Include detailed data tables
                        </Label>
                      </div>
                    </div>
                    
                    <Button onClick={handleExportReport} disabled={isExporting} className="w-full">
                      {isExporting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Exporting Report...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Export Report
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Export History</CardTitle>
                    <CardDescription>
                      Your recent report exports
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Overview Report - Jan 2024</p>
                          <p className="text-sm text-muted-foreground">PDF • 2.3 MB</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Patient Analytics - Dec 2023</p>
                          <p className="text-sm text-muted-foreground">Excel • 1.8 MB</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Revenue Report - Nov 2023</p>
                          <p className="text-sm text-muted-foreground">PDF • 3.1 MB</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Export as dynamic component to prevent prerendering issues
export default dynamic(() => Promise.resolve(DoctorReportsPage), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  )
})