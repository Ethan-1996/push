<template>
  <div class="releaseContent">
    <p style="margin-bottom:10px " class="name">积分记录</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="充值记录" name="first" style="min-height:540px">
        <div style="margin-top:10px">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="pay_time" label="时间" width="155"></el-table-column>
            <el-table-column prop="order_no" label="订单号" width="150"></el-table-column>
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
            <el-table-column label="发票管理">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.has_one_invoice == null"
                  style="color:#409eff;cursor: pointer;"
                  @click="dialogFormVisible = true,form.order_id = scope.row.id"
                >去申请</span>
                <span v-else-if="scope.row.has_one_invoice.status == 1">已申请</span>
                <span v-else-if="scope.row.has_one_invoice.status == 2">已开</span>
                <span v-else-if="scope.row.has_one_invoice.status == 3">已邮寄</span>
                <span v-else-if="scope.row.has_one_invoice.status == 4">已签收</span>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页部分 -->
          <div class="page" v-if="pageShow">
            <el-pagination
              background
              :page-size="10"
              @current-change="handleCurrentChange"
              layout="prev, pager, next,total"
              :total="total"
            ></el-pagination>
          </div>
          <div class="blank"></div>

          <el-dialog title="申请发票" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="发票抬头" label-width="120px">
                <el-input v-model="form.invoice_title" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="税号" label-width="120px">
                <el-input v-model="form.tax_no" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="营业执照地址" label-width="120px">
                <el-input v-model="form.bn_li_ad" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="开户行" label-width="120px">
                <el-input v-model="form.open_bank" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="开户账号" label-width="120px">
                <el-input v-model="form.ac_number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="发票明细" label-width="120px">
                <el-input v-model="form.detail" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮寄地址" label-width="120px">
                <el-input v-model="form.mail_ad" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false,send()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消费记录" name="second" style="min-height:540px">
        <el-table :data="tableDataCost" border style="width: 100%">
          <el-table-column prop="create_time" label="发布时间"></el-table-column>
          <el-table-column label="发布的商品">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.state_to_goods.title"
                placement="top"
              >
                <p
                  style="height: 46px;overflow: hidden;"
                  class="toLeft"
                >{{ scope.row.state_to_goods.title }}</p>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="发布状态">
            <template slot-scope="scope">
              <span v-show="scope.row.state == 1">预告</span>
              <span v-show="scope.row.state == 2">进行中</span>
              <span v-show="scope.row.state == 3">无效</span>
            </template>
          </el-table-column>
          <el-table-column prop="integral" label="消耗积分"></el-table-column>
        </el-table>

        <!-- 分页部分 -->
        <div class="page" v-if="pageShowCost">
          <el-pagination
            background
            :page-size="10"
            @current-change="handleCurrentChangeCost"
            layout="prev, pager, next,total"
            :total="totalCost"
          ></el-pagination>
        </div>
        <div class="blank"></div>
      </el-tab-pane>
      <el-tab-pane label="充值" name="third">
        <RechargeContent :info="info" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RechargeContent from "../Recharge/RechargeContent";
import { getOrderList, addInvoice, getGoodsList } from "@/api/api.js";
export default {
  name: "MoneyListCon",
  props: ["info"],
  components: {
    RechargeContent
  },
  inject: ["reload"],
  data() {
    return {
      activeName: "first",
      tableData: [],
      tableDataCost: [],
      totalCost: 1,
      total: 1,
      pageShow: true,
      pageShowCost: true,
      dialogFormVisible: false,
      form: {
        order_id: "",
        invoice_title: "",
        tax_no: "",
        bn_li_ad: "",
        open_bank: "",
        ac_number: "",
        detail: "",
        mail_ad: ""
      }
    };
  },
  created() {
    this.getOrderList(1);
    this.getGoodsList(1);
  },
  methods: {
    getGoodsList(page) {
      getGoodsList({ state: -1, page }, this.info).then(res => {
        if (res.data.code == 200) {
          this.tableDataCost = res.data.data.data;
          this.totalCost = res.data.data.total;
        }
      });
    },
    handleClick() {},
    handleCurrentChangeCost(val) {
      this.getGoodsList(val);
    },
    // 分页函数
    handleCurrentChange(val) {
      this.getOrderList(val);
    },
    getOrderList(page) {
      getOrderList({ page }, this.info).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
          //console.log(res)
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    //申请发票提交函数
    send() {
      addInvoice(this.form, this.info).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
          this.reload();
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
.releaseContent {
  padding: 0 40px;
  width: 1160px;
  background: #fff;
  min-height: 700px;
  position: relative;
  .name {
    margin-top: 40px;
    font-size: 20px;
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
}
</style>