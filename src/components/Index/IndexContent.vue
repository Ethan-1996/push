<template>
    <div class="content">
        <!-- 搜索部分 -->
        <div class="contentSeach">
            <el-input placeholder="请输入商品链接......" v-model="goods_url" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="getinfo" :disabled="flag" :loading="flag">大数据分析</el-button>
            </el-input>
        </div>
        <div class="divider">
            <el-divider content-position="center">大 盘 数 据 （各推广建议占比）</el-divider>
        </div>
        <!-- 图标部分 -->
        <div class="Echarts">
            <!-- <el-radio-group v-model="postion" style="margin:20px auto;position: relative;left:230px" @change="changge" :disabled="changeFlag">
                <el-radio-button label="price">价格占比分析</el-radio-button>
                <el-radio-button label="commission">佣金占比分析</el-radio-button>
            </el-radio-group> -->
            <Echarts :xAxisData="xAxisData" :yAxisData="yAxisData" />
        </div>
        <!-- 分割线 -->
        <div class="divider divider2">
            <el-divider content-position="center">最佳方案预估</el-divider>
        </div>
        <!-- 方案部分 -->
        <Program :extensionInfo="extensionInfo" />
        <div class="buttonBox">
            <el-button type="primary" @click="toRelease" :disabled="nextPageFlag">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div>
    </div>
</template>

<script>
import {goodsIndex} from '@/api/api.js'
import Echarts from "./Echarts.vue"
import Program from "./Program.vue"
export default {
    name:"IndexContent",
    components:{
        Echarts,Program
    },
    props:["info"],
    data(){
        return {
            nextPageFlag:true,   //未检验数据 禁止用下一页按钮
            extensionInfo:[   //这是假数据
                {coupon:"xx.xx",commission:"xx%",sale:"xxxx",daily_turnover:"xxxxxx",icon:"el-icon-s-unfold"},
                {coupon:"xx.xx",commission:"xx%",sale:"xxxx",daily_turnover:"xxxxxx",icon:"el-icon-collection"},
                {coupon:"xx.xx",commission:"xx%",sale:"xxxx",daily_turnover:"xxxxxx",icon:"el-icon-notebook-2"},
            ],
            //changeFlag:true,
            //echartType:"价格占比",
            //postion:"price",
            flag:false,
            goods_url:"",
            yAxisData:[0, 0, 0, 0, 0],            //传值数据  y轴数据
            xAxisData:['xx', 'xx', 'xx', 'xx', 'xx'],     //传值数据  x轴数据
            yAxisPriceData:[],            //价格占比  y轴数据
            xAxisPriceData:[],    //价格占比  y轴数据
            yAxisCommissionData:[],     //	佣金占比 y轴数据
            xAxisCommissionData:[]      //	佣金占比 x轴数据
        }
    },
    methods:{
        toRelease(){
            if(this.goods_url){
                this.$router.push({path:"/Release",query:{goods_url:this.goods_url}})
            }
            
        },
        // changge(val){     //tabs切换改变传的值的数据
        //     switch (val) {
        //         case "price":
        //             this.echartType = "价格占比"
        //             this.yAxisData = this.yAxisPriceData
        //             this.xAxisData = this.xAxisPriceData
        //             break;
        //         case "commission":
        //             this.echartType = "佣金占比"
        //             this.yAxisData = this.yAxisCommissionData
        //             this.xAxisData = this.xAxisCommissionData
        //             break;            
        //         default:
        //             break;
        //     }
        // },
        formatExtensionInfo(info){        //整理推广建议格式  加入 icon 图标
            this.extensionInfo = info
            let iconArray = ["el-icon-s-unfold","el-icon-collection","el-icon-notebook-2"]
            for(let i = 0;i < this.extensionInfo.length;i++){
                this.extensionInfo[i].icon = iconArray[i]
            }
            console.log(this.extensionInfo,"hahahahhahahahahhahaha")
        },
        // formatPriceInfo(price_proportion){    //价格占比 图标 数据整理
        //     this.yAxisPriceData = []
        //     this.xAxisPriceData = []
            
        //     for(var i = 0;i < price_proportion.length;i++){
        //         this.yAxisPriceData.push(price_proportion[i].proportion)
        //         this.xAxisPriceData.push(price_proportion[i].price_start + "-" +price_proportion[i].price_stop)
        //     }
        //     // 默认是价格占比 所以在这里直接 赋值
        //     this.xAxisData = this.xAxisPriceData
        //     this.yAxisData = this.yAxisPriceData
        // },
        // formatCommissionInfo(commission_proportion){  //佣金占比 图标 数据整理
        //     this.yAxisCommissionData = []
        //     this.xAxisCommissionData = []
        //     for(var i = 0;i < commission_proportion.length;i++){
        //         this.yAxisCommissionData.push(commission_proportion[i].proportion)
        //         this.xAxisCommissionData.push(commission_proportion[i].commission_start + "-" +commission_proportion[i].commission_stop)
        //     }
        //     // console.log("finnnnnnnnnnnnnnnnnnn",this.xAxisCommissionData)
        // },
        formatEchartsInfo(proportion){
            this.yAxisData = []
            this.xAxisData = []
            for(var i = 0;i < proportion.length;i++){
                this.yAxisData.push(proportion[i].proportion)
                this.xAxisData.push(proportion[i].price + ' | ' + proportion[i].commission)
            }
        },
        getinfo(){                //获取数据
            this.flag = true        //防抖
            if(this.goods_url == ""){
                this.$message({
                    message: "商品链接不能为空",
                    type: 'error'
                });
                this.flag = false
                return false
            }
            let data = {
                goods_url:this.goods_url
            }
            goodsIndex(data,this.info).then(res => {
                console.log("newwwwwwww",res)
                if(res.data.code == 200){          //请求成功数据  转换数据 给 子组件
                    // this.formatPriceInfo(res.data.data.price_proportion)
                    // this.formatCommissionInfo(res.data.data.commission_proportion)
                    this.formatEchartsInfo(res.data.data.proportion)
                    // // 销售建议赋值
                    this.formatExtensionInfo(res.data.data.extension)
                    this.nextPageFlag = false     // 下一步 button 取消禁用
                    this.changeFlag = false        //  切换 图标 button 取消禁用
                    this.flag = false             // 节流 button 取消禁用
                }else{
                    this.$message({
                    message: res.data.msg,
                    type: 'error'
                    });
                    this.flag = false
                }
            })
        }
    }
}
</script>
<style lang="scss">
    .content{
        .el-divider__text{
            font-size: 16px;
        }
        .el-radio-button__inner{
            padding:10px 12px;
        }
        .el-input__inner{
            width: 520px;
            border: 3px solid #3399ff;
            height: 44px;
            margin-left: 40px;
            font-size: 20px;
        }
        .el-button .el-button--default{
            width: 210px;
        }
        .el-input-group__append{
            width: 170px;
            background: #3399ff;
            border: 3px solid #3399ff;
            color: #fff;
            position: relative;
            left: -57px;
            font-size: 20px;
            border-right:none;
            .el-button,.el-button--default{
                width: 210px;
            }
            .el-icon-search{
                color: #000;
                font-weight:900;
                span{
                    margin-left: 10px;
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
    .content{
        width: 1200px;
        background: #fff;
        
        .contentSeach{
            width: 830px;
            margin:60px auto;
        }
        .divider{
            width: 1010px;
            margin: auto;
            margin-top: 48px;
        }
        .buttonBox{
            width: 1010px;
            margin: auto;
            text-align: center;
            margin: 40px auto;
        }
    }
</style>