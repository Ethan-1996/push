<template>
  <div class="index">
    <!-- 顶部部分 -->
    <PageTop/>
    <!-- 网站描述 header -->
    <WebHeader/>
    <!-- 首页内容部分 -->
    <div class="indexContentBox">
      <keep-alive>
        <div class="indexContent">
          <!-- 左侧导航栏 -->
          <Tabbar/>
          <!-- 右侧内容 -->
          <IndexContent :info="info" />
        </div>
      </keep-alive>
    </div>
    <!-- 网站底部部分 -->
    <Footer/>
  </div>
</template>

<script>
import getInfo from '@/utils/getInfo.js'
import PageTop from "@/components/common/PageTop.vue"
import WebHeader from "@/components/common/WebHeader.vue"
import Tabbar from "@/components/common/Tabbar.vue"
import IndexContent from "@/components/Index/IndexContent.vue"
import Footer from "@/components/common/Footer.vue"
export default {
  name:"Index",
  components:{
    PageTop,WebHeader,Tabbar,IndexContent,Footer
  },
  created(){
    getInfo(this.info)

    if(!getInfo(this.info)){
      console.log(!getInfo(this.info))
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