<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/RechargeList' }">充值</el-breadcrumb-item>
      <el-breadcrumb-item>充值概览</el-breadcrumb-item>
    </el-breadcrumb>
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
          @click="surveyMonth({year:year})"
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
        <el-button type="primary" size="small" style="margin-left:10px" @click="surveyYear({year_stop,year_start})">确认</el-button>
      </div>
    </div>
    <Echart :xAxisData="xAxisData" :yAxisData="yAxisData" :type="type" />
  </div>
</template>

<script>
import Echart from "@/components/Admin/Recharge/Echart.vue";
import getAdminInfo from "@/utils/getAdminInfo.js";
import { surveyMonth, surveyYear } from "@/api/adminApi.js";
export default {
  name: "RechargeAll",
  components: {
    Echart
  },
  data() {
    return {
      typeOne: "1",
      tableData: [],
      info: {},
      xAxisData: [],
      yAxisData: [],
      type: "月份",
      year: "",
      year_stop: "",
      year_start: ""
    };
  },
  created() {
    getAdminInfo(this.info);
    this.surveyMonth({year:2020})
  },
  methods: {
    typeChange(val){
      if(val == 1){
        this.type = "月份"
      }else if(val == 2){
        this.type = "年份"
      }
    },
    formatMouth(info) {
      this.xAxisData = [];
      this.yAxisData = [];
      for (let i = 0; i < info.length; i++) {
        this.yAxisData.push(info[i].total_amount);
        this.xAxisData.push(info[i].pay_time);
      }
    },
    // 获取 月数据函数
    surveyMonth(data) {
      surveyMonth(data, this.info).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.length == 0) {
            this.$message({
              showClose: true,
              message: "所选年份没有记录！",
              type: "error"
            });
          } else {
            this.formatMouth(res.data.data);
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },

    // 按照年份展示 获取数据
    surveyYear(data) {
      surveyYear(data, this.info).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.length == 0) {
            this.$message({
              showClose: true,
              message: "所选年份没有记录！",
              type: "error"
            });
          } else {
            this.formatMouth(res.data.data);
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.settingContent {
  .cell {
    text-align: center;
  }
}
</style>
<style lang="scss" scoped>
.settingContent {
  width: 1200px;
  min-height: 700px;
  background: #fff;
}
.small {
  width: 400px;
}
.search {
  margin: 0 20px 0 40px;
  height: auto;
  background: #f8f8f8;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .searchItem {
    margin: 10px;
    label {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>