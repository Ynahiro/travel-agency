<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

import ModalWindow from './ModalWindow.vue';

const hotels = ref([])
const editingHotel = ref(null)

let modalTitle = ''
const newHotel = {
  Id: '1',
  Название: 'Харбор клаб',
  Категория: '4 звезды',
  Город: 'Санкт-Петербург'
}

onMounted(async () => {
  const result = await axios.get('http://localhost:3000/api/hotel')
  hotels.value = result.data
})

function parse(odject) {
  const newHotel = {
    id: undefined,
    title: undefined,
    category: undefined,
    city: undefined,
  }

  try {
    const objValues = Object.values(odject)
    let i = 0

    for (const key in newHotel) {
      newHotel[key] = objValues[i]
      i++
    }

    if (i < objValues.length) {
      throw new Error('Заполнены не все значения')
    }

    i = 0
  } catch(e) {
    console.error('Ошибка копирования:', e)
  }

  return newHotel
}

function editHotel(hotel) {
  editingHotel.value = hotel
  modalTitle = 'Редактирование'
}

function addHotel(hotel) {
  editingHotel.value = hotel
  modalTitle = 'Добавление'
}

function handleHotel(hotel) {
  const newHotel = parse(hotel)

  switch (modalTitle) {
    case 'Редактирование':
      axios.put(`http://localhost:3000/api/hotel/${newHotel.id}`, newHotel)
      editingHotel.value = null
      break;
  
    case 'Добавление':
      axios.post(`http://localhost:3000/api/hotel`, newHotel)
      editingHotel.value = null
      break;

    default:
      break;
  }
}

function deleteHotel(hotel) {
  const newHotel = parse(hotel)

  axios.delete(`http://localhost:3000/api/hotel/${newHotel.id}`, newHotel)
  .then(response => console.log(response.data))
}
</script>

<template>
  <div class="hotels container grid gap-y-4">
    <div class="hotels__body pt-4">
      <h1 class="hotels__title text-4xl">Отели</h1>
    </div>
    <table class="hotels__table table table-auto w-full border-collapse border mt-4">
      <thead>
        <tr>
          <th class="table__head-item border">Id</th>
          <th class="table__head-item border">Название</th>
          <th class="table__head-item border">Категория</th>
          <th class="table__head-item border">Город</th>
          <th class="table__head-item border">Редактировать/удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="hotel in hotels" :key="hotel['Id']">
          <td class="table__body-item border">{{ hotel['Id'] }}</td>
          <td class="table__body-item border">{{ hotel['Название'] }}</td>
          <td class="table__body-item border">{{ hotel['Категория'] }}</td>
          <td class="table__body-item border">{{ hotel['Город'] }}</td>
          <td class="table__body-item border flex justify-center gap-2">
            <button class="hotels__edit-button hover:underline" @click="editHotel(hotel)">Редактировать</button>
            <button class="hotels__delete-button hover:underline" @click="deleteHotel(hotel)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="hotels__add-button relative justify-self-end mr-5 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
      @click="addHotel(newHotel)"
    >
      Добавить
    </button>
    <ModalWindow
      v-if="editingHotel"
      :valueObject="editingHotel"
      :title="modalTitle"
      @close="editingHotel = null"
      @save="handleHotel"
    />
  </div>
</template>