import { createRouter, createWebHistory } from 'vue-router'

import LoginForm from '@/components/LoginForm.vue'
import ClientsView from '@/components/ClientsView.vue'
import CountriesView from '@/components/CountriesView.vue'
import DurationView from '@/components/DurationView.vue'
import EmployeesView from '@/components/EmployeesView.vue'
import HotelsView from '@/components/HotelsView.vue'
import PassportsView from '@/components/PassportsView.vue'
import PostsView from '@/components/PostsView.vue'
import SalesView from '@/components/SalesView.vue'
import TransferView from '@/components/TransferView.vue'
import TravelPackageView from '@/components/TravelPackageView.vue'
import GeneratedPDF from '@/components/GeneratedPDF.vue'
import GeneratedReport from '@/components/GeneratedReport.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginForm },
  { path: '/clients', name: 'Clients', component: ClientsView },
  { path: '/countries', name: 'Countries', component: CountriesView },
  { path: '/duration', name: 'Duration', component: DurationView },
  { path: '/employees', name: 'Employees', component: EmployeesView },
  { path: '/hotels', name: 'Hotels', component: HotelsView },
  { path: '/passports', name: 'Passports', component: PassportsView },
  { path: '/posts', name: 'Posts', component: PostsView },
  { path: '/sales', name: 'Sales', component: SalesView },
  { path: '/transfer', name: 'Transfer', component: TransferView },
  { path: '/travel', name: 'TravelPackage', component: TravelPackageView },
  { path: '/pdf-page', name: 'Issuanse', component: GeneratedPDF},
  { path: '/monthly', name: 'MonthlyReport', component: GeneratedReport}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
