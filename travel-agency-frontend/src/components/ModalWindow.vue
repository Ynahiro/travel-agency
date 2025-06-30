<script setup>
import { ref } from 'vue'

const props = defineProps({
  valueObject: Object,
  title: String,
  responseMessage: String,
})

const emit = defineEmits(['close', 'save'])
const formData = ref({ ...props.valueObject })
const message = `${props.responseMessage}`

const inputTypes = {
  Телефон: 'tel',
  Email: 'email',
  Ссылка_на_поспорт: 'number',
  Id: 'number',
}

function saveInputData() {
  emit('save', { ...formData.value })
}

function closeModal() {
  emit('close')
}

function undoChanges() {
  for (const key in formData.value) {
    formData.value[key] = undefined
  }
}
</script>

<template>
  <div class="modal fixed flex items-center justify-center inset-0 z-20 bg-black/50">
    <div class="modal__card relative w-100 max-w-full rounded-lg bg-white shadow-md" v-if="message !== 'undefined'">
      <div class="modal__card-inner flex flex-col justify-center items-center gap-3 py-8 w-full">
        <div class="modal__header flex">
          <h2 class="modal__title font-medium">{{ message }}</h2>
          <button class="modal__close-button" @click="closeModal">
            <span></span>
          </button>
        </div>
        <button class="modal__confirm-button px-2 py-1 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black" @click="closeModal">
          Хорошо
        </button>
      </div>
    </div>
    <div class="modal__card relative w-60 max-w-full rounded-lg bg-white shadow-md" v-else>
      <div class="modal__card-inner flex flex-col justify-center items-center gap-3 py-8 w-full">
        <div class="modal__header flex">
          <h2 class="modal__title font-medium">{{ props.title }}</h2>
          <button class="modal__close-button" @click="closeModal">
            <span></span>
          </button>
        </div>
        <form class="modal__editing-form from flex flex-col px-3">
          <div
            class="form__cell flex flex-col pb-3 gap-y-1"
            v-for="(value, key) in formData"
            :key="key"
          >
            <label class="from__label" v-if="key !== 'CreatedByUser'" :for="key">
              {{ key }}
              <span class="form__lable-star" aria-hidden="true">*</span>
            </label>
            <input
              class="form__input px-3 border rounded-lg bg-gray-50"
              v-if="props.title === 'Редактирование' && key !== 'CreatedByUser'"
              :id="key"
              :type="inputTypes[key] || 'text'"
              :placeholder="value"
              v-model="formData[key]"
              required
            />
            <input
              class="form__input px-3 border rounded-lg bg-gray-50"
              v-if="props.title === 'Добавление' && key !== 'CreatedByUser'"
              :id="key"
              :type="inputTypes[key] || 'text'"
              value=""
              :placeholder="value"
              @input="formData[key] = $event.target.value"
              required
            />
          </div>

          <div class="form__buttons flex justify-center gap-x-2 pt-2">
            <button
              class="form__save-button px-2 py-1 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
              type="button"
              @click="saveInputData"
            >
              Сохранить
            </button>
            <button
              class="form__cancel-button px-2 py-1 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
              type="button"
              @click="undoChanges"
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<!-- <div
    class="modal flex item-center justify-center fixed top-0 left-0 w-full h-full z-20 bg-black/50"
  >
    <div
      class="modal__card relative w-60 max-h-[40rem] rounded-lg translate-y-[15%] bg-white overflow-y-auto"
    >
      <div class="modal__card-inner flex flex-col justify-center items-center gap-3 pt-4">
        <div class="modal__header flex pt-4">
          <h2 class="modal__title font-medium">{{ props.title }}</h2>
          <button class="modal__close-button" @click="closeModal">
            <span></span>
          </button>
        </div>
        <form class="modal__editing-form from flex flex-col px-3">
          <div
            class="form__cell flex flex-col pb-3 gap-y-1"
            v-for="(value, key) in formData"
            :key="key"
          >
            <label 
              class="from__label"
              v-if="key !== 'CreatedByUser'"
              :for="key"
            >
              {{ key }}
              <span class="form__lable-star" aria-hidden="true">*</span>
            </label>
            <input
              class="form__input px-3 border rounded-lg bg-gray-50"
              v-if="props.title === 'Редактирование' && key !== 'CreatedByUser'"
              :id="key"
              :type="inputTypes[key] || 'text'"
              :placeholder="value"
              v-model="formData[key]"
              required
            />
            <input
              class="form__input px-3 border rounded-lg bg-gray-50"
              v-if="props.title === 'Добавление' && key !== 'CreatedByUser'"
              :id="key"
              :type="inputTypes[key] || 'text'"
              value=""
              :placeholder="value"
              @input="formData[key] = $event.target.value"
              required
            />
          </div>

          <div class="form__buttons flex justify-center gap-x-2">
            <button
              class="form__save-button px-2 py-1 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
              type="button"
              @click="saveInputData"
            >
              Сохранить
            </button>
            <button
              class="form__cancel-button px-2 py-1 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black"
              type="button"
              @click="undoChanges"
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div> -->
