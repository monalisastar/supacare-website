'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

export default function BillingSettings() {
  const { data: session } = useSession()
  const handleSave = () => toast.success('Billing preferences updated')

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Billing & Privacy</h2>

      <div>
        <Label>Saved MPesa Number</Label>
        <Input placeholder="e.g. 0712 345 678" />
      </div>

      <div>
        <Label>Invoice Delivery Email</Label>
        <Input defaultValue={session?.user?.email || ''} />
      </div>

      <div className="flex items-center justify-between">
        <Label>Share Usage Data for Improvements</Label>
        <Switch />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Billing Preferences</Button>
      </div>
    </div>
  )
}
