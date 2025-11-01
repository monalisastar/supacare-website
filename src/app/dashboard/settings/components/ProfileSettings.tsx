'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

export default function ProfileSettings() {
  const { data: session } = useSession()

  const handleSave = () => {
    toast.success('Profile updated successfully')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Profile Settings</h2>
      <div>
        <Label>Full Name</Label>
        <Input defaultValue={session?.user?.name || ''} />
      </div>
      <div>
        <Label>Email</Label>
        <Input defaultValue={session?.user?.email || ''} disabled />
      </div>
      <div>
        <Label>Phone</Label>
        <Input placeholder="+254..." />
      </div>
      <div>
        <Label>Organization / Company</Label>
        <Input placeholder="Enter your organization" />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}
