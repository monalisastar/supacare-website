'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'

export default function SecuritySettings() {
  const handleUpdate = () => toast.success('Security settings updated')

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Security</h2>

      <div>
        <Label>Current Password</Label>
        <Input type="password" placeholder="Enter current password" />
      </div>
      <div>
        <Label>New Password</Label>
        <Input type="password" placeholder="Enter new password" />
      </div>
      <div>
        <Label>Confirm New Password</Label>
        <Input type="password" placeholder="Re-enter new password" />
      </div>

      <div className="flex items-center justify-between">
        <Label>Two-Factor Authentication</Label>
        <Switch />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleUpdate}>Update Security</Button>
      </div>
    </div>
  )
}
