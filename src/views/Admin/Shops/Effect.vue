<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/Shops' }">商家</el-breadcrumb-item>
      <el-breadcrumb-item>商家效果展示</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <div class="searchItem">
        <label for>店铺名：</label>
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
          @change="getData"
        >
          <el-option v-for="item in options" :key="item.id" :label="item.nick" :value="item.id"></el-option>
        </el-select>
      </div>
      <!-- <el-button
        type="primary"
        style="height:36px;margin:12px 0 0 10px "
        @click="getBusinessList({page:1,phone:phone,nick:nick}),pageShow()"
      >搜索</el-button>-->
    </div>

    <Echart :xAxisData="xAxisData" :yAxisData="yAxisData" :yAxisData2="yAxisData2" />
  </div>
</template>

<script>
import Echart from "@/components/Admin/Shops/ShopEchart.vue";
import getAdminInfo from "@/utils/getAdminInfo.js";
import { businessEffect, getBusinessAll } from "@/api/adminApi.js";
export default {
  name: "SettingShops",
  components: {
    Echart
  },
  data() {
    return {
      info: {},
      id: "",
      yAxisData: [],
      yAxisData2: [],
      xAxisData: [],
      text: "效果展示",
      loading: false,
      options: []
    };
  },
  created() {
    getAdminInfo(this.info);
  },
  methods: {
      getData(){
          console.log(this.id)
          if(this.id == ""){
              return false
          }
          this.businessEffect(this.id)
      },
    // 清空
    clear() {
      this.options = [];
    },
    // 获取 搜索数据
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        getBusinessAll({ nick: query }, this.info).then(res => {
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
        this.yAxisData.push(info[key]);
      }
    },
    // 可视化图标请求数据
    businessEffect(id) {
      //type 1 是按照销量计算
      businessEffect({ id, type: 1 }, this.info).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.format(res.data.data.day);
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });

      //type 2 是按照领券量计算
      businessEffect({ id, type: 2 }, this.info).then(res => {
        if (res.data.code == 200) {
          this.yAxisData2 = [];
          for (let key in res.data.data.day) {
            this.yAxisData2.push(res.data.data.day[key]);
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
      width: 60px;
    }
  }
}
</style>