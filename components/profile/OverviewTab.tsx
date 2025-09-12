'use client'

import React from 'react'
import { User, Activity, Calendar, Clock, Package, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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

interface RecentActivity {
  id: string
  type: 'order' | 'appointment' | 'prescription' | 'profile_update'
  title: string
  description: string
  date: string
  icon: string
}

interface OverviewTabProps {
  profile: UserProfile
  isEditing: boolean
  onProfileChange: (profile: UserProfile) => void
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  profile,
  isEditing,
  onProfileChange
}) => {
  const handleFieldChange = (field: string, value: string) => {
    onProfileChange({
      ...profile,
      [field]: value
    } as UserProfile)
  }

  // Dummy recent activities
  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'order',
      title: 'Order #12345 Delivered',
      description: 'Your order of 2 items has been successfully delivered',
      date: '2024-03-20T10:30:00Z',
      icon: 'Package'
    },
    {
      id: '2',
      type: 'appointment',
      title: 'Appointment Scheduled',
      description: 'Appointment with Dr. Sarah Johnson scheduled for March 25',
      date: '2024-03-18T14:20:00Z',
      icon: 'Calendar'
    },
    {
      id: '3',
      type: 'prescription',
      title: 'New Prescription',
      description: 'Prescription for Atorvastatin issued by Dr. Sarah Johnson',
      date: '2024-03-15T09:15:00Z',
      icon: 'Heart'
    },
    {
      id: '4',
      type: 'profile_update',
      title: 'Profile Updated',
      description: 'Your personal information has been updated',
      date: '2024-03-12T16:45:00Z',
      icon: 'User'
    }
  ]

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Package': return <Package className="w-4 h-4" />
      case 'Calendar': return <Calendar className="w-4 h-4" />
      case 'Heart': return <Heart className="w-4 h-4" />
      case 'User': return <User className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'order': return 'text-blue-600 bg-blue-100'
      case 'appointment': return 'text-green-600 bg-green-100'
      case 'prescription': return 'text-red-600 bg-red-100'
      case 'profile_update': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input 
                    id="name" 
                    value={profile.name} 
                    onChange={(e) => handleFieldChange('name', e.target.value)} 
                  />
                ) : (
                  <p className="text-sm font-medium">{profile.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input 
                    id="email" 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => handleFieldChange('email', e.target.value)} 
                  />
                ) : (
                  <p className="text-sm font-medium">{profile.email}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                {isEditing ? (
                  <Input 
                    id="phone" 
                    value={profile.phone} 
                    onChange={(e) => handleFieldChange('phone', e.target.value)} 
                  />
                ) : (
                  <p className="text-sm font-medium">{profile.phone}</p>
                )}
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                {isEditing ? (
                  <Input 
                    id="dob" 
                    type="date" 
                    value={profile.dateOfBirth} 
                    onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)} 
                  />
                ) : (
                  <p className="text-sm font-medium">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Gender</Label>
                {isEditing ? (
                  <Select value={profile.gender} onValueChange={(value) => handleFieldChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm font-medium capitalize">{profile.gender}</p>
                )}
              </div>
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                {isEditing ? (
                  <Select value={profile.bloodGroup || ''} onValueChange={(value) => handleFieldChange('bloodGroup', value)}>
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
                ) : (
                  <p className="text-sm font-medium">{profile.bloodGroup || 'Not specified'}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                {isEditing ? (
                  <Input 
                    id="occupation" 
                    value={profile.occupation || ''} 
                    onChange={(e) => handleFieldChange('occupation', e.target.value)} 
                    placeholder="Enter your occupation"
                  />
                ) : (
                  <p className="text-sm font-medium">{profile.occupation || 'Not specified'}</p>
                )}
              </div>
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                {isEditing ? (
                  <Select value={profile.maritalStatus || ''} onValueChange={(value) => handleFieldChange('maritalStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm font-medium capitalize">{profile.maritalStatus || 'Not specified'}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              {isEditing ? (
                <Input 
                  id="emergencyContact" 
                  value={profile.emergencyContact || ''} 
                  onChange={(e) => handleFieldChange('emergencyContact', e.target.value)} 
                  placeholder="Enter emergency contact number"
                />
              ) : (
                <p className="text-sm font-medium">{profile.emergencyContact || 'Not specified'}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString()} at {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {recentActivities.length === 0 && (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OverviewTab
