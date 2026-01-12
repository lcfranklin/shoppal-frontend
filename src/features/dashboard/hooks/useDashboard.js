import { DEFAULT_NEW_PRODUCT, DEFAULT_SALE_DETAILS } from '@/utils/constants'
import { useState, useEffect } from 'react'
import { dashboardApi } from '../api/dashboardApi'

export function useDashboard() {
  const [products, setProducts] = useState([])
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSales: 0,
    totalProducts: 0,
    lowStockItems: 0
  })

  const [newProduct, setNewProduct] = useState(DEFAULT_NEW_PRODUCT)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isRecordSaleOpen, setIsRecordSaleOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  // Sale Recording State
  const [saleDetails, setSaleDetails] = useState(DEFAULT_SALE_DETAILS)

  const fetchData = async () => {
    try {
      const [productsData, statsData] = await Promise.all([
        dashboardApi.getProducts(),
        dashboardApi.getStats()
      ]);
      setProducts(productsData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stockQuantity) return
    try {
      await dashboardApi.addProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
        stockQuantity: parseInt(newProduct.stockQuantity)
      });
      setNewProduct(DEFAULT_NEW_PRODUCT)
      setIsAddDialogOpen(false)
      fetchData();
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Error adding product");
    }
  }

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      await dashboardApi.updateProduct(id, {
        ...updatedData,
        price: parseFloat(updatedData.price),
        stockQuantity: parseInt(updatedData.stockQuantity)
      });
      setIsUpdateDialogOpen(false);
      setSelectedProduct(null);
      fetchData();
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Error updating product");
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await dashboardApi.deleteProduct(id);
      fetchData();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Error deleting product");
    }
  }

  const handleRecordSale = async () => {

    if (!selectedProduct) return
    
    const quantity = parseInt(saleDetails.quantity)
    try {
      await dashboardApi.recordSale(selectedProduct.id, { quantity });
      setIsRecordSaleOpen(false)
      setSaleDetails(DEFAULT_SALE_DETAILS)
      setSelectedProduct(null)
      fetchData();
    } catch (error) {
      console.error("Failed to record sale:", error);
      alert(error.response?.data?.message || "Error recording sale");
    }
  }

  return {
    products,
    newProduct,
    setNewProduct,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isUpdateDialogOpen,
    setIsUpdateDialogOpen,
    isRecordSaleOpen,
    setIsRecordSaleOpen,
    selectedProduct,
    setSelectedProduct,
    saleDetails,
    setSaleDetails,
    stats,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleRecordSale
  }
}


