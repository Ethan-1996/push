<template>
  <div class="appeal">
    <el-breadcrumb separator="/" style="margin:30px 0 30px 0px">
        <el-breadcrumb-item :to="{ path: '/Admin/Appeal' }">申诉</el-breadcrumb-item>
        <el-breadcrumb-item>申诉列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核" name="1"></el-tab-pane>
        <el-tab-pane label="审核通过" name="2"></el-tab-pane>
        <el-tab-pane label="审核未通过" name="3"></el-tab-pane>
    </el-tabs>
    <div class="search">
      <div class="searchItem">
        <label for="">电话/店铺名：</label>
        <el-input placeholder="请输入电话/店铺名" v-model="keywords" style="width:400px"></el-input>
      </div>
      
      <el-button
        type="primary"
        style="height:36px;margin:12px 0 0 10px " 
        @click="search" 
      >搜索</el-button>
    </div>
     <el-table
    :data="tableData"
    border
    style="width: 900px;margin:30px 0 40px 0px">
    <el-table-column
      prop="create_time"
      label="创建时间"
      width='160'>
    </el-table-column>
    <el-table-column
      prop="nick"
      label="店铺名称"
      width='160'>
    </el-table-column>
    <el-table-column
      label="图片"
      >
      <template slot-scope="scope">
          <!-- <img :src="scope.row.nick_pic" alt=""> -->
          <el-image style="width: 100px; height: 100px" :src="$header + scope.row.nick_pic" fit="cover" @click="dialogVisible2 = true,url = ($header + scope.row.nick_pic)"></el-image>
      </template>
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      >
    </el-table-column>
    <el-table-column
      label="状态"
      >
      <template slot-scope="scope">
        <span v-if="scope.row.state == 1">待审核</span>
        <span v-if="scope.row.state == 2">审核通过</span>
        <span v-if="scope.row.state == 3">审核不通过</span>
      </template>
    </el-table-column>
    <el-table-column
      label="备注"
      width="120px">
      <template slot-scope="scope">
        
        <span v-if="scope.row.mark">{{scope.row.mark}}</span>
        <span v-else>暂无备注</span>
      </template>
    </el-table-column>

    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-link type="primary" @click="dialogVisible = true,form.id = scope.row.id,passOrNot=1" v-if="scope.row.state == 1">审核通过</el-link><br v-if="scope.row.state == 1">
        <el-link type="primary" @click="dialogVisible = true,form.id = scope.row.id,passOrNot=2" v-if="scope.row.state == 1">不通过</el-link>
        <span  v-if="scope.row.state != 1">无可进行操作</span>
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
                :current-page="1"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog
          title="备注"
          :visible.sync="dialogVisible"
          width="30%"
          >
          <el-form :model="form">
                <el-form-item label="备注" label-width="80px">
                    <el-input v-model="form.mark" autocomplete="off"></el-input>
                </el-form-item>
               
            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false,send()">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
            title="查看大图"
            :visible.sync="dialogVisible2"
            width="60%"
            >
            <el-image :src="url" fit="cover"></el-image>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
            </span>
            </el-dialog>
  </div>
</template>

<script>
import getAdminInfo from '@/utils/getAdminInfo.js';
import {getAppealList,appealFail,appealAdopt} from '@/api/adminApi.js'
export default {
    name:"Appeal",
    data() {
      return {
        info:{},
        activeName: '1',
        pageShowFlag:true,
        total:1,
        tableData:[],
        keywords:"",
        dialogVisible:false,
        form:{
            mark:"",
            id:""
        },
        passOrNot:1 ,// 通过 还是不通过类型
        dialogVisible2:false,
        url:"",//大图地址
      };
    },
    created(){
        getAdminInfo(this.info)
        let data = {
            state:this.activeName,
            page:1
        }
        this.getAppealList(data)
    },
    methods: {
      handleClick(tab, event) {
        let data = {
            state:tab.name,
            page:1,
            keywords:this.keywords
        }
        this.getAppealList(data)
      },
      getAppealList(data){
          getAppealList(data,this.info).then(res => {
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
       // 分业切换
      handleCurrentChange(val){
        let data = {page:val,state:this.activeName,keywords:this.keywords}
        
        this.getAppealList(data)
      },
      pageShow(){
        this.pageShowFlag =  false;
        this.$nextTick(() => {
          this.pageShowFlag =  true;
        })
      },
      // 申诉通过的函数
      send(){
          switch (this.passOrNot) {
              case 1:
                   appealAdopt(this.form,this.info).then(res => {
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
                  break;
              case 2:
                 appealFail(this.form,this.info).then(res => {
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
                  break;
          
              default:
                  break;
          }
         
      },
      // sousuo 
      search(){
            let data = {page:1,state:this.activeName,keywords:this.keywords}
            this.getAppealList(data)
            this.pageShow()
      }
    }
}
</script>

<style lang="scss" scoped>
.appeal{
    width: 1100px;
    min-height: 700px;
    background: #fff;
    position: relative;
    padding: 0 50px;
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
        width:100px;
      }
    }
  }
</style>