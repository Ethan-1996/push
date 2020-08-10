<template>
  <div class="Register">
      <div class="info">
       
        <img src="../../assets/images/indexLogo.png" alt="" style="margin-bottom:20px">
         <!-- <p class="heng"></p> -->
        <!-- <p class="logtext">找回</p> -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" @submit.native.prevent>
                <el-form-item label="" prop="nick">
                    <el-input v-model="ruleForm.nick" autocomplete="off" placeholder="请输入店铺名" prefix-icon="el-icon-postcard"></el-input>
                </el-form-item>

                <el-form-item label="" prop="phone">
                    <el-input v-model="ruleForm.phone" autocomplete="off" placeholder="请输入手机号码" prefix-icon="el-icon-postcard"></el-input>
                </el-form-item>
                
                <el-form-item label="">
                    <el-upload
                        ref="upload"
                        :action="this.$header + '/index/Appeal/addAppeal'"
                        list-type="picture-card"
                        :auto-upload="false"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :on-success="handleSuccess"
                        :data="ruleForm">
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">请上传淘宝店铺后台截图！</div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    
                </el-form-item>
                
                <el-form-item>
                    <div class="btnBox">
                        <el-button type="primary" @click="submitUpload" :disabled="flag" native-type="submit">立即找回</el-button><span @click="toindex">去登陆</span>
                    </div>
                </el-form-item>
            </el-form>
        
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import {checkUser} from '@/api/api.js';
export default {
    data(){
        return {
            dialogImageUrl:'',
            dialogVisible:false,
            flag:false,
            ruleForm:{
                phone:"",
                nick:""
            },
            rules:{
                nick:[
                    { required: true, message: '请输入店铺名', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                ]
            }
        }
    },
    created(){

    },
    methods:{
        toindex(){
            this.$router.push("/Login")
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 张图片！`);
        },
        handleSuccess(res, file, fileList){
            if(res.data.code == 200){
                this.$message({   
                    showClose: true,
                    message: res.msg,
                    type: 'success'
                });
            }else{
                this.$message({   
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
            }
        }
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
        top: 23%;
        width: 466px;
        .heng{
            width: 65px;
            height: 8px;
            background: #57b4fa;
        }
        .logtext{
            font-size: 40px;
            font-weight: 800;
            margin-top: 30px;
            margin-bottom: 60px;
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
            margin-left: 20px;
            cursor: pointer;
        }
    }
</style>