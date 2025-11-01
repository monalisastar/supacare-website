'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileText, Upload } from 'lucide-react'

interface ReportUploadModalProps {
  projectId: string
  projectType: 'consultancy' | 'carbon'
  onUploadSuccess?: () => void
}

/**
 * 📤 ReportUploadModal
 * -------------------------------------------------
 * Allows consultant to upload project reports (Consultancy or Carbon).
 * Accepts file input + description and links the report to the project ID.
 */
export default function ReportUploadModal({
  projectId,
  projectType,
  onUploadSuccess,
}: ReportUploadModalProps) {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('description', description)
      formData.append('projectId', projectId)
      formData.append('type', projectType)

      const res = await fetch('/api/reports/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed.')

      setOpen(false)
      setFile(null)
      setDescription('')
      onUploadSuccess?.()
    } catch (err) {
      console.error(err)
      setError('Something went wrong during upload.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="default"
        className="flex items-center gap-2"
      >
        <Upload className="w-4 h-4" />
        Upload Report
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg space-y-4">
          <DialogHeader>
            <DialogTitle>Upload Project Report</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="file">Select File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.xlsx,.xls"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="e.g., Baseline Survey Report"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* ✅ Replaced DialogFooter with inline buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Submit'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
