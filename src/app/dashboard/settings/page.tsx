'use client'

import { useSession } from 'next-auth/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import ProfileSettings from './components/ProfileSettings'
import PreferenceSettings from './components/PreferenceSettings'
import SecuritySettings from './components/SecuritySettings'
import BillingSettings from './components/BillingSettings'

export default function SettingsPage() {
  const { data: session } = useSession()
  const role = session?.user?.role || 'CLIENT'

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-green-800">Account Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="flex gap-3 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          {role !== 'CONSULTANT' && <TabsTrigger value="billing">Billing</TabsTrigger>}
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-4"><ProfileSettings /></Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="p-4"><PreferenceSettings /></Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-4"><SecuritySettings /></Card>
        </TabsContent>

        {role !== 'CONSULTANT' && (
          <TabsContent value="billing">
            <Card className="p-4"><BillingSettings /></Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
