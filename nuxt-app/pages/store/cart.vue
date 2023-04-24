<template>
  
  <div class="grid-container">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Your Cart
          </div>
          <div class="mt-1 text-black-500">
            
            <div>
              <div class="shadow-md" v-for="item in cartItems" :key="item.id" >
               
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <img :src="item.img" style="width:150px">
                    <div>
                      <div class="font-semibold">{{ item.name }}</div>
                      <div>ราคา: {{ item.price }} บาท</div>
                      <div>จำนวน: {{ item.quantity }}</div>
                    </div>
                  </div>
                
                  <button class="mr-3 ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded" @click="removeItem(item.id)">Remove</button>
                </div>
              
                <hr class="my-4 " />
              </div>
           
              <div class="font-bold mb-4">จำนวน: {{ getTotal() }} </div>
              <div class="font-bold mb-4">ราคารวม: {{ getSubtotal() }} บาท</div>
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="checkout">Checkout</button>
         
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useCartStore } from '~/stores/cart';


export default defineComponent({
  setup() {
    const cart = useCartStore();
    const cartItems = cart.items;

    const removeItem = (itemId) => {
      cart.removeItem(itemId);
    };

    const getSubtotal = () => {
      return cart.cartSubtotal;
    };

    const getTotal = () => {
      return cart.cartTotal;
    };

    const checkout = () => {
      cart.clearCart();
    };

    return {
      cartItems,
      removeItem,
      getSubtotal,
      getTotal,
      checkout
    };
  },
});
</script>