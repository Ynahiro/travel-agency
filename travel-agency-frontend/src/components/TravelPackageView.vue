<script setup>
import axios from 'axios'
import { computed, ref, onMounted } from 'vue'

import ModalWindow from './ModalWindow.vue'

const travelPackageUrl = ref('details')
const travelPackages = ref([])
const editingTravelPackage = ref(null)
const expensiveTravelPackage = ref(null)
const mostPopularTravelPackages = ref(null)
const responseMessage = ref('')
const inputQuery = ref('')
const searchQuery = ref('')

let modalTitle = ''
const newTravelPackage = {
  Id: 1,
  Название: 'Тур по Туле',
  Длительность_Id: '1',
  Трансфер_Id: '1',
  Отель_Id: '6',
  СтранаId: 'Россия',
}

onMounted(async () => {
  const result = await axios.get(`http://localhost:3000/api/travel/${travelPackageUrl.value}`)
  travelPackages.value = result.data

  console.log(travelPackages.value)
})


const disableAddButton = computed(() =>
  !expensiveTravelPackage.value ? (!mostPopularTravelPackages.value ? 1 : 0) : 0,
)

const tableSelctors = computed(() =>
  !expensiveTravelPackage.value
    ? !mostPopularTravelPackages.value
      ? 'standart'
      : 'popular'
    : 'expensive',
)

const filteredTravelPackages = computed(() => {
  return travelPackages.value.filter((travelPackage) => {
    const query = searchQuery.value.toLowerCase()
    return (
      travelPackage.Название.toLowerCase().includes(query) ||
      travelPackage.Количесво_продаж?.toLowerCase().includes(query) ||
      travelPackage.Звезды?.toLowerCase().includes(query) ||
      travelPackage.Продолжительность.toString().includes(query) ||
      travelPackage.Город?.toLowerCase().includes(query) ||
      travelPackage.Город_трансфера?.toLowerCase().includes(query) ||
      travelPackage.Категория_отеля?.toLowerCase().includes(query) ||
      travelPackage.Стоимость_отеля?.toString().includes(query) ||
      travelPackage.Стоимость_путевки?.toString().includes(query)
    )
  })
})

function parse(odject) {
  const newTravelPackage = {
    id: undefined,
    title: undefined,
    durationId: undefined,
    transferId: undefined,
    hotelId: undefined,
    countryId: undefined,
  }

  try {
    const objValues = Object.values(odject)
    let i = 0

    for (const key in newTravelPackage) {
      if (i === 5) {
        i++
      }

      newTravelPackage[key] = objValues[i]
      i++
    }

    if (i < objValues.length) {
      throw new Error('Заполнены не все значения')
    }

    i = 0
  } catch (e) {
    console.error('Ошибка копирования:', e)
    console.log(newTravelPackage)
  }

  return newTravelPackage
}

function editTravelPackage(travelPackage) {
  editingTravelPackage.value = travelPackage
  modalTitle = 'Редактирование'
}

function addTravelPackage(travelPackage) {
  editingTravelPackage.value = travelPackage
  modalTitle = 'Добавление'
}

function startSearch() {
  if (inputQuery.value !== '') {
    searchQuery.value = ''
  }

  searchQuery.value = inputQuery.value
}

function toggleDetailsOfTravelPackages() {
  if (travelPackageUrl.value) {
    travelPackageUrl.value = ''
  } else {
    travelPackageUrl.value = 'details'
  }

  refreshTravelPakages()
}

function backToAllTravelPackage() {
  expensiveTravelPackage.value = null
  mostPopularTravelPackages.value = null
}

async function refreshTravelPakages() {
  const { data } = await axios.get(`http://localhost:3000/api/travel/${travelPackageUrl.value}`)
  travelPackages.value = data
  editingTravelPackage.value = null
}

async function handleTravelPackage(rawTravelPackage) {
  const newTravelPackage = parse(rawTravelPackage)

  switch (modalTitle) {
    case 'Редактирование':
      await axios.put(`http://localhost:3000/api/travel/${newTravelPackage.id}`, newTravelPackage)
        .then((response) => responseMessage.value = response.data)
      refreshTravelPakages()
      break

    case 'Добавление':
      await axios.post(`http://localhost:3000/api/travel`, newTravelPackage)
        .then((response) => responseMessage.value = response.data)
      refreshTravelPakages()
      break

    default:
      break
  }
}

async function deleteTravelPackage(travelPackage) {
  const deleteTravelPackage = parse(travelPackage)

  await axios.delete(`http://localhost:3000/api/travel/${deleteTravelPackage.id}`)
    .then((response) => responseMessage.value = response.data)
  refreshTravelPakages()
}

async function getMostExpensiveTravelPackage() {
  const result = await axios.get('http://localhost:3000/api/travel/expensive')
  expensiveTravelPackage.value = result.data[0]
  mostPopularTravelPackages.value = null
}

async function getMostPopularTravelPackages() {
  const result = await axios.get('http://localhost:3000/api/travel/top')
  mostPopularTravelPackages.value = result.data
  expensiveTravelPackage.value = null

}
</script>

<template>
  <div class="travel-packages__main container grid gap-y-4">
    <div class="travel-packages__body flex justify-between items-center pt-4">
      <h1 class="travel-packages__title text-4xl">Путевки</h1>
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
    <!-- Начальная таблица с ID -->
    <table
      class="travel-packages__table table table-auto w-full border-collapse border mt-4"
      v-if="tableSelctors === 'standart' && travelPackageUrl !== 'details'"
    >
      <thead>
        <tr>
          <th class="table__head-item table__head-item--small border">Id</th>
          <th class="table__head-item border">Название</th>
          <th class="table__head-item border">Длительность</th>
          <th class="table__head-item border">Трансфер</th>
          <th class="table__head-item border">Отель</th>
          <th class="table__head-item border">Страна</th>
          <th class="table__head-item border">Редактировать/удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-center"
          v-for="travelPackage in filteredTravelPackages"
          :key="travelPackage['Id']"
        >
          <td class="table__body-item border">{{ travelPackage['Id'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Название'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Длительность_Id'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Трансфер_Id'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Отель_Id'] }}</td>
          <td class="table__body-item border">{{ travelPackage['СтранаId'] }}</td>
          <td class="table__body-item border flex justify-center gap-2">
            <button
              class="travel-packages__edit-button hover:underline"
              @click="editTravelPackage(travelPackage)"
            >
              Редактировать
            </button>
            <button
              class="travel-packages__delete-button hover:underline"
              @click="deleteTravelPackage(travelPackage)"
            >
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Детализированная таблица -->
    <table
      class="travel-packages__table table table-auto w-full border-collapse border mt-4"
      v-else-if="travelPackageUrl === 'details' && tableSelctors === 'standart'"
    >
      <thead>
        <tr>
          <th class="table__head-item table__head-item--small border">Id</th>
          <th class="table__head-item border">Название</th>
          <th class="table__head-item border">Продолжительность</th>
          <th class="table__head-item border">Город трансфера</th>
          <th class="table__head-item border">Вид трансфера</th>
          <th class="table__head-item border">Отель</th>
          <th class="table__head-item border">Категория отеля</th>
          <th class="table__head-item border">Страна</th>
          <th class="table__head-item border">Стоимость отеля</th>
          <th class="table__head-item border">Стоимость путевки</th>
          <th class="table__head-item border">Редактировать/удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-center"
          v-for="travelPackage in filteredTravelPackages"
          :key="travelPackage['Id']"
        >
          <td class="table__body-item border">{{ travelPackage['Id'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Название'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Продолжительность'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Город_трансфера'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Вид_трансфера'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Отель'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Категория_отеля'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Страна'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Стоимость_отеля'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Стоимость_путевки'] }}</td>
          <td class="table__body-item border flex justify-center gap-2">
            <button
              class="travel-packages__edit-button hover:underline"
              @click="editTravelPackage(newTravelPackage)"
            >
              Редактировать
            </button>
            <button
              class="travel-packages__delete-button hover:underline"
              @click="deleteTravelPackage(travelPackage)"
            >
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Саммая дорогая путевка -->
    <table
      class="travel-packages__table table table-auto w-full border-collapse border mt-4"
      v-else-if="tableSelctors === 'expensive'"
    >
      <thead>
        <tr>
          <th class="table__head-item table__head-item--small border">Id</th>
          <th class="table__head-item border">Название</th>
          <th class="table__head-item border">Продолжительность</th>
          <th class="table__head-item border">Отель</th>
          <th class="table__head-item border">Количество звезд</th>
          <th class="table__head-item border">Стоимость</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center">
          <td class="table__body-item border">{{ expensiveTravelPackage['Id'] }}</td>
          <td class="table__body-item border">{{ expensiveTravelPackage['Название'] }}</td>
          <td class="table__body-item border">{{ expensiveTravelPackage['Продолжительность'] }}</td>
          <td class="table__body-item border">{{ expensiveTravelPackage['Отель'] }}</td>
          <td class="table__body-item border">{{ expensiveTravelPackage['Звезды'] }}</td>
          <td class="table__body-item border">{{ expensiveTravelPackage['Стоимость_путевки'] }}</td>
        </tr>
      </tbody>
    </table>
    <!-- Рейтинг путевок -->
    <table
      class="travel-packages__table table table-auto w-full border-collapse border mt-4"
      v-else-if="tableSelctors === 'popular'"
    >
      <thead>
        <tr>
          <th class="table__head-item table__head-item--small border">Количество продаж</th>
          <th class="table__head-item border">Id</th>
          <th class="table__head-item border">Название</th>
          <th class="table__head-item border">Отель</th>
          <th class="table__head-item border">Количесво звезд</th>
          <th class="table__head-item border">Стоимость</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-center"
          v-for="travelPackage in mostPopularTravelPackages"
          :key="travelPackage['Количесво_продаж']"
        >
          <td class="table__body-item border">{{ travelPackage['Количество_продаж'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Id'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Название'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Отель'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Звезды'] }}</td>
          <td class="table__body-item border">{{ travelPackage['Стоимость_путевки'] }}</td>
        </tr>
      </tbody>
    </table>
    <div class="travel-packages__controls flex justify-between items-center gap-x-2 mr-5">
      <div class="travel-packages__controls-table-rows flex gap-x-2">
        <button
          class="travel-packages__extra-search-button px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
          id="expensive-travel-package-button"
          @click="getMostExpensiveTravelPackage()"
        >
          Самая дорога путевка
        </button>
        <button
          class="travel-packages__extra-search-button px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
          id="expensive-travel-package-button"
          @click="getMostPopularTravelPackages()"
        >
          Топ путевок
        </button>
      </div>
      <div class="travel-packages__controls-table-values flex gap-x-2">
        <button
          class="travel-packages__add-button relative w-36 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
          @click="toggleDetailsOfTravelPackages()"
        >
          Редактирование
        </button>
        <button
          class="travel-packages__add-button relative w-[5.9375rem] px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
          @click="backToAllTravelPackage()"
          v-if="!disableAddButton"
        >
          Назад
        </button>
        <button
          class="travel-packages__add-button px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
          @click="addTravelPackage(newTravelPackage)"
          v-if="disableAddButton"
        >
          Добавить
        </button>
      </div>
    </div>
    <ModalWindow
      v-if="editingTravelPackage"
      :valueObject="editingTravelPackage"
      :title="modalTitle"
      @close="editingTravelPackage = null"
      @save="handleTravelPackage"
    />
    <ModalWindow v-else-if="responseMessage" :responseMessage @close="responseMessage = ''" />
  </div>
</template>
