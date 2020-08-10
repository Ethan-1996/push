<template>
  <div class="mine">
      <el-breadcrumb separator="/" style="margin:20px 0 20px 0px">
      <el-breadcrumb-item :to="{ path: '/Admin/Mine' }">我的</el-breadcrumb-item>
      <el-breadcrumb-item>我的信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="140px" :model="formLabelAlign" style="margin-top:40px">
      <el-form-item label="用户名：">
        <span>{{formLabelAlign.username}}</span>
      </el-form-item>
      <el-form-item label="电话：">
        <span>{{formLabelAlign.phone}}</span>
      </el-form-item>
      <el-form-item label="注册时间：">
        <span>{{formLabelAlign.create_time}}</span>
      </el-form-item>
      <el-form-item label="专属邀请链接：">
        <span>{{formLabelAlign.invited_url}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import getAdminInfo from "@/utils/getAdminInfo.js";
import { getAccountInfo } from "@/api/adminApi.js";
export default {
  name: "Mine",
  data() {
    return {
      formLabelAlign: {},
      info:{}
    };
  },
  created() {
      getAdminInfo(this.info)


      getAccountInfo(this.info).then(res => {
          if (res.data.code == 200) {
          this.formLabelAlign = res.data.data;
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      })
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
</style>