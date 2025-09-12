'use client'

import React, { useState } from 'react'
import { MapPin, Plus, Edit, Trash2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

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

interface AddressTabProps {
  addresses: Address[]
  onAddressChange: (addresses: Address[]) => void
}

const AddressTab: React.FC<AddressTabProps> = ({
  addresses,
  onAddressChange
}) => {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: 'home',
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: '',
    isDefault: false
  })

  const handleAddAddress = () => {
    if (editingAddress) {
      // Update existing address
      const updatedAddresses = addresses.map(addr => 
        addr.id === editingAddress.id ? { ...newAddress, id: editingAddress.id } as Address : addr
      )
      onAddressChange(updatedAddresses)
      setEditingAddress(null)
    } else {
      // Add new address
      const address: Address = {
        ...newAddress,
        id: Date.now().toString(),
        isDefault: addresses.length === 0 || newAddress.isDefault || false
      } as Address
      
      // If this is set as default, remove default from others
      if (address.isDefault) {
        const updatedAddresses = addresses.map(addr => ({ ...addr, isDefault: false }))
        onAddressChange([...updatedAddresses, address])
      } else {
        onAddressChange([...addresses, address])
      }
    }
    
    setNewAddress({
      type: 'home',
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
      phone: '',
      isDefault: false
    })
    setShowAddDialog(false)
  }

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address)
    setNewAddress(address)
    setShowAddDialog(true)
  }

  const handleDeleteAddress = (addressId: string) => {
    onAddressChange(addresses.filter(addr => addr.id !== addressId))
  }

  const handleSetDefault = (addressId: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }))
    onAddressChange(updatedAddresses)
  }

  const getAddressTypeColor = (type: string) => {
    switch (type) {
      case 'home': return 'bg-blue-100 text-blue-800'
      case 'work': return 'bg-green-100 text-green-800'
      case 'other': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Addresses</h2>
          <p className="text-muted-foreground">Manage your delivery addresses</p>
        </div>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card key={address.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">{address.name}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getAddressTypeColor(address.type)}>
                    {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                  </Badge>
                  {address.isDefault && (
                    <Badge variant="default" className="bg-green-600">
                      Default
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
                <p className="mt-2">Phone: {address.phone}</p>
              </div>
              
              <div className="flex gap-2 pt-3">
                {!address.isDefault && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSetDefault(address.id)}
                    className="flex-1"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Set Default
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditAddress(address)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {addresses.length === 0 && (
          <div className="col-span-full text-center py-12">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No addresses added</h3>
            <p className="text-muted-foreground mb-4">Add your first address to get started</p>
            <Button onClick={() => setShowAddDialog(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Address
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit Address Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
            <DialogDescription>
              {editingAddress ? 'Update your address information' : 'Add a new delivery address'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="address-name">Address Name</Label>
                <Input
                  id="address-name"
                  value={newAddress.name || ''}
                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                  placeholder="e.g., Home, Office"
                />
              </div>
              <div>
                <Label htmlFor="address-type">Address Type</Label>
                <Select value={newAddress.type} onValueChange={(value: 'home' | 'work' | 'other') => setNewAddress({...newAddress, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                value={newAddress.street || ''}
                onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                placeholder="Enter street address"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={newAddress.city || ''}
                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={newAddress.state || ''}
                  onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                  placeholder="State"
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={newAddress.zipCode || ''}
                  onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                  placeholder="ZIP Code"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={newAddress.country || ''}
                  onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                  placeholder="Country"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newAddress.phone || ''}
                  onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                  placeholder="Phone number"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={newAddress.isDefault || false}
                onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="isDefault">Set as default address</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleAddAddress}>
              <Check className="w-4 h-4 mr-2" />
              {editingAddress ? 'Update Address' : 'Add Address'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddressTab
