<script setup>
import axios from 'axios'
import jsPDF from 'jspdf'
import { ref } from 'vue'

const voucherData = ref(null)
const voucherId = ref('')

async function startSearch() {
  const { data } = await axios.get(`http://localhost:3000/api/sale/${voucherId.value}`)
  const values = formatSale(data[0])

  console.log(values)

  voucherData.value = {
    tourTitle: values.tourTitle,
    totalCost: values.totalCost,
    saleDate: values.saleDate,
    deparutreDate: values.departureTime,
    transferType: values.transferType,
    returnDate: values.returnDate,
    sellerFullName: values.sellerFullName,
    clientFullName: values.clientFullName,
  }
}

function formatSale(sale) {
  const formatted = { ...sale }

  for (const key in formatted) {
    const value = String(formatted[key])
    if (value.includes('T00:00:00.000Z')) {
      formatted[key] = value.split('T')[0]
    }
  }

  return formatted
}

function numberToWords(num) {
  const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять']
  const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать']
  const tens = ['', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто']
  const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот']

  let result = []
  console.log(result)

  if (num >= 1000) {
    let thousands = Math.floor(num / 1000)
    if (thousands > 10) {
      const ten = Math.floor(thousands / 10)
      result.push(tens[ten])
      thousands = thousands - ten * 10
    }
    result.push(`${units[thousands]} тысяч`)
    num = num % 1000
  }

  if (num >= 100) {
    const hundred = Math.floor(num / 100)
    result.push(hundreds[hundred])
    num = num % 100
  }
  
  if (num >= 20) {
    const ten = Math.floor(num / 10)
    result.push(tens[ten])
    num = num % 10
  } else if (num >= 10) {
    result.push(teens[num - 10])
    num = 0
  }
  
  if (num > 0) {
    result.push(units[num])
  }

  result.push('рублей')

  return result.join(' ')
}

function generateVoucherPDF() {
  if (!voucherData.value) return

  const doc = new jsPDF()

  doc.addFont('https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf', 'Roboto', 'normal')
  doc.setFont('Roboto')

  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text(`ТУРЕСТИЧЕСКАЯ ПУТЕВКА № ${voucherId.value}`, 105, 15, { align: 'center' })
  doc.text('Серия ТП', 105, 22, { align: 'center' })

  doc.setFontSize(12)
  doc.text('Заказчик туреститческого продукта', 15, 35)
  doc.text(`ФИО, данные паспорта: ${voucherData.value.clientFullName}`, 15, 42)
  
  doc.text('Вид туристического продукта (путешествие):', 15, 55)
  doc.text(voucherData.value.tourTitle, 15, 62)

  //Таблица
  doc.rect(15, 70, 180, 30)

  doc.text('Дата отправления', 20, 78)
  doc.text('Дата возвращения', 75, 78)
  doc.text('Трансфер', 125, 78)

  doc.line(15, 80, 195, 80) // Верхняя линия
  doc.line(15, 90, 195, 90) // Средняя линия

  // Вертикальные линии
  doc.line(70, 70, 70, 100)
  doc.line(120, 70, 120, 100)

  doc.text(voucherData.value.deparutreDate, 20, 88)
  doc.text(voucherData.value.returnDate, 75, 88)
  doc.text(voucherData.value.transferType, 125, 88)

  doc.text('Общая цена турестического продукта:', 15, 110)
  doc.text(`${numberToWords(voucherData.value.totalCost)} (${voucherData.value.totalCost} руб.)`, 15, 117)

  doc.text('Оплачено: наличными денежными средствами', 15, 127)

  doc.text('Получено лицом, ответственным за совершени операции:', 15, 140)
  doc.text(voucherData.value.sellerFullName, 15, 147)

  doc.line(15, 160, 60, 160)
  doc.text('(подпись)', 27, 165)

  doc.text(`Дата: ${voucherData.value.saleDate}`, 120, 160)

  doc.text('Настоящий документ является неотъемлемой частью договора', 15, 180)
  doc.text('о реализации туристского продукта от 15.05.2024 г. № 123-456', 15, 187)

  doc.save(`Путевка_${voucherData.value.saleDate}.pdf`)
}
</script>

<template>
  <div class="voucher__main container grid gap-y-4">
    <div class="voucher__body flex justify-between items-center pt-4">
      <h1 class="voucher__title text-4xl">Генерация PDF путевки</h1>
    </div>
    <form class="voucher__select-form flex items-center gap-x-1 mt-4">
      <label class="visually-hidden" for="search-string">Поисковая строка</label>
        <input 
          class="voucher__search-string relative w-70 h-10 px-3 border rounded-lg bg-gray-50"
          id="search-string"
          v-model="voucherId"
          @keyup.enter="startSearch"
          placeholder="Введите номер продажи:"
          type="number"
        >
        <button class="clients__search-button relative w-[5.9375rem] h-10 px-3 py-2 text-white border rounded-md bg-[#273043] hover:bg-white hover:text-black" @click.prevent="startSearch">Найти</button>
    </form>    
    <table v-if="voucherData" class="voucher__details=table table table-auto w-full border-collapse border mt-4">
      <thead>
        <tr>
          <th class="table__head-item table__head-item--small border">Название путевки</th>
          <th class="table__head-item border">Стоимость путевки</th>
          <th class="table__head-item border">Дата продажи</th>
          <th class="table__head-item border">Время отправления</th>
          <th class="table__head-item border">Трансфер</th>
          <th class="table__head-item border">Дата возвращения</th>
          <th class="table__head-item border">Сотрудник</th>
          <th class="table__head-item border">Клиент</th>
          <th class="table__head-item border">Сохранить</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center">
          <td class="table__body-item border">{{ voucherData.tourTitle }}</td>
          <td class="table__body-item border">{{ voucherData.totalCost }} ₽</td>
          <td class="table__body-item border">{{ voucherData.saleDate }}</td>
          <td class="table__body-item border">{{ voucherData.deparutreDate }}</td>
          <td class="table__body-item border">{{ voucherData.transferType }}</td>
          <td class="table__body-item border">{{ voucherData.returnDate }}</td>
          <td class="table__body-item border">{{ voucherData.sellerFullName }}</td>
          <td class="table__body-item border">{{ voucherData.clientFullName }}</td>
          <td class="table__body-item border flex justify-center gap-2">
            <button class="voucher__download-button hover:underline" @click="generateVoucherPDF">
              Скачать PDF
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
