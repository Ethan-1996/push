<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 0px">
      <el-breadcrumb-item :to="{ path: '/Admin/RechargeList' }">充值</el-breadcrumb-item>
      <el-breadcrumb-item>充值列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已支付" name="1"></el-tab-pane>
      <el-tab-pane label="未支付" name="2"></el-tab-pane>
    </el-tabs>
    <div class="search">
      <div class="searchItem">
        <label for>电话/店铺名：</label>
        <el-input placeholder="请输入电话/店铺名" v-model="keywords" style="width:400px"></el-input>
      </div>

      <el-button type="primary" style="height:36px;margin:12px 0 0 10px " @click="search">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 1060px;margin-top:20px">
      <el-table-column prop="pay_time" label="时间" width="155"></el-table-column>
      <el-table-column prop="order_no" label="订单号" width="150"></el-table-column>
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
      <el-table-column prop="goods_body" label="商品名称"></el-table-column>
      <el-table-column prop="order_amount" label="购买积分"></el-table-column>
      <el-table-column prop="order_give" label="赠送积分"></el-table-column>
      <el-table-column label="支付状态">
        <template slot-scope="scope">
          <span v-show="scope.row.pay_status == 1">已支付</span>
          <span v-show="scope.row.pay_status == 2">未支付</span>
        </template>
      </el-table-column>
      <el-table-column prop="total_amount" label="实付金额"></el-table-column>
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
import { getOrderListAd } from "@/api/adminApi.js";
export default {
  name: "RechargeList",
  data() {
    return {
      tableData: [],
      info: {},
      total: 1,
      pageShowFlag: true,
      activeName: "1",
      keywords: ""
    };
  },
  created() {
    getAdminInfo(this.info);

    let data = {
      page: 1,
      pay_status: this.activeName,
      keywords: this.keywords
    };
    this.getOrderListAd(data);
  },
  methods: {
    getOrderListAd(data) {
      getOrderListAd(data, this.info).then(res => {
        if (res.data.code == 200) {
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
        pay_status: this.activeName,
        keywords: this.keywords
      };
      this.getOrderListAd(data);
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
        pay_status: this.activeName,
        keywords: this.keywords
      };
      this.getOrderListAd(data);
    },
    handleClick(tab, event) {
      let data = {
        pay_status: tab.name,
        page: 1,
        keywords: this.keywords
      };
      this.getOrderListAd(data);
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