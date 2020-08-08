<template>
  <div class="releaseContent">
    <div class="releaseContentTop">
      <p>商品信息</p>
      <el-form ref="form" :model="formTop" label-width="90px" style="margin-top:40px">
        <el-form-item label="商品地址:">
          <div class="large">
            <el-input v-model="formTop.goods_url" :disabled="stepFlag" placeholder="请输入商品链接"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="优惠券地址:">
          <div class="large">
            <el-input v-model="formTop.coupon_url" placeholder="请输入商品优惠卷链接进行检测" :disabled="stepFlag"></el-input>

            <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
          </div>
        </el-form-item>
        <el-form-item v-show="!stepFlag">
          <el-button @click="getinfo" :disabled="checkCouponFlag" type="primary" style="width:500px" >校验商品</el-button>
        </el-form-item>
      </el-form>
      <!-- <span>建议领取一张券，不要贪多哦！</span>    -->
    </div>
    <div class="releaseContentBottom">
      <div class="form" v-show="stepFlag">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="商品地址:" v-if="false">
            <div class="large">
              <el-input v-model="form.goods_url" disabled></el-input>
            </div>
          </el-form-item>
          <el-form-item label="原价:">
            <div class="small">
              <el-input v-model="form.original_price" disabled>
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="券后价:">
            <div class="small">
              <el-input v-model="form.coupon_post_price" disabled>
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="佣金:" required>
            <div class="small">
              <el-input v-model="form.commission" placeholder="请填写佣金">
                <template slot="append">%</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="拍:">
            <div class="small">
              <el-input v-model="howMany" placeholder="1" type="number" @change="changeMany">
                <template slot="append">件</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="优惠券数量:">
            <div class="small">
              <el-input v-model="form.coupon_total_count" disabled></el-input>
            </div>
          </el-form-item>
          <el-form-item label="优惠券时间:">
            <div class="small">
              <el-input v-model="form.coupon_end_time" disabled></el-input>
            </div>
          </el-form-item>
          

          <el-form-item label="特殊活动:">
            <div class="middle">
              <el-input v-model="form.goods_add_remark" placeholder="非必填，4-10个字，商品额外的优惠信息"></el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="attention" v-show="!stepFlag">
        <h2>温馨提示：</h2>
        <p>1、开券日期不能超过7天。</p>
        <p>2、产品链接不能重复上传。</p>
        <p>3、店铺动态评分不低于4.7。</p>
        <p>4、部分淘宝店同行中不占优势。</p>
        <p class="red">5、天猫店铺基础销量不低于15，评价不低于5；淘宝 店铺80，评价20。</p>
      </div>
      <el-button
        @click="sendInfo"
        :disabled="sendFlag"
        type="primary"
        style="margin-bottom:40px"
        v-show="stepFlag"
      >提交商品</el-button>
    </div>
  </div>
</template>

<script>
import { checkCoupon, saveGoodsCoupon, getUploadIntegral } from "@/api/api.js";
export default {
  name: "ReleaseContent",
  props: ["goods_url", "info"],
  data() {
    return {
      num: 100, // 扣除商品需要的积分
      sendFlag: true,
      checkCouponFlag: false,
      coupon_url: "",
      form: {
        goods_url: "",
        original_price: "",
        coupon_post_price: "",
        commission: "",
        coupon_total_count: "",
        goods_add_remark: "",
        coupon_end_time: "",
        coupon_amount:""
      },
      howMany:"",
      formTop: {
        goods_url: "",
        coupon_url: ""
      },
      stepFlag:false    // 控制 表单现实的 标志 第二个 表单 
    };
  },
  created() {
    // this.formTop.goods_url = this.goods_url
  },
  methods: {
    changeMany(){
      
      if(this.howMany < 1){
        this.howMany = 1
        return false
      }
      this.howMany = parseInt(this.howMany)
      this.form.coupon_post_price = parseFloat(parseFloat(this.form.base_original_price) * this.howMany - parseFloat(this.form.coupon_amount)).toFixed(2)
      this.form.original_price = parseFloat(parseFloat(this.form.base_original_price) * this.howMany).toFixed(2)
    },
    getinfo() {
      //获取数据
      this.checkCouponFlag = true; //防抖
      if (this.formTop.coupon_url == "") {
        this.$message({
          message: "优惠券链接不能为空",
          type: "error"
        });
        this.checkCouponFlag = false;
        return false;
      }
      if (this.formTop.goods_url == "") {
        this.$message({
          message: "商品链接不能为空",
          type: "error"
        });
        this.checkCouponFlag = false;
        return false;
      }

      let data = {
        coupon_url: this.formTop.coupon_url,
        goods_url: this.formTop.goods_url
      };
      checkCoupon(data, this.info).then(res => {
        console.log("newwwwwwww", res);
        if (res.data.code == 200) {
          //请求成功数据  转换数据 给 子组件
          
          this.form = res.data.data;
          this.form.goods_url = this.goods_url;
          this.form.coupon_end_time =
            this.form.coupon_start_time + "至" + this.form.coupon_end_time;

          this.form.base_original_price = this.form.original_price
          this.checkCouponFlag = false; // 节流 button 取消禁用
          this.sendFlag = false;
          this.stepFlag = true
          console.log(this.form);
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
          this.checkCouponFlag = false;
        }
      });
    },
    sendInfo() {
      if (
        this.form.commission == "" ||
        this.form.commission == undefined ||
        this.form.commission == null
      ) {
        this.$message({
          message: "请填写佣金！",
          type: "error"
        });
        return false;
      }
      getUploadIntegral(this.info).then(res => {
        if (res.data.code == 200) {
          this.num = res.data.data.integral;

          this.$confirm(`此操作将扣除${this.num}积分, 是否继续?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.sendFlag = true; //节流
              let data = {
                coupon_url: this.formTop.coupon_url,
                commission: this.form.commission,
                post_coupon_price: this.form.coupon_post_price,
                goods_add_remark: this.form.goods_add_remark,
                buy_num:this.howMany
              };
              saveGoodsCoupon(data, this.info).then(res => {
                console.log("newwwwwwww", res);
                if (res.data.code == 200) {
                  //请求成功数据  转换数据 给 子组件
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.sendFlag = false;
                  this.$router.push("/History");
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "error"
                  });
                  this.sendFlag = false;
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消发布"
              });
            });
        } else {
          this.$message({
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
.releaseContent {
  .inputBox {
    .el-input__inner {
      margin-top: 20px;
    }
  }
  .releaseContentBottom {
    .el-button {
      width: 150px;
      margin: 30px 0 0 160px;
    }
  }
}
</style>
<style lang="scss" scoped>
.releaseContent {
  padding-left: 80px;
  width: 1120px;
  background: #fff;
  min-height: 700px;
  .releaseDivider {
    width: 55%;
  }
  .releaseContentTop {
    p {
      margin: 40px 0 0 6px;
      font-size: 18px;
    }
    span {
      position: relative;
      left: 20px;
      top: 25px;
    }
  }
  .inputBox {
    width: 500px;
    margin-left: 105px;
  }
  .releaseContentBottom {
    margin-top: 30px;
    p {
      margin: 0 0 0 20px;
      font-size: 18px;
      margin-bottom: 30px;
    }

    .small {
      width: 190px;
    }
    .middle {
      width: 340px;
    }
  }
  .large {
    width: 500px;
  }
  .attention{
    margin-top: 60px;
    margin-bottom: 40px;
    width: 410px;
    background: #eff3f6;
    margin-left: 90px;
    padding: 40px 60px 40px 30px;
    border-radius: 4px;
    h2{
      color: red;
      font-size: 16px;
      font-weight: 800;
      margin-bottom: 40px;
    }
    p{
      margin: 0;
      margin-bottom: 15px;
      line-height: 24px;
      font-size: 16px;
    }
    .red{
      color: red;
    }

  }
}
</style>