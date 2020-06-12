<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 0px">
      <el-breadcrumb-item :to="{ path: '/Admin/Mine' }">我的</el-breadcrumb-item>
      <el-breadcrumb-item>客户归属</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="招商" name="ad"></el-tab-pane>
      <el-tab-pane label="商家" name="bn"></el-tab-pane>
      <el-tab-pane label="自己注册" name="no"></el-tab-pane>
    </el-tabs>
    <div class="search">
      <div class="searchItem">
        <label for>搜索信息：</label>
        <el-input placeholder="请输入管理员手机号/用户店铺名/用户手机" v-model="keywords" style="width:400px"></el-input>
      </div>

      <el-button type="primary" style="height:36px;margin:12px 0 0 10px " @click="search">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 1060px;margin-top:20px">
      <el-table-column prop="create_time" label="时间"></el-table-column>
      <el-table-column label="店铺名">
        <template slot-scope="scope">
          <span>{{scope.row.has_one_user.nick}}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话">
        <template slot-scope="scope">
          <span>{{scope.row.has_one_user.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源">
        <template slot-scope="scope">
          <span v-show="scope.row.type == 'ad'">招商</span>
          <span v-show="scope.row.type == 'bn'">商家</span>
          <span v-show="scope.row.type == 'no'">自己注册</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页部分 -->
    <div class="page" v-if="pageShowFlag">
      <el-pagination
        background
        :page-size="10"
        @current-change="handleCurrentChange"
        layout="prev, pager, next,total"
        :total="total"
      ></el-pagination>
    </div>
    <div class="blank"></div>
  </div>
</template>

<script>
import getAdminInfo from "@/utils/getAdminInfo.js";
import { customerSource } from "@/api/adminApi.js";
export default {
  name: "RechargeList",
  data() {
    return {
      tableData: [],
      info: {},
      total: 1,
      pageShowFlag: true,
      activeName: "ad",
      keywords: ""
    };
  },
  created() {
    getAdminInfo(this.info);

    let data = {
      page: 1,
      type: this.activeName,
      keywords: this.keywords
    };
    this.customerSource(data);
  },
  methods: {
    customerSource(data) {
      customerSource(data, this.info).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    // 搜索函数
    search() {
      let data = {
        page: 1,
        type: this.activeName,
        keywords: this.keywords
      };
      this.customerSource(data);
      this.pageShow();
    },
    // 分页不正常显示
    pageShow() {
      this.pageShowFlag = false;
      this.$nextTick(() => {
        this.pageShowFlag = true;
      });
    },
    // 分页函数
    handleCurrentChange(val) {
      //this.getInvoiceList(val);
      let data = {
        page: val,
        type: this.activeName,
        keywords: this.keywords
      };
      this.customerSource(data);
    },
    handleClick(tab, event) {
      //console.log(tab, event);
      let data = {
        type: tab.name,
        page: 1,
        keywords: this.keywords
      };
      this.customerSource(data);
      this.pageShow();
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
  width: 1080px;
  padding: 0 60px;
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
  margin: 0 20px 0 0px;
  height: auto;
  background: #f8f8f8;
  border-radius: 4px;
  display: flex;
  .searchItem {
    margin: 10px;
    label {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>