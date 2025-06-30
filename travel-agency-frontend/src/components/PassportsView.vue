<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import ModalWindow from './ModalWindow.vue'

const passports = ref([])
const editingPassport = ref(null)

let modalTitle = ''
const newPassport = {
  Id: 1,
  Серия_и_номер: '1111 223344',
  Кем_выдан: 'УМВД по Области',
  Дата_выдачи: '2025-06-01',
}

onMounted(async () => {
  const result = await axios.get('http://localhost:3000/api/passport')
  passports.value = result.data

  for (let i = 0; i < passports.value.length; i++) {
    for (const key in passports.value[i]) {
      const value = passports.value[i][key]
      const stringValue = String(value)
      if (stringValue.includes('T00:00:00.000Z')) {
        passports.value[i][key] = stringValue.split('T')[0]
      }
    }
  }
})

function parse(odject) {
  const newPassport = {
    id: undefined,
    seriesAndNumber: undefined,
    issuedBy: undefined,
    dateOfIssue: undefined,
  }

  try {
    const objValues = Object.values(odject)
    let i = 0

    for (const key in newPassport) {
      newPassport[key] = objValues[i]
      i++
    }

    if (i < objValues.length) {
      throw new Error('Заполнены не все значения')
    }

    i = 0
  } catch(e) {
    console.error('Ошибка копирования:', e)
  }

  return newPassport
}

function editPassport(passport) {
  editingPassport.value = passport
  modalTitle = 'Редактирование'
}

function addPassport(passport) {
  editingPassport.value = passport
  modalTitle = 'Добавление'
}

function handlePassport(rawPassport) {
  const newPassport = parse(rawPassport)

  switch (modalTitle) {
    case 'Редактирование':
      axios.put(`http://localhost:3000/api/passport/${newPassport.id}`, newPassport)
      editingPassport.value = null
      break;
  
    case 'Добавление':
      axios.post(`http://localhost:3000/api/passport`, newPassport)
      editingPassport.value = null
      break;

    default:
      break;
  }
}

function deletePassport(passport) {
  const deletePassport = parse(passport)

  axios.delete(`http://localhost:3000/api/passport/${deletePassport.id}`, deletePassport)
  .then(response => console.log(response.data))
}
</script>

<template>
  <div class="passports__main container grid gap-y-4">
    <div class="passports__body pt-4">
      <h1 class="passports__title text-4xl">Клиенты</h1>
    </div>
    <table class="passports__table table table-auto w-full border-collapse border mt-4">
      <thead>
        <tr>
          <th class="table__head-item table__head-item--small border">Id</th>
          <th class="table__head-item border">Серия и номер</th>
          <th class="table__head-item border">Кем выдан</th>
          <th class="table__head-item border">Дата выдачи</th>
          <th class="table__head-item border">Редактировать/удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="passport in passports" :key="passport['Id']">
          <td class="table__body-item border">{{ passport['Id'] }}</td>
          <td class="table__body-item border">{{ passport['Серия_и_номер'] }}</td>
          <td class="table__body-item border">{{ passport['Кем_выдан'] }}</td>
          <td class="table__body-item border">{{ passport['Дата_выдачи'] }}</td>
          <td class="table__body-item border flex justify-center gap-2">
            <button class="passports__edit-button hover:underline" @click="editPassport(passport)">Редактировать</button>
            <button class="passports__delete-button hover:underline" @click="deletePassport(passport)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="passports__add-button justify-self-end mr-5 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
      @click="addPassport(newPassport)"
    >
      Добавить
    </button>
    <ModalWindow
      v-if="editingPassport"
      :valueObject="editingPassport"
      :title="modalTitle"
      @close="editingPassport = null"
      @save="handlePassport"
    />
  </div>
</template>
