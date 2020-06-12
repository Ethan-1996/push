<template>
  <div class="mine">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 0px">
      <el-breadcrumb-item :to="{ path: '/Admin/Mine' }">我的</el-breadcrumb-item>
      <el-breadcrumb-item>我的客户</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <div class="searchItem">
        <label for>电话/店铺名：</label>
        <el-input placeholder="请输入电话/店铺名" v-model="keywords" style="width:400px"></el-input>
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
import { myCustomer } from "@/api/adminApi.js";
export default {
  name: "Mine",
  data() {
    return {
      tableData: [],
      info: {},
      total: 1,
      pageShowFlag: true,
      keywords: ""
    };
  },
  created() {
    getAdminInfo(this.info);

    let data = {
      page: 1,
      keywords: this.keywords
    };
    this.myCustomer(data);
  },
  methods: {
    myCustomer(data) {
      myCustomer(data, this.info).then(res => {
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
        keywords: this.keywords
      };
      this.myCustomer(data);
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
        keywords: this.keywords
      };
      this.myCustomer(data);
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