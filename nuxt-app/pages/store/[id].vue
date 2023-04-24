<template>
   
  <div>
    <div class="ml-6 mt-4 flex justify-between items-center mb-4">
  <div class="w-2/3 flex ">
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search"
        class="block w-full pr-20 py-3 pl-10 rounded-md bg-white border-2 border-gray-200 focus:outline-none focus:border-blue-500"
      >
      <button
        class="absolute top-0 right-0 h-full px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
        @click="searchProducts(searchQuery)"
      >
        Search
      </button>
    </div>
  </div>
</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700"
        v-for="product in filteredItem || item"
        :key="product.id"
      >
        <a>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ product.product_name }}</h5>
        </a>
        <div class="ma-4">
          <img :src="product.product_img" style="width:300px">
        </div>
        <a class="text-sm font-medium text-gray-900">{{ product.product_detail }}</a>
        <br>
        <a class="text-sm font-medium text-gray-900">ราคา {{ product.product_price }} บาท</a>
        <br>
        <a class="text-sm font-medium text-gray-900">จำนวนสินค้า {{ product.product_total }}</a>
        <div class="text-right">
          <button
            class="bg-green-500 text-white font-bold py-3 px-3 rounded"
            @click="addToCart(product)"
          >
            เลือกสินค้า
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 640px) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
<script>
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '~/stores/cart'



export default defineComponent({
  setup() {
    const item = ref(null)
    const route = useRoute()
    const cartStore = useCartStore()
    const searchQuery = ref('')
    const filteredItem = ref(null) 
    const isSearching = ref(false) 


    const searchProducts = async (searchQuery) => {
      if (searchQuery.trim() === '') { // ตรวจสอบค่า searchQuery ว่าเป็นค่าว่างหรือไม่
    filteredItem.value = null
    return
  }
  try {
    isSearching.value = true // เปลี่ยนสถานะการค้นหาเป็น true
    const response = await fetch(`http://localhost:5000/search?q=${searchQuery}&store_id=${route.params.id}`)
    const products = await response.json()
    filteredItem.value = products
  } catch (err) {
    console.log(err)
  } finally {
    isSearching.value = false // เปลี่ยนสถานะการค้นหาเป็น false
  }
}
  
    fetch(`http://localhost:5000/store/${route.params.id}`)
      .then(res => res.json())
      .then(result => {
        item.value = result
      
       
      });

     

      const addToCart = (product) => {
      
      cartStore.addItem(product)
    }

 

    return {
    item,
    addToCart,
    searchQuery,
    searchProducts,
    filteredItem,
    isSearching 
  }
  },
  watch: {
    searchQuery: function() {
      if (this.searchQuery === '') {
        this.filteredItem = null
      } else {
        this.searchProducts()
      }
    }
  }
})
</script>