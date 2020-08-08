<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/AdminList' }">管理员设置</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
        <div class="top">
            <div class="small">
                <p>按姓名查询</p>
                <el-input placeholder="请输入姓名" v-model="searchName"></el-input>
            </div>
            <div class="small">
                <p>按电话号码查询</p>
                <el-input placeholder="请输入电话" v-model="searchPhone"></el-input>
            </div>
        </div>
        <el-button style="margin:20px 0 10px 30px" @click="searchAs">搜 索</el-button><el-link @click="reset" type="info" style="margin:30px 0 10px 30px;padding:5px">清空</el-link>
    </div>
    <el-table
    :data="tableData"
    border
    style="width: 1000px;margin: 60px auto">
    <el-table-column
      prop="create_time"
      label="创建时间"
      >
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="update_time"
      label="更新时间">
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态">
      <template slot-scope="scope">
        <span v-if="scope.row.state == 1">已启用</span>
        <span v-else>已停用</span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-link type="primary" @click="dialogFormVisible = true,change(scope.row)">修改</el-link><br>
        <el-link type="primary" @click="start(scope.row.id)" v-if="scope.row.state != 1">启用</el-link>
        <el-link type="primary" @click="stop(scope.row.id)" v-else>停用</el-link>
      </template>
    </el-table-column>
  </el-table>

    <el-dialog title="修改" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="用户名" label-width="80px">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" label-width="80px">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false,send()">确 定</el-button>
        </div>
    </el-dialog>
  <div class="page" v-if="pageShow">
      <el-pagination
        background
        :page-size="10"
         @current-change="handleCurrentChange"
        layout="prev, pager, next,total"
        :total="total">
        </el-pagination>
  </div>
  </div>
</template>

<script>
import {getAdminList,enableAdmin,disableAdmin,editAdmin} from '@/api/adminApi.js';
import getAdminInfo from '@/utils/getAdminInfo.js';
export default {
    name:'AdminList',
    data(){
        return {
            searchPhone:"",
            searchName:"",
            tableData:[],
            info:{},
            total:1,
            page:1, //当前页数
            pageShow:true,  //控制分页显示
            dialogFormVisible:false,
            form:{
                id:"",
                username:"",
                phone:"",
                password:""
            }
        }
    },
    created(){

      getAdminInfo(this.info)
      if(!this.info){
          return false
      }
        this.getAdminList(1)
    },
    methods:{
        //获取 列表  的函数
      getAdminList(page,others){
          let data = {
              page
          }
          if(others){
              data = {
                  page,
                  ...others
              }
          }
          getAdminList(data,this.info).then(res => {
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
      // 启用管理员函数
      start(id){
          enableAdmin({id},this.info).then(res => {
                if(res.data.code == 200){
                    this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                    for(let i = 0;i<this.tableData.length;i++){
                        if(this.tableData[i].id == id){
                            this.tableData[i].state = 1
                        }
                    }
                }else{
                    this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'error'
                    });
                }
          })
      },
      // 停用管理员函数
      stop(id){
          disableAdmin({id},this.info).then(res => {
                if(res.data.code == 200){
                    this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                    for(let i = 0;i<this.tableData.length;i++){
                        if(this.tableData[i].id == id){
                            this.tableData[i].state = 2
                        }
                    }
                }else{
                    this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'error'
                    });
                }
          })

      },
      // 搜索的函数
      searchAs(){
          this.page = 1
          this.getAdminList(this.page,{username:this.searchName,phone:this.searchPhone})
          this.pageShow = false
          this.$nextTick(()=>{
              this.pageShow = true
          })
      },
      // 清空重置
      reset(){
          if(this.searchName || this.searchPhone){
            this.searchName = ""
            this.searchPhone = ""
            this.getAdminList(1)
          }
          
      },
       handleCurrentChange(val) {
            this.page = val
            this.getAdminList(this.page,{username:this.searchName,phone:this.searchPhone})
            //console.log(`当前页: ${val}`);
      },
      change(item){
          //console.log(item)
          this.form.username = item.username
          this.form.phone = item.phone
          this.form.id = item.id    

          
      },
      // 修改管理员得提交函数
      send(){
          let data = {
              id:this.form.id,
              username:this.form.username,
              phone:this.form.phone,
              password:this.$md5('$' + this.form.password)
          }
          editAdmin(data,this.info).then(res => {
              if(res.data.code == 200){
                  this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                    this.form.username = ""
                    this.form.phone = ""
                    this.form.password = ""
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
}
</script>
<style lang="scss">
.search{
    .el-button{
        padding: 8px 26px;
    }
}
</style>
<style lang="scss" scoped>
    .settingContent{
        width: 1200px;
        min-height: 700px;
        background: #fff;
        position: relative;
    }
    .small{
        width:400px;
        margin-left: 20px;
    }
    .search{
        width: 1000px;
        margin: 50px auto;
        border-radius: 4px;
        border: 1px solid #d2d2d2;
        padding: 10px;
        .top{
            display: flex;
            justify-content: flex-start;
            padding: 10px;
        }
        p{
            margin: 8px;
        }
    }
    .page{
        width: 1200px;
        text-align: center;
        position: absolute;
        bottom: 10px;
    }

</style>