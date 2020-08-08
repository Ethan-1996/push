<template>
  <div class="tabbar adminTabbar">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo">
          <!-- <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>系统设置</span>
                    </template>
                    <el-menu-item-group>
                        
                        <span slot="title">权限设置</span>
                        <el-menu-item index="/Admin/SettingPowers/Change">
                            权限变更
                        </el-menu-item>
                        <el-menu-item index="/Admin/SettingPowers/New">
                            新增权限
                        </el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <el-menu-item index="/Admin/SettingShops">
                            商家设置
                        </el-menu-item>
                    </el-menu-item-group>
          </el-submenu>-->

          <!-- <template v-for="one in items">
            <template v-if="one.subs">
              <el-submenu :index="one.index" :key="one.index">
                <template slot="title">
                  <i :class="one.icon"></i>
                  <span>{{one.title}}</span>
                </template>
                <template v-for="two in one.subs">
                  <template v-if="two.children">
                    <el-submenu :key="two.index" :index="two.index">
                      <template slot="title">
                        <span>{{two.title}}</span>
                      </template>
                      <template v-for="children in two.children">
                        <el-menu-item
                          :key="children.index"
                          :index="children.index"
                        >{{children.title}}</el-menu-item>
                      </template>
                    </el-submenu>
                  </template>
                  <template v-else>
                    <el-menu-item-group :key="two.index">
                      <el-menu-item :index="two.index">{{two.title}}</el-menu-item>
                    </el-menu-item-group>
                  </template>
                </template>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="one.index" :key="one.index">
                <template>
                  <i :class="one.icon"></i>
                  <span>{{one.title}}</span>
                </template>
              </el-menu-item>
            </template>
          </template> -->


          <template v-for="one in items">
            <template v-if="one.children.length != 0">
              <el-submenu :index="one.view_url" :key="one.id">
                <template slot="title">
                  <i :class="one.icon"></i>
                  <span>{{one.describe}}</span>
                </template>
                <template v-for="two in one.children">
                  <template v-if="two.children.length != 0">
                    <el-submenu :key="two.id" :index="two.view_url">
                      <template slot="title">
                        <span>{{two.describe}}</span>
                      </template>
                      <template v-for="children in two.children">
                        <el-menu-item
                          :key="children.id"
                          :index="children.view_url"
                          
                        >{{children.describe}}</el-menu-item>
                      </template>
                    </el-submenu>
                  </template>
                  <template v-else>
                    <el-menu-item-group :key="two.id">
                      <el-menu-item :index="two.view_url">{{two.describe}}</el-menu-item>
                    </el-menu-item-group>
                  </template>
                </template>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="one.view_url" :key="one.id">
                <template>
                  <i :class="one.icon"></i>
                  <span>{{one.describe}}</span>
                </template>
              </el-menu-item>
            </template>
          </template>


        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  created(){
    if (localStorage.getItem('role_list')) {
      this.items = JSON.parse(localStorage.getItem('role_list'))
      this.formatData(this.items)
      console.log(this.items,123456789);
    }else if(sessionStorage.getItem('role_list')){
      this.items = JSON.parse(sessionStorage.getItem('role_list'))
      this.formatData(this.items)
    }
    
  },
  methods:{
    formatData(data){
        for (let i = 0; i < data.length; i++) {
          if (data[i].is_menu == 2) {
            data.splice(i,1)
            this.formatData(data)
            return false
          }else{
            if (data[i].children && data[i].children.length != 0) {
              // console.log(data[i].childre,"children")
              this.formatData(data[i].children)
            }
          }  
        }
      },
  },
  data() {
    return {
      items: [
        {
          icon: "el-icon-cpu",
          index: "/Admin/AdminList",
          title: "管理员设置",
          subs: [
            {
              index: "/Admin/AdminList",
              title: "管理员列表",
            },
            {
              index: "/Admin/PerformanceOverview",
              title: "业绩总览",
              children: [
                {
                  index: "/Admin/PerformanceOverview/ShopRegister",
                  title: "商家注册概况",
                },
                {
                  index: "/Admin/PerformanceOverview/ShopBelong",
                  title: "商家所属概况",
                },
                {
                  index: "/Admin/PerformanceOverview/Investment",
                  title: "招商业绩",
                },
              ],
            },
            {
              index: "/Admin/AdminSetRights",
              title: "权限设置",
            },
            {
              index: "/Admin/AdminAdd",
              title: "新增管理员",
            },
          ],
        },
        {
          icon: "el-icon-mobile-phone",
          index: "/Admin/PublicPhone",
          title: "呼叫中心",
          subs: [
            {
              index: "/Admin/PublicPhone",
              title: "电话公海",
            },
            {
              index: "/Admin/NeedHandle",
              title: "待处理电话",
            },
            {
              index: "/Admin/Called",
              title: "打过的电话",
            },
          ],
        },
        {
          icon: "el-icon-rank",
          index: "2",
          title: "系统设置",
          subs: [
            {
              index: "data1",
              title: "权限设置",
              children: [
                {
                  index: "/Admin/SettingPowers/New",
                  title: "新增权限",
                },
                {
                  index: "/Admin/SettingPowers/Change",
                  title: "权限设置",
                },
              ],
            },
            {
              index: "/Admin/SettingShops",
              title: "商家设置",
            },
          ],
        },
        {
          icon: "el-icon-data-board",
          index: "/Admin/Shops",
          title: "商家",
          subs: [
            {
              index: "/Admin/Shops",
              title: "商家列表",
            },
            // {
            //   index: "/Admin/GoodList",
            //   title: "商品列表",
            // },
            {
              index: "/Admin/Effect",
              title: "商家效果展示",
            },
          ],
        },
        {
          icon: "el-icon-news",
          index: "/Admin/AllGoodList",
          title: "商品",
          subs: [
            {
              index: "/Admin/AllGoodList",
              title: "全部商品",
            },
            {
              index: "/Admin/GoodListToAudit",
              title: "待审核",
            },
            {
              index: "/Admin/GoodListSuccess",
              title: "审核成功",
            },
            {
              index: "/Admin/GoodListFailed",
              title: "审核失败",
            },
          ],
        },
        {
          icon: "el-icon-news",
          index: "/Admin/Appeal",
          title: "申诉",
          subs: [
            {
              index: "/Admin/Appeal",
              title: "申诉列表",
            },
          ],
        },
        {
          icon: "el-icon-tickets",
          index: "/Admin/Invoice",
          title: "发票管理",
          subs: [
            {
              index: "/Admin/Invoice",
              title: "发票列表",
            },
          ],
        },
        {
          icon: "el-icon-wallet",
          index: "/Admin/RechargeList",
          title: "充值管理",
          subs: [
            {
              index: "/Admin/RechargeList",
              title: "充值列表",
            },
            {
              index: "/Admin/RechargeAll",
              title: "充值概括",
            },
          ],
        },
        {
          icon: "el-icon-user",
          index: "/Admin/Mine",
          title: "我的",
          subs: [
            {
              index: "/Admin/Mine",
              title: "我的信息",
            },
            {
              index: "/Admin/Client",
              title: "我的客户",
            },
            {
              index: "/Admin/ClientBelong",
              title: "客户归属",
            },
            {
              index: "/Admin/Achievement",
              title: "业绩",
            },
          ],
        },
        {
          icon: "el-icon-user",
          index: "/Admin/Platform",
          title: "平台管理",
        },
        {
          icon: "el-icon-user",
          index: "/Admin/CatLeafName",
          title: "商品类目",
          subs: [
            {
              index: "/Admin/CatLeafName",
              title: "类目别名",
            },
            {
              index: "/Admin/CatNameRatio",
              title: "类目转化率",
            },
            
          ],
        },
        // {
        //   icon: "el-icon-date",
        //   index: "3",
        //   title: "组件间传值",
        //   subs: [
        //     {
        //       index: "zujian1",
        //       title: "方法一"
        //     },
        //     {
        //       index: "zujian2",
        //       title: "方法二"
        //     },
        //     {
        //       index: "zujian3",
        //       title: "方法三"
        //     }
        //   ]
        // }
      ],
    };
  },
};
</script>
<style lang="scss">
.tac{
    position: sticky;
    top: 10px;
}
.el-menu{
    overflow: hidden;
}
</style>
<style lang="scss" scoped>
.tabbar {
  width: 180px;
  background: #fff;
  border-radius: 10px 0 0 10px;
  // overflow: hidden;
  margin-right: 20px;
  padding-bottom: 10px;
  min-height: 700px;
  padding-top: 10px;
}
</style>