import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductsCreateView from '../views/ProductsCreateView.vue'
import ProductsEditView from '../views/ProductsEditView.vue'
import ProductsDetailsView from '../views/ProductsDetailsView.vue'
import store from '../store'
import { alreadyLogin,needAuth } from './functions'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    beforeEnter: [alreadyLogin]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: [alreadyLogin]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    // beforeEnter: [needAuth]
    // Same with needAuth
    beforeEnter: (to, from, next) => {
      // console.log("hello")
      if (store.state.auth === null) {
        return next('/login')
      }
      return next()
    },
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView,
    beforeEnter: [needAuth]
  },
  {
    path: '/products/create',
    name: 'products.create',
    component: ProductsCreateView,
    beforeEnter: [needAuth]
  },
  {
    path: '/products/edit/:id',
    name: 'products.edit',
    component: ProductsEditView,
    beforeEnter: [needAuth]
  },
  {
    path: '/products/details/:id',
    name: 'products.details',
    component: ProductsDetailsView,
    beforeEnter: [needAuth]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
})

export default router
