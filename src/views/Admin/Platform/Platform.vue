<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 0px">
      <el-breadcrumb-item :to="{ path: '/Admin/Platform' }">平台管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/Admin/Platform' }"></el-breadcrumb-item>
    </el-breadcrumb>

    <div class="search" >
      <el-button
        type="primary"
        style="height:36px;margin:6px 0 0 10px "
        @click="dialogFormVisible = true"
      >新增平台类型</el-button>
      <el-button
        type="primary"
        style="height:36px;margin:6px 0 0 10px "
        @click="dialogFormVisibleWeb = true"
      >新增平台</el-button>
    </div>
    <el-table :data="tableData" border style="width:600px;margin:20px 0">
      <el-table-column prop="id" label="平台类型ID"></el-table-column>
      <el-table-column label="平台类型名称">
        <template slot-scope="scope">
          <span>{{scope.row.platform}}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台类型描述" width="220">
        <template slot-scope="scope">
          <span>{{scope.row.descri}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="dialogFormVisible2 = true;id = scope.row.id;form2.name = scope.row.platform;form2.descri = scope.row.descri"
          >修改</el-link>
          <br />
          <el-link type="primary" @click="del(scope.row.id)">删除</el-link>
          <br />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加平台类型" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="平台类型名称" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="平台类型描述" label-width="120px">
          <el-input v-model="form.descri" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;addPlatform()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改平台类型" :visible.sync="dialogFormVisible2">
      <el-form>
        <el-form-item label="平台类型名称" label-width="120px">
          <el-input v-model="form2.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="平台类型描述" label-width="120px">
          <el-input v-model="form2.descri" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false;editPlatform()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 这里开始 是 平台部分 -->
    <el-table :data="tableData2" border style="width:700px;margin:20px 0">
      <el-table-column prop="id" label="平台ID"></el-table-column>
      <el-table-column label="平台名称">
        <template slot-scope="scope">
          <span>{{scope.row.web_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属平台类型">
        <template slot-scope="scope">
          <span>{{scope.row.web_to_platform.platform}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="dialogFormVisibleWeb2 = true;webid = scope.row.id;webform2.name = scope.row.web_name"
          >修改</el-link>
          <br />
          <el-link type="primary" @click="deletePlatformWeb(scope.row.id)">删除</el-link>
          <br />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加平台" :visible.sync="dialogFormVisibleWeb">
      <el-form>
        <el-form-item label="所属平台类型" label-width="120px">
          <el-radio-group v-model="webform.platform_id">
            <el-radio :label="item.id" v-for="item in tableData" :key="item.id">{{item.platform}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="平台名称" label-width="120px">
          <el-input v-model="webform.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleWeb = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleWeb = false;addPlatformWeb()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改平台" :visible.sync="dialogFormVisibleWeb2">
      <el-form>
        <el-form-item label="平台名称" label-width="120px">
          <el-input v-model="webform2.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleWeb2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleWeb2 = false;editPlatformWeb()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import getAdminInfo from "@/utils/getAdminInfo.js";
import {
  addPlatform,
  getPlatform,
  editPlatform,
  deletePlatform,
  addPlatformWeb,
  getPlatformWeb,
  editPlatformWeb,
  deletePlatformWeb
} from "@/api/adminApi.js";
export default {
  name: "Platform",
  data() {
    return {
      info: {},
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      id: "",
      form: {
        name: "",
        descri:""
      },
      form2: {
        name: "",
         descri:""
      },

      tableData2: [],
      webform: {
        name: "",
        platform_id: ""
      },
      webform2: {
        name: ""
      },
      dialogFormVisibleWeb: false,
      dialogFormVisibleWeb2: false,
      webid: ""
    };
  },
  created() {
    getAdminInfo(this.info);
    this.getPlatform();
    this.getPlatformWeb();
  },
  methods: {
    // 删除 平台类型的函数
    del(id) {
      deletePlatform({ id }, this.info).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].id == id) {
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
    // 获取平台类型的函数
    getPlatform() {
      getPlatform(this.info).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    // 修改平台类型的函数
    editPlatform() {
      editPlatform({ id: this.id, platform: this.form2.name,descri:this.form2.descri }, this.info).then(
        res => {
          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success"
            });
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].id == this.id) {
                this.tableData[i].platform = this.form2.name;
                this.tableData[i].descri = this.form2.descri;
              }
            }
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error"
            });
          }
        }
      );
    },
    // 新增 平台类型的函数
    addPlatform() {
      addPlatform({ platform: this.form.name,descri: this.form.descri}, this.info).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
          this.getPlatform();
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },

    // 新增 平台的函数
    addPlatformWeb() {
      addPlatformWeb(
        { platform_id: this.webform.platform_id, web_name: this.webform.name },
        this.info
      ).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
          this.getPlatformWeb();
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    // 获取平台的函数
    getPlatformWeb() {
      getPlatformWeb(this.info).then(res => {
        if (res.data.code == 200) {
          this.tableData2 = res.data.data;
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
     // 删除平台的函数
    deletePlatformWeb(id) {
      deletePlatformWeb({ id }, this.info).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
          for (let i = 0; i < this.tableData2.length; i++) {
            if (this.tableData2[i].id == id) {
              this.tableData2.splice(i, 1);
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
    // 修改平台的函数
    editPlatformWeb() {
      editPlatformWeb(
        { id: this.webid, web_name: this.webform2.name },
        this.info
      ).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
          for (let i = 0; i < this.tableData2.length; i++) {
            if (this.tableData2[i].id == this.webid) {
              this.tableData2[i].web_name = this.webform2.name;
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
  width: 1080px;
  padding: 0 60px;
  min-height: 700px;
  background: #fff;
  position: relative;
}
.small {
  width: 400px;
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
.search {
  margin: 0 20px 0 0px;
  height: auto;
  background: #f8f8f8;
  border-radius: 4px;
  display: flex;
  padding-bottom: 6px;
  .searchItem {
    margin: 10px;
    label {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>