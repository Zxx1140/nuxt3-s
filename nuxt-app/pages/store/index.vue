<template>
    <div class="grid-container">
<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700"

       v-for="item in items"
     :key="item.store_id">
     <NuxtLink :to="'/store/'+item.store_id">
     <a>
       <h5 class="  mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.store_name }}</h5>
       <h3>{{ item.store_detail}}</h3>
       <h2>{{ item.store_address}}</h2>

      </a>

   <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> {{ item.store_deteil }}</p>

   <div class="ma-4">
           <img :src="item.store_profile" style="width:320px">
 
            </div>
            
   
</NuxtLink>
</div>
</div>
 </template>

<script setup>
import { ref } from 'vue';
const items = ref([])


fetch('http://localhost:5000/stores')
.then(res => res.json())
.then((result) => { 
 items.value = result

 
 })
</script>


 <style>

 .grid-container{
   margin-top: 30px;
   display: grid;
   grid-column-gap: 0.5rem;
   grid-row-gap:0.5rem;
 
 
 }
  @media(min-width: 576px) {
   .grid-container { grid-template-columns: repeat(1, 1fr); }
  }
  @media(min-width: 992px) {
   .grid-container { grid-template-columns: repeat(4, 1fr); }
  }
 </style>