import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',       //首页 
      name: 'WebIndex',
      component: () => import('../views/WebIndex/WebIndex.vue'),
      
    },
    {
      path: '/Home',       //功能首页 
      name: 'Home',
      component: () => import('../views/Home/Home.vue'),
      
    },
    {
      path: '/Index',       // 产品分析页面
      name: 'Index',
      component: () => import('../views/Index/Index.vue'),
      meta:{
        keepAlive:true
      }
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
    {                    //我的关注
      path: '/Attention',
      name: 'Attention',
      component: () => import('../views/Attention/Attention.vue')
    },
    {                    //我的关注
      path: '/DownLoadCrx',
      name: 'DownLoadCrx',
      component: () => import('../views/DownLoadCrx/DownLoadCrx.vue')
    },
    // {                    //充值中心
    //   path: '/Recharge',
    //   name: 'Recharge',
    //   component: () => import('../views/Recharge/Recharge.vue')
    // },

    {                    //管理员登陆
      path: '/AdminLogin',
      name: '/AdminLogin',
      component: () => import('../views/Admin/AdminLogin/Login.vue')
    },

    {                    //管理员
      path: '/Admin',
      name: 'Admin',
      // redirect: '/Admin/AdminList',
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
        {                    //管理员设置  业绩 总览  商家注册概况
          path: 'PerformanceOverview/ShopRegister',
          name: 'PerformanceOverview/ShopRegister',
          component: () => import('../views/Admin/AdminSetting/PerformanceOverview/ShopRegister.vue')
        },
        {                    //管理员设置  业绩 总览  商家所属概况
          path: 'PerformanceOverview/ShopBelong',
          name: 'PerformanceOverview/ShopBelong',
          component: () => import('../views/Admin/AdminSetting/PerformanceOverview/ShopBelong.vue')
        },

        {                    //管理员设置  业绩 总览  招商业绩
          path: 'PerformanceOverview/Investment',
          name: 'PerformanceOverview/Investment',
          component: () => import('../views/Admin/AdminSetting/PerformanceOverview/Investment.vue')
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
        {                    //商铺  效果展示
          path: 'Effect',
          name: 'Effect',
          component: () => import('../views/Admin/Shops/Effect.vue')
        },
        {                    //全部商品列表
          path: 'AllGoodList',
          name: 'AllGoodList',
          component: () => import('../views/Admin/Goods/AllGoodList.vue')
        },
        {                    //待审核商品列表
          path: 'GoodListToAudit',
          name: 'GoodListToAudit',
          component: () => import('../views/Admin/Goods/GoodListToAudit.vue')
        },
        {                    //审核成功商品列表
          path: 'GoodListSuccess',
          name: 'GoodListSuccess',
          component: () => import('../views/Admin/Goods/GoodListSuccess.vue')
        },
        {                    //审核失败商品列表
          path: 'GoodListFailed',
          name: 'GoodListFailed',
          component: () => import('../views/Admin/Goods/GoodListFailed.vue')
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
        // 我的部分
        {                    //我的信息
          path: 'Mine',
          name: 'Mine',
          component: () => import('../views/Admin/Mine/Mine.vue')
        },
        {                    //我的客户
          path: 'Client',
          name: 'Client',
          component: () => import('../views/Admin/Mine/Client.vue')
        },
        {                    //客户归属
          path: 'ClientBelong',
          name: 'ClientBelong',
          component: () => import('../views/Admin/Mine/ClientBelong.vue')
        },
        {                    //业绩
          path: 'Achievement',
          name: 'Achievement',
          component: () => import('../views/Admin/Mine/Achievement.vue')
        },

        // 平台部分
        {                    //平台管理
          path: 'Platform',
          name: 'Platform',
          component: () => import('../views/Admin/Platform/Platform.vue')
        },

        // 类目部分
        {                    //商品别名管理
          path: 'CatLeafName',
          name: 'CatLeafName',
          component: () => import('../views/Admin/CatLeafName/CatLeafName.vue')
        },
        {                    //转化率管理
          path: 'CatNameRatio',
          name: 'CatNameRatio',
          component: () => import('../views/Admin/CatNameRatio/CatNameRatio.vue')
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
