<template>
  <NavBar />

  <RouterView />

  <div>
    <h1>Список клиентов</h1>
    <ul v-if="clients.length" class="bg-black">
      <li v-for="client in clients" :key="client['Id']" class="text-white">
        {{ client['Email'] }} — {{ client.Email }}
      </li>
    </ul>
    <p v-else>Загрузка клиентов...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import NavBar from './components/NavBar.vue';

const clients = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/client');
    clients.value = response.data;
  } catch (err) {
    console.error('Ошибка при получении клиентов:', err);
  }
});
</script>