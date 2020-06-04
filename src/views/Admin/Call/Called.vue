<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/PublicPhone' }">呼叫中心</el-breadcrumb-item>
      <el-breadcrumb-item>已处理电话</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 列表部分 -->
    <div class="phoneList">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 600px">
        <el-table-column label="时间">
          <template slot-scope="scope">{{ scope.row.create_time }}</template>
        </el-table-column>
        <el-table-column label="店铺名">
          <template slot-scope="scope">{{ scope.row.has_one_phone_all.nick }}</template>
        </el-table-column>
        <el-table-column label="手机号话/电话">
          <template slot-scope="scope">{{ scope.row.has_one_phone_all.phone }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="getCallPerson(scope.row.has_one_phone_all.id,scope.row.has_one_phone_all.nick)">获取所有通话记录</el-link><br>
            <el-link type="primary" @click="dialogFormVisible = true;radio = (scope.row.type);id = (scope.row.id)">修改当前通话记录</el-link>
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
        <div v-else style="max-height:500px">
          <p
            style="width: 100%;text-align: center;line-height: 250px;font-size: 18px;color: #777;"
          >暂无数据</p>
        </div>
      </div>
      <el-dialog title="添加通话记录" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="状态" label-width="80px">
            <el-radio v-model="radio" :label="1">已接通</el-radio>
            <el-radio v-model="radio" :label="2">未接通</el-radio>
            <el-radio v-model="radio" :label="3">空号</el-radio>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false;send()">确 定</el-button>
        </div>
      </el-dialog>
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
import getAdminInfo from "@/utils/getAdminInfo.js";
import {
  myCalledPhones,
  getOnePhoneLog,
  editCalledResult
} from "@/api/adminApi.js";
export default {
  name: "Called",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      info: {},
      activities: [], // 存放 通话记录
      dialogFormVisible:false,
      radio:1,
      id:"",
      title:"",
      total:1,
      pageShow:true
    };
  },
  created() {
    getAdminInfo(this.info);
    this.myCalledPhones(1);
  },
  methods: {
    //分页切换函数
    handleCurrentChange(val) {
      this.myCalledPhones(val);
    },
    // table 列表 选中 函数
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 列表数据 传一个页数
    myCalledPhones(page) {
      myCalledPhones({page},this.info).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.tableData = res.data.data.data;
          this.total = res.data.data.total
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
      getOnePhoneLog({ al_id: id }, this.info).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.activities = res.data.data;
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    // 退回公海 操作
    backOpenSea(id) {
      backOpenSea({ id }, this.info).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
          for (let i = 0; i < this.tableData.length; i++) {
            //更新 成功后 更改试图
            if (id == this.tableData[i].id) {
              this.tableData.splice(i, 1);
            }
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    // 添加 记录
    send(){
      editCalledResult({id:this.id,type:this.radio},this.info).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
          for (let i = 0; i < this.tableData.length; i++) {
            //更新 成功后 更改试图
            if (this.id == this.tableData[i].id) {
              this.tableData[i].type = this.radio;
            }
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      })
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
  margin: 20px 0 40px 40px;
  display: flex;
}
.blank {
  width: 100%;
  height: 70px;
}
.tableRight {
  width: 420px;
  margin-left: 40px;
  border-radius: 4px;
  border: 1px solid #d2d2d2;
  margin-right: 40px;
  height: auto;
}
</style>