<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/CatNameRatio' }">转化率</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>商家列表</el-breadcrumb-item> -->
    </el-breadcrumb>
    <el-table :data="tableData" border style="width: 1060px;margin:20px 0 40px 40px">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="cat_name" label="一级类目"></el-table-column>
      <el-table-column prop="ratio" label="转化率"></el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-link type="primary" @click="dialogVisible = true;id = scope.row.id">更新</el-link>
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

    <el-dialog title="修改转化率" :visible.sync="dialogVisible" width="60%">
      <el-input v-model="ratio" placeholder="请保留两位小数 如：0.16"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEditCatNameRatio()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import getAdminInfo from "@/utils/getAdminInfo.js";
import { getCatNameRatioList, addEditCatNameRatio } from "@/api/adminApi.js";
export default {
  name: "CatNameRatio",
  data() {
    return {
      tableData: [],
      info: {},
      total: 1,
      pageShowFlag: true,
      dialogVisible: false,
      page: 1,
      ratio: "", // 转化率
      id: "", // 修改转化率时 所需id
    };
  },
  created() {
    getAdminInfo(this.info);

    this.getCatNameRatioList({ page: 1 });
  },
  methods: {

    // 更新转化率
    addEditCatNameRatio() {
      addEditCatNameRatio({ id: this.id,ratio:this.ratio }, this.info).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: "更新成功！",
            type: "success",
          });
          this.dialogVisible = false
          this.getCatNameRatioList({page:this.page})
          this.ratio = ""
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
    getCatNameRatioList(data) {
      getCatNameRatioList(data, this.info).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
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

      this.getCatNameRatioList(data);
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