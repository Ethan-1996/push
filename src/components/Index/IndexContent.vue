<template>
    <div class="content">
        <!-- 搜索部分 -->
        <div class="contentSeach">
            <el-input placeholder="请输入商品链接......" v-model="goods_url" class="input-with-select">
                <el-button slot="append" @click="getinfo" :disabled="flag" :loading="flag">
                    <img src="../../assets/images/search.png" alt=""> 大数据分析</el-button>
            </el-input>
        </div>
        <div class="divider">
            <el-divider content-position="center">大 盘 数 据 （各推广建议占比）</el-divider>
        </div>
        <!-- 图标部分 -->
        <div class="Echarts">
            <div class="moreinfo">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>数据总览</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                    </div>
                    <p style="margin:5px 0">本品所在类目共</p>
                    <p>有 <span style="color:red">{{shops}}</span> 个商家 推广过</p>
                    <p style="margin:5px 0">有 <span style="color:red">{{goods}}</span> 个商品 推广过</p>
                </el-card>
                
                <!-- <p>有n个商家 推广过 不啦不啦不啦</p> -->
            </div>
            <Echarts :AxisPriceData="AxisPriceData" :changeFlagEchart="changeFlagEchart"/>
            <EchartsProportion :AxisProportionData="AxisProportionData"/>
            <div class="divider divider2">
                <el-divider content-position="center">本品数据</el-divider>
            </div>
            <EchartSelf :xAxisDataSelf="xAxisDataSelf" :yAxisDataSelf="yAxisDataSelf" :yAxisDataSelfPrice="yAxisDataSelfPrice" :yAxisDataSelfM="yAxisDataSelfM"/>
        </div>
         <div class="divider divider2">
            <el-divider content-position="center">竞品数据</el-divider>
        </div>
        <div class="changing" @click="othersAllDataFun"> <i class="el-icon-refresh"></i> 换一换</div>
        <div class="others">
            <div class="item" v-for="(item,index) in others" :key="index" >
                <EchartOther 
                    :name="item.id" 
                    :info="item.goods_to_extension" 
                    :shopName="item.nick" 
                    :title="item.title" 
                    :is_attention="item.is_attention" 
                    :attention_goods_id="item.attention_goods_id"
                    :item_url="item.item_url" 
                    :token="info"
                    :chnageData="changeData"/>
            </div>
            <div class="item add">
                <div class="iconBox" @click="dialogFormVisible = true">
                    <i class="el-icon-plus"></i>
                </div>
                <p>没有找到想要的商品？</p>
                <p>点击上方即可添加查看！</p>
            </div>
            
        </div>

<!--   对话框部分     输入 净瓶链接 -->
        <el-dialog title="查看竞品数据" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="竞品链接" label-width="80px">
                    <el-input v-model="form.goods_url" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addmore()">确 定</el-button>
            </div>
        </el-dialog>

<!-- 展示部分 的 数据  对话框  -->
        <el-dialog title="查看竞品数据" :visible.sync="dialogFormVisible2" width="70%" top="3%">
           <AddEchart :xData="xData" :changeFlagEchart="changeFlagEchart"/>
           <div class="divider divider2">
                <el-divider content-position="center">竞品数据</el-divider>
            </div>
           <AddEchartLine :xDataLine="xDataLine" :yDataLine="yDataLine" :yDataLinePrice="yDataLinePrice" :yDataLineM="yDataLineM" />
            <span slot="footer" class="dialog-footer">
                <el-button v-if="taokeyi_goods_id && is_attention == 2" @click="attention">关 注</el-button>
                <el-button v-if="taokeyi_goods_id && is_attention == 1" @click="cancelAttention">取消关注</el-button>
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <!-- <el-button type="primary" @click="addmore()">确 定</el-button> -->
            </span>
        </el-dialog>
        <!-- 分割线 -->
        <div class="divider divider2" style="margin-top:0">
            <el-divider content-position="center">竞品历史方案销额</el-divider>
        </div>
        <!-- 方案部分 -->
        <Program :extensionInfo="extensionInfo" />
        <!-- <div class="buttonBox">
            <el-button type="primary" @click="toRelease" :disabled="nextPageFlag">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div> -->
    </div>
</template>

<script>
import {goodsIndex,checkCompeteGoods,addAttention,cancelAttention} from '@/api/api.js'
import Echarts from "./Echarts.vue"
import EchartsProportion from "./EchartsProportion.vue"
import AddEchart from "./AddEchart.vue"
import AddEchartLine from "./AddEchartLine.vue"
import EchartSelf from "./SelfEchart.vue"
import EchartOther from "./EchartOther.vue"
import Program from "./Program.vue"
export default {
    name:"IndexContent",
    components:{
        Echarts,Program,EchartSelf,EchartOther,AddEchart,AddEchartLine,EchartsProportion
    },
    props:["info"],
    data(){
        return {
            goods:"",
            shops:"",


            form:{                 // 添加 净瓶链接的 form 表单
                goods_url:""
            },

            xDataLine:[],             // add 竞品 x轴
            yDataLine:[],             // add 竞品 数量
            yDataLinePrice:[],        // add 竞品 价格
            yDataLineM:[],            // add 竞品 佣金

            xData:[],
            dialogFormVisible:false,   // add精品 链接

            dialogFormVisible2:false,   // add  展示 flag

            nextPageFlag:true,   //未检验数据 禁止用下一页按钮
            extensionInfo:[   //这是假数据
                {coupon:"xx.xx",commission:"xx%",sale:"xxxx",daily_turnover:"xxxxxx",icon:"方案一"},
                {coupon:"xx.xx",commission:"xx%",sale:"xxxx",daily_turnover:"xxxxxx",icon:"方案二"},
                {coupon:"xx.xx",commission:"xx%",sale:"xxxx",daily_turnover:"xxxxxx",icon:"方案三"},
            ],
            changeFlag:true,
            //echartType:"价格占比",
            postion:"price",
            flag:false,
            goods_url:"",

            yAxisData:[0, 0, 0, 0, 0],            //传值数据  y轴数据
            xAxisData:['xx', 'xx', 'xx', 'xx', 'xx'],     //传值数据  x轴数据

            AxisPriceData:[
              { value: 335, name: "100 | 20%" },
              { value: 310, name: "100 | 20%" },
              { value: 234, name: "100 | 20%" },
              { value: 135, name: "100 | 20%" },
              { value: 1548, name: "100 | 20%" }
            ],              //按照 单品 占比  y轴数据
            changeFlagEchart:1,

            AxisProportionData:[
              { value: 335, name: "100 | 20%" },
              { value: 310, name: "100 | 20%" },
              { value: 234, name: "100 | 20%" },
              { value: 135, name: "100 | 20%" },
              { value: 1548, name: "100 | 20%" }
            ],      //	按照类目占比 x轴数据

            xAxisDataSelf:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],           // 本品数据 x 轴
            yAxisDataSelf:[120, 132, 101, 134, 90, 230, 210],           // 本品数据 y 轴   销量
            yAxisDataSelfPrice:[220, 182, 191, 234, 290, 330, 310],      // 本品数据 y 轴   券后价
            yAxisDataSelfM:[150, 232, 201, 154, 190, 330, 410],          // 本品数据 y 轴   佣金
            others:[
                {id:1,name:"firstEchart"},
                {id:2,name:"secondEchart"},
                {id:3,name:"threeEchart"},
                {id:4,name:"fourEchart"},
                {id:5,name:"fiveEchart"},
            ],
            othersAllData:[],     // 竞品的所有数据
            baseNum:5 ,           // 最初的 5 个之后的 数据下表

            taokeyi_goods_id:"" ,   // 控制 是否展示 关注的标志
            is_attention:"" ,   // 是否 关注 的 标志
            attention_goods_id:"" , // 已关注时 取消需要的 字段
            concatId:""           // 关注后返回的id
        }
    },
    methods:{
        // 关注函数 
        attention(){
            addAttention({taokeyi_goods_id:this.taokeyi_goods_id},this.info).then(res => {
                if (res.data.code == 200) {
                    //this.attention_goods_id = res.data.data.attention_goods_id
                    this.is_attention = 1
                    this.attention_goods_id = res.data.data.attention_goods_id
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        },

        cancelAttention(){
            cancelAttention({id:this.attention_goods_id},this.info).then(res => {
                if (res.data.code == 200) {
                    this.is_attention = 2
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        },

        changeData(id,num){
            // id 竞品的id  num  是否关注的状态 1 已关注 2 未关注
            for (let i = 0; i < this.others.length; i++) {
                if (this.others[i].id == id) {
                    this.others[i].is_attention = num
                }  
            }
            for (let i = 0; i < this.othersAllData.length; i++) {
                if (this.othersAllData[i].id == id) {
                    this.othersAllData[i].is_attention = num
                }  
            }
        },
            // 添加竞品数据
        addmore(){
            checkCompeteGoods(this.form,this.info).then(res => {
                if (res.data.code == 200) {

                    this.formatAddEchartInfo(res.data.data.proportion)

                    this.formatAddLineInfo(res.data.data.extension)

                    this.taokeyi_goods_id = res.data.data.taokeyi_goods_id
                    this.is_attention = res.data.data.is_attention
                    this.attention_goods_id = res.data.data.attention_goods_id


                    this.dialogFormVisible = false
                    this.dialogFormVisible2 = true
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        openFullScreen() {
            const loading = this.$loading({
                lock: true,
                text: '全网分析中,请等待......',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
                customClass: 'create-isLoading',
            });
            // setTimeout(() => {
            //     loading.close();
            // }, 2000);
        },
        toRelease(){
            if(this.goods_url){
                this.$router.push({path:"/Release",query:{goods_url:this.goods_url}})
            }
            
        },

        formatExtensionInfo(info){        //整理推广建议格式  加入 icon 图标
            this.extensionInfo = info
            let iconArray = ["方案一","方案二","方案三"]
            for(let i = 0;i < this.extensionInfo.length;i++){
                this.extensionInfo[i].commission = parseInt(this.extensionInfo[i].commission)
                this.extensionInfo[i].icon = iconArray[i]
            }
        },

        formatSelfInfo(info){
            this.yAxisDataSelfPrice = []
            this.yAxisDataSelfM = []
            this.xAxisDataSelf = []
            this.yAxisDataSelf = []
             for(var i = 0;i < info.length;i++){
                this.yAxisDataSelfPrice.push(info[i].coupon)
                this.yAxisDataSelfM.push(parseInt(info[i].commission))
                this.yAxisDataSelf.push(info[i].sale)
                this.xAxisDataSelf.push(info[i].time)
            }
        },

        //整理 单品 效果展示
        formatEchartsInfo(proportion){
            this.AxisPriceData = []
            
            for(var i = 0;i < proportion.length;i++){
                this.AxisPriceData.push({name:proportion[i].price + ' | ' + proportion[i].commission,value:proportion[i].proportion})
            }
            // 默认是单品占比 所以在这里直接 赋值
            this.changeFlagEchart += 1
        },
        //整理 按照类目 效果展示
        formatEchartsProInfo(proportion){
            this.AxisProportionData = []
            for(var i = 0;i < proportion.length;i++){
                this.AxisProportionData.push({name:proportion[i].price + ' | ' + proportion[i].commission,value:proportion[i].proportion})
            }
            this.changeFlagEchart += 1
        },



            //   整理 新加的  第一个 图标搜狐据 
        formatAddEchartInfo(info){
            this.xData = []
            for(var i = 0;i < info.length;i++){
                this.xData.push({name:info[i].price + ' | ' + info[i].commission,value:info[i].proportion})
            }
            this.changeFlagEchart += 1
        },
                 //   整理 新加的  第二个 图标搜狐据 
        formatAddLineInfo(info){
            this.yDataLinePrice = []
            this.yDataLineM = []
            this.xDataLine = []
            this.yDataLine = []
             for(var i = 0;i < info.length;i++){
                this.yDataLinePrice.push(info[i].coupon)
                this.yDataLineM.push(parseInt(info[i].commission))
                this.yDataLine.push(info[i].sale)
                this.xDataLine.push(info[i].time)
            }
        },

        // 换一换
        othersAllDataFun(){
            // 没有数据 或者数据 少于 5 条 直接 不执行
            if (this.othersAllData.length <= 5) {
                return false
            }

            // 首先 传值数组赋值为空
            this.others = []
            // 确认 基数为5  依次读取 整个数据里面的数据 
            for (let i = this.baseNum; i < this.baseNum + 5; i++) {
                if (this.othersAllData[i]) {
                    this.others.push(this.othersAllData[i]) 
                }
            }
            // 基数 依次递增五
            this.baseNum += 5
            // 如果基数 变为 超过整个数组长度  基数 变为首位  
            //  +4 原因  使 剩余 不足 5个 数组 也能展示 出 
            if (this.baseNum >= this.othersAllData.length + 4) {
                this.baseNum = 0
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

            const loading = this.$loading({
                lock: true,
                text: '全网分析中,请等待......',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
                customClass: 'create-isLoading',
            });                                       // 全屏幕遮罩层
            goodsIndex(data,this.info).then(res => {
                if(res.data.code == 200){          //请求成功数据  转换数据 给 子组件

                    this.shops = res.data.data.shop_num
                    this.goods = res.data.data.goods_num
                    // this.formatPriceInfo(res.data.data.price_proportion)
                    // this.formatCommissionInfo(res.data.data.commission_proportion)

                    // 推广建议 
                    this.formatExtensionInfo(res.data.data.proposal)

                    // 整理单品  
                    this.formatEchartsInfo(res.data.data.proportion)
                    // this.AxisPriceData = res.data.data.proportion
                    // 整理类目
                    this.formatEchartsProInfo(res.data.data.compete_proportion)

                    // // 销售建议赋值
                    this.formatSelfInfo(res.data.data.extension)

                    // 存储全部 竞品数据
                    this.othersAllData = res.data.data.compete
                   
                    if(res.data.data.compete.length > 5){
                        this.others = []
                        for (let i = 0; i < 5; i++) {
                            this.others.push(res.data.data.compete[i]) 
                        }
                    }else{
                        // 数据 少于等于五条 的业务处理
                        this.others = res.data.data.compete
                    }

                    this.nextPageFlag = false     // 下一步 button 取消禁用
                    this.changeFlag = false        //  切换 图标 button 取消禁用
                    this.flag = false             // 节流 button 取消禁用
                    loading.close();
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                    this.flag = false
                    loading.close();
                }
            })
        }
    }
}
</script>
<style lang="scss">
  .create-isLoading {
    .el-loading-spinner {
      top: 50%;
      left: 50%;
      margin-left: -55px;
      background: rgba(0, 0, 0, 0.7);
      padding: 20px;
      border-radius: 4px;
      width: auto;
      text-align: center;
      position: absolute;

      i {
        color: #eee;
      }

      .el-loading-text {
        color: #eee;
      }
    }
  }
</style>

<style lang="scss">
    .content{
        .el-divider__text{
            font-size: 16px;
        }
        .el-radio-button__inner{
            padding:10px 12px;
        }
        .contentSeach{
            .el-input__inner{
                width: 520px;
                border: 3px solid #3399ff;
                height: 44px;
                margin-left: 40px;
                font-size: 20px;
            }
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
        .Echarts{
            position: relative;
            .moreinfo{
                position: absolute;
                // top: 80px;
                right: 30px;
            }
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
        .others{
            width: 1100px;
            padding-bottom: 40px;
            margin: auto;
            display: flex;
            flex-wrap: wrap;
        }
        .changing{
            color: #999;
            margin: 10px 130px;
            text-align: right;
            cursor: pointer;
        }
        .add{
            width: 360px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #999;
            .iconBox{
                width: 70px;
                height: 70px;
                border: 1px solid #999;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
            i{
                font-size: 50px;
            }
            p{
                margin: 5px 0;
            }
            p:nth-of-type(1){
                margin-top: 15px;
            }
        }
    }
</style>