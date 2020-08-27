<template>
  <div class="webIndexCon">
    <!-- logo &nav 部分 -->
    <!-- <div class="logoTop">
      <div class="logo">
        <img src="../../assets/images/indexLogo.png" alt />
        <span class="shu"></span>
        <img src="../../assets/images/indexLogoAfter.png" alt />
        <span style="margin-left:5px">专 注 淘 客 流 量 推 广</span>
      </div>
      <div class="logoRight">
        <ul>
          <li v-for="item in navs" :key="item.id" @click="toPath(item.route)">{{item.text}}</li>
        </ul>
      </div>
    </div>-->
    <WebIndexHeader :info="info" />

    <!--  banner -->

    <div class="banner" style="max-width:1920px;margin:auto">
      <el-carousel height="467px" arrow="never">
        <el-carousel-item v-for="item in banners" :key="item.id">
          <img :src="item.url" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 我们的优势 -->
    <div class="advantageBox">
      <div class="advantage">
        <div class="advantageLeft">
          <h2 style="color:#d34b3d;margin-left:30px">商家痛点分析</h2>
          <ul>
            <li>
              <div class="text">
                <h3>行业数据</h3>
                <p>行业及竞争数据缺失，商家不能及时 得到行业竞品的方案及销量数据，导致推广被动。</p>
                <p>行业数据缺失</p>
              </div>
              <div class="imgBox">
                <img src="../../assets/images/list/datared.png" alt />
              </div>
            </li>
            <li>
              <div class="text">
                <h3>沟通成本</h3>
                <p>无实力团队居多，线上推广商家无论 何种方式成交均支付服务费，商家筛选实力淘客成本变高。</p>
                <p>时间成本增加</p>
              </div>
              <div class="imgBox">
                <img src="../../assets/images/list/usersred.png" alt />
              </div>
            </li>
            <li>
              <div class="text">
                <h3>效果不可控</h3>
                <p>对于方案一般产品利用CPS付费模式取得客户信任直挂平台、不上渠道，蹭取服务费</p>
                <p>效果无法掌握</p>
              </div>
              <div class="imgBox">
                <img src="../../assets/images/list/resred.png" alt />
              </div>
            </li>
            <li>
              <div class="text">
                <h3>成本高</h3>
                <p>除佣金优惠券外，商家需额外支付淘客5%-10%服务费，资金压力大。</p>
                <p>支付成本过高</p>
              </div>
              <div class="imgBox">
                <img src="../../assets/images/list/moneyred.png" alt />
              </div>
            </li>
          </ul>
        </div>
        <div class="advantageRight">
          <h2 style="color:#214579;margin-right:30px;text-align:right">淘流推的优势</h2>
          <ul>
            <li>
              <div class="imgBox">
                <img src="../../assets/images/list/data.png" alt />
              </div>
              <div class="text">
                <h3>数据支持</h3>
                <p>五年行业沉淀，上亿条产品数据支持为客户提供最全面的淘客数据分析工具</p>
                <p>更权威的数据服务</p>
              </div>
            </li>
            <li>
              <div class="imgBox">
                <img src="../../assets/images/list/users.png" alt />
              </div>
              <div class="text">
                <h3>海量用户</h3>
                <p>平台自由每日百万级流量，合作渠道覆盖全网各大流量源头，分发平台覆盖流量千万级</p>
                <p>更庞大的流量支持</p>
              </div>
            </li>
            <li>
              <div class="imgBox">
                <img src="../../assets/images/list/speed.png" alt />
              </div>
              <div class="text">
                <h3>高效分发</h3>
                <p>最专业的技术解决方案，完善解决流量分发症结，高效接口调用与自动化技术，实现更高效的流量分发</p>
                <p>更完善的技术方案</p>
              </div>
            </li>
            <li>
              <div class="imgBox">
                <img src="../../assets/images/list/money.png" alt />
              </div>
              <div class="text">
                <h3>标准化收费</h3>
                <p>通过集中式流量采买与深度合作分发降低淘客流量成本，然后以标准化价格进行分发，解决行业流量收费昂贵症结</p>
                <p>更标准的收费方式</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div style="margin:40px auto 0;width:240px">
          <input type="submit" value="前往放单" class="newFnBtn" @click="toPath('Release')" />
        </div>
    </div>

    <!-- 解决方案 -->
    <div class="solveBox" style="max-width:1920px;margin:auto">
      <img src="../../assets/images/solvebg.png" />
      <div class="solve">
        <p class="comingSoonTitle solveTitle">解决方案</p>
        <p class="titleBottom" style="background:#fff"></p>
        <div class="solveCon">
          <div class="solveLeft">
            <p>1.通过大数据分析为客户提供最准确的淘流推推广方案建议</p>
            <p>2.结合大数据分析后的方案给客户提供专业的流量分发服务</p>
            <p>3.通过集中流量采买及流量平台深度合作为客户提供标准化收费</p>
            <!-- <div class="solveList">
              <div class="solveItem">
                <img src="../../assets/images/solveAttention.png" alt />
                <p>关注列表</p>
              </div>
              <div class="solveItem">
                <img src="../../assets/images/solveData.png" alt />
                <p>数据分析</p>
              </div>
              <div class="solveItem">
                <img src="../../assets/images/solveShow.png" alt />
                <p>效果展示</p>
              </div>
              <div class="solveItem">
                <img src="../../assets/images/solveSearch.png" alt />
                <p>商品搜索</p>
              </div>
            </div>-->
          </div>
          <div class="solveRight">
            <img src="../../assets/images/woman.png" alt />
          </div>
        </div>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="partner" style="max-width:1920px;margin:auto">
      <p class="comingSoonTitle partnerTitle">合作伙伴</p>
      <p class="titleBottom"></p>
      <Swiper />
    </div>

    <!-- 操作步骤 -->
    <div class="stepBox">
      <p class="stepTitle">操作步骤</p>
      <p class="titleBottom"></p>
      <div class="step">
        <el-steps :active="4" align-center>
          <el-step title="产品分析" description="通过大数据分析得出最优方案"></el-step>
          <el-step title="发布产品" description="发布产品到淘流推"></el-step>
          <el-step title="开始分发" description="淘流推负责分发至各流量平台"></el-step>
          <el-step title="数据监测" description="淘流推后台查看预估效果，商家后台查看优惠券具体领取数据"></el-step>
        </el-steps>

        <div style="margin:auto;width:240px">
          <input type="submit" value="发布产品" class="stepBtn" @click="toPath('Release')" />
        </div>
      </div>
    </div>

    <!-- 敬请期待 -->
    <div class="comingSoon">
      <p class="comingSoonTitle">敬请期待</p>
      <p class="titleBottom"></p>
      <div class="con">
        <div class="comingItem">
          <img src="../../assets/images/tb.png" alt />
          <h3>淘宝达人</h3>
          <p>标准化收费</p>
          <p>覆盖 2000+ 淘宝达人</p>
        </div>
        <div class="comingItem">
          <img src="../../assets/images/tiktok.png" alt />
          <h3>直播平台</h3>
          <p>标准化收费</p>
          <p>涵盖淘宝抖音快手主播 1000+</p>
        </div>
        <div class="comingItem">
          <img src="../../assets/images/redBook.png" alt />
          <h3>小红书</h3>
          <p>标准化收费</p>
          <p>涵盖全网 2000+ 小红书达人</p>
        </div>
      </div>
      <div style="margin:auto;width:240px">
        <input type="submit" value="新功能预约" class="newFnBtn" />
        <p class="afterBtn">预约后将有机会获得优先体验权</p>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "./Swiper";
import WebIndexHeader from "../common/WebIndexHeader";
import getInfo from "@/utils/getInfo.js";
export default {
  name: "WebIndexContent",
  created() {
    // getInfo(this.info);
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
  components: {
    Swiper,
    WebIndexHeader,
  },
  data() {
    return {
      info: {},
      // navs: [
      //   { id: 1, text: "首页", route: "/" },
      //   { id: 2, text: "推广中心", route: "/Home" },
      //   { id: 3, text: "产品分析", route: "/Index" },
      //   { id: 4, text: "插件下载", route: "/DownLoadCrx" },
      //   { id: 5, text: "个人中心", route: "/PersonCenter" },
      // ],
      banners: [
        { id: 1, url: require("../../assets/images/banner.png") },
        // { id: 2, url: require("../../assets/images/banner.png") },
        // { id: 3, url: require("../../assets/images/banner.png") },
        // { id: 4, url: require("../../assets/images/banner.png") },
        // { id: 5, url: require("../../assets/images/banner.png") },
        // { id: 6, url: require("../../assets/images/banner.png") },
      ],
    };
  },
  methods: {
    toPath(path) {
      if (!this.info) {
        this.$router.push("/Login");
      } else {
        this.$router.push(path);
      }
    },
  },
};
</script>
<style lang="scss">
.step {
  .el-step__line {
    height: 7px !important;
    background-color: #7dc6f3 !important;
    top: 27px !important;
  }
  .el-step__icon.is-text {
    background: #7dc6f3;
    width: 60px;
    height: 60px;
    color: #fff;
    font-size: 20px;
    border: none;
  }
  .el-step__line-inner {
    width: 0 !important;
  }

  .el-step__title.is-finish {
    font-size: 20px;
    color: #000;
    margin-top: 50px;
  }
  .el-step__description.is-finish {
    font-size: 16px;
    color: #999;
    margin-top: 20px;
  }
}
</style>
<style lang="scss" scoped>
.webIndexCon {
  margin: auto;
  min-height: 700px;
  .comingSoonTitle {
    margin: auto;
    text-align: center;
    color: #000;
    padding: 10px;
    font-size: 30px;
    margin-top: 130px;
  }
  .titleBottom {
    width: 60px;
    height: 2px;
    margin: auto;
    background: #000;
  }
  .newFnBtn {
    width: 240px;
    height: 45px;
    border-radius: 22.5px;
    color: #fff;
    background: #2c8cf0;
    margin: auto;
    display: inline-block;
    cursor: pointer;
    margin-top: 40px;
  }
  .partnerTitle {
    margin-top: 170px;
  }
  .logoTop {
    width: 1400px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    .logo {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #8ebff7;
      .shu {
        display: inline-block;
        height: 38px;
        width: 2px;
        background: #cccccc;
        margin: 0 10px;
      }
    }
    .logoRight {
      ul {
        display: flex;
        justify-content: space-between;
        width: 480px;
        li {
          padding: 5px;
          margin-right: 24px;
          font-size: 16px;
          border-bottom: 2px solid #fff;
          cursor: pointer;
        }
        li:nth-of-type(5) {
          margin-right: 0;
        }
        li:hover {
          border-bottom: 2px solid #0590f9;
        }
        li:nth-of-type(1) {
          border-bottom: 2px solid #0590f9;
        }
      }
    }
  }
  // 操作步骤
  .stepBox {
    background: url("../../assets/images/stepbg.png");
    height: 580px;
    background-size: cover;
    padding-top: 45px;
    .stepTitle {
      margin: auto;
      text-align: center;
      color: #fff;
      padding: 10px;
      font-size: 30px;
    }
    .titleBottom {
      width: 60px;
      height: 2px;
      margin: auto;
      background: #fff;
    }
    .step {
      width: 1400px;
      margin: auto;
      background: #fff;
      height: 345px;
      margin-top: 50px;
      padding-top: 55px;
      .stepBtn {
        width: 240px;
        height: 45px;
        border-radius: 22.5px;
        border: 2px solid #4196f1;
        color: #4196f1;
        background: #fff;
        margin: auto;
        display: inline-block;
        cursor: pointer;
        margin-top: 20px;
      }
    }
  }
  // 即将上线
  .comingSoon {
    width: 1400px;
    height: 650px;
    margin: auto;

    .con {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
      .comingItem {
        width: 32.5%;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #ccc;
        box-shadow: 3px 6px 10px #ccc;
        padding-bottom: 100px;
        img {
          margin-top: 48px;
        }
        h3 {
          margin-top: 45px;
          font-size: 20px;
          color: #000;
          margin-bottom: 40px;
        }
        p {
          font-size: 16px;
          color: #666;
          margin-top: 10px;
        }
      }
    }

    .afterBtn {
      text-align: center;
      color: #9a9a9a;
      margin-top: 16px;
    }
  }
  // 我们的优势
  .advantageBox {
    // height: 800px;
    background: url("../../assets/images/advantagebg.png");
    background-size: cover;
    padding-bottom: 40px;
    .advantage {
      width: 1000px;
      margin: auto;
      padding: 85px 100px 0px;
      display: flex;
      justify-content: space-between;
      .advantageLeft,
      .advantageRight {
        ul {
          li {
            display: flex;
            justify-content: space-between;
            margin-top: 90px;
            height: 154px;
            .imgBox{
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 80px;
            }
            .text {
              text-align: center;
              
              h3 {
                font-size: 24px;
                color: #000;
              }
              p {
                font-size: 12px;
                color: #666;
                margin: auto;
                margin-top: 20px;
                line-height: 26px;
                width: 220px;
              }
              p:nth-of-type(2) {
                color: #000;
                font-size: 16px;
                margin-top: 16px;
              }
            }
          }
        }
        h2 {
          font-size: 50px;
          margin-bottom: 100px;
        }
      }
    }
  }
  // 解决方案
  .solveBox {
    position: relative;
    height: 720px;
    .solve {
      width: 1400px;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      .solveTitle {
        margin-top: 70px;
        color: #fff;
      }
      .solveCon {
        width: 1240px;
        margin-top: 55px;
        background: #fff;
        box-shadow: 5px 5px 10px #ccc;
        border: 1px solid #ccc;
        height: 400px;
        padding: 80px 90px 60px;
        display: flex;
        justify-content: space-between;
        .solveLeft {
          width: 600px;
          p {
            margin-top: 75px;
            font-size: 20px;
          }
          .solveList {
            display: flex;
            justify-content: space-between;
            margin-top: 60px;
            .solveItem {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              p {
                text-align: center;
                margin-top: 14px;
              }
            }
          }
        }
        .solveRight {
          img {
            width: 480px;
            height: 372px;
          }
        }
      }
    }
  }
}
</style>