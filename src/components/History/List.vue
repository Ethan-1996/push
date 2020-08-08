<template>
  <div class="hisList">
    <!-- <div class="explanation">
    Tips:
    <div v-for="item in platformData " :key="item.id" style="display:inline">
      {{item.platform}}
      <el-tooltip class="item" effect="dark" :content="item.descri" placement="top">
      <p>?</p>
    </el-tooltip>
    </div>
    </div>-->
    <el-table :data="listInfo" style="width: 1140px;margin:auto" border>
      <el-table-column label="提交时间" width="100">
        <template slot-scope="scope">
          <span class="toLeft">{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主图" width="140">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.state_to_goods.pict_url"
            style="width:65px;height:65px;border-radius:5px ;"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="短标题" width="200">
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
      <el-table-column label="券后价" width="90">
        <template slot-scope="scope">
          <span style="text-align:center">{{scope.row.post_coupon_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="拍件数量" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.buy_num}}</span>
        </template>
      </el-table-column>
      <el-table-column label="佣金" width="90">
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
          <p v-else>
            <span style="color:red">{{scope.row.state_to_coupon.coupon_remain_count}}</span>
            /{{scope.row.state_to_coupon.coupon_total_count}}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="起止时间" width="100">
        <template slot-scope="scope">
          <p class="toLeft">{{ scope.row.state_to_coupon.coupon_start_time }}</p>
          <p class="toLeft">至</p>
          <p class="toLeft">{{ scope.row.state_to_coupon.coupon_end_time }}</p>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <span v-show="scope.row.state == 1">预告</span>
          <span v-show="scope.row.state == 2">进行中</span>
          <span v-show="scope.row.state == 4">无效</span>
          <span v-show="scope.row.state == 3">已结束</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
      label="上传平台"
      width="90">
      <template slot-scope="scope">
        <el-checkbox-group v-model="scope.row.platformList">
            <el-checkbox v-for="item in platformData" :key="item.id" :label="item.id" disabled style="display:block">{{item.platform}}</el-checkbox>
          
        </el-checkbox-group>
      </template>
      </el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="primary" @click="toMore(scope.row.id)">查看</el-link>
          <br />
          <el-link
            type="primary"
            @click="dialogFormVisible = true,remark(scope.row.id,scope.row.goods_add_remark)"
          >备注</el-link>
          <br />
          <el-link
            type="primary"
            @click="lower(scope.row.id)"
            v-if="scope.row.state == 1 || scope.row.state == 2"
          >下架</el-link>
          <br />
          <!-- <el-link type="primary" @click="delGood(scope.row.id)">删除</el-link><br/>       -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="增加备注" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="备注" label-width="80px">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addremark(),dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  editLower,
  editRemark,
  editDelete,
  getCoupon,
  checkoutCoupon,
} from "@/api/api.js";
export default {
  name: "List",
  // inject:['reload'],    //引入 app中 刷新方法
  props: ["listInfo", "info", "getStateNum", "platformData"],
  watch: {
    listInfo: function (newV, oldV) {},
    info: function (newV, oldV) {},
  },
  data() {
    return {
      remarkId: "",
      dialogFormVisible: false,
      form: {
        remark: "",
      },
      checkFlag: true,
    };
  },
  methods: {
    tocoupon(url) {
      window.open(url, "_blank");
    },
    toMore(id) {
      this.$router.push({ path: "/Show", query: { id } });
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
    // 下架
    editLower(id) {
      let data = {
        id,
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
          this.getStateNum(); //重新获取 数量
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
    },
    //下架商品函数
    lower(id) {
      this.$confirm("是否下架此商品?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          // this.editLower(id);
          checkoutCoupon({ id }, this.info).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "请暂停此券！",
              });
              this.editLower(id);
            } else if (res.data.code == 403) {
              this.editLower(id);
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
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
    //添加或者更改备注的函数
    addremark() {
      if (this.form.remark == "" || this.form.remark == null) {
        this.$message({
          type: "error",
          message: "请填写备注!",
        });
        return false;
      }
      let data = {
        id: this.remarkId,
        goods_add_remark: this.form.remark,
      };
      editRemark(data, this.info).then((res) => {
        console.log(res, "resdsdsdsdsdsdsdsd");
        if (res.data.code == 200) {
          for (let i = 0; i < this.listInfo.length; i++) {
            //更新 成功后 更改试图
            if (this.remarkId == this.listInfo[i].id) {
              this.listInfo[i].goods_add_remark = data.goods_add_remark;
              console.log(data.goods_add_remark, "data.goods_add_remark");
            }
          }

          this.$message({
            type: "success",
            message: "已成功备注!",
          });
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
          });
        }
      });
    },
    remark(id, remark) {
      //点击出现 可以新加备注的 form
      if (remark != "") {
        //这里是 点击 出现 一个对话框 如果 已经有备注的话 把备注 渲染到 对话框的输入框中
        this.form.remark = remark;
      }
      this.remarkId = id;
    },

    //删除 商品信息的函数
    delGood(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id,
          };
          editDelete(data, this.info).then((res) => {
            if (res.data.code == 200) {
              for (let i = 0; i < this.listInfo.length; i++) {
                //更新 成功后 更改试图
                if (id == this.listInfo[i].id) {
                  this.listInfo.splice(i, 1);
                }
              }
              this.getStateNum(); //重新获取 数量
              this.$message({
                type: "success",
                message: "删除成功！",
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
            message: "已取消删除",
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
  color: #66b1ff;
}

.explanation {
  margin: 0 40px;
  text-align: right;
  color: #ccc;
  font-size: 12px;
  p {
    border: 1px solid #ccc;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
  }
}
</style>