<template>
  <div class="index">
    <!-- 顶部部分 -->
    <PageTop/>
    <!-- 网站描述 header -->
    <!-- <WebHeader/> -->
    <!-- 首页内容部分 -->
    <WebIndexContent />
    <!-- 网站底部部分 -->
    <Footer/>
  </div>
</template>

<script>
import getInfo from '@/utils/getInfo.js'
import PageTop from "@/components/common/PageTop.vue"
import WebHeader from "@/components/common/WebHeader.vue"
import Tabbar from "@/components/common/Tabbar.vue"
import Footer from "@/components/common/Footer.vue"
import WebIndexContent from "@/components/WebIndex/WebIndexContent.vue"
export default {
  name:"WebIndex",
  components:{
    PageTop,WebHeader,Tabbar,Footer,WebIndexContent
  },
  created(){
    // getInfo(this.info)


  },
  data(){
    return {
      info:{}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>