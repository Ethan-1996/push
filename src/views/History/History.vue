<template>
  <div class="history">
    <!-- 顶部部分 -->
    <PageTop/>
    <!-- 网站描述 header -->
    <WebHeader/>
    <!-- 内容部分 -->
    <div class="indexContentBox">
      <div class="indexContent">
        <Tabbar/>
        <HistoryContent/>
      </div>
    </div>
    <!-- 网站底部部分 -->
    <Footer/>
  </div>
</template>

<script>
import PageTop from "@/components/common/PageTop.vue"
import WebHeader from "@/components/common/WebHeader.vue"
import Tabbar from "@/components/common/Tabbar.vue"
import HistoryContent from "@/components/History/HistoryContent.vue"
import Footer from "@/components/common/Footer.vue"
export default {
  name:"History",
  components:{
    PageTop,WebHeader,Tabbar,HistoryContent,Footer
  }
}
</script>

<style lang="scss" scoped>
.history{
  .indexContentBox{
    width: 100%;
    background: #eef3f6;
    .indexContent{
      padding-top: 10px;
      padding-bottom: 25px;
      width: 1400px;
      min-height: 700px;
      height: auto;
      margin: auto;
      display: flex;
    }
  }
}

</style>