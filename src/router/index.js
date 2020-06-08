import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',       //首页 产品分析页面
      name: 'Index',
      component: () => import('../views/Index/Index.vue')
    },
    {                   //登录页面
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login/Login.vue')
    },
    {                   //找回店铺名页面
      path: '/Find',
      name: 'Find',
      component: () => import('../views/Login/Find.vue')
    },
    {                   //个人中心
      path: '/PersonCenter',
      name: 'PersonCenter',
      component: () => import('../views/PersonCenter/PersonCenter.vue')
    },

    {                   //订单列表
      path: '/MoneyList',
      name: 'MoneyList',
      component: () => import('../views/MoneyList/MoneyList.vue')
    },
    {                   //发票管理
      path: '/InvoiceList',
      name: 'InvoiceList',
      component: () => import('../views/InvoiceList/InvoiceList.vue')
    },

    {                    //注册 及 忘记密码页面
      path: '/Register',
      name: 'Register',
      component: () => import('../views/Login/Register.vue')
    },
    {                    //发布产品
      path: '/Release',
      name: 'Release',
      component: () => import('../views/Release/Release.vue')
    },
    {                    //历史记录
      path: '/History',
      name: 'History',
      component: () => import('../views/History/History.vue')
    },
    {                    //效果展示
      path: '/Show',
      name: 'Show',
      component: () => import('../views/Show/Show.vue')
    },
    {                    //管理员登陆
      path: '/AdminLogin',
      name: '/AdminLogin',
      component: () => import('../views/Admin/AdminLogin/Login.vue')
    },

    {                    //管理员
      path: '/Admin',
      name: 'Admin',
      redirect: '/Admin/AdminList',
      component: () => import('../views/Admin/Admin.vue'),
      children:[
       

        {                    //权限设置  变更权限
          path: 'SettingPowers/Change',
          name: 'SettingPowers/Change',
          // redirect:'/Admin/SettingPowers/Change',
          component: () => import('../views/Admin/Setting/SettingPowers.vue')
        },
        {                    //权限设置  新增权限
          path: 'SettingPowers/New',
          name: 'SettingPowers/New',
          // redirect:'/Admin/SettingPowers/Change',
          component: () => import('../views/Admin/Setting/NewPower.vue')
        },
        {                    //商铺设置
          path: 'SettingShops',
          name: 'SettingShops',
          component: () => import('../views/Admin/Setting/SettingShops.vue')
        },

        // 从这里开始 是 管理员设置的路由

        {                    //管理员设置 新增
          path: 'AdminAdd',
          name: 'AdminAdd',
          component: () => import('../views/Admin/AdminSetting/AdminAdd.vue')
        },
        {                    //管理员设置 列表
          path: 'AdminList',
          name: 'AdminList',
          component: () => import('../views/Admin/AdminSetting/AdminList.vue')
        },
        {                    //管理员设置  设置权限
          path: 'AdminSetRights',
          name: 'AdminSetRights',
          component: () => import('../views/Admin/AdminSetting/AdminSetRights.vue')
        },
        // 呼叫中心从这里开始
        // {                    //呼叫中心 上传电话 表格
        //   path: 'UploadPhone',
        //   name: 'UploadPhone',
        //   component: () => import('../views/Admin/Call/UploadPhone.vue')
        // },
        {                    //呼叫中心 我呼叫过的
          path: 'Called',
          name: 'Called',
          component: () => import('../views/Admin/Call/Called.vue')
        },
        {                    //呼叫中心 待处理列表
          path: 'NeedHandle',
          name: 'NeedHandle',
          component: () => import('../views/Admin/Call/NeedHandle.vue')
        },
        {                    //呼叫中心  公海
          path: 'PublicPhone',
          name: 'PublicPhone',
          component: () => import('../views/Admin/Call/PublicPhone.vue')
        },
        //商家部分从这里开始
        {                    //商铺列表
          path: 'Shops',
          name: 'Shops',
          component: () => import('../views/Admin/Shops/Shops.vue')
        },
        {                    //商品列表
          path: 'GoodList',
          name: 'GoodList',
          component: () => import('../views/Admin/Shops/GoodList.vue')
        },
        // 申诉部分 开始
        {                    //申诉列表
          path: 'Appeal',
          name: 'Appeal',
          component: () => import('../views/Admin/Appeal/Appeal.vue')
        },
        // 发票部分
        {                    //发票列表
          path: 'Invoice',
          name: 'Invoice',
          component: () => import('../views/Admin/Invoice/Invoice.vue')
        },
        // 充值部分
        {                    //充值列表
          path: 'RechargeList',
          name: 'RechargeList',
          component: () => import('../views/Admin/Recharge/RechargeList.vue')
        },
        {                    //充值概括
          path: 'RechargeAll',
          name: 'RechargeAll',
          component: () => import('../views/Admin/Recharge/RechargeAll.vue')
        },
      ]
    },
   
    


      // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
