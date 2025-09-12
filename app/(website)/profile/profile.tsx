'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileHeader from '@/components/profile/ProfileHeader'
import StatsCards from '@/components/profile/StatsCards'
import OverviewTab from '@/components/profile/OverviewTab'
import OrdersTab from '@/components/profile/OrdersTab'
import AddressTab from '@/components/profile/AddressTab'
import AppointmentsTab from '@/components/profile/AppointmentsTab'
import PrescriptionsTab from '@/components/profile/PrescriptionsTab'
import SecuritySettings from '@/components/profile/SettingsTab'
import ProfileDialogs from '@/components/profile/ProfileDialogs'

// Types
interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  emergencyContact: string
  occupation: string
  maritalStatus: string
  preferences: {
    newsletter: boolean
    smsNotifications: boolean
    emailNotifications: boolean
    pushNotifications: boolean
  }
  membership: {
    type: 'basic' | 'premium' | 'vip'
    joinDate: string
    points: number
    level: string
  }
  stats: {
    totalOrders: number
    totalSpent: number
    averageOrderValue: number
    favoriteCategory: string
    lastOrderDate: string
  }
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: number
  trackingNumber?: string
  estimatedDelivery?: string
}

interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault: boolean
}

interface Appointment {
  id: string
  doctorName: string
  doctorSpecialty: string
  doctorImage: string
  date: string
  time: string
  type: 'in-person' | 'video' | 'phone'
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
  location?: string
  notes?: string
  duration: number
  price: number
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  quantity: number
}

interface Prescription {
  id: string
  doctorName: string
  doctorSpecialty: string
  date: string
  status: 'active' | 'completed' | 'expired' | 'cancelled'
  medications: Medication[]
  notes?: string
  followUpDate?: string
  totalCost: number
}


// Dummy data
const dummyProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  avatar: '/api/placeholder/100/100',
  dateOfBirth: '1990-05-15',
  gender: 'male',
  bloodGroup: 'O+',
  emergencyContact: '+91 98765 43211',
  occupation: 'Software Engineer',
  maritalStatus: 'single',
  preferences: {
    newsletter: true,
    smsNotifications: false,
    emailNotifications: true,
    pushNotifications: true
  },
  membership: {
    type: 'premium',
    joinDate: '2023-01-15',
    points: 2450,
    level: 'Gold'
  },
  stats: {
    totalOrders: 47,
    totalSpent: 125000,
    averageOrderValue: 2659,
    favoriteCategory: 'Electronics',
    lastOrderDate: '2024-03-15'
  }
}

const dummyOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-03-15',
    status: 'delivered',
    total: 15999,
    items: 2,
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-03-18'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-03-10',
    status: 'shipped',
    total: 8999,
    items: 1,
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2024-03-20'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-03-05',
    status: 'processing',
    total: 12999,
    items: 3,
    estimatedDelivery: '2024-03-25'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    date: '2024-02-28',
    status: 'delivered',
    total: 5999,
    items: 1,
    trackingNumber: 'TRK456789123',
    estimatedDelivery: '2024-03-02'
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    date: '2024-02-20',
    status: 'cancelled',
    total: 7999,
    items: 2
  }
]

const dummyAddresses: Address[] = [
  {
    id: '1',
    type: 'home',
    name: 'Home Address',
    street: '123 Main Street, Apartment 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    country: 'India',
    phone: '+91 98765 43210',
    isDefault: true
  },
  {
    id: '2',
    type: 'work',
    name: 'Office Address',
    street: '456 Business Park, Floor 2',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400002',
    country: 'India',
    phone: '+91 98765 43211',
    isDefault: false
  }
]

const dummyAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiologist',
    doctorImage: '',
    date: '2024-03-25',
    time: '10:00',
    type: 'in-person',
    status: 'scheduled',
    location: 'Apollo Hospital, Mumbai',
    notes: 'Regular checkup',
    duration: 30,
    price: 1500
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Dermatologist',
    doctorImage: '',
    date: '2024-03-20',
    time: '14:30',
    type: 'video',
    status: 'completed',
    location: '',
    notes: 'Skin consultation',
    duration: 20,
    price: 800
  }
]

const dummyPrescriptions: Prescription[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiologist',
    date: '2024-03-15',
    status: 'active',
    medications: [
      {
        id: '1',
        name: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take with food',
        quantity: 30
      },
      {
        id: '2',
        name: 'Metoprolol',
        dosage: '50mg',
        frequency: 'Twice daily',
        duration: '30 days',
        instructions: 'Take with water',
        quantity: 60
      }
    ],
    notes: 'Continue medication as prescribed',
    followUpDate: '2024-04-15',
    totalCost: 1200
  }
]

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(dummyProfile)
  const [orders] = useState<Order[]>(dummyOrders)
  const [addresses, setAddresses] = useState<Address[]>(dummyAddresses)
  const [appointments, setAppointments] = useState<Appointment[]>(dummyAppointments)
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(dummyPrescriptions)
  const [isEditing, setIsEditing] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    // Reset profile to original state
  }

  const handleAvatarChange = (file: File) => {
    // Handle avatar upload logic
    console.log('Avatar change:', file.name)
    // Here you would typically upload the file to your server
    // and update the profile.avatar with the new URL
    // For now, we'll just log it
  }

  const handleViewOrder = (orderId: string) => {
    console.log('View order:', orderId)
  }

  const handleTrackOrder = (orderId: string) => {
    console.log('Track order:', orderId)
  }

  const handleTwoFactorAuth = () => {
    console.log('Two-factor authentication')
  }

  const handleLoginHistory = () => {
    console.log('Login history')
  }

  const handleChangePassword = () => {
    console.log('Change password')
    setShowChangePassword(false)
  }

  const handlePaymentMethods = () => {
    console.log('Payment methods')
  }

  const handleDownloadData = () => {
    console.log('Download data')
  }

  const handleDeleteAccount = () => {
    console.log('Delete account')
    setShowDeleteAccount(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <ProfileHeader
          profile={profile}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
          onAvatarChange={handleAvatarChange}
          showEditButton={activeTab === 'overview'}
        />

        {/* Stats Cards */}
        <StatsCards stats={profile.stats} />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="inline-flex bg-white shadow-lg border rounded-xl p-1 overflow-x-auto">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 whitespace-nowrap"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="orders"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 whitespace-nowrap"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger 
                value="addresses"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 whitespace-nowrap"
              >
                Addresses
              </TabsTrigger>
              <TabsTrigger 
                value="appointments"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 whitespace-nowrap"
              >
                Appointments
              </TabsTrigger>
              <TabsTrigger 
                value="prescriptions"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 whitespace-nowrap"
              >
                Prescriptions
              </TabsTrigger>
              <TabsTrigger 
                value="security"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 whitespace-nowrap"
              >
                Security
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <OverviewTab
              profile={profile}
              isEditing={isEditing}
              onProfileChange={setProfile}
            />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <OrdersTab
              orders={orders}
              onViewOrder={handleViewOrder}
              onTrackOrder={handleTrackOrder}
            />
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-6">
            <AddressTab
              addresses={addresses}
              onAddressChange={setAddresses}
            />
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <AppointmentsTab
              appointments={appointments}
              onAppointmentChange={setAppointments}
            />
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-6">
            <PrescriptionsTab
              prescriptions={prescriptions}
              onPrescriptionChange={setPrescriptions}
            />
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <SecuritySettings
              onChangePassword={() => setShowChangePassword(true)}
              onPaymentMethods={handlePaymentMethods}
              onDownloadData={handleDownloadData}
              onDeleteAccount={() => setShowDeleteAccount(true)}
              onTwoFactorAuth={handleTwoFactorAuth}
              onLoginHistory={handleLoginHistory}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <ProfileDialogs
        showChangePassword={showChangePassword}
        showDeleteAccount={showDeleteAccount}
        onCloseChangePassword={() => setShowChangePassword(false)}
        onCloseDeleteAccount={() => setShowDeleteAccount(false)}
        onChangePassword={handleChangePassword}
        onDeleteAccount={handleDeleteAccount}
      />
    </div>
  )
}

export default UserProfile
