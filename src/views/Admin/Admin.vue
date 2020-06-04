<template>
  <div class="index">
    <!-- 顶部部分 -->
    <PageTop/>
    <!-- 网站描述 header -->
    <WebHeader/>
    <!-- 首页内容部分 -->
    <div class="indexContentBox">
      <div class="indexContent">
        <!-- 左侧导航栏 -->
        <Tabbar/>
        <!-- 右侧内容 -->
        <router-view/>
      </div>
    </div>
    <!-- 网站底部部分 -->
    <Footer/>
  </div>
</template>

<script>
import getInfo from '@/utils/getAdminInfo.js'
import PageTop from "@/components/Admin/common/Top.vue"
import WebHeader from "@/components/common/WebHeader.vue"
import Tabbar from "@/components/Admin/common/AdminTabbar.vue"
// import SettingShopsContent from "@/components/Admin/Setting/SettingShops/SettingShopsContent.vue"
import Footer from "@/components/common/Footer.vue"
export default {
  name:"Admin",
  components:{
    PageTop,WebHeader,Tabbar,Footer
  },
  created(){
    getInfo(this.info)
    if(!getInfo(this.info)){
      return false
    }

  },
  data(){
    return {
      info:{}
    }
  }
}
</script>

<style lang="scss" scoped>
.index{
  .indexContentBox{
    width: 100%;
    background: #eef3f6;
    
    .indexContent{
      padding-top: 10px;
      padding-bottom: 25px;
      width: 1400px;
      height:auto;
      margin: auto;
      display: flex;
    }
  }
}

</style>