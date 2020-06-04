<template>
  <div class="show">
    <!-- 顶部部分 -->
    <PageTop/>
    <!-- 网站描述 header -->
    <WebHeader/>
    <!-- 内容部分 -->
    <div class="indexContentBox">
      <div class="indexContent">
        <Tabbar/>
        <ShowContent :info="info"/>
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
import ShowContent from "@/components/Show/ShowContent.vue"
import Footer from "@/components/common/Footer.vue"
export default {
  name:"Show",
  components:{
    PageTop,WebHeader,Tabbar,Footer,ShowContent
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
.show{
  .indexContentBox{
    width: 100%;
    background: #eef3f6;
    .indexContent{
      padding-top: 10px;
      padding-bottom: 25px;
      width: 1400px;
      height: auto;
      margin: auto;
      display:flex;
    }
  }
}

</style>