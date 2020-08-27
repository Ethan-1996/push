<template>
  <div class="showContent">
    <!-- <p>充值</p> -->
    <!-- <div style="margin-top:60px">
      <el-form label-width="140px" :model="formLabelAlign">
        <el-form-item label="充值金额：">
          <el-radio
            v-for="(value,key,index) in moneyList"
            :key="index"
            v-model="radio"
            :label="key"
          >{{value.order_amount}} + {{value.order_give}}(赠送)</el-radio>
        </el-form-item>
        <el-form-item label>
          <el-button @click="toNewPage" :disabled="this.radio==''?true:false">去支付</el-button>
        </el-form-item>
      </el-form>
    </div>-->
    <div class="content">
      <div
        :class="['itemBox']"
        v-for="(value,key,index) in moneyList"
        :key="index"
        @click="click(value.order_amount,key)"
      >
        <transition>
          <div :class="['item', 'item'+(index+1),{border:value.flag}]">
            <h2>充值{{value.order_amount}}积分</h2>
            <h4 v-if="index == 2" class="recommend">(推荐)</h4>
            <ul>
              <li>赠送{{value.order_give}}积分</li>
              <li v-if="index == 2 || index == 1">专属客服</li>
              <li v-if="index == 2">流量扶持</li>
            </ul>
            <h3>￥{{value.order_amount}}元</h3>
            <h5 style="height:84px"></h5>
            <img src="../../assets/images/fire.png" alt="" class="fire" v-if="index == 2">
          </div>
        </transition>
      </div>
    </div>
    <div class="button" @click="toNewPage"></div>
  </div>
</template>

<script>
import { getRecharge } from "@/api/api.js";
export default {
  name: "ShowContent",
  props: ["info"],
  data() {
    return {
      moneyList: {},
      tp: ""
    };
  },
  created() {
    getRecharge(this.info).then(res => {
      if (res.data.code == 200) {
        this.moneyList = res.data.data;
        for (let key in this.moneyList) {
          this.$set(this.moneyList[key], "flag", false);
        }
      }
    });
  },
  methods: {
    click(amount, key) {
      this.tp = key;
      for (let key in this.moneyList) {
        this.moneyList[key].flag = false;
        if (amount == this.moneyList[key].order_amount) {
          this.moneyList[key].flag = true;
        }
      }
    },
    toNewPage() {
      if (this.tp == "") {
        return false;
      }
      window.open(
        `${this.$header}/index/Payment/getCode?tp=${this.tp}&userid=${this.info.user_id}`,
        "newwindow",
        "height=800px, width=1200px, top=100px, left=400px, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.showContent {
  // width: 1200px;
  background: #fff;
  position: relative;
  min-height: 600px;
  p {
    margin: 40px 0 0 40px;
    font-size: 20px;
  }
  .button {
    position: absolute;
    bottom: 80px;
    margin-left: 430px;
    width: 120px;
    height: 30px;
    // border-radius: 15px;
    background: url("../../assets/images/alipay.png");
    background-size: cover;
    cursor: pointer;
  }
  .content {
    margin-top: 60px;
    padding: 0 20px;
    display: flex;
    .itemBox {
      margin-right: 95px;
      width: 260px;
      border: 1px solid rgba($color: #fff, $alpha: 0);
      .item {
        // transition: 80ms;
        position: relative;
        width: 200px;
        height: 280px;
        color: #fff;
        padding: 25px 20px;
        border-radius: 8px;
        box-shadow: 5px 5px 20px #aaa;
        .recommend{
          position: absolute;
          top: 65px;
          font-size: 16px;
        }
        .fire{
          position: absolute;
          top: 0;
          right: 0;
        }
        h2 {
          font-weight: 800;
          font-size: 30px;
        }
        ul {
          margin-left: 20px;
          margin-top: 60px;
          li {
            list-style: square;
            line-height: 26px;
            font-size: 16px;
          }
        }
        h3 {
          position: absolute;
          bottom: 25px;
          width: 186px;
          height: 40px;
          margin: auto;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          line-height: 40px;
        }
      }
      .item1 {
        background: url("../../assets/images/rechargebg1.png");
        background-size: cover;
      }
      .item2 {
        background: url("../../assets/images/rechargebg2.png");
        background-size: cover;
      }
      .item3 {
        background: url("../../assets/images/rechargebg3.png");
        background-size: cover;
      }
    }
    .item:hover {
      padding: 45px 40px !important;
      top: -20px;
      left: -10px;
      .recommend{
        top: 85px;
      }
    }
    .border {
      // border: 1px solid #b0d0fe;
      // border-radius: 8px;
      padding: 45px 40px !important;
      top: -20px;
      left: -10px;
      .recommend{
        top: 85px!important;
      }
    }
  }
}
</style>