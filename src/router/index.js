import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/labdescription',
    name: 'LabDescription',
    component: () => import('../views/LabDescription.vue')
  },
  {
    path: '/applications',
    name: 'Applications',
    component: () => import('../views/Applications.vue')
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import('../views/Store.vue')
  },
  {
    path: '/activities',
    name: 'Activities',
    component: () => import('../views/Activities.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/partners',
    name: 'Partners',
    component: () => import('../views/Partners.vue')
  },
  {
    path: '/imprint',
    name: 'Imprint',
    component: () => import('../views/Imprint.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
