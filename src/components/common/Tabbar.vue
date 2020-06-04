<template>
  <div class="tabbar">
      <el-row class="tac">
        <el-col :span="24">
            <el-menu
                router
                :default-active="$route.path"
                class="el-menu-vertical-demo"
            >
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-s-operation"></i>
                        <span>商品信息</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/">
                            <i class="el-icon-view"></i>
                            产品分析
                        </el-menu-item>
                        <!-- <el-menu-item index="/Release">
                            <i class="el-icon-upload"></i>
                            发布产品
                        </el-menu-item> -->
                        <el-menu-item index="/History">
                            <i class="el-icon-map-location"></i>
                            历史记录
                        </el-menu-item>
                        <el-menu-item index="/Show">
                            <i class="el-icon-set-up"></i>
                            效果展示
                        </el-menu-item>
                        <el-menu-item index="/PersonCenter">
                            <i class="el-icon-set-up"></i>
                            个人中心
                        </el-menu-item>
                        <el-menu-item index="/MoneyList">
                            <i class="el-icon-set-up"></i>
                            充值记录
                        </el-menu-item>
                        <el-menu-item index="/InvoiceList">
                            <i class="el-icon-set-up"></i>
                            发票管理
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!-- <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>系统设置</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/SettingPowers">
                            <i class="el-icon-lock"></i>
                            权限设置
                        </el-menu-item>
                        <el-menu-item index="/SettingShops">
                            <i class="el-icon-lock"></i>
                            商家设置
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu> -->
            </el-menu>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    name:"Tabbar",
}
</script>

<style lang="scss" scoped>
    .tabbar{
        width: 180px;
        background: #fff;
        border-radius: 10px 0 0 10px;
        overflow: hidden;
        margin-right: 20px;
    }
</style>