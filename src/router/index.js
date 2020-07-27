import Vue from 'vue'
import Router from 'vue-router'
import Msite from '@/pages/Msite/Msite.vue'
import Order from '@/pages/Order/Order.vue'
import Search from '@/pages/Search/Search.vue'
import Profile from '@/pages/Profile/Profile.vue'
import login from "@/pages/login/login.vue"
import menu from "@/pages/menu/menu.vue"
import business from "@/pages/business/business.vue"
import comment from "@/pages/comment/comment.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/msite',
      component: Msite
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path:"/login",
      component: login
    },
    {
      path:"/shop/goods",
      component: menu
    },
    {
      path:"/shop/comment",
      component: comment
    },
    {
      path:"/shop/business",
      component: business
    },
    {
      path: '/',
      redirect: "/msite"
    }
  ],
  linkActiveClass:'myactive',
})
