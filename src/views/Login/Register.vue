<template>
  <div class="Register">
      <div class="info">
        <!-- <p class="heng"></p>
        <p class="logtext" v-if="pageType">找回密码</p>
        <p class="logtext" v-else>注册</p> -->
        <img src="../../assets/images/indexLogo.png" alt="" style="margin-bottom:20px">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" @submit.native.prevent>

                <el-form-item label="" prop="phone">
                    <el-input v-model="ruleForm.phone" autocomplete="off" placeholder="请输入手机号码" prefix-icon="el-icon-postcard" v-if="!pageType"></el-input>
                    <el-input v-model="ruleForm.phone" autocomplete="off" placeholder="请输入手机号码" prefix-icon="el-icon-postcard" v-if="pageType" @change.native="getphone()"></el-input>
                </el-form-item>


                <el-form-item label="" prop="nick" v-if="!pageType">
                    <el-input v-model="ruleForm.nick" autocomplete="off" placeholder="请输入店铺名" prefix-icon="el-icon-postcard"></el-input>
                    <p style="color:red;line-height:20px">注意：请填写淘宝店铺名称！</p>
                </el-form-item>

                <!-- 忘记密码时 是选择 店铺名字 -->
                <el-form-item label="" prop="nick" v-if="pageType">    
                    <el-select v-model="ruleForm.nick" placeholder="请选择店铺">
                        <template slot="prefix">
                            <i class="el-icon-postcard" style="line-height: 64px;font-size: 22px;margin-left: 2px;"></i>
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
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码" prefix-icon="el-icon-key"></el-input>
                </el-form-item>

                <el-form-item label="" prop="picCode">
                    <div class="small">
                        <el-input v-model="ruleForm.picCode" autocomplete="off" placeholder="请输入验证码" class="aaa" prefix-icon="el-icon-discount"></el-input>
                    </div>
                    <el-image :src="imgUrl" alt="" class="picCode" @click="getPicCode"></el-image>
                </el-form-item>
                
                <el-form-item label="" prop="phe_code">
                    <div class="small">
                        <el-input v-model="ruleForm.phe_code" placeholder="请输入手机验证码" prefix-icon="el-icon-discount" autocomplete="off"></el-input>
                    </div>
                    <div v-if="timeShow" style="display:inline-block">
                        <el-button type="info" @click="sendPhoneCode(2)" v-if="pageType">发送验证码</el-button> <!--忘记密码需要传参 2 -->
                        <el-button type="info" @click="sendPhoneCode(1)" v-else>发送验证码</el-button>
                    </div>
                    <div v-else style="display:inline-block">
                        <el-button type="info" v-if="pageType" :disabled="true">{{count}}S后获取</el-button> 
                        <el-button type="info" v-else :disabled="true">{{count}}S后后获取</el-button>
                    </div>
                </el-form-item>
                
                <el-form-item>
                    <!-- 忘记密码提交 -->
                    <div class="btnBox" v-if="pageType"> 
                        <el-button type="primary" @click="submitFormForget('ruleForm')" :disabled="flag" native-type="submit">立即找回</el-button>
                        <span @click="tologin">去登陆</span>
                    </div>
                    <!-- 注册提交 -->
                    <div class="btnBox" v-else>
                        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="flag" native-type="submit">立即注册</el-button>
                        <span @click="tologin">已有帐号，去登陆</span>
                    </div>
                </el-form-item>
            </el-form>
        
      </div>
  </div>
</template>

<script>
import {sendCode,addUser,forgetPass,getNickByPhe} from '@/api/api.js';
import axios from 'axios';
export default {
    name:"Register",
    data(){
        return {
            shopList:[],
            timeShow:true, //倒计时显示控制标识
            count:"",       //计时
            pageType:"",    //本页面类型  忘记密码还是注册
            flag:false,     //防抖控制
            imgUrl:"",
            ruleForm:{
                phone:"",
                picCode:"",
                phe_code:"",
                password:"",
                nick:""
            },
            rules:{
                phone: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                ],
                nick: [
                    { required: true, message: '请输入店铺名', trigger: 'blur' },
                ],
                picCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
                phe_code: [
                    { required: true, message: '请输入手机验证码', trigger: 'blur' },
                    // { min: 6, max: 6, message: '请输入正确的验证码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    created(){
        if(this.$route.query.type){
            this.pageType = true
        }else{
            this.pageType = false
        }
       this.getPicCode()  //获取图片验证码
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
        countDown(){   //倒计时
            const TIME_COUNT = 60;
            if (!this.timer) {
            this.count = TIME_COUNT;
            this.timeShow = false;
            this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                    } else {
                    this.timeShow = true;
                    clearInterval(this.timer);
                    this.timer = null;
                    }
                }, 1000)
            }
        },
        getPicCode(){  //获取图片流 需设置文件类型 且 只此一例  所以不在 公共api内设置
             axios.get(this.$header + '/index/Login/sendPic',        //开发环境 反向代理
				 {
                responseType: "arraybuffer", 
            }).then(res => {
              return 'data:image/png;base64,' + btoa(
                new Uint8Array(res.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
            }).then(data => {
              this.imgUrl = data //图片地址 <img src='data' />
         
            })
        },
        sendPhoneCode(type){   //获取 手机验证码 函数  要先 验证 图片验证码 及 手机号
            if(this.ruleForm.phone && this.ruleForm.picCode){
                let query = {
                    pic_code:this.ruleForm.picCode,  //传参 图片验证码
                    phone:this.ruleForm.phone,       //传参 手机号码
                    type,
                    nick:this.ruleForm.nick,
                }
                sendCode(query).then(res => {
                    if(res.data.code == 200){
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.countDown()  //显示执行倒计时
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                        });
                        this.getPicCode()
                        this.ruleForm.picCode = ""  //验证不成功后需要重新换取图片验证码
                    }
                }).catch(error => {
                    console.log(error)
                })
            }else{
                this.$message.error('请输入电话号码及图片验证码');
            }
        },
        tologin(){
            this.$router.push("/Login")
        },
        //注册 的 提交函数
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.flag = true   //节流
                    let data = {
                        phone:this.ruleForm.phone,
                        password:this.$md5("$" + this.ruleForm.password),
                        phe_code:this.ruleForm.phe_code,
                        nick:this.ruleForm.nick,
                        tp:this.$route.query.tp?this.$route.query.tp:'no',
                        id:this.$route.query.id?this.$route.query.id:-1,
                    }
                    addUser(data).then(res => {
                        if(res.data.code == 200){
                            this.$message({  //注册成功自动跳转
                                showClose: true,
                                message: "注册成功，即将自动跳转登陆页面",
                                type: 'success'
                            });
                            this.flag = false
                            setTimeout(res => {
                                this.tologin()
                            },1000)
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
        //忘记密码的提交函数 
        submitFormForget(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.flag = true   //节流
                    let data = {
                        phone:this.ruleForm.phone,
                        password:this.$md5("$" + this.ruleForm.password),
                        phe_code:this.ruleForm.phe_code,
                         nick:this.ruleForm.nick,
                    }
                    forgetPass(data).then(res => {
                        if(res.data.code == 200){
                            this.$message({  //注册成功自动跳转
                                showClose: true,
                                message: "修改成功，即将自动跳转登陆页面",
                                type: 'success'
                            });
                            this.flag = false
                            setTimeout(res => {
                                this.tologin()
                            },1000)
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
            width:125px;
            color: #fff;
            background: #909399;
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
            display: inline-block;
            margin-left: 20px;
            margin-top: 10px;
            color: #ccc;
            cursor: pointer;
        }
    }
</style>