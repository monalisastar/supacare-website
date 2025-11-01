'use client'

import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Leaf, PackageCheck, Clock, Truck } from 'lucide-react'

type Order = {
  id: string
  quantityKg: number
  status: string
  deliveryDate: string | null
  paymentId?: string | null
  createdAt: string
}

export default function CompostOrders({ orders }: { orders: Order[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-700'
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-700'
      case 'PENDING':
        return 'bg-gray-100 text-gray-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
        <Leaf className="w-5 h-5 text-green-600" /> Compost & Recycling Orders
      </h2>

      <Card className="p-6 border-2 border-green-100 shadow-sm">
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-50 text-green-700">
                  <TableHead>Order ID</TableHead>
                  <TableHead>Quantity (kg)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id} className="hover:bg-green-50 transition">
                    <TableCell className="font-medium text-gray-700">{o.id.slice(0, 8)}...</TableCell>
                    <TableCell>{o.quantityKg.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(o.status)}>
                        {o.status === 'DELIVERED' && <PackageCheck className="w-3 h-3 mr-1" />}
                        {o.status === 'PROCESSING' && <Clock className="w-3 h-3 mr-1" />}
                        {o.status === 'PENDING' && <Truck className="w-3 h-3 mr-1" />}
                        {o.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {o.deliveryDate
                        ? format(new Date(o.deliveryDate), 'PPpp')
                        : <span className="text-gray-500 italic">Pending</span>}
                    </TableCell>
                    <TableCell>
                      {o.paymentId ? (
                        <span className="text-green-600 font-medium">Paid</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">Unpaid</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-gray-500 italic">No compost or recycling orders yet.</p>
        )}
      </Card>
    </section>
  )
}
