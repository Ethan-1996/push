<template>
    <div class="releaseContent">
        <p>个人中心</p>
        <div style="margin-top:60px">
            <el-form label-width="140px" :model="formLabelAlign">
                <el-form-item label="店铺名：">
                    <span>{{formLabelAlign.nick}}</span>
                </el-form-item>
                <el-form-item label="电话：">
                    <span>{{formLabelAlign.phone}}</span>
                </el-form-item>
                <el-form-item label="注册时间：">
                    <span>{{formLabelAlign.create_time}}</span>
                </el-form-item>
                <el-form-item label="剩余积分：">
                    <span>{{formLabelAlign.integral}}</span>
                    <!-- <el-button @click="toNew" size="small" style="margin-left:40px">获得积分</el-button> -->
                </el-form-item>
                <el-form-item label="专属邀请链接：">
                    <span>{{formLabelAlign.invited_url}}</span><br>
                    <span style="display:block">Tips：</span>
                </el-form-item>
                
                <!-- <div v-if="showFlag">
                    <el-form-item label="充值：">
                        <el-radio v-for="(value,key,index) in moneyList" :key="index" v-model="radio" :label="key">{{value.order_amount}} + {{value.order_give}}(赠送)</el-radio>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button @click="toNewPage" :disabled="this.radio==''?true:false">去支付</el-button>
                    </el-form-item>
                </div> -->
              

            </el-form>


            <!-- <el-drawer
                
                :visible.sync="table"
                direction="rtl"
                size="50%">
                <el-table :data="gridData">
                    <el-table-column property="date" label="日期" width="150"></el-table-column>
                    <el-table-column property="name" label="姓名" width="200"></el-table-column>
                    <el-table-column property="address" label="地址"></el-table-column>
                    </el-table>
                </el-drawer> -->
        </div>
    </div>
</template>

<script>
import {showInfo,getRecharge} from '@/api/api.js'
export default {
    name:"PersonCenterCon",
    props:['info'],
    data(){
        return {
            showFlag:false,
            formLabelAlign:{},
            moneyList:{},
            radio:"",
        }
    },
    created(){
        showInfo(this.info).then(res => {
            if(res.data.code == 200){
                this.formLabelAlign = res.data.data
                 //console.log(this.formLabelAlign.nick)
            }
        })

        getRecharge(this.info).then(res => {
             if(res.data.code == 200){
               this.moneyList = res.data.data
                 //console.log(res)
            }
        })
    },
    methods:{
        toNew(){
            this.$router.push("/Recharge")
        },
        toNewPage(){
            
                window.open (`${this.$header}/index/Payment/getCode?tp=${this.radio}&userid=${this.info.user_id}`, "newwindow", "height=800px, width=1200px, top=100px, left=400px, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no") 


        }
    }
}
</script>


<style lang="scss" scoped>
    .releaseContent{
        padding-left: 40px;
        width: 1160px;
        background: #fff;
        min-height: 700px;
        p{
            margin-top: 40px;
            font-size: 20px;
        }
    }
</style>