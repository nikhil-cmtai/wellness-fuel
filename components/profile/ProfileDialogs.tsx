'use client'

import React from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface ProfileDialogsProps {
  showChangePassword: boolean
  showDeleteAccount: boolean
  onCloseChangePassword: () => void
  onCloseDeleteAccount: () => void
  onChangePassword: () => void
  onDeleteAccount: () => void
}

const ProfileDialogs: React.FC<ProfileDialogsProps> = ({
  showChangePassword,
  showDeleteAccount,
  onCloseChangePassword,
  onCloseDeleteAccount,
  onChangePassword,
  onDeleteAccount
}) => {
  return (
    <>
      {/* Change Password Dialog */}
      <Dialog open={showChangePassword} onOpenChange={onCloseChangePassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and new password to update your account security.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onCloseChangePassword}>
              Cancel
            </Button>
            <Button onClick={onChangePassword}>
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteAccount} onOpenChange={onCloseDeleteAccount}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <p className="font-medium">Warning</p>
              </div>
              <p className="text-sm text-red-700 mt-2">
                Deleting your account will permanently remove all your data, orders, and preferences.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onCloseDeleteAccount}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDeleteAccount}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProfileDialogs
