<template>
  <div class="releaseContent">
    <p class="title">关注列表</p>
    <div style="margin-top:20px;margin-right:40px">
      <el-table :data="list" style="width: 1140px;margin:auto">
        <el-table-column width="40"></el-table-column>
        <el-table-column label="店铺名">
          <template slot-scope="scope">
            <p>{{scope.row.attention_to_dataoke_goods.nick}}</p>
          </template>
        </el-table-column>

        <el-table-column label="主图">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.attention_to_dataoke_goods.pict_url"
              style="width:65px;height:65px;border-radius:5px ;"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="短标题" width="240">
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

            <p style="color:red" class="toLeft">{{scope.row.attention_to_dataoke_goods.cat_name}}</p>
          </template>
        </el-table-column>

        <el-table-column label="月销量">
          <template slot-scope="scope">
            <p>{{scope.row.attention_to_dataoke_goods.volume}}</p>
          </template>
        </el-table-column>
        <el-table-column label="商品价格">
          <template slot-scope="scope">
            <p>{{scope.row.attention_to_dataoke_goods.zk_final_price}}</p>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="check(scope.row.id)">查看</el-link>
            <br />
            <el-link type="primary" @click="lower(scope.row.id)">取消关注</el-link>
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

      <el-dialog title="关注竞品数据" :visible.sync="dialogFormVisible" width="80%" top="5%">
        <AddEchart :xData="xData" :yData="yData" />
        <AddEchartLine
          :xDataLine="xDataLine"
          :yDataLine="yDataLine"
          :yDataLinePrice="yDataLinePrice"
          :yDataLineM="yDataLineM"
        />
         <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </span>
      </el-dialog>
    </div>
  </div>
</template>



<script>
import AddEchart from "./AddEchart.vue";
import AddEchartLine from "./AddEchartLine.vue";
import {
  getAttention,
  cancelAttention,
  getAttentionExtension
} from "@/api/api.js";
export default {
  name: "AttentionContent",
  components: {
    AddEchart,
    AddEchartLine
  },
  // inject:['reload'],    //引入 app中 刷新方法
  props: ["info"],
  data() {
    return {
      id: "",
      dialogFormVisible: false,
      total: 1,
      pageShow: true,
      list: [],
      xData: [],
      yData: [],
      xDataLine: [],
      yDataLine: [],
      yDataLinePrice: [],
      yDataLineM: []
    };
  },
  created() {
    this.getAttention(1);
  },
  methods: {
    //   整理 新加的  第一个 图标搜狐据
    formatAddEchartInfo(info) {
      this.yData = [];
      this.xData = [];
      for (var i = 0; i < info.length; i++) {
        this.yData.push(info[i].proportion);
        this.xData.push(info[i].price + " | " + info[i].commission);
      }
    },
    //   整理 新加的  第二个 图标搜狐据
    formatAddLineInfo(info) {
      this.yDataLinePrice = [];
      this.yDataLineM = [];
      this.xDataLine = [];
      this.yDataLine = [];
      for (var i = 0; i < info.length; i++) {
        this.yDataLinePrice.push(info[i].coupon);
        this.yDataLineM.push(parseInt(info[i].commission));
        this.yDataLine.push(info[i].sale);
        this.xDataLine.push(info[i].time);
      }
      //console.log(this.yDataLineM)
    },

    // 查看数据
    check(id) {
      getAttentionExtension({ id }, this.info).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.formatAddEchartInfo(res.data.data.proportion);

          this.formatAddLineInfo(res.data.data.extension);
          this.dialogFormVisible = true;
        } else {
          this.$message({
            type: "error",
            message: res.data.mag
          });
        }
      });
    },
    // 分页函数
    handleCurrentChange(val) {
      this.getAttention(val);
    },
    // 获取 关注列表
    getAttention(page) {
      getAttention({ page }, this.info).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.list = res.data.data.data;
          this.total = res.data.data.total;
        } else {
          this.$message({
            type: "error",
            message: res.data.mag
          });
        }
      });
    },
    //取消关注 函数
    lower(id) {
      this.$confirm("您真的要取消关注吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          cancelAttention({ id }, this.info).then(res => {
            // console.log(res,"kkkkkkkkkkkkkkkkkkk")
            if (res.data.code == 200) {
              for (let i = 0; i < this.list.length; i++) {
                //更新 成功后 更改试图
                if (id == this.list[i].id) {
                  this.list.splice(i, 1);
                }
              }
              this.$message({
                type: "success",
                message: "已取消关注!"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.mag
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  }
};
</script>
<style lang="scss">
.hisList {
  .el-table .cell {
    // padding:0 5px;
    text-align: center;
  }
  // .el-table td{
  //   // padding: 4px 0;
  // }
  .toLeft {
    display: block;
    text-align: left !important;
  }
}
</style>
<style lang="scss" scoped>
.releaseContent {
  padding-left: 40px;
  width: 1160px;
  background: #fff;
  min-height: 700px;
  position: relative;
  .title {
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