<template>
    <div class="releaseContent">
        <div class="releaseContentTop">
            <p>商品信息</p>
                <el-form ref="form" :model="formTop" label-width="90px" style="margin-top:40px">
                    <el-form-item label="商品地址:">
                        <div class="large">
                            <el-input v-model="formTop.goods_url" :disabled="true"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="优惠券地址:">
                        <div class="large">
                            <el-input v-model="formTop.coupon_url" placeholder="请输入商品优惠卷链接进行检测">
                                <el-button slot="append" @click="getinfo" :disabled="checkCouponFlag">校验商品</el-button>
                            </el-input>
                            
                             <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                        </div>
                    </el-form-item>
                </el-form>
            <!-- <span>建议领取一张券，不要贪多哦！</span>    -->
      </div>
      <div class="releaseDivider">
          <el-divider></el-divider>
      </div>
      <div class="releaseContentBottom">
            <!-- <p>商品信息</p> -->
            <div class="form">
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="商品地址:" v-if="false">
                        <div class="large">
                            <el-input v-model="form.goods_url" disabled></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="原价:">
                        <div class="small">
                            <el-input v-model="form.original_price" disabled></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="券后价:">
                        <div class="small">
                            <el-input v-model="form.coupon_post_price" disabled></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="优惠券:">
                        <div class="middle">
                            <el-input v-model="form.coupon_total_count" disabled></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="优惠券时间:">
                        <div class="middle">
                            <el-input v-model="form.coupon_end_time" disabled></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="佣金:" required>
                        <div class="middle">
                            <el-input v-model="form.commission" placeholder="请填写佣金"><template slot="append">%</template></el-input>
                        </div>
                    </el-form-item>

                    <el-form-item label="特殊活动:">
                        <div class="middle">
                            <el-input v-model="form.goods_add_remark" placeholder="非必填，4-10个字，商品额外的优惠信息"></el-input>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <el-button @click="sendInfo" :disabled="sendFlag" type="primary" style="margin-bottom:40px">提交商品</el-button>
      </div>
    </div>
</template>

<script>
import {checkCoupon,saveGoodsCoupon} from '@/api/api.js'
export default {
    name:"ReleaseContent",
    props:["goods_url","info"],
    data(){
        return {
            sendFlag:true,
            checkCouponFlag:false,
            coupon_url:"",
            form:{
                goods_url:"",
                original_price:"",
                coupon_post_price:"",
                commission:"",
                coupon_total_count:"",
                goods_add_remark:"",
                coupon_end_time:"",  
            },
            formTop:{
                goods_url:"",
                coupon_url:""
            }
        }
    },
    created(){
        this.formTop.goods_url = this.goods_url
    },
    methods:{
        getinfo(){                //获取数据
            if(this.formTop.coupon_url == ""){
                this.$message({
                    message: "优惠券链接不能为空",
                    type: 'error'
                });
                this.checkCouponFlag = false
                return false
            }
            this.checkCouponFlag = true        //防抖
            let data = {
                coupon_url:this.formTop.coupon_url
            }
            checkCoupon(data,this.info).then(res => {
                console.log("newwwwwwww",res)
                if(res.data.code == 200){          //请求成功数据  转换数据 给 子组件
                    console.log(res)
                    this.form = res.data.data
                    this.form.goods_url = this.goods_url
                    this.form.coupon_end_time =this.form.coupon_start_time + "至" + this.form.coupon_end_time
                    this.checkCouponFlag = false             // 节流 button 取消禁用
                    this.sendFlag = false
                }else{
                    this.$message({
                    message: res.data.msg,
                    type: 'error'
                    });
                    this.checkCouponFlag = false
                }
            })
        },
        sendInfo(){
            if(this.form.commission == "" || this.form.commission == undefined || this.form.commission == null){
                this.$message({
                    message: "请填写佣金！",
                    type: 'error'
                })
                return false
            }
            this.sendFlag = true    //节流
            let data = {
                coupon_url:this.formTop.coupon_url,
                commission:this.form.commission,
                post_coupon_price:this.form.coupon_post_price,
                goods_add_remark:this.form.goods_add_remark,
            }
            saveGoodsCoupon(data,this.info).then(res => {
                console.log("newwwwwwww",res)
                if(res.data.code == 200){          //请求成功数据  转换数据 给 子组件
                    this.$message({
                        message: "提交成功",
                        type: 'success'
                    });
                    this.sendFlag = false
                    this.$router.push("/History")
                }else{
                    this.$message({
                    message: res.data.msg,
                    type: 'error'
                    });
                    this.sendFlag = false
                }
            })
        }

    }
}
</script>
<style lang="scss">
    .releaseContent{
        .inputBox{
            .el-input__inner{
                margin-top: 20px;
            }
        }
        .releaseContentBottom{
            .el-button{
                width: 150px;
                margin: 30px 0 0 160px;
            }

        }
    }
</style>
<style lang="scss" scoped>
    .releaseContent{
        padding-left: 80px;
        width: 1120px;
        background: #fff;
        .releaseDivider{
            width: 55%;
        }
        .releaseContentTop{
            p{
                margin: 40px 0 0 20px;
                font-size: 18px;
            }
            span{
                position: relative;
                left: 20px;
                top: 25px;
            }
        }
        .inputBox{
            width: 500px;
            margin-left: 105px;
        }
        .releaseContentBottom{
            margin-top: 30px;
            p{
                margin: 0 0 0 20px;
                font-size: 18px;
                margin-bottom: 30px;
            }
           
            .small{
                width: 190px;
            }
            .middle{
                width: 340px;
            }
        }
         .large{
                width: 500px;
            }
    }
</style>