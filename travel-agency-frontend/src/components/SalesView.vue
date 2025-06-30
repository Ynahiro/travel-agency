<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

import ModalWindow from './ModalWindow.vue'

const sales = ref([])
const editingSale = ref(null)
const saleDateFilter = ref('')
const departureDateFilter = ref('')
const filteredSales = computed(() => {
  return sales.value.filter((sale) => {
    const matchSaleDate = !saleDateFilter.value || sale['Дата_продажи'] === saleDateFilter.value
    const matchDepatureDate = !departureDateFilter.value || sale['Дата_отправления'] === departureDateFilter.value
    return matchDepatureDate && matchSaleDate
  })
})

let modalTitle = ''
const newSale = {
  Id: 1,
  Дата_продажи: '2021-09-01',
  Дата_отправления: '2021-10-02',
  Скидка: '0.20',
  Путевка_Id: '3',
  Клиент_Id: '1',
  Сотрудник_Id: '1-3',
}

onMounted(async () => {
  const result = await axios.get('http://localhost:3000/api/sale')
  sales.value = result.data

  for (let i = 0; i < sales.value.length; i++) {
    for (const key in sales.value[i]) {
      const value = sales.value[i][key]
      const stringValue = String(value)
      if (stringValue.includes('T00:00:00.000Z')) {
        sales.value[i][key] = stringValue.split('T')[0]
      }
    }
  }
})

function parse(odject) {
  const newSale = {
    id: undefined,
    dateOfSale: undefined,
    departureDate: undefined,
    discount: undefined,
    travelPackageId: undefined,
    clientId: undefined,
    employeeId: undefined,
  }

  try {
    const objValues = Object.values(odject)
    let i = 0

    for (const key in newSale) {
      newSale[key] = objValues[i]
      i++
    }

    if (i < objValues.length) {
      throw new Error('Заполнены не все значения')
    }

    i = 0
  } catch (e) {
    console.error('Ошибка копирования:', e)
  }

  return newSale
}

function editSale(sale) {
  editingSale.value = sale
  modalTitle = 'Редактирование'
}

function addSale(sale) {
  editingSale.value = sale
  modalTitle = 'Добавление'
}

function handleSale(rawSale) {
  const newSale = parse(rawSale)

  switch (modalTitle) {
    case 'Редактирование':
      axios.put(`http://localhost:3000/api/sale/${newSale.id}`, newSale)
      editingSale.value = null
      break

    case 'Добавление':
      axios.post(`http://localhost:3000/api/sale`, newSale)
      editingSale.value = null
      break

    default:
      break
  }
}

function deleteSale(sale) {
  const deleteSale = parse(sale)

  axios
    .delete(`http://localhost:3000/api/sale/${deleteSale.id}`, deleteSale)
    .then((response) => console.log(response.data))
}
</script>

<template>
  <div class="sales__main container grid gap-y-4">
    <div class="sales__body pt-4">
      <h1 class="sales__title text-4xl">Продажи</h1>
    </div>
    <!-- Переделать -->
    <div class="flex flex-wrap gap-4 items-center">
      <label for="sale-date">
        Дата продажи:
        <input
          class="sale-date__input border px-2 py-1 rounded-md"
          id="sale-date"
          v-model="saleDateFilter"
          type="date"
        />
      </label>

      <label for="departure-date">
        Дата отправления:
        <input
          class="departure-date__input border px-2 py-1 rounded-md"
          id="departure-date"
          v-model="departureDateFilter"
          type="date"
        />
      </label>
    </div>
    <table class="sales__table table table-auto w-full border-collapse border mt-4">
      <thead>
        <tr>
          <th class="table__head-item table__head-item--small border">Id</th>
          <th class="table__head-item border">Дата продажи</th>
          <th class="table__head-item border">Дата отправления</th>
          <th class="table__head-item border">Скидка</th>
          <th class="table__head-item border">Путевка Id</th>
          <th class="table__head-item border">Клиент Id</th>
          <th class="table__head-item border">Сотрудник Id</th>
          <th class="table__head-item border">Редактировать/удалить</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr class="text-center" v-for="sale in sales" :key="sale['Id']">  -->
        <tr class="text-center" v-for="sale in filteredSales" :key="sale['Id']">
          <td class="table__body-item border">{{ sale['Id'] }}</td>
          <td class="table__body-item border">{{ sale['Дата_продажи'] }}</td>
          <td class="table__body-item border">{{ sale['Дата_отправления'] }}</td>
          <td class="table__body-item border">{{ sale['Скидка'] }}</td>
          <td class="table__body-item border">{{ sale['Путевка_Id'] }}</td>
          <td class="table__body-item border">{{ sale['Клиент_Id'] }}</td>
          <td class="table__body-item border">{{ sale['Сотрудник_Id'] }}</td>
          <td class="table__body-item border flex justify-center gap-2">
            <button class="sales__edit-button hover:underline" @click="editSale(sale)">
              Редактировать
            </button>
            <button class="sales__delete-button hover:underline" @click="deleteSale(sale)">
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="sales__add-button justify-self-end mr-5 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
      @click="addSale(newSale)"
    >
      Добавить
    </button>
    <ModalWindow
      v-if="editingSale"
      :valueObject="editingSale"
      :title="modalTitle"
      @close="editingSale = null"
      @save="handleSale"
    />
  </div>
</template>
