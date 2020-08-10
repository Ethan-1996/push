<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 0px">
      <el-breadcrumb-item :to="{ path: '/Admin/RechargeList' }">发票管理</el-breadcrumb-item>
      <el-breadcrumb-item>发票列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已提交待处理" name="1"></el-tab-pane>
        <el-tab-pane label="已开发票待邮寄" name="2"></el-tab-pane>
        <el-tab-pane label="已邮寄" name="3"></el-tab-pane>
        <el-tab-pane label="已收到" name="4"></el-tab-pane>
    </el-tabs>
    <div class="search">
      <div class="searchItem">
        <label for="">电话/店铺名/订单号：</label>
        <el-input placeholder="请输入电话/店铺名/订单号" v-model="keywords" style="width:400px"></el-input>
      </div>
      
      <el-button
        type="primary"
        style="height:36px;margin:12px 0 0 10px " 
        @click="search" 
      >搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 1060px;margin-top:20px">
      <el-table-column prop="create_time" label="申请时间" width="155"></el-table-column>
      <el-table-column label="店铺名">
        <template slot-scope="scope">
          
          <span>{{scope.row.has_one_user.nick}}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话">
        <template slot-scope="scope">
          
          <span>{{scope.row.has_one_user.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="快递公司">
        <template slot-scope="scope">
          <span v-if="scope.row.express_name == null">暂无快递信息</span>
          <span v-else>{{scope.row.express_name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="快递编码">
        <template slot-scope="scope">
          <span v-if="scope.row.express_number == null">暂无编号</span>
          <span v-else>{{scope.row.express_number}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="invoice_title" label="发票抬头"></el-table-column>
      <el-table-column label="发票状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">已申请</span>
          <span v-else-if="scope.row.status == 2">已开</span>
          <span v-else-if="scope.row.status == 3">已邮寄</span>
          <span v-else-if="scope.row.status == 4">已签收</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="primary" v-if="scope.row.status == 1" @click="issued(scope.row.id)">开具发票</el-link>
          <el-link type="primary" v-else-if="scope.row.status == 2" @click="dialogVisible = true,form.id = scope.row.id">邮寄发票</el-link>
          <span v-else>不可进行操作</span>
        </template>
      </el-table-column>
    </el-table>
        <el-dialog
          title="邮寄发票"
          :visible.sync="dialogVisible"
          width="50%"
          >
          <el-form :model="form">
                <el-form-item label="快递名称" label-width="80px">
                    <el-input v-model="form.express_name" autocomplete="off"></el-input>
                </el-form-item>
               <el-form-item label="快递单号" label-width="80px">
                    <el-input v-model="form.express_number" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false,mail()">确 定</el-button>
          </span>
        </el-dialog>
    <!-- 分页部分 -->
    <div class="page" v-if="pageShowFlag">
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
import { getInvoiceListAd,handleInvoice,mailInvoice } from "@/api/adminApi.js";
export default {
  name: "Invoice",
  data() {
    return {
      tableData: [],
      info: {},
      total:1,
      pageShowFlag:true,
      activeName:"1",
      keywords:"",
      dialogVisible:false,
      form:{
          id:"",
          express_number:"",
          express_name:""
      }
    };
  },
  created() {
    getAdminInfo(this.info);

    let data = {
            status:this.activeName,
            page:1,
            keywords:this.keywords
    }
    this.getInvoiceListAd(data)
  },
  methods: {
      handleClick(tab, event) {
        let data = {
            status:tab.name,
            page:1,
            keywords:this.keywords
        }
        this.getInvoiceListAd(data)
      },
      // 获取 列表数据函数
      getInvoiceListAd(data){
          getInvoiceListAd(data,this.info).then(res => {
              if(res.data.code == 200){
                  this.tableData = res.data.data.data
                  this.total = res.data.data.total 
              }else{
                  this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'error'
                });
              }
          })
      },
       // 分页函数
        handleCurrentChange(val) {
            //this.getInvoiceList(val);
            let data = {page:val,status:this.activeName,keywords:this.keywords}
            this.getInvoiceListAd(data)
        },
      //开局发票函数
      issued(id){
          handleInvoice({id},this.info).then(res => {
              if(res.data.code == 200){
                  for (let i = 0; i < this.tableData.length; i++) {
                        if(this.tableData[i].id == id){
                            this.tableData.splice(i,1)
                        }
                    }
                  this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                });
              }else{
                  this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'error'
                });
              }
          })
      },
      // 搜索函数
      search(){
            let data = {page:1,status:this.activeName,keywords:this.keywords}
            this.getInvoiceListAd(data)
            this.pageShow()
      },
      // 分页不正常显示
       pageShow(){
        this.pageShowFlag =  false;
        this.$nextTick(() => {
          this.pageShowFlag =  true;
        })
      },
      mail(){
          mailInvoice(this.form,this.info).then(res => {
              if(res.data.code == 200){
                  for (let i = 0; i < this.tableData.length; i++) {
                        if(this.tableData[i].id == this.form.id){
                            this.tableData.splice(i,1)
                        }
                    }
                  this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                });
              }else{
                  this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'error'
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
  width: 1080px;
  padding: 0 60px;
  min-height: 700px;
  background: #fff;
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
  .search{
    margin:0  20px 0 0px;
    height: auto;
    background: #f8f8f8;
    border-radius: 4px;
    display: flex;
    .searchItem{
      margin: 10px;
      label{
        display: inline-block;
        width:140px;
      }
    }
  }
</style>