<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/SettingPowers/Change' }">系统设置</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限设置</a></el-breadcrumb-item>
      <el-breadcrumb-item>所有权限</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tree">
          <el-tree
      :data="data"
      :default-checked-keys="[1,2,3]"
      style="font-size:16px"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span><i :class="data.icon"></i>{{ data.describe }}</span>
        <span>
          <el-button
            type="text"
            @click="() => start(data)"
            v-if="data.state != 1">
            启用
          </el-button>
          <el-button
            type="text"
            @click="() => stop(data)"
            v-else>
            停用
          </el-button>
          <el-button
            type="text"
            @click="() => edit(data)">
            修改
          </el-button>
          
        </span>
      </span>
    </el-tree>
    <el-dialog title="权限修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form " label-width="80px">
       <el-form-item label="权限名称" prop="describe">
            <div class="small">
                <el-input v-model="form.describe"></el-input>
            </div>
        </el-form-item>
        <el-form-item label="接口路由" prop="back_url">
            <div class="small">
                <el-input v-model="form.back_url" disabled></el-input>
            </div>
        </el-form-item>
        <el-form-item label="页面路由" prop="view_url">
            <div class="small">
                <el-input v-model="form.view_url" disabled></el-input>
            </div>
        </el-form-item>
        <el-form-item label="图例" prop="icon">
            <div class="small">
                <el-input v-model="form.icon"></el-input>
            </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import {getAllRoleTree,startRole,stopRole,editRole} from '@/api/adminApi.js';
import getAdminInfo from '@/utils/getAdminInfo.js';
export default {
    name:'SettingPowers',
    data(){
        return {
           data: [],
           info:{},
           dialogFormVisible: false,
           form:{
             describe:"",
             back_url:"",
             view_url:"",
             icon:"",
             id:"",
           },
           rules: {
              describe: [
                { required: true, message: '请输入权限名字', trigger: 'blur' },
              ],
              icon: [
                { required: true, message: '请输入权限名字', trigger: 'blur' },
              ],
              view_url: [
                { required: true, message: '请填写前端路由', trigger: 'blur' }
              ],
              back_url: [
                { required: true, message: '请填写路由', trigger: 'blur' }
              ],
            }
        }
    },
    created(){
      getAdminInfo(this.info)

     
      getAllRoleTree(this.info).then(res => {
        console.log("hahahah",res)
        if(res.data.code == 200){
          this.data = res.data.data
        }
      })
    },
    methods:{
      // 更改 权限 的 的 提交 
      submitForm() {
        if(this.form.id && this.form.icon && this.form.describe){
          this.form.id = parseInt(this.form.id)
            let data ={
              id:this.form.id,
              icon:this.form.icon,
              describe:this.form.describe,
            }
            editRole(data,this.info).then(res => {
              if(res.data.code == 200){
                this.$message({   
                  showClose: true,
                  message: '修改成功',
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

        }else{
          this.$message({   
                  showClose: true,
                  message:"填写信息有误",
                  type: 'error'
                });
        }
      },
      // 修改 的函数  出现 对话框  渲染数据
      edit(data) {
        this.dialogFormVisible = true
        console.log(data)
        this.form.describe = data.describe
        this.form.id = data.id
        this.form.icon = data.icon
        this.form.view_url = data.view_url
        this.form.back_url = data.back_url
      },
      // 启用 权限 函数
      start(data){
        startRole({id:data.id},this.info).then(res => {
          if(res.data.code == 200){
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
      // 停用 权限函数
      stop(data){
        stopRole({id:data.id},this.info).then(res => {
          if(res.data.code == 200){
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
}
</script>
<style lang="scss">
.tree{
  width: 600px;
  padding: 0 400px 0 0;
  margin: 60px auto;
  .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  .custom-tree-node{
      font-size: 16px!important;
      padding: 10px 0!important;
    }

}
</style>
<style >
 
  .tree /deep/ .el-tree-node {
    position: relative;
    padding-left: 16px;
  }
 
  .tree /deep/ .el-tree-node__children {
    padding-left: 16px;
  }
 
  .tree /deep/ .el-tree-node :last-child:before {
    height: 38px;
  }
 
  .tree /deep/ .el-tree > .el-tree-node:before {
    border-left: none;
  }
 
  .tree-container /deep/ .el-tree > .el-tree-node:after {
    border-top: none;
  }
 
  .tree /deep/ .el-tree-node:before {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }
 
  .tree /deep/ .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }
 
  .tree /deep/ .el-tree-node:before {
    border-left: 1px dashed #4386c6;
    bottom: 0px;
    height: 100%;
    top: -26px;
    width: 1px;
  }
 
  .tree /deep/ .el-tree-node:after {
    border-top: 1px dashed #4386c6;
    height: 20px;
    top: 12px;
    width: 24px;
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