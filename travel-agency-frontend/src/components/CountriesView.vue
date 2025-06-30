<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

import ModalWindow from './ModalWindow.vue';

const countries = ref([])
const editingCountry = ref(null)
const responseMessage = ref('')

let modalTitle = ''
const newCountry = {
  Название: 'Россия',
}

onMounted(async () => {
  const result = await axios.get('http://localhost:3000/api/country')
  countries.value = result.data
})

function parse(odject) {
  const newCountry = {
    _country: undefined,
  }

  try {
    const objValues = Object.values(odject)
    let i = 0

    for (const key in newCountry) {
      newCountry[key] = objValues[i]
      i++
    }

    if (i < objValues.length) {
      throw new Error('Заполнены не все значения')
    }

    i = 0
  } catch(e) {
    console.error('Ошибка копирования:', e)
  }

  return newCountry
}

function editCountry(country) {
  editingCountry.value = country
  modalTitle = 'Редактирование'
}

function addCountry(country) {
  editingCountry.value = country
  modalTitle = 'Добавление'
}

async function refreshTable() {
  const { data } = await axios.get('http://localhost:3000/api/country')
  countries.value = data
  editingCountry.value = null
}

function handleCountry(country) {
  const newCountry = parse(country)

  switch (modalTitle) {
    case 'Редактирование':
      axios.put(`http://localhost:3000/api/country/${newCountry._country}`, newCountry)
        .then((response) => responseMessage.value = response.data)
      refreshTable()
      break;
  
    case 'Добавление':
      axios.post(`http://localhost:3000/api/country`, newCountry)
        .then((response) => responseMessage.value = response.data)
      refreshTable()
      break;

    default:
      break;
  }
}

function deleteCountry(country) {
  const newCountry = parse(country)

  axios.delete(`http://localhost:3000/api/country/${newCountry._country}`, newCountry)
    .then((response) => responseMessage.value = response.data)
  refreshTable()
}
</script>

<template>
  <div class="countries__main container grid gap-y-4">
    <div class="countries__body pt-4">
      <h1 class="countries__title text-4xl">Страны</h1>
    </div>
    <table class="countries__table table table-auto w-1/2 border-collapse border mt-4">
      <thead>
        <tr>
          <th class="table__head-item border">Название</th>
          <th class="table__head-item border">Редактировать/удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="country in countries" :key="country['Название']">
          <td class="table__body-item border">{{ country['Название'] }}</td>
          <td class="table__body-item border flex justify-center gap-2">
            <button class="countries__edit-button hover:underline" @click="editCountry(country)">Редактировать</button>
            <button class="countries__delete-button hover:underline" @click="deleteCountry(country)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="countries__add-button relative right-9 justify-self-center mr-5 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
      @click="addCountry(newCountry)"
    >
      Добавить
    </button>
    <ModalWindow
      v-if="editingCountry"
      :valueObject="editingCountry"
      :title="modalTitle"
      @close="editingCountry = null"
      @save="handleCountry"
    />
    <ModalWindow
      v-else-if="responseMessage"
      :responseMessage
      @close="responseMessage = ''"
    />
  </div>
</template>