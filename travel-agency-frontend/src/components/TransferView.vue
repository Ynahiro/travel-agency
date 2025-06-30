<script setup>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'

import ModalWindow from './ModalWindow.vue'

const transfers = ref([])
const editingTransfer = ref(null)
const responseMessage = ref('')
const inputQuery = ref('')
const searchQuery = ref('')

const filteredTransfers = computed(() => {
  return transfers.value.filter((transfer) => {
    const query = searchQuery.value.toLowerCase()
    return (
      transfer.Город.toLowerCase().includes(query) ||
      transfer.Тип_трансфера.toLowerCase().includes(query)
    )
  })
})

let modalTitle = ''
const newTransfer = {
  Id: 1,
  Город: 'Тула',
  Тип_трансфера: 'автобус',
}

onMounted(async () => {
  const result = await axios.get('http://localhost:3000/api/transfer')
  transfers.value = result.data

  for (let i = 0; i < transfers.value.length; i++) {
    for (const key in transfers.value[i]) {
      const value = transfers.value[i][key]
      const stringValue = String(value)
      if (stringValue.includes('T00:00:00.000Z')) {
        transfers.value[i][key] = stringValue.split('T')[0]
      }
    }
  }
})

function parse(odject) {
  const newTransfer = {
    id: undefined,
    city: undefined,
    typeOfTransfer: undefined,
  }

  try {
    const objValues = Object.values(odject)
    let i = 0

    for (const key in newTransfer) {
      newTransfer[key] = objValues[i]
      i++
    }

    if (i < objValues.length) {
      throw new Error('Заполнены не все значения')
    }

    i = 0
  } catch(e) {
    console.error('Ошибка копирования:', e)
  }

  return newTransfer
}

function editTransfer(transfer) {
  editingTransfer.value = transfer
  modalTitle = 'Редактирование'
}

function addTransfer(transfer) {
  editingTransfer.value = transfer
  modalTitle = 'Добавление'
}

function startSearch() {
  if (inputQuery.value !== '') {
    searchQuery.value = ''
  }

  searchQuery.value = inputQuery.value
}

async function refreshTable() {
  const { data } = await axios.get('http://localhost:3000/api/transfer')
  transfers.value = data
  editingTransfer.value = null
}

function handleTransfer(rawTransfer) {
  const newTransfer = parse(rawTransfer)

  switch (modalTitle) {
    case 'Редактирование':
      axios.put(`http://localhost:3000/api/transfer/${newTransfer.id}`, newTransfer)
        .then((response) => responseMessage.value = response.data)
      refreshTable()
      break;
  
    case 'Добавление':
      axios.post(`http://localhost:3000/api/transfer`, newTransfer)
        .then((response) => responseMessage.value = response.data)
      refreshTable()
      break;

    default:
      break;
  }
}

function deleteTransfer(transfer) {
  const deleteTransfer = parse(transfer)

  axios.delete(`http://localhost:3000/api/transfer/${deleteTransfer.id}`)
    .then((response) => responseMessage.value = response.data)
  refreshTable()
}
</script>

<template>
  <div class="transfers__main container grid gap-y-4">
    <div class="transfers__body flex justify-between items-center pt-4">
      <h1 class="transfers__title text-4xl">Трансфер</h1>
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
    <table class="transfers__table table table-auto w-full border-collapse border mt-4">
      <thead>
        <tr>
          <th class="table__head-item table__head-item--small border">Id</th>
          <th class="table__head-item border">Город</th>
          <th class="table__head-item border">Тип трансфера</th>
          <th class="table__head-item border">Редактировать/удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="transfer in filteredTransfers" :key="transfer['Id']">
          <td class="table__body-item border">{{ transfer['Id'] }}</td>
          <td class="table__body-item border">{{ transfer['Город'] }}</td>
          <td class="table__body-item border">{{ transfer['Тип_трансфера'] }}</td>
          <td class="table__body-item border flex justify-center gap-2">
            <button class="transfers__edit-button hover:underline" @click="editTransfer(transfer)">Редактировать</button>
            <button class="transfers__delete-button hover:underline" @click="deleteTransfer(transfer)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="transfers__add-button justify-self-end mr-5 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
      @click="addTransfer(newTransfer)"
    >
      Добавить
    </button>
    <ModalWindow
      v-if="editingTransfer"
      :valueObject="editingTransfer"
      :title="modalTitle"
      @close="editingTransfer = null"
      @save="handleTransfer"
    />
    <ModalWindow
      v-else-if="responseMessage"
      :responseMessage
      @close="responseMessage = ''"
    />
  </div>
</template>
