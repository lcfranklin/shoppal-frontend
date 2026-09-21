import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

const DEFAULT_ADJUSTMENT = { amount: '', type: 'ADD', reason: '' }

export function RevenueAdjustmentDialog({ open, onOpenChange, onSubmit }) {
  const [adjustment, setAdjustment] = useState(DEFAULT_ADJUSTMENT)

  const handleSubmit = () => {
    if (!adjustment.amount || !adjustment.reason.trim()) return
    onSubmit({
      amount: parseFloat(adjustment.amount),
      type: adjustment.type,
      reason: adjustment.reason.trim()
    })
    setAdjustment(DEFAULT_ADJUSTMENT)
  }

  const handleOpenChange = (isOpen) => {
    if (!isOpen) setAdjustment(DEFAULT_ADJUSTMENT)
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adjust Revenue</DialogTitle>
          <DialogDescription>
            Add or subtract from total revenue. All adjustments are recorded.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">

          {/* Type Selection */}
          <div className="grid gap-2">
            <Label>Adjustment Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAdjustment({...adjustment, type: 'ADD'})}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  adjustment.type === 'ADD'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">Add</span>
              </button>
              <button
                type="button"
                onClick={() => setAdjustment({...adjustment, type: 'SUBTRACT'})}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  adjustment.type === 'SUBTRACT'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <TrendingDown className="h-4 w-4" />
                <span className="font-medium">Subtract</span>
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="grid gap-2">
            <Label htmlFor="adjustAmount">Amount ($)</Label>
            <Input
              id="adjustAmount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter amount..."
              value={adjustment.amount}
              onChange={(e) => setAdjustment({...adjustment, amount: e.target.value})}
            />
          </div>

          {/* Reason */}
          <div className="grid gap-2">
            <Label htmlFor="adjustReason">Reason</Label>
            <textarea
              id="adjustReason"
              rows={3}
              placeholder="Describe the reason for this adjustment..."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={adjustment.reason}
              onChange={(e) => setAdjustment({...adjustment, reason: e.target.value})}
            />
          </div>

          {/* Preview */}
          {adjustment.amount && (
            <div className={`p-4 rounded-xl border ${
              adjustment.type === 'ADD'
                ? 'bg-green-500/5 border-green-500/20'
                : 'bg-red-500/5 border-red-500/20'
            }`}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Revenue will {adjustment.type === 'ADD' ? 'increase' : 'decrease'} by:</span>
                <span className={`font-bold text-xl ${
                  adjustment.type === 'ADD' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {adjustment.type === 'ADD' ? '+' : '-'}${parseFloat(adjustment.amount || 0).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!adjustment.amount || !adjustment.reason.trim()}
            className="w-full h-11 text-lg"
          >
            Confirm Adjustment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
