<template>
  <div class="Register">
      <div class="info">
        <!-- <p class="heng"></p>
        <p class="logtext">登录</p> -->
        <img src="../../assets/images/indexLogo.png" alt="" style="margin-bottom:20px">
        <!-- <p class="logtext">登录</p> -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" @submit.native.prevent>
                <!-- <el-form-item label="" prop="nick">
                    <el-input v-model="ruleForm.nick" autocomplete="off" placeholder="请输入店铺名" prefix-icon="el-icon-postcard"></el-input>
                </el-form-item> -->

                <el-form-item label="" prop="phone">
                    <el-input v-model="ruleForm.phone" autocomplete="off" placeholder="请输入手机号码" prefix-icon="el-icon-postcard" @change.native="getphone()"></el-input>
                </el-form-item>

                <el-form-item label="" prop="nick">
                    <el-select v-model="ruleForm.nick" placeholder="请选择店铺">
                        <template slot="prefix">
                            <i class="el-icon-c-scale-to-original" style="line-height: 64px;font-size: 22px;margin-left: 2px;"></i>
                        </template>
                        <el-option
                        v-for="item in shopList"
                        :key="item"
                        :label="item"
                        :value="item">
                        <span style="float: left">{{ item }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="" prop="password">
                        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" prefix-icon="el-icon-key"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <div class="btnBox">
                        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="flag" native-type="submit">登录</el-button><span @click="fogetPas">忘记密码</span><span>|</span><span @click="toregister" class="toregister">立即注册</span><span>|</span><span @click="toFind">去申诉</span>
                    </div>
                </el-form-item>
            </el-form>
        
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import {checkUser,getNickByPhe} from '@/api/api.js';
export default {
    data(){
        return {
            flag:false,
            ruleForm:{
                phone:"",
                password:"",
                nick:""
            },
            rules:{
                // nick:[
                //     { required: true, message: '请输入店铺名', trigger: 'blur' },
                // ],
                phone: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
            },
            shopList:[]

        }
    },
    created(){

    },
    methods:{
        getphone(){
            getNickByPhe({phone:this.ruleForm.phone}).then(res => {
                if (res.data.code == 200) {
                    this.shopList = res.data.data
                }else{
                    this.$message({   
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        toFind(){
            this.$router.push("/Find")
        },
        fogetPas(){   //忘记密码跳转传参
            this.$router.push({path:"/Register",query:{type:"forgetPas"}})
        },
        toregister(){   //直接跳转注册
            this.$router.push("/Register")
        },
        toindex(){
            this.$router.push("/Home")
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.flag = true   //节流
                    let data = {
                        phone:this.ruleForm.phone,
                        password:this.$md5("$" + this.ruleForm.password) ,
                        nick:this.ruleForm.nick
                    }
                    checkUser(data).then(res => {
                        if(res.data.code == 200){
                            this.$confirm('您已成功登录，是否保存用户信息用于下次登录?', '提示', {
                                confirmButtonText: '是',
                                cancelButtonText: '否',
                                type: 'warning'
                            }).then(() => {
                                localStorage.setItem('accessToken', res.data.data.app_key)
                                localStorage.setItem('user_id', res.data.data.user_id)
                                localStorage.setItem('phone', res.data.data.phone)
                                this.$message({
                                type: 'success',
                                message: '已保存您的信息!'
                                });
                                this.toindex()
                            }).catch(() => {
                                sessionStorage.setItem('accessToken',res.data.data.app_key);
                                sessionStorage.setItem('user_id',res.data.data.user_id);
                                sessionStorage.setItem('phone', res.data.data.phone)
                                this.$message({
                                    type: 'info',
                                    message: '已暂时记录信息，离开页面将删除'
                                }); 
                                this.toindex()         
                            });
                            this.flag = false
                        }else{
                            this.$message({   
                                showClose: true,
                                message: res.data.msg,
                                type: 'error'
                            });
                            this.flag = false
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
<style lang="scss">
    .Register{
        .el-input__inner{
            height: 60px;
            font-size: 18px;
        }
        .el-button,.el-button--info{
            height: 60px;
            font-size: 18px;
            width:125px ;
            color: #000;
            background: #eee;
            border: none;
        }
        .el-input__icon,.el-icon-postcard{
            line-height: 60px;
            font-size: 20px;
        }
        .btnBox{
            .el-button{
                width: 230px;
                height: 50px;
                background: #44b5f9;
                color: #fff;
            }
        }
    }
</style>
<style lang="scss" scoped >
    .Register{
        width: 100%;
        height: 100%;
        position: fixed;
        background-image: url("../../assets/loginbg.png");
    }
    .info{
        position: absolute;
        left: 16.4%;
        top: 33.3%;
        width: 466px;
        .heng{
            width: 65px;
            height: 8px;
            background: #57b4fa;
        }
        .logtext{
            font-size: 20px;
            font-weight: 800;
            margin-top: 10px;
            margin-bottom: 30px;
            color: #555;
        }
    }
    .small{
        width: 320px;
        display: inline-block;
        margin-right: 20px;
    }
    .picCode{
        width: 125px;
        height: 60px;
        vertical-align: middle;
    }
    .btnBox{
        span{
            position: relative;
            top: 16px;
            height: 20px;
            display: inline-block;
            color: #ccc;
        }
        span:nth-of-type(1){
            margin-left: 20px;
            padding-right: 10px;
            cursor: pointer;
        }
        span:nth-of-type(5){
            margin-left: 20px;
            cursor: pointer;
        }
    }
    .toregister{
        color:#57b4fa!important;
        padding:0 10px;
        margin-left: 0px!important;
        cursor: pointer;
    }
</style>