'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { Truck, Clock, CheckCircle2, XCircle } from 'lucide-react'

type Pickup = {
  id: string
  type: string
  weight: number
  status: string
  pickupDate: string
}

export default function PickupSchedule({ pickups }: { pickups: Pickup[] }) {
  const [open, setOpen] = useState(false)

  const upcoming = pickups.filter(p => p.status === 'SCHEDULED')
  const completed = pickups.filter(p => p.status === 'COMPLETED')

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
          <Truck className="w-5 h-5 text-green-600" /> Waste Pickup Schedule
        </h2>
        <Button onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700">
          Request Pickup
        </Button>
      </div>

      {/* Upcoming Pickups */}
      <Card className="p-6 border-2 border-green-100 shadow-sm">
        <h3 className="font-medium text-green-700 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-green-600" /> Upcoming Pickups
        </h3>
        {upcoming.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-green-50 text-green-700">
                <tr>
                  <th className="py-2 px-4 border">Type</th>
                  <th className="py-2 px-4 border">Weight (kg)</th>
                  <th className="py-2 px-4 border">Pickup Date</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((p) => (
                  <tr key={p.id} className="border hover:bg-green-50 transition">
                    <td className="py-2 px-4">{p.type}</td>
                    <td className="py-2 px-4">{p.weight}</td>
                    <td className="py-2 px-4">{format(new Date(p.pickupDate), 'PPpp')}</td>
                    <td className="py-2 px-4">
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">No upcoming pickups scheduled.</p>
        )}
      </Card>

      {/* Completed Pickups */}
      <Card className="p-6 border-2 border-green-100 shadow-sm">
        <h3 className="font-medium text-green-700 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" /> Completed Pickups
        </h3>
        {completed.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-green-50 text-green-700">
                <tr>
                  <th className="py-2 px-4 border">Type</th>
                  <th className="py-2 px-4 border">Weight (kg)</th>
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {completed.map((p) => (
                  <tr key={p.id} className="border hover:bg-green-50 transition">
                    <td className="py-2 px-4">{p.type}</td>
                    <td className="py-2 px-4">{p.weight}</td>
                    <td className="py-2 px-4">{format(new Date(p.pickupDate), 'PPpp')}</td>
                    <td className="py-2 px-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">No completed pickups yet.</p>
        )}
      </Card>

      {/* Request Pickup Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request New Pickup</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <Label>Pickup Type</Label>
              <Input placeholder="e.g., Organic Waste" />
            </div>
            <div>
              <Label>Estimated Weight (kg)</Label>
              <Input type="number" placeholder="Enter weight" />
            </div>
            <div>
              <Label>Preferred Date</Label>
              <Input type="datetime-local" />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Submit Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
