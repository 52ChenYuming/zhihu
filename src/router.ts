import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import PostDetail from './views/PostDetail.vue'
import store from './store'
import axios from 'axios'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAleadyLogin: true }
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requireLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostDetail
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to.meta)
  // if (to.meta.requireLogin && !store.state.user.isLogin) {
  //   next({ name: 'login' })
  // } else if (to.meta.redirectAleadyLogin && store.state.user.isLogin) {
  //   next('/')
  // } else {
  //   next()
  // }
  const { user, token } = store.state
  const { requireLogin, redirectAleadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAleadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.log(e)
        localStorage.removeItem('token')
        next('login')
      })
    } else {
      if (requireLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAleadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
