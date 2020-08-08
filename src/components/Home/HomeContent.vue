<template>
  <div class="showContent">
    <div class="name">首页</div>
    <!-- 个商品类型 -->
    <div class="typeOfGoods">
      <ul>
        <li @click="toHis(2)">
          <p>{{inlineNum}}</p>
          <p>当前在线商品</p>
        </li>
        <li @click="toHis(1)">
          <p>{{fuNum}}</p>
          <p>预告</p>
        </li>
        <li @click="toHis(4)">
          <p>{{noNum}}</p>
          <p>失效商品</p>
        </li>
        <li @click="toHis(3)">
          <p>{{endNum}}</p>
          <p>已结束</p>
        </li>
      </ul>
    </div>
    <!-- 店铺信息 及 数据分析图 -->
    <div class="shopInfo">
      <div class="left">
        <div class="shopName">
          <p>店铺名称：{{shopName}}</p>
          <p>已发布产品：{{inlineNum + fuNum + noNum}}件</p>
          <p>可发布产品：{{parseInt(integral / num)}}件</p>
        </div>
        <div class="integral">
          <p>
            可用积分：
            <span>{{integral}}</span>
          </p>
          <button @click="toPath('MoneyList')">立即充值</button>
        </div>
      </div>
      <div class="right"  v-loading="loading" element-loading-text="统计中..." >
        <p class="bestGood">最佳商品占比分析</p>
        <HomePieEchart :AxisPriceData="AxisPriceData" :changeFlagEchart="changeFlagEchart"/>
      </div>
    </div>
    <div class="info">
      <div class="infoLeft">
        <div class="showName">近期放单数据</div>
        <Show :yAxisData="yAxisData" :yAxisData2="yAxisData2" :xAxisData="xAxisData" />
      </div>
      <div class="infoRight">
        <div class="showName">我的关注</div>
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label>
              <template slot-scope="scope">
                <p>{{scope.row.attention_to_dataoke_goods.nick}}</p>
              </template>
            </el-table-column>

            <el-table-column label>
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.attention_to_dataoke_goods.title"
                  placement="top"
                >
                  <p
                    style="height: 46px;overflow: hidden;"
                    class="toLeft"
                  >{{ scope.row.attention_to_dataoke_goods.title }}</p>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column label width="60">
              <template slot-scope="scope">
                <p>{{scope.row.attention_to_dataoke_goods.zk_final_price}}</p>
              </template>
            </el-table-column>

            <el-table-column label width="80">
              <template slot-scope="scope">
                <!-- <el-link type="primary" @click="check(scope.row.id)">查看</el-link>
                <br />-->
                <el-link type="primary" @click="lower(scope.row.id)">取消关注</el-link>
              </template>
            </el-table-column>
          </el-table>
          <button class="toMore" @click="toPath('Attention')">更多</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAttention,
  getStateNum,
  showInfo,
  getUploadIntegral,
  getSalesVolume,
  index
} from "@/api/api.js";
import Show from "./ShowEcharts.vue";
import HomePieEchart from "./HomePieEchart";
export default {
  name: "HomeContent",
  props: ["info"],
  components: {
    Show,HomePieEchart
  },
  data() {
    return {
      tableData: [],
      inlineNum: "", // 在新商品数量
      fuNum: "", // 预告商品数量
      noNum: "", // 失效商品数量
      endNum:"",// 已结束商品数量
      shopName: "",
      integral: "", // 所有积分
      num: "", // 发布一件商品所需积分
      yAxisData: [0, 0, 0, 0, 0, 0], //传值数据  y轴数据1
      yAxisData2: [0, 0, 0, 0, 0, 0], //传值数据  y轴数据2
      xAxisData: ["xx", "xx", "xx", "xx", "xx"], //传值数据  x轴数据
      AxisPriceData:[],
      changeFlagEchart:1,
      loading:true
    };
  },
  created() {
    if (!this.info.user_info) {
      return false;
    } else {
      this.getAttention(1);
      this.getStateNum();
      this.getSalesVolume();

      // 获取  发布商品需扣除的积分
      getUploadIntegral(this.info).then((res) => {
        if (res.data.code == 200) {
          this.num = res.data.data.integral;
        }
      });
      // 获取个人信息
      showInfo(this.info).then((res) => {
        if (res.data.code == 200) {
          this.shopName = res.data.data.nick;
          this.integral = res.data.data.integral;

          //console.log(this.formLabelAlign.nick)
        }
      });

      // 获取首页  饼图数据 
      index(this.info).then(res => {
        if (res.data.code == 200) {
          this.formatEchartsProInfo(res.data.data)
          this.loading = false
          // console.log(res)
        }
      })
    }
  },
  methods: {
     //整理 按照类目 效果展示
        formatEchartsProInfo(proportion){
            this.AxisPriceData = []
            for(var i = 0;i < proportion.length;i++){
                this.AxisPriceData.push({name:proportion[i].price + ' | ' + proportion[i].commission,value:proportion[i].proportion})
            }
            this.changeFlagEchart += 1
        },
    toHis(type) {
      this.$router.push({ path: "/History", query: { type: type } });
    },

    toPath(path) {
      this.$router.push("/" + path);
    },
    formatDay(info) {
      //取值   整理 day 模式数据
      this.xAxisData = [];
      this.yAxisData = [];
      this.yAxisData2 = [];
      for (let key in info) {
        this.xAxisData.push(key);
        this.yAxisData.push(info[key].estimate_receive_num);
        this.yAxisData2.push(info[key].estimate_deal_num);
      }
    },
    getSalesVolume() {
      getSalesVolume(this.info).then((res) => {
        if (res.data.code == 200) {
          this.formatDay(res.data.data);
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },

    getStateNum() {
      //获取 各个状态 数量的 函数 传给子组件
      getStateNum(this.info).then((res) => {
        // console.log(res, "whwhwhwhhwhwhwhwhwh");
        if (res.data.code == 200) {
          this.inlineNum = res.data.data.conduct; //正在进行数量
          this.fuNum = res.data.data.foresee; //预告数量
          this.noNum = res.data.data.invalid_off; //无效数量
          this.endNum = res.data.data.invalid; // 已结束数量
        }
      });
    },
    // 获取 关注
    getAttention(page) {
      getAttention({ page }, this.info).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.data;
          this.tableData = this.tableData.splice(0, 3);
          // console.log(this.tableData);
        } else {
          this.$message({
            type: "error",
            message: res.data.mag,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.showContent {
  width: 1200px;
  background: #eef3f6;
  position: relative;
  min-height: 700px;
  .name {
    width: 94.5%;
    height: 82px;
    line-height: 82px;
    font-size: 20px;
    padding-left: 5.5%;
    background: #fff;
    margin-bottom: 28px;
  }
  .typeOfGoods {
    width: 94.5%;
    padding-left: 5.5%;
    background: #fff;
    margin-bottom: 28px;
    height: 112px;
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding-right: 185px;
      li {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        p:nth-of-type(1) {
          color: #3890e9;
          margin-bottom: 8px;
          font-size: 18px;
        }
        p:nth-of-type(2) {
          font-size: 20px;
        }
      }
    }
  }
  .shopInfo {
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 28px;
    .left {
      width: 562px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      padding: 0 90px 0 68px;
      margin-right: 30px;
      .shopName {
        p {
          margin-bottom: 14px;
          font-size: 16px;
        }
        p:nth-of-type(1) {
          font-size: 20px;
          margin: 26px 0 35px 0;
        }
      }
      .integral {
        p {
          font-size: 16px;
          color: #666;
          margin-top: 60px;
          margin-bottom: 14px;
          span {
            color: #3791e7;
          }
        }
        button {
          width: 100px;
          color: #fff;
          background: #3991ea;
          height: 38px;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .right {
      flex: 1;
      background: #fff;
      position: relative;
      .bestGood{
        font-size: 16px;
        font-weight: 800;
        line-height: 24px;
        position: absolute;
        top: 30px;
        left: 30px;
        width: 72px;
      }
    }
  }
  .info {
    width: 94.5%;
    padding-left: 5.5%;
    background: #fff;
    height: 350px;
    display: flex;
    justify-content: space-between;
    .showName {
      font-size: 20px;
    }
    .infoLeft {
      flex: 1;
      padding-top: 30px;
    }
    .infoRight {
      padding-top: 30px;
      padding-right: 40px;
      width: 410px;
      position: relative;
      .toMore {
        margin-right: 32px;
        margin-top: 8px;
        height: 20px;
        width: 36px;
        border-radius: 4px;
        background: #3b91e8;
        color: #fff;
        text-align: center;
        position: absolute;
        right: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>