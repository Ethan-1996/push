<template>
  <div class="index">
    <!-- 顶部部分 -->
    <PageTop />
    <!-- WebIndexHeader -->
    <WebIndexHeader :info="info" />
    <!-- 首页内容部分 -->
    <div class="downLoadConBox">
      <div class="downLoadCon">
        <img src="../../assets/images/downLoadLeft.png" alt class="downLoadLeft" />
        <div class="right">
          <h2>淘流推插件下载</h2>
          <p>淘客流量一站式分发平台</p>
          <p>让淘客推广简单高效实惠</p>
          <a href="https://www.taoliutui.com/tltplug.zip">
              <button>立即下载</button>
          </a>
          <!-- <a @click="noInfo" v-else>
              <button>立即下载</button>
          </a> -->
        </div>
        <div class="postionBot">
            <div class="title">现已支持的浏览器</div>
          <div class="browser">
            <img src="../../assets/images/360.png" alt />
            <span>360浏览器</span>
          </div>
          <div class="browser">
            <img src="../../assets/images/chrome.png" alt />
            <span>谷歌浏览器</span>
          </div>
          <div class="browser">
            <img src="../../assets/images/qq.png" alt />
            <span>QQ浏览器</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 网站底部部分 -->
    <Footer />
  </div>
</template>

<script>
import getInfo from "@/utils/getInfo.js";
import PageTop from "@/components/common/PageTop.vue";
import WebIndexHeader from "@/components/common/WebIndexHeader.vue";
import Footer from "@/components/common/Footer.vue";
export default {
  name: "DownLoadCrx",
  components: {
    PageTop,
    Footer,
    WebIndexHeader,
  },
  created() {
    if (localStorage.getItem("accessToken")) {
      this.info.user_info = localStorage.getItem("accessToken");
      this.info.user_id = localStorage.getItem("user_id");
    } else if (sessionStorage.getItem("accessToken")) {
      this.info.user_info = sessionStorage.getItem("accessToken");
      this.info.user_id = sessionStorage.getItem("user_id");
    } else {
      this.info = "";
    }
  },
  data() {
    return {
      info: {},
    };
  },
  methods:{
    noInfo(){
      this.$message({
          showClose: true,
          duration: 1000,
          message: "请先登录!",
          type: "error",
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  .downLoadConBox {
    max-width: 1920px;
    height: 1077px;
    background: url("../../assets/images/downLoadbg.png");
    background-size: cover;
    .downLoadCon {
      width: 1400px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      padding-top: 200px;
      height: 877px;
      position: relative;
      .downLoadLeft {
        width: 939px;
        height: 612px;
        position: relative;
        left: -40px;
      }
      .right {
          position: relative;
          left: -40px;
        padding-top: 30px;
        h2 {
          font-size: 54px;
          margin-bottom: 60px;
        }
        p {
          font-size: 34px;
          color: #999;
          line-height: 50px;
        }
        button {
          position: relative;
          color: rgba(255, 255, 255, 1);
          text-decoration: none;
          // background-color: rgba(219, 87, 51, 1);
          background-color: rgba(64, 159, 253, 1);
          font-family: "Microsoft YaHei", 微软雅黑, 宋体;
          // font-weight: 700;
          font-size: 3em;
          display: block;
          padding: 4px;
          border-radius: 8px;
          /* let's use box shadows to make the button look more 3-dimensional */
          box-shadow: 0px 9px 0px rgba(33, 135, 199, 1),
            0px 9px 25px rgba(0, 0, 0, 0.3);
          margin: 60px auto;
          width: 200px;
          text-align: center;
          -webkit-transition: all 0.1s ease;
          -moz-transition: all 0.1s ease;
          transition: all 0.1s ease;
        }
        button:active {
          box-shadow: 0px 3px 0px rgba(33, 135, 199, 1),
            0px 3px 6px rgba(0, 0, 0, 0.9);
          position: relative;
          top: 6px;
        }
      }
      .postionBot {
        position: absolute;
        bottom: 40px;
        left: 20px;
        .title{
            font-size: 26px;
            margin-bottom: 45px;
        }
        .browser {
          display: inline-block;
          img {
            width: 80px;
            height: 80px;
            margin-right: 20px;
          }
          span {
            font-size: 20px;
            line-height: 80px;
            margin-right: 48px;
          }
        }
      }
    }
  }
}
</style>