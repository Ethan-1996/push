<template>
  <div class="showContent">
      <p class="title" v-if="isAll">全部放单数据</p>
      <p class="title" v-else>单品放单数据</p>
      <!-- echart 图表部分 -->
      <div class="echartBox">
          <div class="leftRadio">
              <!-- <div class="typeRadio">
                <el-radio-group v-model="type" size="medium" @change='confirmType()'>
                    <el-radio-button :label="1" >按销量计算</el-radio-button>
                    <el-radio-button :label="2">按领券量计算</el-radio-button>
                </el-radio-group>
              </div> -->
              <!-- 按小时展示 不要了 先注释 防止 后期增加 注意 连同js一块 -->
              <!-- <div class="timePick">
                <el-radio-group v-model="date" size="medium" @change="pickTime">
                    <el-radio-button :label="1" >按日展示</el-radio-button>
                    <el-radio-button :label="2">按小时展示</el-radio-button>
                </el-radio-group>
              </div>
              <div class="datePick" v-show="date == 2">
                    <el-select v-model="select" placeholder="请选择" @change="showHour">
                        <el-option
                        v-for="item in selectData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
              </div> -->
          </div>
          <ShowEchart :xAxisData="xAxisData" :yAxisData="yAxisData" :yAxisData2="yAxisData2" />
      </div>
      <!-- 表格部分 -->
      <ShowTable :goodsList="goodsList"/>
      <!-- 分页部分 -->
    <div class="page">
        <el-pagination
            :hide-on-single-page="true"
            background 
            :page-size="10"
            @current-change="handleCurrentChange"
            :current-page="1"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import {getShowGoodsList,getSalesVolume,getSingleGoods} from '@/api/api.js'
import ShowEchart from "./ShowEchart.vue"
import ShowTable from "./ShowTable"
export default {
    name:"ShowContent",
    components:{
        ShowEchart,ShowTable
    },
    props:["info"],
    inject:["reload"],
    watch:{
        $route(){
            this.reload()  //监听 路有变化  刷新页面 
        }
    },
    data(){
        return {
            isAll:"",
            //select:"",         //选择 时间 绑定数据 
            // selectData:[    //假数据 防止js报错
            //     {value:"",label:""},
            // ],
            //date:1,               //第二个 单选框模式  
            //type:1,            //第一个 单选框  模式
            goodsList:[],       //列表数据
            total:1,            //总条数
            yAxisData:[0, 0, 0, 0, 0, 0],            //传值数据  y轴数据1
            yAxisData2:[0, 0, 0, 0, 0, 0],            //传值数据  y轴数据2
            xAxisData:['xx', 'xx', 'xx', 'xx', 'xx'],     //传值数据  x轴数据
            //hourTypeAllData:"",
            //dayTypeAllData:""
        }
    },
    created(){
        if(this.$route.query.id){

            //获取 这件商品的数据    type 默认 1
            this.getSingleGoods(this.$route.query.id)
            this.isAll = false
        }else{
            this.isAll = true
            this.getSalesVolume()
            //获取表格 的信息
            this.getShowGoodsList(1)
        }
        
    },
    methods:{
        //当查看 某件商品的函数
        getSingleGoods(id){
            // this.date = 1      //每次获取数据 默认选择  周展示
            // this.select = ""   //每次获取数据  默认 不选择 日期 
            // if(type == 0){ 
            //     type = this.type
            // }

            let data = {
                id,
                type:1
            }
            getSingleGoods(data,this.info).then(res => {
                
                if(res.data.code == 200){
                    console.log(res,"checkkkkkkkkkkkkkkkkkkkkkkkkk")

                    // ShowTable 的数据
                    this.goodsList = []
                    this.goodsList.push(res.data.data.goods_info)

                    //echarts 的数据
                    this.formatDay(res.data.data.sales_volume.day)  //默认数据 
                    //this.dayTypeAllData = res.data.data.sales_volume.day   //保存日数据

                    //this.hourTypeAllData = res.data.data.sales_volume.hour   //保存 小时数居

                    //this.selectData = []       //给选择器 赋值
                    // for(let key in res.data.data.sales_volume.hour){
                    //     this.selectData.push({"value":key,"label":key})
                    // }
                    data.type = 2
                    getSingleGoods(data,this.info).then(res => {
                        if(res.data.code == 200){
                            this.yAxisData2 = []
                            for(let key in res.data.data.sales_volume.day){       
                                this.yAxisData2.push(res.data.data.sales_volume.day[key])
                            }
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            })
                        }
                    })
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    })

                }
            })

        },
        // confirmType(){
        //     if(this.$route.query.id){
        //         //有传值 时 使用 获取信息函数    
        //         this.getSingleGoods(this.$route.query.id,0)
        //         console.log("function  u id",this.type)
        //     }else{
        //         //无传值 信息     请求 全部图表信息
        //         this.getSalesVolume(0)
        //         //无传值信息时 显示所有信息数据
        //         this.getShowGoodsList(1)
        //     }
        // },
        // pickTime(val){     //选择 时间 周展示 还是 小时展示
        //     this.select = ""   //每次获取数据  默认 不选择 日期 
        //     if(val == 1 && this.dayTypeAllData){
        //         this.formatDay(this.dayTypeAllData)
        //     }
        // },
        // showHour(){     //展现 x轴数据为 小时
        //     for(let key in this.hourTypeAllData){
        //         if(key == this.select){
        //             let info = this.hourTypeAllData[key]
        //             for(let key2 in info){       //循环 剪切 删除 日期 
        //                 let newKey = key2.slice(11,19);
        //                 if (newKey) {
        //                     info[newKey] = info[key2];
        //                     delete info[key2];
        //                 }
        //             }
        //             this.formatDay(info)
        //         }
        //     }
        // },
        formatDay(info){       //取值   整理 day 模式数据
            this.xAxisData = []
            this.yAxisData = []
            for(let key in info){       
                this.xAxisData.push(key)
                this.yAxisData.push(info[key])
            }
        },
        getSalesVolume(){
            // this.date = 1      //每次获取数据 默认选择  周展示
            // this.select = ""   //每次获取数据  默认 不选择 日期 
            // if(type == 0){ 
            //     type = this.type
            // }

            let data = {
                type:1
            }
            getSalesVolume(data,this.info).then(res => {
                console.log(res,"sjsjsjsjsjsjjsjsjsjsjsjsjjsj")
                if(res.data.code == 200){
                    // this.dayTypeAllData = res.data.data.day
                    this.formatDay(res.data.data.day)
                    //先清除 默认数据  然后 push 选择器的数据
                    // this.selectData = []
                    // for(let key2 in res.data.data.hour){
                    //     this.selectData.push({"value":key2,"label":key2})
                    // }
                    // 选择 日期的数据传到本地
                    //this.hourTypeAllData = res.data.data.hour
                    data.type = 2
                    getSalesVolume(data,this.info).then(res => {
                        if(res.data.code == 200){
                            this.yAxisData2 = []
                            for(let key in res.data.data.day){       
                                this.yAxisData2.push(res.data.data.day[key])
                            }
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            })
                        }
                    })
                   
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    })
                }
            })
        },
        getShowGoodsList(page){
            // this.date = 1      //每次获取数据 默认选择  周展示
            // this.select = ""   //每次获取数据  默认 不选择 日期 
            let data = {
                page
            }
            getShowGoodsList(data,this.info).then(res => {
                console.log(res,"showreshhhhhhhhhhhhv刚发过法国hhhhhhhhhhhhhhhhhhhhhh")
                if(res.data.code == 200){
                    this.total = res.data.data.total
                    this.goodsList = res.data.data.data
                }
            })

        },
        handleCurrentChange(val) {    //切换 页码的函数
            
            if(this.$route.query.id){
                this.getSingleGoods(this.$route.query.id,this.type)
            }else{
                this.getShowGoodsList(val)
            }
        }

    }

}
</script>

<style lang="scss" scoped>
    .showContent{
        width: 1200px;
        background: #fff;
        position: relative;
        .title{
            font-size: 24px;
            font-weight: 800;
            margin: 20px 0 0 30px;
        }
        .page{
            width: 1140px;
            margin: auto;
            margin: 40px auto;
            text-align: center;
        }
        .leftRadio{
            // position: absolute;
            // top: 100px;
            // left: 20px;
            margin:40px 0 20px 200px
        }
        .timePick{
            margin-top: 30px;
        }
        .datePick{
            margin-top: 30px;
            width: 180px;
        }
    }
</style>