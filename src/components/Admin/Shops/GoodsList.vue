<template>
  <div class="hisList">
    <el-table :data="listInfo" style="width: 1140px;margin:auto">
      <el-table-column label width="20"></el-table-column>

      <el-table-column label="提交时间" width="100">
        <template slot-scope="scope">
          <span class="toLeft">{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主图" width="120">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.state_to_goods.pict_url"
            style="width:65px;height:65px;border-radius:5px;cursor: pointer;"
            @click="tocoupon(scope.row.state_to_goods.item_url)"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="短标题" width="170">
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

          <p style="color:red" class="toLeft">{{scope.row.state_to_goods.cat_name}}</p>
        </template>
      </el-table-column>
      <el-table-column label="券后价">
        <template slot-scope="scope">
          <span style="text-align:center">{{scope.row.post_coupon_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="拍件数量" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.buy_num}}</span>
        </template>
      </el-table-column>
      <el-table-column label="佣金">
        <template slot-scope="scope">
          <span>{{scope.row.commission}}%</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠卷" width="140">
        <template slot-scope="scope">
          <p class="tick" @click="tocoupon(scope.row.state_to_coupon.coupon_url)">
            ￥{{ scope.row.state_to_coupon.coupon_amount }}
            <span class="point point1"></span>
            <span class="point point2"></span>
          </p>
          <p>已领</p>
          <p
            class="check"
            v-if="scope.row.checkNumFlag"
            @click="checknum(scope.row.id,scope.row.state_to_coupon.coupon_activity_id)"
          >查看数量</p>
          <p
            v-else
          >{{scope.row.state_to_coupon.coupon_remain_count}}/{{scope.row.state_to_coupon.coupon_total_count}}</p>
        </template>
      </el-table-column>
      <el-table-column label="起止时间" width="100">
        <template slot-scope="scope">
          <p class="toLeft">{{ scope.row.state_to_coupon.coupon_start_time }}</p>
          <p class="toLeft">至</p>
          <p class="toLeft">{{ scope.row.state_to_coupon.coupon_end_time }}</p>
        </template>
      </el-table-column>
      <el-table-column label="状态" v-if="type == 1 || type == 0">
        <template slot-scope="scope">
          <span v-show="scope.row.upper_lower == 1">待审核</span>
          <span v-show="scope.row.upper_lower == 2">审核通过</span>
          <span v-show="scope.row.upper_lower == 3">审核不通过</span>
        </template>
      </el-table-column>
      <el-table-column label="上传平台" width="90">
        <template slot-scope="scope">
          <!-- <el-checkbox-group v-model="scope.row.platformList">
            <el-checkbox
              v-for="item in platformData"
              :key="item.id"
              :label="item.id"
              disabled
              style="display:block"
            >{{item.platform}}</el-checkbox>
          </el-checkbox-group>-->
          <el-popover
            placement="right-start"
            title="已上传平台"
            width="100"
            trigger="hover"
          >
          <div v-for="(item,index) in scope.row.state_to_platform_web" :key="index">
              <span>{{item.goods_to_platform_web.web_name}}</span>
            </div>
           <div slot="reference">
            <div v-for="(item,index) in scope.row.state_to_platform_web" :key="index">
              <span v-if="!(index > 2)">{{item.goods_to_platform_web.web_name}}</span>
            </div>
           </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="dialogVisible = true;getSingleGoods(scope.row.id,scope.row.user_id)"
            style="display:block"
          >查看</el-link>
          <el-link
            type="primary"
            @click="audit(scope.row.id,scope.row.user_id)"
            v-if="scope.row.upper_lower == 1"
            style="display:block"
          >审核</el-link>

          <el-link
            type="primary"
            @click="editLower(scope.row.id,scope.row.user_id)"
            v-if="type == 0 || type == 2 || type == 3"
            style="display:block"
          >下架</el-link>

          <el-link
            type="primary"
            @click="dialogVisible2 = true;tableData = scope.row.state_to_platform_web;id = scope.row.id"
            v-if="type == 0 || type == 2 || type == 3"
            style="display:block"
          >备注</el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="text" :visible.sync="dialogVisible" width="80%">
      <Echart :xAxisData="xAxisData" :yAxisData="yAxisData" :yAxisData2="yAxisData2" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="text" :visible.sync="dialogVisible2" width="60%" top="3%">
      <el-table
        border
        ref="multipleTable"
        :data="platformData"
        tooltip-effect="dark"
        style="width: 80%;margin:20px auto"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column label="平台类型">
          <template slot-scope="scope">{{ scope.row.web_to_platform.platform }}</template>
        </el-table-column>
        <el-table-column label="平台名称">
          <template slot-scope="scope">{{ scope.row.web_name }}</template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px auto;width:130px">
        <el-button @click="setPlatform">确认上传平台</el-button>
      </div>
      <p style="margin:20px 0px" class="el-dialog__title">已确认上传的平台</p>
      <el-table border :data="tableData" tooltip-effect="dark" style="width: 80%;margin:0 auto">
        <el-table-column label="平台类型">
          <template slot-scope="scope">{{ scope.row.goods_to_platform.platform }}</template>
        </el-table-column>
        <el-table-column label="平台名称">
          <template slot-scope="scope">{{ scope.row.goods_to_platform_web.web_name }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="deletePlatformWeb(scope.row.goods_coupon_id,scope.row.platform_id,scope.row.platform_web_id)"
              style="display:block"
            >删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      
    </el-dialog>
  </div>
</template>

<script>
import Echart from "@/components/Admin/Shops/ShopEchart.vue";
import {
  review,
  editLower,
  getSingleGoods,
  getCoupon,
  getPlatformWeb,
  deletePlatformWebGoods,
  addPlatformWeb,
  getPlatformWebGoods,
} from "@/api/adminApi.js";
export default {
  name: "List",
  components: {
    Echart,
  },
  created() {
    getPlatformWeb(this.info).then((res) => {
      console.log(res);
      if (res.data.code == 200) {
        this.platformData = res.data.data;
      }
    });
  },
  inject: ["reload"], //引入 app中 刷新方法
  props: ["listInfo", "info", "type","changeInfo"],
  watch: {
    listInfo: function (newV, oldV) {},
    info: function (newV, oldV) {},
  },
  data() {
    return {
      tableData: [],
      platformData: [],
      checkFlag: true,
      dialogVisible: false,
      dialogVisible2: false,
      yAxisData: [],
      yAxisData2: [],
      xAxisData: [],
      text: "效果展示",
      str: "",
      id: "", // 修改平台时所需要的数据id
    };
  },

  methods: {
    // 获取某个商品已上传的平台
    getPlatformWebGoods(goods_coupon_id) {
      getPlatformWebGoods({ goods_coupon_id }, this.info).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.changeInfo(goods_coupon_id,this.tableData)
        }
      });
    },
    // 选择平台上传
    setPlatform() {
      this.str = `?goods_coupon_id=${this.id}&` + this.str;
      addPlatformWeb(this.str, this.info).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.getPlatformWebGoods(this.id);
          this.$refs.multipleTable.clearSelection();
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
          });
        }
      });
    },
    // 删除平台
    deletePlatformWeb(goods_coupon_id, platform_id, platform_web_id) {
      deletePlatformWebGoods(
        { goods_coupon_id, platform_id, platform_web_id },
        this.info
      ).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.getPlatformWebGoods(goods_coupon_id);
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.str = "";
      for (let i = 0; i < val.length; i++) {
        this.str += `platform_and_web_id[${i}][platform_id]=${val[i].platform_id}&platform_and_web_id[${i}][platform_web_id]=${val[i].id}&`;
      }
      this.str = this.str.substring(0, this.str.length - 1);
    },
    // 审核函数
    audit(id, user_id) {
      this.$confirm("是否通过?", "提示", {
        confirmButtonText: "通过",
        cancelButtonText: "不通过",
        type: "warning",
      })
        .then(() => {
          review({ id, user_id, upper_lower: 2 }, this.info).then((res) => {
            // console.log(res,"kkkkkkkkkkkkkkkkkkk")
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.reload();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
          });
        })
        .catch(() => {
          review({ id, user_id, upper_lower: 3 }, this.info).then((res) => {
            // console.log(res,"kkkkkkkkkkkkkkkkkkk")
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.reload();
            } else {
              this.$message({
                type: "error",
                message: res.data.mag,
              });
            }
          });
        });
    },
    tocoupon(url) {
      window.open(url, "_blank");
    },
    format(info) {
      //取值   整理 day 模式数据
      this.xAxisData = [];
      this.yAxisData = [];
      this.yAxisData2 = [];
      for (let key in info) {
        this.xAxisData.push(key);
        this.yAxisData.push(info[key].estimate_receive_num);
        this.yAxisData2.push(info[key].estimate_deal_num);
      }
    },
    // 可视化图标请求数据
    getSingleGoods(id, user_id) {
      getSingleGoods({ id, user_id }, this.info).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data);
          this.format(res.data.data);
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    checknum(id, coupon_activity_id) {
      //查看领取 优惠卷数量
      let data = {
        id,
        coupon_activity_id,
      };
      getCoupon(data, this.info).then((res) => {
        console.log(res, "resgsgsgsggsgggggggggggggggg");
        if (res.data.code == 404) {
          //  404 表示  过期了  就  显示 list 中的 数据
          for (let i = 0; i < this.listInfo.length; i++) {
            if (this.listInfo[i].id == id) {
              this.listInfo[i].checkNumFlag = false;
            }
          }
        } else if (res.data.code == 200) {
          // 获取领券量 后 根据 id 对比 更改数据  试图更新
          for (let i = 0; i < this.listInfo.length; i++) {
            if (this.listInfo[i].id == id) {
              this.listInfo[i].state_to_coupon.coupon_remain_count =
                res.data.data.coupon_receive_count; //领取量
              this.listInfo[i].state_to_coupon.coupon_total_count =
                res.data.data.coupon_total_count; //总量
              this.listInfo[i].checkNumFlag = false;
            }
          }
        }
      });
    },
    //下架商品函数
    editLower(id, user_id) {
      this.$confirm("此操作将永久下架该商品且不可逆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id,
            user_id,
          };
          editLower(data, this.info).then((res) => {
            // console.log(res,"kkkkkkkkkkkkkkkkkkk")
            if (res.data.code == 200) {
              for (let i = 0; i < this.listInfo.length; i++) {
                //更新 成功后 更改试图
                if (id == this.listInfo[i].id) {
                  this.listInfo.splice(i, 1);
                }
              }
              //this.getStateNum()       //重新获取 数量
              this.$message({
                type: "success",
                message: "已成功下架!",
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.mag,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架",
          });
        });
    },
  },
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
.tick {
  width: 60px;
  height: 22px;
  background: #ff9933;
  margin: auto;
  color: #fff;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  .point {
    width: 8px;
    height: 8px;
    background: #fff;
    position: absolute;
    border-radius: 4px;
    top: 7px;
  }
  .point1 {
    left: -4px;
  }
  .point2 {
    right: -4px;
  }
}
.check {
  cursor: pointer;
}
</style>