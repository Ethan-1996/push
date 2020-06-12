<template>
  <div class="mine">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 0px">
      <el-breadcrumb-item :to="{ path: '/Admin/Mine' }">我的</el-breadcrumb-item>
      <el-breadcrumb-item>业绩</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="260px" :model="formLabelAlign" style="margin-top:40px">
      <p style="font-size:16px;font-weight:800">本月业绩</p>
      <el-form-item label="当月用户注册量：">
        <span>{{formLabelAlign.user_regist_num}}</span>
      </el-form-item>
      <el-form-item label="用户注册的业绩：">
        <span>{{formLabelAlign.user_regist_ach}}</span>
      </el-form-item>
      <el-form-item label="管理员名下用户当月上传的商品数量：">
        <span>{{formLabelAlign.upload_goods_num}}</span>
      </el-form-item>
      <el-form-item label="上传的商品的业绩：">
        <span>{{formLabelAlign.upload_goods_ach}}</span>
      </el-form-item>
      <el-form-item label="当月业绩总数：">
        <span>{{formLabelAlign.achievement}}</span>
      </el-form-item>
    </el-form>
    <div class="history">
      <p style="font-size:16px;font-weight:800">历史业绩</p>
      <div class="chice">
        <label for>选择年份：</label>
        <el-date-picker
          value-format="yyyy"
          size="small"
          v-model="year"
          type="year"
          placeholder="选择年"
          @change="getYearData"
        ></el-date-picker>
      </div>
      <Echart :xAxisData="xAxisData" :yAxisData="yAxisData" :yAxisData2="yAxisData2" :yAxisData3="yAxisData3" :type="type" />
    </div>
  </div>
</template>

<script>
import Echart from "@/components/Admin/Mine/Echart.vue";
import getAdminInfo from "@/utils/getAdminInfo.js";
import { achieveMentMonth, achieveMentHistory } from "@/api/adminApi.js";
export default {
  name: "Mine",
  data() {
    return {
      year: "",
      formLabelAlign: {},
      info: {},
      type:['上传的商品的业绩','用户注册的业绩','业绩总数'],     // 几种类型
      xAxisData: [1,2,3,4,5],
      yAxisData:[10,20,30,40,50],// 上传的商品的业绩
      yAxisData2:[30,10,10,50,40],// 用户注册的业绩
      yAxisData3:[40,30,40,90,90],// 业绩总数
    };
  },
  components: {
    Echart
  },
  created() {
    getAdminInfo(this.info);

    achieveMentMonth(this.info).then(res => {
      if (res.data.code == 200) {
        //console.log(res);
        this.formLabelAlign = res.data.data;
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
    format(info) {
      this.xAxisData = [];
      this.yAxisData = [];
      this.yAxisData2 = [];
      this.yAxisData3 = [];
      for (let key in info) {
        this.xAxisData.push(key);
        this.yAxisData.push(info[key].upload_goods_ach);
        this.yAxisData2.push(info[key].user_regist_ach);
        this.yAxisData3.push(info[key].achievement);
      }
    },
    // 获取 历史数据
    getYearData() {
      achieveMentHistory({ year: this.year }, this.info).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.format(res.data.data);
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