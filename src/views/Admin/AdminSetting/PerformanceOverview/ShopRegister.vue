<template>
  <div class="mine">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 0px">
      <el-breadcrumb-item :to="{ path: '/Admin/Mine' }">管理员设置</el-breadcrumb-item>
      <el-breadcrumb-item>业绩总览</el-breadcrumb-item>
      <el-breadcrumb-item>商家注册概况</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="thisMouth">
      <p style="font-size:16px;font-weight:800">本月注册量</p>
      <EchartOne :xAxisData="xAxisData" :yAxisData="yAxisData" />
    </div>
    <div class="history">
      <p style="font-size:16px;font-weight:800">历史商家注册量</p>
      
      <div class="search">
        <el-radio-group v-model="typeOne" size="small" style="margin:10px" @change="typeChange">
          <el-radio label="1" border>按月份展示</el-radio>
          <el-radio label="2" border>按年展示</el-radio>
        </el-radio-group>
        <div class="searchItem" v-if="typeOne == 1">
          <label for>选择年份：</label>
          <el-date-picker
            value-format="yyyy"
            size="small"
            v-model="year"
            type="year"
            placeholder="选择年"
          ></el-date-picker>
          <el-button
            type="primary"
            size="small"
            style="margin-left:10px"
            @click="getYearData({year:year})"
          >确认</el-button>
        </div>
        <div class="searchItem" v-if="typeOne == 2">
          <label for>选择开始年份：</label>
          <el-date-picker
            value-format="yyyy"
            size="small"
            v-model="year_start"
            type="year"
            placeholder="选择年"
            style="margin-right:10px"
          ></el-date-picker>
          <label for>选择结束年份：</label>
          <el-date-picker
            value-format="yyyy"
            size="small"
            v-model="year_stop"
            type="year"
            placeholder="选择年"
          ></el-date-picker>
          <el-button
            type="primary"
            size="small"
            style="margin-left:10px"
            @click="bnRegistYearNumHt({year_stop,year_start})"
          >确认</el-button>
        </div>
      </div>
      
      <!-- <div class="chice">
        <label for>选择年份：</label>
        <el-date-picker
          value-format="yyyy"
          size="small"
          v-model="year"
          type="year"
          placeholder="选择年"
          @change="getYearData"
        ></el-date-picker>
      </div> -->
      <Echart
        :hisXAxisData="hisXAxisData"
        :hisYAxisData1="hisYAxisData1"
        :hisYAxisData2="hisYAxisData2"
        :hisYAxisData3="hisYAxisData3"
        :type="type"
      />
    </div>
  </div>
</template>

<script>
import EchartOne from "@/components/Admin/ShopRegister/ShopRegisterEchart.vue";
import Echart from "@/components/Admin/ShopRegister/EchartOfThree.vue";
import getAdminInfo from "@/utils/getAdminInfo.js";
import {
  bnRegistMonthNum,
  bnRegistMonthNumHt,
  bnRegistYearNumHt
} from "@/api/adminApi.js";
export default {
  name: "ShopRegister",
  data() {
    return {
      year: "",
      info: {},
      xAxisData: [],
      yAxisData: [],
      hisXAxisData: [1, 2, 3, 4],
      hisYAxisData1: [10, 20, 30, 40],
      hisYAxisData2: [20, 30, 40, 50],
      hisYAxisData3: [30, 40, 50, 60],
      year_stop:"",
      year_start:"",
      typeOne:"1",
      type:"月份"
    };
  },
  components: {
    Echart,
    EchartOne
  },
  created() {
    getAdminInfo(this.info);
    // 获取本月数据
    bnRegistMonthNum(this.info).then(res => {
      if (res.data.code == 200) {
        //console.log(res);
        this.formatMonth(res.data.data);
      } else {
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: "error"
        });
      }
    });
  },
  methods: {
     typeChange(val) {
      if (val == 1) {
        this.type = "月份";
      } else if (val == 2) {
        this.type = "年份";
      }
    },
    // 整理本月 数据
    formatMonth(info) {
      this.xAxisData = [];
      this.yAxisData = [];
      for (let i = 0; i < info.length; i++) {
        this.yAxisData.push(info[i].num);
        switch (info[i].type) {
          case "ad":
            this.xAxisData.push("招商");
            break;
          case "bn":
            this.xAxisData.push("商家");
            break;
          case "no":
            this.xAxisData.push("自己注册");
            break;

          default:
            break;
        }
      }
    },
    formatAllMouth(info) {
      this.hisXAxisData = [];
      this.hisYAxisData1 = []; // 招商
      this.hisYAxisData2 = []; // 商家
      this.hisYAxisData3 = []; // 自己注册
      for (let key in info) {
        this.hisXAxisData.push(key);
        for (let key2 in info[key]){
          switch (key2) {
            case "ad":
              this.hisYAxisData1.push(info[key][key2].num);
              break;
            case "bn":
              this.hisYAxisData2.push(info[key][key2].num);
              break;
            case "no":
              this.hisYAxisData3.push(info[key][key2].num);
              break;
          
            default:
              break;
          }
        }
      }
    },

    // 获取 每月数据
    getYearData() {
      bnRegistMonthNumHt({ year: this.year }, this.info).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.formatAllMouth(res.data.data);
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    // 获取年数据 
    bnRegistYearNumHt(data){
        bnRegistYearNumHt(data,this.info).then(res => {
             if (res.data.code == 200) {
          console.log(res);
          this.formatAllMouth(res.data.data);
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
        })
    }
    // format(info) {
    //   this.xAxisData = [];
    //   this.yAxisData = [];
    //   this.yAxisData2 = [];
    //   this.yAxisData3 = [];
    //   for (let key in info) {
    //     this.xAxisData.push(key);
    //     this.yAxisData.push(info[key].upload_goods_ach);
    //     this.yAxisData2.push(info[key].user_regist_ach);
    //     this.yAxisData3.push(info[key].achievement);
    //   }
    // },
    // 获取 历史数据
    // getYearData() {
    //   achieveMentHistory({ year: this.year }, this.info).then(res => {
    //     if (res.data.code == 200) {
    //       console.log(res);
    //       this.format(res.data.data);
    //     } else {
    //       this.$message({
    //         showClose: true,
    //         message: res.data.msg,
    //         type: "error"
    //       });
    //     }
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
.mine {
  width: 1080px;
  padding: 0 60px;
  min-height: 700px;
  background: #fff;
  position: relative;
}
.chice {
  margin: 10px;
  margin: 20px 10px 10px 10px;
}
</style>