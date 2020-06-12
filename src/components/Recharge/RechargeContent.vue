<template>
  <div class="showContent">
    <p>充值</p>
        <div style="margin-top:60px">
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
    </div>
  </div>
</template>

<script>
import { getRecharge } from "@/api/api.js";
export default {
  name: "ShowContent",
  props: ["info"],
  data() {
    return {
      formLabelAlign: {},
      moneyList: {},
      radio: ""
    };
  },
  created() {
    getRecharge(this.info).then(res => {
      if (res.data.code == 200) {
        this.moneyList = res.data.data;
        //console.log(res)
      }
    });
  },
  methods: {
    toNewPage() {
      window.open(
        `${this.$header}/index/Payment/getCode?tp=${this.radio}&userid=${this.info.user_id}`,
        "newwindow",
        "height=800px, width=1200px, top=100px, left=400px, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.showContent {
  width: 1200px;
  background: #fff;
  position: relative;
  min-height: 700px;
   p{
            margin: 40px 0 0 40px;
            font-size: 20px;
        }
}
</style>