import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import reg from '@/components/reg'
import pay from '@/components/pay'
import pay1 from '@/components/pay1'
import forget from '@/components/forget'
import category from '@/components/category'
import categoryHairEdit from '@/components/categoryHairEdit'
import categoryAddHair from '@/components/categoryAddHair'
import categoryUserEdit from '@/components/categoryUserEdit'
import categoryUser from '@/components/categoryUser'
import trans from '@/components/trans'
import transBusiness from '@/components/transBusiness'
import userCenter from '@/components/userCenter'
import userEdit from '@/components/userEdit'
import order from '@/components/order'
import orderBusiness from '@/components/orderBusiness'
import hairDetail from '@/components/hairDetail'
import hairCenter from '@/components/hairCenter'
import hairEdit from '@/components/hairEdit'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay
    },
    {
      path: '/pay1',
      name: 'pay1',
      component: pay1
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path: '/categoryHairEdit',
      name: 'categoryHairEdit',
      component: categoryHairEdit
    },
    {
      path: '/categoryUserEdit',
      name: 'categoryUserEdit',
      component: categoryUserEdit
    },
    {
      path: '/categoryAddHair',
      name: 'categoryAddHair',
      component: categoryAddHair
    },
    {
      path: '/categoryUser',
      name: 'categoryUser',
      component: categoryUser
    },
    {
      path: '/trans',
      name: 'trans',
      component: trans
    },
    {
      path: '/transBusiness',
      name: 'transBusiness',
      component: transBusiness
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter
    },
    {
      path: '/userEdit',
      name: 'userEdit',
      component: userEdit
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/orderBusiness',
      name: 'orderBusiness',
      component: orderBusiness
    },
    {
      path: '/hairDetail',
      name: 'hairDetail',
      component: hairDetail
    },
    {
      path: '/hairCenter',
      name: 'hairCenter',
      component: hairCenter
    }, {
      path: '/hairEdit',
      name: 'hairEdit',
      component: hairEdit
    }
  ]
})
