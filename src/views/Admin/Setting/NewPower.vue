<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/SettingPowers/Change' }">系统设置</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限设置</a></el-breadcrumb-item>
      <el-breadcrumb-item>添加权限</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="80px" :model="form" :rules="rules" ref="form" style="margin:50px auto;width:700px">
        <el-form-item label="权限目录" prop="pid">
            <div class="block">
                <el-cascader
                    v-model="form.pid"
                    :options="options"
                    :props="SetKesDept"
                    @change="aaa"
                    clearable></el-cascader>
            </div>
                
        </el-form-item>
        <el-form-item label="权限名称" prop="describe">
            <div class="small">
                <el-input v-model="form.describe"></el-input>
            </div>
        </el-form-item>
        <el-form-item label="接口路由" prop="back_url">
            <div class="small">
                <el-input v-model="form.back_url"></el-input>
            </div>
        </el-form-item>
        <el-form-item label="页面路由" prop="view_url">
            <div class="small">
                <el-input v-model="form.view_url"></el-input>
            </div>
        </el-form-item>
        <el-form-item label="是否菜单" prop="view_url">
          <el-radio v-model="form.is_menu" label="1">是</el-radio>
          <el-radio v-model="form.is_menu" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="图例" prop="icon">
            <div class="small">
                <el-input v-model="form.icon"></el-input>
            </div>
        </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getRoleTree,addRole} from '@/api/adminApi.js';
import getAdminInfo from '@/utils/getAdminInfo.js';
export default {
    name:'NewPowerContent',
    data(){
        return {
          
          SetKesDept:{
                        value:'id',
                        label:'describe',
                        children:'children',
                        checkStrictly: true
                },//自定义  级联选择器value label
            form:{
                is_menu:"1",
                pid:"",
                describe:"",
                view_url:"无",
                back_url:"",
                icon:"1"
            },
            options:[],
            info:{},
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
              pid: [
                { required: true, message: '请选择目录', trigger: 'blur' }
              ]
            }
        }
    },
    created(){

      getAdminInfo(this.info)

      getRoleTree(this.info).then(res=>{   //获取 选择器 数据
        if(res.data.code == 200){
          this.options = res.data.data
          this.formatData(this.options)
        }else{
          this.$message({   
              showClose: true,
              message: res.data.msg,
              type: 'error'
          });
        }
      })
    },
    methods:{
      formatData(data){
        for (let i = 0; i < data.length; i++) {
          if (data[i].is_menu == 2) {
            data.splice(i,1)
            this.formatData(data)
            return false
          }else{
            if (data[i].children && data[i].children.length != 0) {
              this.formatData(data[i].children)
            }
          }  
        }
      },
      aaa(){
        console.log(this.form.pid);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let index = this.form.pid.length - 1
            this.form.pid = this.form.pid[index]
            addRole(this.form,this.info).then(res => {
              if(res.data.code == 200){
                this.$message({   
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                });
                this.$refs[formName].resetFields();
              }else{
                this.$message({   
                  showClose: true,
                  message: res.data.msg,
                  type: 'error'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
}
</script>

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