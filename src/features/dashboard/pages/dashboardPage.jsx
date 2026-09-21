import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useDashboard } from "../hooks/useDashboard"
import { DashboardHeader } from "../components/DashboardHeader"
import { StatsCards } from "../components/StatsCards"
import { ProductTable } from "../components/ProductTable"
import { AddProductDialog } from "../components/AddProductDialog"
import { RecordSaleDialog } from "../components/RecordSaleDialog"
import { UpdateProductDialog } from "../components/UpdateProductDialog"
import { RevenueAdjustmentDialog } from "../components/RevenueAdjustmentDialog"

function DashboardPage() {
  const {
    products,
    newProduct,
    setNewProduct,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isUpdateDialogOpen,
    setIsUpdateDialogOpen,
    isRecordSaleOpen,
    setIsRecordSaleOpen,
    isAdjustRevenueOpen,
    setIsAdjustRevenueOpen,
    selectedProduct,
    setSelectedProduct,
    saleDetails,
    setSaleDetails,
    stats,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleRecordSale,
    handleAdjustRevenue
  } = useDashboard()

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <DashboardHeader onAddProductClick={() => setIsAddDialogOpen(true)} />
      
      <Separator />

      <div className="flex items-center justify-between">
        <StatsCards stats={stats} />
      </div>
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => setIsAdjustRevenueOpen(true)}>
          Adjust Revenue
        </Button>
      </div>

      <ProductTable 
        products={products} 
        onRecordSale={(product) => {
          setSelectedProduct(product)
          setIsRecordSaleOpen(true)
        }} 
        onEdit={(product) => {
          setSelectedProduct(product)
          setIsUpdateDialogOpen(true)
        }}
        onDelete={handleDeleteProduct}
      />

      <AddProductDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        onAddProduct={handleAddProduct}
      />

      <UpdateProductDialog 
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        product={selectedProduct}
        onUpdate={handleUpdateProduct}
      />

      <RecordSaleDialog 
        open={isRecordSaleOpen}
        onOpenChange={setIsRecordSaleOpen}
        selectedProduct={selectedProduct}
        saleDetails={saleDetails}
        setSaleDetails={setSaleDetails}
        onRecordSale={handleRecordSale}
      />

      <RevenueAdjustmentDialog
        open={isAdjustRevenueOpen}
        onOpenChange={setIsAdjustRevenueOpen}
        onSubmit={handleAdjustRevenue}
      />
    </div>
  )
}


export default DashboardPage