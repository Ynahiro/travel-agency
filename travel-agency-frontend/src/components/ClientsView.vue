<script setup>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'

import ModalWindow from './ModalWindow.vue'

const clients = ref([])
const editingClient = ref(null)
const responseMessage = ref('')
const inputQuery = ref('')
const searchQuery = ref('')

const filteredClients = computed(() => {
  return clients.value.filter((client) => {
    const query = searchQuery.value.toLowerCase()
    return (
      client.Фамилия.toLowerCase().includes(query) ||
      client.Имя.toLowerCase().includes(query) ||
      client.Отчество.toLowerCase().includes(query) ||
      client.Дата_рождения.toLowerCase().includes(query) ||
      client.Телефон.toLowerCase().includes(query) ||
      client.Email.toLowerCase().includes(query)
    )
  })
})

let modalTitle = ''
const newClient = {
  Id: 1,
  Фамилия: 'Иванов',
  Имя: 'Иван',
  Отчество: 'Иванович',
  Дата_рождения: '1999-12-12',
  Телефон: '89997776655',
  Email: 'some@exampl.com',
  Id_паспорта: '5',
}

function formatClient(client) {
  const formatted = { ...client }

  for (const key in formatted) {
    const value = String(formatted[key])
    if (value.includes('T00:00:00.000Z')) {
      formatted[key] = value.split('T')[0]
    }
  }

  return formatted
}

function formatClients(clients) {
  return clients.map(formatClient)
}

function parse(odject) {
  const newClient = {
    id: undefined,
    surname: undefined,
    name: undefined,
    patronymic: undefined,
    birthday: undefined,
    phoneNum: undefined,
    email: undefined,
    passportId: undefined
  }

  try {
    const objValues = Object.values(odject)
    let i = 0

    for (const key in newClient) {
      newClient[key] = objValues[i]
      i++
    }

    if (i < objValues.length) {
      throw new Error('Заполнены не все значения')
    }

    i = 0
  } catch(e) {
    console.error('Ошибка копирования:', e)
  }

  return newClient
}

onMounted(async () => {
  const { data } = await axios.get('http://localhost:3000/api/client')
  clients.value = formatClients(data)
})

function editClient(client) {
  editingClient.value = client
  modalTitle = 'Редактирование'
}

function addClient(client) {
  editingClient.value = client
  modalTitle = 'Добавление'
}

function startSearch() {
  if (inputQuery.value !== '') {
    searchQuery.value = ''
  }

  searchQuery.value = inputQuery.value
}

async function refreshTable() {
  const { data } = await axios.get('http://localhost:3000/api/client')
  clients.value = formatClients(data)
  editingClient.value = null
}

async function handleClient(rawClient) {
  const newClient = parse(rawClient)

  switch (modalTitle) {
    case 'Редактирование':
      await axios.put(`http://localhost:3000/api/client/${newClient.id}`, newClient)
        .then((response) => responseMessage.value = response.data)
      refreshTable()
      break;
  
    case 'Добавление':
      await axios.post(`http://localhost:3000/api/client`, newClient)
        .then((response) => responseMessage.value = response.data)
      refreshTable()
      break;

    default:
      break;
  }
}

async function deleteClient(client) {
  const deleteClient = parse(client)

  await axios.delete(`http://localhost:3000/api/client/${deleteClient.id}`)
    .then((response) => responseMessage.value = response.data)
  refreshTable()
}
</script>

<template>
  <div class="clients__main container grid gap-y-4">
    <div class="clients__body flex justify-between items-center pt-4">
      <h1 class="clients__title text-4xl">Клиенты</h1>
      <div class="clients__search search flex items-center gap-x-1">
        <label class="visually-hidden" for="search-string">Поисковая строка</label>
        <input 
          class="clients__search-string relative w-70 h-10 px-3 border rounded-lg bg-gray-50"
          id="search-string"
          v-model="inputQuery"
          @keyup.enter="startSearch"
          placeholder="Найти"
          type="text"
        >
        <button class="clients__search-button relative w-[5.9375rem] h-10 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black" @click="startSearch">Найти</button>
      </div>
    </div>
    <table class="clients__table table table-auto w-full border-collapse border mt-4">
      <thead>
        <tr>
          <th class="table__head-item table__head-item--small border">Id</th>
          <th class="table__head-item border">Фамилия</th>
          <th class="table__head-item border">Имя</th>
          <th class="table__head-item border">Отчество</th>
          <th class="table__head-item border">Дата рождения</th>
          <th class="table__head-item border">Телефон</th>
          <th class="table__head-item border">Почта</th>
          <th class="table__head-item border">Id паспорта</th>
          <th class="table__head-item border">Редактировать/удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="client in filteredClients" :key="client['Id']">
          <td class="table__body-item border">{{ client['Id'] }}</td>
          <td class="table__body-item border">{{ client['Фамилия'] }}</td>
          <td class="table__body-item border">{{ client['Имя'] }}</td>
          <td class="table__body-item border">{{ client['Отчество'] }}</td>
          <td class="table__body-item border">{{ client['Дата_рождения'] }}</td>
          <td class="table__body-item border">{{ client['Телефон'] }}</td>
          <td class="table__body-item border">{{ client.Email }}</td>
          <td class="table__body-item border">{{ client['Паспорт_Id'] }}</td>
          <td class="table__body-item border flex justify-center gap-2">
            <button class="clients__edit-button hover:underline" @click="editClient(client)">Редактировать</button>
            <button class="clients__delete-button hover:underline" @click="deleteClient(client)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="clients__add-button justify-self-end mr-5 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
      @click="addClient(newClient)"
    >
      Добавить
    </button>
    <ModalWindow
      v-if="editingClient"
      :valueObject="editingClient"
      :title="modalTitle"
      @close="editingClient = null"
      @save="handleClient"
    />
    <ModalWindow
      v-else-if="responseMessage"
      :responseMessage
      @close="responseMessage = ''"
    />
  </div>
</template>
