<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/AdminList' }">管理员设置</el-breadcrumb-item>
      <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="80px" :model="form" :rules="rules" ref="form" style="margin:80px 0 0 100px;width:700px">
        
        <el-form-item label="用户名" prop="username">
            <div class="small">
                <el-input v-model="form.username"></el-input>
            </div>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
            <div class="small">
                <el-input v-model="form.phone"></el-input>
            </div>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <div class="small">
                <el-input v-model="form.password"></el-input>
            </div>
        </el-form-item>
        
         <el-form-item>
            <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addAdmin} from '@/api/adminApi.js';
import getAdminInfo from '@/utils/getAdminInfo.js';
export default {
    name:'AdminAdd',
    data(){
        return {
            form:{
                username:"",
                phone:"",
                password:"",
            },
            info:{},
            rules: {
              username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
              ],
              phone: [
                { required: true, message: '请输入手机号码', trigger: 'blur' },
              ],
              password: [
                { required: true, message: '请填写密码', trigger: 'blur' }
              ],
            }
        }
    },
    created(){

      getAdminInfo(this.info)

    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
                username:this.form.username,
                password:this.$md5('$'+ this.form.password),
                phone:this.form.phone,
            }
            addAdmin(data,this.info).then(res => {
                if(res.data.code == 200){
                    this.$message({   
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.$refs[formName].resetFields()
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