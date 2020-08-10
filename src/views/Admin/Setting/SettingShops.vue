<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/SettingPowers/Change' }">系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>商家设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
    :data="tableData"
    border
    style="width: 620px;margin:80px 0 0 120px">
    <el-table-column
      prop="id"
      label="序号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      width="240">
    </el-table-column>
    <el-table-column
      prop="num"
      label="获得积分"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-link type="primary" @click="dialogFormVisible2 = true,add(scope.row.id)" v-if="scope.row.show">添加</el-link>
        <el-link type="primary" @click="dialogFormVisible = true,change(scope.row.id)" v-else>修改</el-link>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="修改数据" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form " label-width="120px">
       <el-form-item label="要更改的积分">
            <div class="small">
                <el-input v-model="form.integral"></el-input>
            </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,submitForm()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加数据" :visible.sync="dialogFormVisible2">
      <el-form :model="form2" ref="form2" label-width="120px">
       <el-form-item label="要新增的积分">
            <div class="small">
                <el-input v-model="form2.integral"></el-input>
            </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false,submitForm2()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import getAdminInfo from '@/utils/getAdminInfo.js';
import {getRegistInteg,getInvitationInteg,getUploadInteg,addRegistInteg,addInvitationInteg,addUploadInteg,editRegistInteg,editInvitationInteg,editUploadInteg} from '@/api/adminApi.js';
export default {
    name:'SettingShops',
    data(){
        return {
            tableData:[
              {id:1,type:"商家注册积分设置",num:10,show:true},
              {id:2,type:"商家邀请商家积分设置",num:10,show:true},
              {id:3,type:"上传商品扣除积分设置",num:10,show:true},
            ],
            info:{},
            dialogFormVisible:false,  //修改的对话框
            form:{                    // 修改的表单
              integral:"",
              id:-1
            },
            dialogFormVisible2:false,  //添加初始值 的对话框
            form2:{                     //添加的 表单
              integral:"",
              id:-1
            },
        }
    },
    created(){
      getAdminInfo(this.info)

      //获取 三个板块初始值
      getRegistInteg(this.info).then(res => {
        this.getAfter(res,0)
      })
      getInvitationInteg(this.info).then(res => {
        this.getAfter(res,1)
      })
      getUploadInteg(this.info).then(res => {
        this.getAfter(res,2)
      })
    },
    methods:{
      // 获取后 执行的函数
      getAfter(res,index){
        if(res.data.code == 200){
          if(res.data.data){
            this.tableData[index].num = res.data.data.integral
            this.tableData[index].show = false
          }else{
            this.tableData[index].num = "请先设置" 
            this.tableData[index].show = true
          }
        }else{
          this.tableData[index].num = "请先设置" 
          this.tableData[index].show = true
        }
      },

      // 点修改时 走的函数
      change(id){
        this.form.id = id 
        this.form.integral = this.tableData[id - 1].num
        
      },
      // 修改的提交函数
      submitForm(){
        let data = {
          integral:this.form.integral
        }
        switch (this.form.id) {
          case 1:
            editRegistInteg(data,this.info).then(res => {
              this.after(res,'修改成功',0,this.form)
            })
            break;
          case 2:
            editInvitationInteg(data,this.info).then(res => {
              this.after(res,'修改成功',1,this.form)
            })
            break;
          case 3:
            editUploadInteg(data,this.info).then(res => {
              this.after(res,'修改成功',2,this.form)
            })
            break;
        
          default:
            break;
        }
      },
      // 添加 & 修改 执行后的 后续函数
      after(res,msg,index,form){
        if(res.data.code == 200){
                this.$message({   
                  showClose: true,
                  message: msg,
                  type: 'success'
                });
                this.tableData[index].num = form.integral
                this.tableData[index].show = false
                form.integral = null
              }else{
                this.$message({   
                  showClose: true,
                  message: res.data.msg,
                  type: 'error'
                });
              }
      },
      // 添加 是走的函数
      add(id){
        this.form2.id = id 
      },
      // 添加的 提交函数
      submitForm2(){
        let data = {
          integral:this.form2.integral
        }
        switch (this.form2.id) {
          case 1:
            addRegistInteg(data,this.info).then(res => {
              this.after(res,'添加成功',0,this.form2)
            })
            break;
          case 2:
            addInvitationInteg(data,this.info).then(res => {
              this.after(res,'添加成功',1,this.form2)
            })
            break;
          case 3:
            addUploadInteg(data,this.info).then(res => {
              this.after(res,'添加成功',2,this.form2)
            })
            break;
        
          default:
            break;
        }
      },

    }
}
</script>
<style lang="scss">
.settingContent{
  .cell{
    text-align: center;
  }
}
</style>
<style lang="scss" scoped>
    .settingContent{
        width: 1200px;
        min-height: 700px;
        background: #fff;
    }
    .small{
        width:400px;
    }
</style>