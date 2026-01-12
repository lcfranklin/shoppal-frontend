import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardHeader({ onAddProductClick }) {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Commerce Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your inventory, track sales, and monitor income updates in real-time.
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Button 
          size="lg" 
          className="rounded-full px-6 shadow-lg transition-all hover:scale-105"
          onClick={onAddProductClick}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
    </div>
  )
}
