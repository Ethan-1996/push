<template>
  <div class="release">
    <!-- 顶部部分 -->
    <PageTop/>
    <!-- 网站描述 header -->
    <WebHeader/>
    <!-- 内容部分 -->
    <div class="indexContentBox">
      <div class="indexContent">
        <Tabbar/>
        <!-- 右侧内容 -->
        <ReleaseContent :goods_url="goods_url" :info="info"/>
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
import Tabbar from "@/components/common/Tabbar.vue"
import ReleaseContent from "@/components/Release/ReleaseContent.vue"
import Footer from "@/components/common/Footer.vue"
export default {
  name:"Release",
  components:{
    PageTop,WebHeader,Tabbar,ReleaseContent,Footer
  },
  created(){
    this.goods_url = this.$route.query.goods_url
    getInfo(this.info)

    if(!getInfo(this.info)){
      return false
    }

  },
  data(){
    return {
      goods_url:"",
      info:{}
    }
  }
}
</script>

<style lang="scss" scoped>
.release{
  .indexContentBox{
    width: 100%;
    background: #eef3f6;
    .indexContent{
      padding-top: 10px;
      padding-bottom: 25px;
      width: 1400px;
      height: auto;
      margin: auto;
      display: flex;
    }
  }
}

</style>