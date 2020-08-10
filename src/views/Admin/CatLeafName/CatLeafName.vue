<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/CatLeafName' }">商品类目</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>商家列表</el-breadcrumb-item> -->
    </el-breadcrumb>
    <el-table :data="tableData" border style="width: 1060px;margin:20px 0 40px 40px">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="cat_name" label="一级类目" width="180"></el-table-column>
      <el-table-column prop="cat_leaf_name" label="二级类目" width="180"></el-table-column>

      <el-table-column label="类目别名">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.name_to_son" :key="index">{{item.name}},</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="dialogVisible = true;sonListInfo = scope.row.name_to_son;id = scope.row.id"
          >编辑</el-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页部分 -->
    <div class="blank"></div>
    <div class="page" v-if="pageShowFlag">
      <el-pagination
        background
        :page-size="10"
        @current-change="handleCurrentChange"
        :current-page="page"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog title="修改别名" :visible.sync="dialogVisible" width="60%">
      <el-button type="primary" plain style="margin-bottom:20px" @click="innerVisible2 = true">新增</el-button>
      <el-table :data="sonListInfo" border>
        <el-table-column prop="id" label="ID" width="80"></el-table-column>

        <el-table-column label="类目别名">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="innerVisible = true;name = scope.row.name;changeId = scope.row.id"
            >修改</el-link>
            <el-link type="primary" @click="deleteSon(scope.row.id)" style="margin-left:20px">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      <!--   内层 修改 二级类目 -->
      <el-dialog width="30%" title="更正别名" :visible.sync="innerVisible" append-to-body>
        <el-input v-model="name"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSon()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 内层 新增 二级类目  -->
      <el-dialog width="30%" title="新增别名" :visible.sync="innerVisible2" append-to-body>
        <el-input v-model="newCatName" placeholder="请输入二级类目名称"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="addSon()">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import getAdminInfo from "@/utils/getAdminInfo.js";
import {
  getCatLeafNameList,
  addSon,
  editSon,
  deleteSon,
} from "@/api/adminApi.js";
export default {
  name: "CatLeafName",
  data() {
    return {
      changeId: "", //修改的id    修改二级类目
      id: "", // 修改的id 新增二级类目
      tableData: [],
      info: {},
      total: 1,
      pageShowFlag: true,
      dialogVisible: false,
      innerVisible: false,
      innerVisible2: false,
      sonListInfo: [],
      name: "",
      newCatName: "",
      page: 1,
    };
  },
  created() {
    getAdminInfo(this.info);

    this.getCatLeafNameList({ page: 1 });
  },
  methods: {
    update() {
      this.getCatLeafNameList({ page: this.page },1);
    },
    // 修改二级类目
    editSon() {
      editSon({ id: this.changeId, name: this.name }, this.info).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: "修改成功！",
            type: "success",
          });
          this.name = ""
          this.innerVisible = false;
          this.update();
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },

    // 删除二级类目
    deleteSon(id) {
      deleteSon({ id: id }, this.info).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: "删除成功！",
            type: "success",
          });
          this.update();
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },

    // 新增二级类目
    addSon() {
      addSon(
        { cat_leaf_name_id: this.id, name: this.newCatName },
        this.info
      ).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: "新增成功！",
            type: "success",
          });
          this.newCatName = ""
          this.innerVisible2 = false;
          this.update();
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    // 获取列表函数
    getCatLeafNameList(data, type) {
      getCatLeafNameList(data, this.info).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
          if (type == 1) {
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].id == this.id) {
                this.sonListInfo = this.tableData[i].name_to_son;
              }
            }
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    // 分业切换
    handleCurrentChange(val) {
      this.page = val;
      let data = { page: val };

      this.getCatLeafNameList(data);
    },
    pageShow() {
      this.pageShowFlag = false;
      this.$nextTick(() => {
        this.pageShowFlag = true;
      });
    },
  },
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
  margin: 0 40px 0 40px;
  height: auto;
  background: #f8f8f8;
  border-radius: 4px;
  display: flex;
  .searchItem {
    margin: 10px;
    label {
      display: inline-block;
      width: 60px;
    }
  }
}
</style>