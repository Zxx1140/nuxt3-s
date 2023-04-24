import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    items: useLocalStorage('cart-items', [])
  }),
 
  actions: {
    addItem(product) {
      const itemIndex = this.items.findIndex(item => item.id === product.product_id);
      
      if (itemIndex !== -1) {
        this.items[itemIndex].quantity += 1;
      } else {
        const newItem = {
          id: product.product_id,
          name: product.product_name,
          price: product.product_price,
          img: product.product_img,
          quantity: 1
        };
        this.items.push(newItem);
        
      }
  
      localStorage.setItem('cart-items', JSON.stringify(this.items));
      alert('Added to cart!')
    },
    removeItem(itemId) {
      const itemIndex = this.items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        this.items.splice(itemIndex, 1);
        localStorage.setItem('cart-items', JSON.stringify(this.items));
      }
    },
    
    clearCart() {
      this.items = [];
      localStorage.setItem('cart-items', JSON.stringify(this.items));
      location.reload();
    }
  },
  getters: {
    cartTotal() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    cartSubtotal() {
      return this.items.reduce((subtotal, item) => subtotal + (item.price * item.quantity), 0);
    }
  },
  // โหลด state จาก LocalStorage
  // ตั้งค่า state ด้วยข้อมูลจาก LocalStorage
  hydrate() {
    this.items = localStorage.setItem('cart-items', []);
    const items = JSON.parse(localStorage.getItem('cart-items'));
    if (items && Array.isArray(items)) {
    this.items = items;
  }
  }
});