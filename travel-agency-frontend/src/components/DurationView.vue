<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

import ModalWindow from './ModalWindow.vue'

const durations = ref([])
const editingDuration = ref(null)
const responseMessage = ref('')
const inputQuery = ref('')
const searchQuery = ref('')

const filteredTransfers = computed(() => {
  return durations.value.filter((duration) => {
    const query = searchQuery.value.toLowerCase()
    return (
      duration.Продолжительность.toString().includes(query) ||
      duration.Стоимость_путевки.toString().includes(query) ||
      duration.Стоимость_отеля.toString().includes(query)
    )
  })
})

let modalTitle = ''
const newDuration = {
  Id: 1,
  Продолжительность: '5',
  Стоимость_путевки: '38990',
  Стоимость_отеля: '17890',
}

onMounted(async () => {
  const result = await axios.get('http://localhost:3000/api/duration')
  durations.value = result.data

  for (let i = 0; i < durations.value.length; i++) {
    for (const key in durations.value[i]) {
      const value = durations.value[i][key]
      const stringValue = String(value)
      if (stringValue.includes('T00:00:00.000Z')) {
        durations.value[i][key] = stringValue.split('T')[0]
      }
    }
  }
})

function parse(odject) {
  const newDuration = {
    id: undefined,
    _duration: undefined,
    travelPackagePrice: undefined,
    hotelPrice: undefined,
  }

  try {
    const objValues = Object.values(odject)
    let i = 0

    for (const key in newDuration) {
      newDuration[key] = objValues[i]
      i++
    }

    if (i < objValues.length) {
      throw new Error('Заполнены не все значения')
    }

    i = 0
  } catch (e) {
    console.error('Ошибка копирования:', e)
  }

  return newDuration
}

function editClient(duration) {
  editingDuration.value = duration
  modalTitle = 'Редактирование'
}

function addClient(duration) {
  editingDuration.value = duration
  modalTitle = 'Добавление'
}

function startSearch() {
  if (inputQuery.value !== '') {
    searchQuery.value = ''
  }

  searchQuery.value = inputQuery.value
}

async function refreshTable() {
  const { data } = await axios.get('http://localhost:3000/api/duration')
  durations.value = data
  editingDuration.value = null
}

function handleClient(rawClient) {
  const newDuration = parse(rawClient)

  switch (modalTitle) {
    case 'Редактирование':
      axios
        .put(`http://localhost:3000/api/duration/${newDuration.id}`, newDuration)
        .then((response) => (responseMessage.value = response.data))
      refreshTable()
      break

    case 'Добавление':
      axios
        .post(`http://localhost:3000/api/duration`, newDuration)
        .then((response) => (responseMessage.value = response.data))
      refreshTable()
      break

    default:
      break
  }
}

function deleteDuration(duration) {
  const deleteDuration = parse(duration)

  axios
    .delete(`http://localhost:3000/api/duration/${deleteDuration.id}`, deleteDuration)
    .then((response) => (responseMessage.value = response.data))
  refreshTable()
}
</script>

<template>
  <div class="durations__main container grid gap-y-4">
    <div class="durations__body flex justify-between items-center pt-4">
      <h1 class="durations__title text-4xl">Длительность</h1>
      <div class="clients__search search flex items-center gap-x-1">
        <label class="visually-hidden" for="search-string">Поисковая строка</label>
        <input
          class="clients__search-string relative w-70 h-10 px-3 border rounded-lg bg-gray-50"
          id="search-string"
          v-model="inputQuery"
          @keyup.enter="startSearch"
          placeholder="Найти"
          type="text"
        />
        <button
          class="clients__search-button relative w-[5.9375rem] h-10 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
          @click="startSearch"
        >
          Найти
        </button>
      </div>
    </div>
    <table class="durations__table table table-auto w-full border-collapse border mt-4">
      <thead>
        <tr>
          <th class="table__head-item table__head-item--small border">Id</th>
          <th class="table__head-item border">Продолжительность</th>
          <th class="table__head-item border">Стоимость путевки</th>
          <th class="table__head-item border">Стоимость отеля</th>
          <th class="table__head-item border">Редактировать/удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="duration in filteredTransfers" :key="duration['Id']">
          <td class="table__body-item border">{{ duration['Id'] }}</td>
          <td class="table__body-item border">{{ duration['Продолжительность'] }}</td>
          <td class="table__body-item border">{{ duration['Стоимость_путевки'] }}</td>
          <td class="table__body-item border">{{ duration['Стоимость_отеля'] }}</td>
          <td class="table__body-item border flex justify-center gap-2">
            <button class="durations__edit-button hover:underline" @click="editClient(duration)">
              Редактировать
            </button>
            <button
              class="durations__delete-button hover:underline"
              @click="deleteDuration(duration)"
            >
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="durations__add-button justify-self-end mr-5 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
      @click="addClient(newDuration)"
    >
      Добавить
    </button>
    <ModalWindow
      v-if="editingDuration"
      :valueObject="editingDuration"
      :title="modalTitle"
      @close="editingDuration = null"
      @save="handleClient"
    />
    <ModalWindow v-else-if="responseMessage" :responseMessage @close="responseMessage = ''" />
  </div>
</template>
