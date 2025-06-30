<script setup>
import { auth } from '@/stores/authStore'
import { computed, ref } from 'vue'

const isAdmin = computed(() => auth.role === 'admin_user')
const isEuBooker = computed(() => auth.tole === 'european_booking_user')
const isBooker = computed(() => auth.role === 'booking_user')
const isSaler = computed(() => auth.role === 'sales_user')

const isClientSubmenuVisible = ref(false)
const isTravelPackageSubmenuVisible = ref(false)
const isSaleSubmenuVisible = ref(false)
const isEmployeeSubmenuVisible = ref(false)
const isLogoutSubmenuVisible = ref(false)

</script>

<template>
  <header class="header bg-blue-500">
    <menu class="header__menu container flex justify-between py-4 text-white">
      <ul class="header__menu-list flex items-center justify-between gap-x-3">
        <li
          v-if="isAdmin"
          class="header__menu-item relative flex flex-col items-center"
          @mouseenter="isClientSubmenuVisible = true"
          @mouseleave="isClientSubmenuVisible = false"
        >
          <RouterLink
            class="header__menu-link relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            to="/clients"
          >
            Клиенты
          </RouterLink>
          <transition
            enter-active-class="transition-opacity duration-100"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-1000"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              class="header__menu-nested fixed flex flex-col justify-center items-center w-20 mt-11 p-2 gap-y-1 z-20 text-black border border-[#273043] rounded-md bg-white"
              v-if="isClientSubmenuVisible"
            >
              <div
                class="absolute top-[-0.95rem] left-1/2 -translate-x-1/2 w-0 h-0 border-l-15 border-r-15 border-b-15 border-l-transparent border-r-transparent border-b-[#273043]"
              ></div>
              <RouterLink
                class="header__menu-link relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-[#273043] after:transition-all after:duration-300 hover:after:w-full"
                to="/passports"
              >
                Паспорт
              </RouterLink>
            </div>
          </transition>
        </li>
        <li
          v-if="isAdmin || isEuBooker || isBooker"
          class="header__menu-item relative flex flex-col items-center"
        >
          <RouterLink
            class="header__menu-link relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            to="/hotels"
          >
            Отели
          </RouterLink>
        </li>
        <li v-if="isAdmin" class="header__menu-item relative flex flex-col items-center">
          <RouterLink
            class="header__menu-link relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            to="/countries"
          >
            Страны
          </RouterLink>
        </li>
        <li
          v-if="isAdmin || isEuBooker || isBooker"
          class="header__menu-item relative flex flex-col items-center"
          @mouseenter="isTravelPackageSubmenuVisible = true"
          @mouseleave="isTravelPackageSubmenuVisible = false"
        >
          <RouterLink
            class="header__menu-link relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            to="/travel"
          >
            Путевки
          </RouterLink>
          <transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              class="header__menu-nested fixed flex flex-col justify-center items-center w-30 mt-11 p-2 gap-y-1 z-20 text-black border border-[#273043] rounded-md bg-white"
              v-if="isTravelPackageSubmenuVisible"
            >
              <div
                class="absolute top-[-0.95rem] left-1/2 -translate-x-1/2 w-0 h-0 border-l-15 border-r-15 border-b-15 border-l-transparent border-r-transparent border-b-[#273043]"
              ></div>
              <RouterLink
                class="header__menu-link relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-[#273043] after:transition-all after:duration-300 hover:after:w-full"
                to="/duration"
              >
                Длительность
              </RouterLink>
              <RouterLink
                class="header__menu-link relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-[#273043] after:transition-all after:duration-300 hover:after:w-full"
                to="/transfer"
              >
                Трансфер
              </RouterLink>
            </div>
          </transition>
        </li>
        <li
          v-if="isAdmin || isSaler"
          class="header__menu-item relative flex flex-col items-center"
          @mouseenter="isSaleSubmenuVisible = true"
          @mouseleave="isSaleSubmenuVisible = false"
        >
          <RouterLink
            class="header__menu-link relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            to="/sales"
          >
            Продажи
          </RouterLink>
          <transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              class="header__menu-nested fixed flex flex-col justify-center items-center w-37 mt-11 p-2 gap-y-1 z-20 text-black border border-[#273043] rounded-md bg-white"
              v-if="isSaleSubmenuVisible"
            >
              <div
                class="absolute top-[-0.95rem] left-1/2 -translate-x-1/2 w-0 h-0 border-l-15 border-r-15 border-b-15 border-l-transparent border-r-transparent border-b-[#273043]"
              ></div>
              <RouterLink
                class="header__menu-link relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-[#273043] after:transition-all after:duration-300 hover:after:w-full"
                to="/pdf-page"
              >
                Выдача путевки
              </RouterLink>
              <RouterLink
                class="header__menu-link relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-[#273043] after:transition-all after:duration-300 hover:after:w-full"
                to="/monthly"
              >
                Месячный отчет
              </RouterLink>
            </div>
          </transition>
        </li>
        <li
          v-if="isAdmin"
          class="header__menu-item relative flex flex-col items-center"
          @mouseenter="isEmployeeSubmenuVisible = true"
          @mouseleave="isEmployeeSubmenuVisible = false"
        >
          <RouterLink
            class="header__menu-link relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            to="/employees"
          >
            Сотрудники
          </RouterLink>
          <transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              class="header__menu-nested fixed flex flex-col justify-center items-center w-25 mt-11 p-2 gap-y-1 z-20 text-black border border-[#273043] rounded-md bg-white"
              v-if="isEmployeeSubmenuVisible"
            >
              <div
                class="absolute top-[-0.95rem] left-1/2 -translate-x-1/2 w-0 h-0 border-l-15 border-r-15 border-b-15 border-l-transparent border-r-transparent border-b-[#273043]"
              ></div>
              <RouterLink
                class="header__menu-link relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-[#273043] after:transition-all after:duration-300 hover:after:w-full"
                to="/posts"
              >
                Должность
              </RouterLink>
            </div>
          </transition>
        </li>
      </ul>
      <!-- <button class="header__menu-button px-3 py-2 rounded-md bg-[#273043] hover:bg-white hover:text-black">
        Войти
      </button> -->
      <div
        class="header__menu-user-info relative flex flex-col items-center"
        @mouseenter="isLogoutSubmenuVisible = true"
        @mouseleave="isLogoutSubmenuVisible = false"
      >
        <p class="mb-0">{{ auth.role }}</p>
        <transition
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="header__menu-nested fixed flex flex-col justify-center items-center w-25 mt-11 p-2 gap-y-1 z-20 text-black border border-[#273043] rounded-md bg-white"
            v-if="isLogoutSubmenuVisible"
          >
            <div
              class="absolute top-[-0.95rem] left-1/2 -translate-x-1/2 w-0 h-0 border-l-15 border-r-15 border-b-15 border-l-transparent border-r-transparent border-b-[#273043]"
            ></div>
            <RouterLink
              class="relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[0.125rem] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              @click="auth.logout()"
              to="/"
            >
              Выйти
            </RouterLink>
          </div>
        </transition>
      </div>
    </menu>
  </header>
</template>
