<script setup>
import axios from 'axios'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { ref } from 'vue'

const reportData = ref(null)
const month = ref('')
const year = ref('')
const isLoading = ref(false)

async function generateReport() {
  try {
    isLoading.value = true;
    const { data } = await axios.get(`http://localhost:3000/api/reports/monthly`, {
      params: {
        month: month.value,
        year: year.value
      },
      paramsSerializer: params => {
        return new URLSearchParams(params).toString();
      }
    });

    reportData.value = data
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
    alert('Произошла ошибка при формировании отчета')
  } finally {
    isLoading.value = false
  }
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}

function formatMoney(amount) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(amount)
}

function generatePDF() {
  if (!reportData.value) return

  const doc = new jsPDF()

  doc.addFont('https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf', 'Roboto', 'normal')
  doc.setFont('Roboto')

  doc.setFontSize(18)
  doc.text(`Ежемесячный отчет за ${month.value}.${year.value}`, 105, 15, { align: 'center' })

  doc.setFontSize(12)
  doc.setFont('Roboto')
  doc.text(`Всего продано путевок: ${reportData.value.totalSold}`, 15, 25)
  doc.text(`Общая выручка: ${formatMoney(reportData.value.totalRevenue)}`, 15, 32)

  // Таблица проданных путевок
  doc.setFont('Roboto')
  doc.text('Список проданных путевок:', 15, 42)

  const soldToursData = reportData.value.soldTours.map((tour) => [
    tour.Id,
    tour.Title,
    formatDate(tour.SaleDate),
    tour.ClientName,
    formatMoney(tour.Price),
  ])
  
  autoTable(doc, {
  startY: 45,
  head: [['№', 'Название', 'Дата продажи', 'Клиент', 'Стоимость']],
  body: soldToursData,
  margin: { left: 15 },
  styles: { font: 'Roboto', fontSize: 10 },
  headStyles: { font: 'Roboto', fontStyle: 'normal' } 
})

  const soldFinalY = doc.lastAutoTable?.finalY || 60

  // Популярные путевки
  doc.setFont('Roboto')
  doc.text('Наиболее популярные путевки:', 15, soldFinalY + 15)

  const popularToursData = reportData.value.popularTours.map((tour) => [
    tour.Title,
    tour.SoldCount,
    formatMoney(tour.TotalRevenue),
  ])

  autoTable(doc, {
    startY: soldFinalY + 20,
    head: [['Название', 'Кол-во продаж', 'Общая выручка']],
    body: popularToursData,
    margin: { left: 15 },
    styles: { font: 'Roboto', fontSize: 10 },
    headStyles: { font: 'Roboto', fontStyle: 'normal' } 
  })

  const popularFinalY = doc.lastAutoTable?.finalY || (soldFinalY + 40)

  // Невостребованные путевки
  doc.setFont('Roboto')
  doc.text('Невостребованные путевки:', 15, popularFinalY + 15)

  const unsoldToursData = reportData.value.unsoldTours.map((tour) => [
    tour.Title,
    formatMoney(tour.Price),
    tour.Days,
  ])

  autoTable(doc, {
    startY: popularFinalY + 20,
    head: [['Название', 'Стоимость', 'Дней']],
    body: unsoldToursData,
    margin: { left: 15 },
    styles: { font: 'Roboto', fontSize: 10 },
    headStyles: { font: 'Roboto', fontStyle: 'normal' } 
  })

  const unsoldFinalY = doc.lastAutoTable?.finalY || (popularFinalY + 40)

  // Подпись
  doc.setFont('Roboto')
  doc.text(
    `Отчет сформирован: ${new Date().toLocaleDateString('ru-RU')}`,
    15,
    unsoldFinalY + 20,
  )

  doc.save(`Отчет_${month.value}_${year.value}.pdf`)
}
</script>

<template>
  <div class="report__main container grid gap-y-4">
    <div class="report__header flex justify-between items-center pt-4">
      <h1 class="report__title text-4xl">Ежемесячный отчет</h1>
    </div>

    <div class="report__form bg-white p-6 rounded-lg shadow-md">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label for="month" class="block mb-2 text-sm font-medium">Месяц</label>
          <select id="month" v-model="month" class="w-full p-2 border rounded-lg">
            <option value="">Выберите месяц</option>
            <option value="01">Январь</option>
            <option value="02">Февраль</option>
            <option value="03">Март</option>
            <option value="04">Апрель</option>
            <option value="05">Май</option>
            <option value="06">Июнь</option>
            <option value="07">Июль</option>
            <option value="08">Август</option>
            <option value="09">Сентябрь</option>
            <option value="10">Октябрь</option>
            <option value="11">Ноябрь</option>
            <option value="12">Декабрь</option>
          </select>
        </div>

        <div>
          <label for="year" class="block mb-2 text-sm font-medium">Год</label>
          <input
            id="year"
            v-model="year"
            type="number"
            min="2020"
            max="2030"
            class="w-full p-2 border rounded-lg"
            placeholder="Год"
          />
        </div>
      </div>

      <button
        @click="generateReport"
        :disabled="!month || !year || isLoading"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {{ isLoading ? 'Формирование...' : 'Сформировать отчет' }}
      </button>
    </div>

    <div v-if="isLoading" class="p-4 bg-gray-100 rounded-lg text-center">
      <p>Загрузка данных...</p>
    </div>

    <div v-if="reportData" class="report__results bg-white p-6 rounded-lg shadow-md">
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="p-4 bg-blue-50 rounded-lg">
          <h3 class="font-bold mb-2">Всего продаж</h3>
          <p class="text-2xl">{{ reportData.totalSold }}</p>
        </div>
        <div class="p-4 bg-green-50 rounded-lg">
          <h3 class="font-bold mb-2">Общая выручка</h3>
          <p class="text-2xl">{{ formatMoney(reportData.totalRevenue) }}</p>
        </div>
        <div class="p-4 bg-yellow-50 rounded-lg">
          <h3 class="font-bold mb-2">Невостребованные</h3>
          <p class="text-2xl">{{ reportData.unsoldTours.length }}</p>
        </div>
      </div>

      <h2 class="text-xl font-bold mb-4">Популярные путевки</h2>
      <table class="w-full border-collapse mb-6">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border text-left">Название</th>
            <th class="p-2 border text-left">Кол-во продаж</th>
            <th class="p-2 border text-left">Выручка</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tour, index) in reportData.popularTours" :key="index">
            <td class="p-2 border">{{ tour.Title }}</td>
            <td class="p-2 border">{{ tour.SoldCount }}</td>
            <td class="p-2 border">{{ formatMoney(tour.TotalRevenue) }}</td>
          </tr>
        </tbody>
      </table>

      <button
        @click="generatePDF"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Скачать PDF
      </button>
    </div>
  </div>
</template>
