<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { auth } from '@/stores/authStore'

import ModalWindow from './ModalWindow.vue'

const username = ref('')
const password = ref('')
const responseMessage = ref('')

const router = useRouter()

const loginUser = async () => {

  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      username: username.value,
      password: password.value,
    })
    .then(response => {
      responseMessage.value = response.data.message
      if (response.data.token) {
        // localStorage.setItem('token', response.data.token)
        // localStorage.setItem('role', response.data.username)
        auth.login(response.data.token, response.data.username)
        router.push('/sales')
      }
    })
    .catch(error => {
      responseMessage.value = error.response?.data.message || error.message
    })
   
    localStorage.setItem('token', response.data.token)
    
  } catch (err) {
    responseMessage.value = err.response?.data?.message || 'Ошибка входа'
  }
}
</script>

<template>
  <div class="login-form max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4 text-center">Вход</h2>

    <form @submit.prevent="loginUser" class="flex flex-col gap-4">
      <input
        v-model="username"
        type="text"
        placeholder="Имя пользователя"
        class="border p-2 rounded"
        required
      />

      <input
        v-model="password"
        type="password"
        placeholder="Пароль"
        class="border p-2 rounded"
        required
      />

      <button type="submit" class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Войти
      </button>
      
      <ModalWindow 
        v-if="responseMessage"
        :responseMessage
        @close="responseMessage = ''"
      />
    </form>
  </div>
</template>
