<template>
  <div class="tabbar fontTab">
      <el-row class="tac">
        <el-col :span="24">
            <el-menu
                router
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                active-text-color="#fff"
            >
                <!-- <el-submenu index="1"> -->
                    <!-- <template slot="title">
                        <img src="../../assets/images/goodsInfoIcon.png" class="icon" alt="">
                        <span>商品信息</span>
                    </template> -->
                    <el-menu-item-group>
                        <el-menu-item index="/Home">
                            <img src="../../assets/images/homeicon.png" alt="" class="icon">
                            首页
                        </el-menu-item>
                        <el-menu-item index="/Index">
                            <img src="../../assets/images/indexIcon.png" alt="" class="icon">
                            产品分析
                        </el-menu-item>
                        <el-menu-item index="/Release">
                            <img src="../../assets/images/releaseIcon.png" alt="" class="icon">
                            发布产品
                        </el-menu-item>
                        <el-menu-item index="/History">
                            <img src="../../assets/images/historyIcon.png" alt="" class="icon">
                            历史记录
                        </el-menu-item>
                        <el-menu-item index="/Show">
                            <img src="../../assets/images/showIcon.png" alt="" class="icon">
                            效果展示
                        </el-menu-item>
                        
                        <el-menu-item index="/Attention">
                            <img src="../../assets/images/attentionIcon.png" alt="" class="icon">
                            我的关注
                        </el-menu-item>
                        <!-- <el-menu-item index="/Recharge">
                            <i class="el-icon-set-up"></i>
                            充值
                        </el-menu-item> -->

                        <el-menu-item index="/MoneyList">
                            <img src="../../assets/images/VIPIcon.png" alt="" class="icon">
                            积分充值
                        </el-menu-item>
                        <el-menu-item index="/PersonCenter">
                            <img src="../../assets/images/personIcon.png" alt="" class="icon">
                            我的店铺
                        </el-menu-item>
                        <!-- <el-menu-item index="/InvoiceList">
                            <i class="el-icon-set-up"></i>
                            发票管理
                        </el-menu-item> -->
                    </el-menu-item-group>
                <!-- </el-submenu> -->
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
<style lang="scss">
.fontTab{
    .el-menu-item.is-active {
   background-color: #3991e9 !important;
}
}
.tac{
    position: sticky;
    top: 10px;
}
.el-menu-item-group__title{
   border-radius: 10px 0 0 10px;
}
.el-menu-item{
    padding-left: 36px!important;
}
.el-menu{
    overflow: hidden;
}

</style>
<style lang="scss" scoped>
    .tabbar{
        padding-top: 10px;
        width: 180px;
        background: #fff;
        border-radius: 10px 0 0 10px;
        // overflow: hidden;
        margin-right: 20px;
        .icon{
            margin-right: 10px;
            margin-bottom: 3px;
        }
    }
</style>