<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import ModalWindow from './ModalWindow.vue'

const employees = ref([])
const editingEmployee = ref(null)

let modalTitle = ''
const newEmployee = {
  Id: 1,
  Фамилия: 'Иванов',
  Имя: 'Иван',
  Отчество: 'Иванович',
  Телефон: '89997776655',
  Возраст: '18',
  Должность: '1',
}

onMounted(async () => {
  const result = await axios.get('http://localhost:3000/api/employee')
  employees.value = result.data
})
function parse(odject) {
  const newEmployee = {
    id: undefined,
    surname: undefined,
    name: undefined,
    patronymic: undefined,
    phoneNum: undefined,
    age: undefined,
    post: undefined,
  }

  try {
    const objValues = Object.values(odject)
    let i = 0

    for (const key in newEmployee) {
      newEmployee[key] = objValues[i]
      i++
    }

    if (i < objValues.length) {
      throw new Error('Заполнены не все значения')
    }

    i = 0
  } catch (e) {
    console.error('Ошибка копирования:', e)
  }

  return newEmployee
}

function editEmployee(employee) {
  editingEmployee.value = employee
  modalTitle = 'Редактирование'
}

function addEmployee(employee) {
  editingEmployee.value = employee
  modalTitle = 'Добавление'
}

function handleEmployee(rawEmployee) {
  const newEmployee = parse(rawEmployee)

  switch (modalTitle) {
    case 'Редактирование':
      axios.put(`http://localhost:3000/api/employee/${newEmployee.id}`, newEmployee)
      editingEmployee.value = null
      break

    case 'Добавление':
      axios.post(`http://localhost:3000/api/employee`, newEmployee)
      editingEmployee.value = null
      break

    default:
      break
  }
}

function deleteEmployee(employee) {
  const deleteEmployee = parse(employee)

  axios
    .delete(`http://localhost:3000/api/employee/${deleteEmployee.id}`, deleteEmployee)
    .then((response) => console.log(response.data))
}
</script>

<template>
  <div class="employees__main container grid gap-y-4">
    <div class="employees__body pt-4">
      <h1 class="employees__title text-4xl">Путевки</h1>
      
    </div>
    <table class="employees__table table table-auto w-full border-collapse border mt-4">
      <thead>
        <tr>
          <th class="table__head-item table__head-item--small border">Id</th>
          <th class="table__head-item border">Фамилия</th>
          <th class="table__head-item border">Имя</th>
          <th class="table__head-item border">Отчество</th>
          <th class="table__head-item border">Телефон</th>
          <th class="table__head-item border">Возраст</th>
          <th class="table__head-item border">Должность</th>
          <th class="table__head-item border">Редактировать/удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="employee in employees" :key="employee['Id']">
          <td class="table__body-item border">{{ employee['Id'] }}</td>
          <td class="table__body-item border">{{ employee['Фамилия'] }}</td>
          <td class="table__body-item border">{{ employee['Имя'] }}</td>
          <td class="table__body-item border">{{ employee['Отчество'] }}</td>
          <td class="table__body-item border">{{ employee['Телефон'] }}</td>
          <td class="table__body-item border">{{ employee['Возраст'] }}</td>
          <td class="table__body-item border">{{ employee['Должность'] }}</td>
          <td class="table__body-item border flex justify-center gap-2">
            <button
              class="employees__edit-button hover:underline"
              @click="editEmployee(employee)"
            >
              Редактировать
            </button>
            <button
              class="employees__delete-button hover:underline"
              @click="deleteEmployee(employee)"
            >
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="employees__add-button justify-self-end mr-5 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
      @click="addEmployee(newEmployee)"
    >
      Добавить
    </button>
    <ModalWindow
      v-if="editingEmployee"
      :valueObject="editingEmployee"
      :title="modalTitle"
      @close="editingEmployee = null"
      @save="handleEmployee"
    />
  </div>
</template>
