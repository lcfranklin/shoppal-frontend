import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

export function RecordSaleDialog({ open, onOpenChange, selectedProduct, saleDetails, setSaleDetails, onRecordSale }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record a Sale</DialogTitle>
          <DialogDescription>
            Recording sale for <span className="font-bold text-primary">{selectedProduct?.name}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg border">
            <div className="space-y-0.5">
              <Label className="text-xs uppercase text-muted-foreground">Base Price</Label>
              <div className="text-lg font-bold">MWK{selectedProduct?.price}</div>
            </div>
            <div className="space-y-0.5 text-right">
              <Label className="text-xs uppercase text-muted-foreground">Stock Available</Label>
              <div className="text-lg font-bold">{selectedProduct?.stockQuantity}</div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="qty">Quantity to Sell</Label>
            <Input 
              id="qty" 
              type="number" 
              min="1" 
              max={selectedProduct?.stockQuantity}
              value={saleDetails.quantity}
              onChange={(e) => setSaleDetails({...saleDetails, quantity: e.target.value})}
            />
          </div>


          <div className="space-y-4 pt-2 border-t mt-2">
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="special" 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={saleDetails.useSpecialPrice}
                onChange={(e) => setSaleDetails({...saleDetails, useSpecialPrice: e.target.checked})}
              />
              <Label htmlFor="special" className="flex items-center cursor-pointer">
                Variation / Special Price Sale
                <AlertCircle className="ml-1.5 h-3.5 w-3.5 text-blue-500" />
              </Label>
            </div>

            {saleDetails.useSpecialPrice && (
              <div className="grid gap-2 animate-in slide-in-from-top-2 duration-200">
                <Label htmlFor="specialPrice" className="text-blue-600">Enter Special Unit Price (MWK)</Label>
                <Input 
                  id="specialPrice" 
                  type="number" 
                  placeholder="Enter variation price..." 
                  value={saleDetails.specialPrice}
                  className="border-blue-200 focus:border-blue-500"
                  onChange={(e) => setSaleDetails({...saleDetails, specialPrice: e.target.value})}
                />
                <p className="text-[10px] text-muted-foreground">
                  * If sold at a price higher or lower than base record, income will adjust accordingly.
                </p>
              </div>
            )}
          </div>

          <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal to add to Income:</span>
              <span className="font-bold text-primary text-xl">
                MWK{(
                  (saleDetails.useSpecialPrice ? parseFloat(saleDetails.specialPrice || 0) : (selectedProduct?.price || 0)) 
                  * (parseInt(saleDetails.quantity || 0))
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onRecordSale} className="w-full h-11 text-lg">
            Confirm & Update Income
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
