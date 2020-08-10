<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/Mine' }">管理员设置</el-breadcrumb-item>
      <el-breadcrumb-item>业绩总览</el-breadcrumb-item>
      <el-breadcrumb-item>商家所属概况</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <el-radio-group v-model="typeOne" size="small" style="margin:10px" @change="typeChange">
        <el-radio label="1" border>按月份展示</el-radio>
        <el-radio label="2" border>按年展示</el-radio>
      </el-radio-group>
      <div class="searchItem" v-if="typeOne == 1">
        <div class="searchItem1">
          <label for>用户名/手机号名：</label>
          <el-select
            v-model="id"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            @clear="clear"
            
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
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
          @click="bnRegistMonthNumHtOfAd({id,year})"
        >确认</el-button>
      </div>
      <div class="searchItem" v-if="typeOne == 2">
        <div class="searchItem1">
          <label for>用户名/手机号：</label>
          <el-select
            v-model="id"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            @clear="clear"
            
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
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
          @click="bnRegistYearNumHtOfAd({id,year_stop,year_start})"
        >确认</el-button>
      </div>
    </div>

    <Echart :xAxisData="xAxisData" :yAxisData="yAxisData" :type="type" />
  </div>
</template>

<script>
import Echart from "@/components/Admin/ShopBelong/ShopBelongEchart.vue";
import getAdminInfo from "@/utils/getAdminInfo.js";
import {
  getAllStateAdmins,
  bnRegistMonthNumHtOfAd,
  bnRegistYearNumHtOfAd
} from "@/api/adminApi.js";
export default {
  name: "SettingShops",
  components: {
    Echart
  },
  data() {
    return {
      info: {},
      id: "",
      yAxisData: [10, 20, 30, 40, 50],
      xAxisData: [1, 2, 3, 4, 5],
      text: "效果展示",
      loading: false,
      options: [],
      typeOne: "1",
      year_start: "",
      year: "",
      year_stop: "",
      type: "月份"
    };
  },
  created() {
    getAdminInfo(this.info);
  },
  methods: {
    typeChange(val) {
      if (val == 1) {
        this.type = "月份";
      } else if (val == 2) {
        this.type = "年份";
      }
    },
    // 清空
    clear() {
      this.options = [];
    },
    // 获取 搜索数据
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        getAllStateAdmins({ keywords: query }, this.info).then(res => {
          if (res.data.code == 200) {
            this.options = res.data.data;
            this.loading = false;
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error"
            });
            this.loading = false;
          }
        });
      } else {
        this.options = [];
      }
    },
    format(info) {
      this.xAxisData = [];
      this.yAxisData = [];
      for (let key in info) {
        this.xAxisData.push(key);
        this.yAxisData.push(info[key].num);
      }
    },
    // 可视化图标请求数据
    bnRegistMonthNumHtOfAd(data) {
      //type 1 是按照销量计算
      bnRegistMonthNumHtOfAd(data, this.info).then(res => {
        if (res.data.code == 200) {
          this.format(res.data.data);
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    // 可视化图标请求数据   几年数据
    bnRegistYearNumHtOfAd(data) {
      bnRegistYearNumHtOfAd(data, this.info).then(res => {
        if (res.data.code == 200) {
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
  position: relative;
}
.small {
  width: 400px;
}
.page {
  width: 1200px;
  text-align: center;
  position: absolute;
  bottom: 10px;
}
.blank {
  width: 100%;
  height: 70px;
}
.search {
  margin: 0 40px 0 40px;
  height: auto;
  background: #f8f8f8;
  border-radius: 4px;
  display: flex;
  .searchItem {
    margin: 10px;
    label {
      display: inline-block;
      width: 120px;
    }
  }
}
.searchItem1 {
  margin-bottom: 10px;
}
</style>