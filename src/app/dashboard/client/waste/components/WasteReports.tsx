'use client'

import { useState, useTransition } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileSpreadsheet, FileText, Loader2, Award } from 'lucide-react'
import { toast } from 'sonner'

export default function WasteReports({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition()
  const [downloading, setDownloading] = useState<'pdf' | 'csv' | null>(null)

  const handleDownload = async (type: 'pdf' | 'csv') => {
    setDownloading(type)
    startTransition(async () => {
      try {
        // In future: replace with live API call → /api/reports/waste?type=pdf&userId=${userId}
        await new Promise((r) => setTimeout(r, 1200))
        toast.success(`Your ${type.toUpperCase()} report has been downloaded.`)
      } catch (error) {
        toast.error(`Failed to generate ${type.toUpperCase()} report.`)
      } finally {
        setDownloading(null)
      }
    })
  }

  const handleCertificate = async () => {
    startTransition(async () => {
      try {
        await new Promise((r) => setTimeout(r, 1200))
        toast.success('Your Waste Diversion Certificate has been generated!')
      } catch {
        toast.error('Unable to generate certificate at this time.')
      }
    })
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
        <Download className="w-5 h-5 text-green-600" /> Waste Reports & Certificates
      </h2>

      <Card className="p-6 border-2 border-green-100 shadow-sm bg-white space-y-6">
        <p className="text-gray-700">
          Access and export your waste performance data for record-keeping, sustainability audits,
          or ESG reporting.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PDF Report */}
          <Button
            disabled={!!downloading}
            onClick={() => handleDownload('pdf')}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
          >
            {downloading === 'pdf' ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            Download PDF Report
          </Button>

          {/* CSV Report */}
          <Button
            disabled={!!downloading}
            onClick={() => handleDownload('csv')}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
          >
            {downloading === 'csv' ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <FileSpreadsheet className="w-4 h-4" />
            )}
            Export CSV Data
          </Button>

          {/* Certificate */}
          <Button
            disabled={isPending}
            onClick={handleCertificate}
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600"
          >
            {isPending ? <Loader2 className="animate-spin w-4 h-4" /> : <Award className="w-4 h-4" />}
            Generate Diversion Certificate
          </Button>
        </div>

        <div className="border-t pt-4 mt-4 text-sm text-gray-600">
          <p>
            📄 Reports summarize your total waste collected, diversion rate, CO₂e avoided, and
            compost produced. You can use these for your company’s ESG disclosures, audits, or CSR
            reports.
          </p>
        </div>
      </Card>
    </section>
  )
}
