import { createRouter, createWebHistory } from 'vue-router'
import AddressForm from '../views/AddressForm.vue'
import AddressList from '../views/AddressList.vue'

const routes = [
    {
        path: '/',
        name: 'AddressForm',
        component: AddressForm
    },
    {
        path: '/addresses',
        name: 'AddressList',
        component: AddressList
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
