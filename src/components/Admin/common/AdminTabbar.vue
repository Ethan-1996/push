<template>
  <div class="tabbar adminTabbar">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo">


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
              this.formatData(data[i].children)
            }
          }  
        }
      },
  },
  data() {
    return {
      items: [
        
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