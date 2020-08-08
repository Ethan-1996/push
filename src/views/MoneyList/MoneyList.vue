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
        <MoneyListCon :info="info"/>
      </div>
    </div>
    <!-- 网站底部部分 -->
    <Footer/>
  </div>
</template>

<script>
import getInfo from '@/utils/getInfo.js'
import PageTop from "@/components/common/PageTop.vue"
import WebHeader from "@/components/common/WebHeader.vue"
import MoneyListCon from "@/components/MoneyList/MoneyListCon.vue"
import Tabbar from "@/components/common/Tabbar.vue"
import Footer from "@/components/common/Footer.vue"
export default {
  name:"MoneyList",
  components:{
    PageTop,WebHeader,Tabbar,Footer,MoneyListCon
  },
  created(){
    getInfo(this.info)
    // console.log(this.info)
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