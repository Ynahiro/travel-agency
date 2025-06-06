<script>
  

  export default {
    name: 'NavBar',
  }
</script>

<template>
  <header class="header bg-blue-500">
    <menu class="header__menu container flex justify-between py-4 text-white">
      <ul class="header__menu-list flex items-center justify-between gap-x-3">
        <li class="header__menu-item">
          <RouterLink class="header__menu-link" to="/clients">Клиенты</RouterLink>
        </li>
        <li class="header__menu-item">
          <RouterLink class="header__menu-link" to="/">Отели</RouterLink>
        </li>
        <li class="header__menu-item">
          <RouterLink class="header__menu-link" to="/">Страны</RouterLink>
        </li>
        <li class="header__menu-item">
          <RouterLink class="header__menu-link" to="/">Путевки</RouterLink>
        </li>
        <li class="header__menu-item">
          <RouterLink class="header__menu-link" to="/">Продажи</RouterLink>
        </li>
        <li class="header__menu-item">
          <RouterLink class="header__menu-link" to="/">Сотрудники</RouterLink>
        </li>
      </ul>
      <button class="header__menu-button px-3 py-2 rounded-md">Войти</button>
    </menu>
  </header>
</template>