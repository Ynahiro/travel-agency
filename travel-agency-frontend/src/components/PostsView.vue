<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import ModalWindow from './ModalWindow.vue'

const posts = ref([])
const editingPost = ref(null)

let modalTitle = ''
const newPost = {
  Название: 'Менеджер',
  Зарплата: '40900',
}

onMounted(async () => {
  const result = await axios.get('http://localhost:3000/api/post')
  posts.value = result.data

  for (let i = 0; i < posts.value.length; i++) {
    for (const key in posts.value[i]) {
      const value = posts.value[i][key]
      const stringValue = String(value)
      if (stringValue.includes('T00:00:00.000Z')) {
        posts.value[i][key] = stringValue.split('T')[0]
      }
    }
  }
})

function parse(odject) {
  const newPost = {
    title: undefined,
    salary: undefined,
  }

  try {
    const objValues = Object.values(odject)
    let i = 0

    for (const key in newPost) {
      newPost[key] = objValues[i]
      i++
    }

    if (i < objValues.length) {
      throw new Error('Заполнены не все значения')
    }

    i = 0
  } catch(e) {
    console.error('Ошибка копирования:', e)
  }

  return newPost
}

function editPost(post) {
  editingPost.value = post
  modalTitle = 'Редактирование'
}

function addPost(post) {
  editingPost.value = post
  modalTitle = 'Добавление'
}

function handlePost(rawPost) {
  const newPost = parse(rawPost)

  switch (modalTitle) {
    case 'Редактирование':
      axios.put(`http://localhost:3000/api/post/${newPost.id}`, newPost)
      editingPost.value = null
      break;
  
    case 'Добавление':
      axios.post(`http://localhost:3000/api/post`, newPost)
      editingPost.value = null
      break;

    default:
      break;
  }
}

function deletePost(post) {
  const deletePost = parse(post)

  axios.delete(`http://localhost:3000/api/post/${deletePost.title}`, deletePost)
  .then(response => console.log(response.data))
}
</script>

<template>
  <div class="posts__main container grid gap-y-4">
    <div class="posts__body pt-4">
      <h1 class="posts__title text-4xl">Клиенты</h1>
    </div>
    <table class="posts__table table table-auto w-1/2 border-collapse border mt-4">
      <thead>
        <tr>
          <th class="table__head-item border">Название</th>
          <th class="table__head-item border">Зарплата</th>
          <th class="table__head-item border">Редактировать/удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="post in posts" :key="post['Название']">
          <td class="table__body-item border">{{ post['Название'] }}</td>
          <td class="table__body-item border">{{ post['Зарплата'] }}</td>
          <td class="table__body-item border flex justify-center gap-2">
            <button class="posts__edit-button hover:underline" @click="editPost(post)">Редактировать</button>
            <button class="posts__delete-button hover:underline" @click="deletePost(post)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="posts__add-button relative right-9 justify-self-center mr-5 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
      @click="addPost(newPost)"
    >
      Добавить
    </button>
    <ModalWindow
      v-if="editingPost"
      :valueObject="editingPost"
      :title="modalTitle"
      @close="editingPost = null"
      @save="handlePost"
    />
  </div>
</template>
