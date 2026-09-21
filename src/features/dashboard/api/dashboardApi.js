import api from '@/utils/axios';

export const dashboardApi = {
  getProducts: () => {
    return api.get('/products');
  },

  addProduct: (product) => {
    return api.post('/products', product);
  },

  recordSale: (productId, saleDetails) => {
    return api.post(`/products/${productId}/sales`, saleDetails);
  },

  getStats: () => {
    return api.get('/products/stats');
  },

  updateProduct: (id, product) => {
    return api.put(`/products/${id}`, product);
  },

  deleteProduct: (id) => {
    return api.delete(`/products/${id}`);
  },

  adjustRevenue: (amount, type, reason) => {
    return api.post(`/products/revenue/adjust?amount=${amount}&type=${type}&reason=${reason}`);
  }
};

