'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { 
  Calendar,
  Clock,
  Users,
  FileText,
  Stethoscope,
  Award,
  Activity,
  TrendingUp,
  TrendingDown,
  Plus,
  AlertCircle,
  MessageSquare,
  DollarSign,
  Star,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const DoctorsDashboard = () => {
  const router = useRouter()

  // Doctor-specific stats
  const stats = [
    { 
      name: 'Today\'s Appointments', 
      value: '12', 
      icon: Calendar, 
      change: '+3', 
      changeType: 'positive',
      color: 'blue',
      route: '/doctors/appointments'
    },
    { 
      name: 'Total Patients', 
      value: '1,245', 
      icon: Users, 
      change: '+18', 
      changeType: 'positive',
      color: 'emerald',
      route: '/doctors/patients'
    },
    { 
      name: 'Prescriptions Written', 
      value: '89', 
      icon: FileText, 
      change: '+12', 
      changeType: 'positive',
      color: 'purple',
      route: '/doctors/prescriptions'
    },
    { 
      name: 'Consultation Fee', 
      value: '₹2,500', 
      icon: DollarSign, 
      change: '+5%', 
      changeType: 'positive',
      color: 'green',
      route: '/doctors/settings'
    },
    { 
      name: 'Rating', 
      value: '4.8', 
      icon: Star, 
      change: '+0.2', 
      changeType: 'positive',
      color: 'yellow',
      route: '/doctors/reviews'
    },
    { 
      name: 'Experience', 
      value: '8 Years', 
      icon: Award, 
      change: 'Stable', 
      changeType: 'neutral',
      color: 'indigo',
      route: '/doctors/profile'
    },
  ]


  // Today's appointments
  const todaysAppointments = [
    { 
      time: '09:00 AM', 
      patient: 'Rajesh Kumar', 
      type: 'Follow-up', 
      status: 'Confirmed',
      specialization: 'Cardiology'
    },
    { 
      time: '10:30 AM', 
      patient: 'Priya Sharma', 
      type: 'New Consultation', 
      status: 'Pending',
      specialization: 'General Medicine'
    },
    { 
      time: '12:00 PM', 
      patient: 'Amit Patel', 
      type: 'Emergency', 
      status: 'Urgent',
      specialization: 'Emergency Medicine'
    },
    { 
      time: '02:00 PM', 
      patient: 'Sneha Gupta', 
      type: 'Routine Checkup', 
      status: 'Confirmed',
      specialization: 'Pediatrics'
    },
    { 
      time: '03:30 PM', 
      patient: 'Vikram Singh', 
      type: 'Post-surgery', 
      status: 'Confirmed',
      specialization: 'Orthopedics'
    }
  ]

  // Recent prescriptions
  const recentPrescriptions = [
    { 
      patient: 'Rajesh Kumar', 
      medication: 'Metformin 500mg', 
      dosage: 'Twice daily', 
      date: 'Today',
      status: 'Active'
    },
    { 
      patient: 'Priya Sharma', 
      medication: 'Amoxicillin 250mg', 
      dosage: 'Three times daily', 
      date: 'Yesterday',
      status: 'Active'
    },
    { 
      patient: 'Amit Patel', 
      medication: 'Ibuprofen 400mg', 
      dosage: 'As needed', 
      date: '2 days ago',
      status: 'Completed'
    },
    { 
      patient: 'Sneha Gupta', 
      medication: 'Paracetamol 500mg', 
      dosage: 'Every 6 hours', 
      date: '3 days ago',
      status: 'Active'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
      emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
      orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400',
      indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400',
      yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400',
      red: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getStatusColor = (status: string) => {
    const colors = {
      'Confirmed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Urgent': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Active': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Completed': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
    return colors[status as keyof typeof colors] || colors['Pending']
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Doctor Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, Dr. Sharma! Here&apos;s your medical practice overview.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(stat.route)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                    <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === 'positive' ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      ) : stat.changeType === 'negative' ? (
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                      ) : (
                        <Activity className="w-4 h-4 text-gray-600 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">
                        {stat.changeType === 'neutral' ? '' : 'from last month'}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today&apos;s Appointments
            </CardTitle>
            <CardDescription>Your scheduled appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{appointment.time}</p>
                      <p className="text-sm text-muted-foreground">{appointment.patient}</p>
                      <p className="text-xs text-muted-foreground">{appointment.type} • {appointment.specialization}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common medical tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950"
                onClick={() => router.push('/doctors/appointments')}
              >
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Schedule</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-green-50 dark:hover:bg-green-950"
                onClick={() => router.push('/doctors/prescriptions')}
              >
                <FileText className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Prescribe</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-950"
                onClick={() => router.push('/doctors/patients')}
              >
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Patients</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-orange-50 dark:hover:bg-orange-950"
                onClick={() => router.push('/doctors/emergency')}
              >
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium">Emergency</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                onClick={() => router.push('/doctors/consultation')}
              >
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium">Consult</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                onClick={() => router.push('/doctors/settings')}
              >
                <Stethoscope className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium">Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Prescriptions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Prescriptions
            </CardTitle>
            <CardDescription>Latest medications prescribed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPrescriptions.map((prescription, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{prescription.patient}</p>
                      <p className="text-xs text-muted-foreground">{prescription.medication}</p>
                      <p className="text-xs text-muted-foreground">{prescription.dosage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{prescription.date}</p>
                    <Badge className={getStatusColor(prescription.status)}>
                      {prescription.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Medical Practice Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Practice Status
            </CardTitle>
            <CardDescription>Your medical practice overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Practice Active</p>
                    <p className="text-xs text-muted-foreground">All systems operational</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Online
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Patient Records</p>
                    <p className="text-xs text-muted-foreground">1,245 active patients</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Updated
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Pending Appointments</p>
                    <p className="text-xs text-muted-foreground">3 appointments today</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Scheduled
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Medical License</p>
                    <p className="text-xs text-muted-foreground">Valid until Dec 2025</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Valid
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DoctorsDashboard