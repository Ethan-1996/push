<template>
  <div class="releaseContent person">
    <p>我的店铺</p>
    <div style="margin-top:60px">
      <el-form label-width="140px" :model="formLabelAlign">
        <el-form-item label="店铺名：">
          <span>{{formLabelAlign.nick}}</span>
        </el-form-item>
        <el-form-item label="电话：">
          <span>{{formLabelAlign.phone}}</span>
        </el-form-item>
        <el-form-item label="注册时间：">
          <span>{{formLabelAlign.create_time}}</span>
        </el-form-item>
        <el-form-item label="剩余积分：">
          <span>{{formLabelAlign.integral}}</span>
        </el-form-item>
        <el-form-item label="专属邀请链接：">
          <span id="invited_url">{{formLabelAlign.invited_url}}</span>
          <input type="button" value="一键复制" @click="copy('invited_url')" class="copy" />
        </el-form-item>
        <el-form-item label="分享好礼：" style="color:red">
          <p style="color:red;line-height:20px;font-size:14px;margin-top:10px">1. 成功邀请好友后，即得10积分。</p>
          <p style="color:red;line-height:20px;font-size:14px;margin:0">2. 好友首次充值，即得充值20%积分。</p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { showInfo, getRecharge } from "@/api/api.js";
export default {
  name: "PersonCenterCon",
  props: ["info"],
  data() {
    return {
      showFlag: false,
      formLabelAlign: {},
      moneyList: {},
      radio: "",
    };
  },
  created() {
    showInfo(this.info).then((res) => {
      if (res.data.code == 200) {
        this.formLabelAlign = res.data.data;
      }
    });

    getRecharge(this.info).then((res) => {
      if (res.data.code == 200) {
        this.moneyList = res.data.data;
      }
    });
  },
  methods: {
    copy(id, attr) {
      /**
       * 一键粘贴
       *   {String} id [需要粘贴的内容]
       *   {String} attr [需要 copy 的属性，默认是 innerText，主要用途例如赋值 a 标签上的 href 链接]
       *
       * range + selection
       *
       * 1.创建一个 range
       * 2.把内容放入 range
       * 3.把 range 放入 selection
       *
       * 注意：参数 attr 不能是自定义属性
       * 注意：对于 user-select: none 的元素无效
       * 注意：当 id 为 false 且 attr 不会空，会直接复制 attr 的内容
       */
      let target = null;

      if (attr) {
        target = document.createElement("div");
        target.id = "tempTarget";
        target.style.opacity = "0";
        if (id) {
          let curNode = document.querySelector("#" + id);
          target.innerText = curNode[attr];
        } else {
          target.innerText = attr;
        }
        document.body.appendChild(target);
      } else {
        target = document.querySelector("#" + id);
      }

      try {
        let range = document.createRange();
        range.selectNode(target);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        this.$message({
          showClose: true,
          duration: 1000,
          message: "复制成功!",
          type: "success",
        });
      } catch (e) {
        this.$message({
          showClose: true,
          duration: 1000,
          message: "复制失败!",
          type: "error",
        });
      }

      if (attr) {
        // remove temp target
        target.parentElement.removeChild(target);
      }
    },
    toNew() {
      this.$router.push("/Recharge");
    },
  },
};
</script>

<style lang="scss">
.person {
  .el-form-item:nth-of-type(6) {
    .el-form-item__label {
      color: red !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.releaseContent {
  padding-left: 40px;
  width: 1160px;
  background: #fff;
  min-height: 700px;
  p {
    margin-top: 40px;
    font-size: 20px;
  }
  .copy {
    width: 60px;
    height: 23px;
    line-height: 23px;
    background: #3991e8;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>