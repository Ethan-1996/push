<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/PublicPhone' }">呼叫中心</el-breadcrumb-item>
      <el-breadcrumb-item>电话公海</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="uploadBox">
      <!-- 上传部分 -->
      <UploadPhone />

      <el-button
        size="small"
        type="primary"
        style="height:36px;margin:16px 0 0 100px"
        @click="claim"
      >认领选中</el-button>
    </div>
    <!-- 列表部分 -->
    <div class="phoneList">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 550px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="店铺名">
          <template slot-scope="scope">{{ scope.row.nick }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号话/电话"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="getCallPerson(scope.row.id,scope.row.nick)">获取联系记录</el-link>
          </template>
        </el-table-column>
      </el-table>

      <div class="tableRight">
        <p style="padding:20px;font-size:18px">通话记录 {{title}}</p>
        <el-timeline :reverse="true" v-if="activities.length != 0" style="margin:20px 0 0 40px">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.create_time"
          >{{activity.has_one_admin.username}} 
            <template slot>
              <span v-if="activity.type == 1">接通</span>
              <span v-if="activity.type == 2">未接通</span>
              <span v-if="activity.type == 3">空号</span>
            </template>
          </el-timeline-item>
        </el-timeline>
        <div v-else>
            <p style="width: 100%;text-align: center;line-height: 250px;font-size: 18px;color: #777;">暂无数据</p>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
import UploadPhone from "@/components/Admin/Call/UploadPhone.vue";
import getAdminInfo from "@/utils/getAdminInfo.js";
import { getOpenSeaPhones, claimPhone,getOnePhoneLog } from "@/api/adminApi.js";
export default {
  name: "SettingShops",
  components: {
    UploadPhone
  },
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      info: {},
      total: 1,             //分页总数
      pageShow: true,       //分页展示
      multipleSelection: [], // 存放 表格选中的节点
      activities:[],    // 存放 通话记录
      title:""
    };
  },
  created() {
    getAdminInfo(this.info);
    this.getOpenSeaPhones(1);
  },
  methods: {
    // table 列表 选中 函数
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 列表数据 传一个页数
    getOpenSeaPhones(page) {
      getOpenSeaPhones({ page }, this.info).then(res => {
        if (res.data.code == 200) {
          console.log(res);
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
    getCallPerson(id,title) {
      this.title = title
      getOnePhoneLog({al_id:id},this.info).then(res => {
        if(res.data.code == 200){
          console.log(res)
          this.activities = res.data.data
        }else{
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      })
    },
    //分页切换函数
    handleCurrentChange(val) {
      this.getOpenSeaPhones(val);
    },
    // 选中 的 对象提交函数 认领手机号码
    claim() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          showClose: true,
          message: "请先选择要认领的电话！",
          type: "error"
        });
        return false;
      }
      // 取出需要的id
      let data = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        data.push(this.multipleSelection[i].id);
      }
      claimPhone({ all_id: data }, this.info).then(res => {
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
<style lang="scss">
.settingContent {
  .cell {
    text-align: center;
  }
}
</style>
<style lang="scss" scoped>
.settingContent {
  width: 1200px;
  min-height: 700px;
  background: #fff;
  position: relative;
  .page {
    width: 1200px;
    text-align: center;
    position: absolute;
    bottom: 10px;
  }
}
.small {
  width: 400px;
}
.uploadBox {
  width: 1120px;
  height: auto;
  background: #eee;
  border-radius: 4px;
  margin: auto;
  display: flex;
}
.phoneList {
  margin: 20px 0 0 40px;
  display: flex;
}
.blank {
  width: 100%;
  height: 70px;
}
.tableRight{
  width: 480px;
  margin-left: 40px;
  border-radius: 4px;
  border: 1px solid #d2d2d2;
  margin-right: 40px;
}
</style>