'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function PreferenceSettings() {
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('en')
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifSMS, setNotifSMS] = useState(false)
  const [currency, setCurrency] = useState('KES')

  const handleSave = () => toast.success('Preferences saved')

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Preferences</h2>

      <div className="flex items-center justify-between">
        <Label>Theme</Label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <Label>Language</Label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="en">English</option>
          <option value="sw">Swahili</option>
          <option value="fr">French</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <Label>Email Notifications</Label>
        <Switch checked={notifEmail} onCheckedChange={setNotifEmail} />
      </div>

      <div className="flex items-center justify-between">
        <Label>SMS Notifications</Label>
        <Switch checked={notifSMS} onCheckedChange={setNotifSMS} />
      </div>

      <div className="flex items-center justify-between">
        <Label>Preferred Currency</Label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="KES">KES</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  )
}
