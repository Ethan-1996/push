<template>
  <div class="showContent">
      <p class="title" v-if="isAll">全部放单数据</p>
      <p class="title" v-else>单品放单数据</p>
      <!-- echart 图表部分 -->
      <div class="echartBox">
          <ShowEchart :xAxisData="xAxisData" :yAxisData="yAxisData" :yAxisData2="yAxisData2" />
      </div>
      <!-- 表格部分 -->
      <ShowTable :goodsList="goodsList"/>
      <!-- 分页部分 -->
      <div class="blank"></div>
    <div class="page">
        <el-pagination
            :hide-on-single-page="false"
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
            goodsList:[],       //列表数据
            total:1,            //总条数
            yAxisData:[0, 0, 0, 0, 0, 0],            //传值数据  y轴数据1
            yAxisData2:[0, 0, 0, 0, 0, 0],            //传值数据  y轴数据2
            xAxisData:['xx', 'xx', 'xx', 'xx', 'xx'],     //传值数据  x轴数据
        }
    },
    created(){
        // console.log(this.info.user_info)
        if (!this.info.user_info) {
            console.log(11212121212121)
            return false
        }else{
           if(this.$route.query.id){

                //获取 这件商品的数据    type 默认 1
                this.getSingleGoods(this.$route.query.id)
                this.getShowGoodsList(1)
                this.isAll = false
            }else{
                this.isAll = true
                this.getSalesVolume()
                //获取表格 的信息
                this.getShowGoodsList(1)
            }
        }
        
        
    },
    methods:{
        //当查看 某件商品的函数
        getSingleGoods(id){
            let data = {
                id
            }
            getSingleGoods(data,this.info).then(res => {
                
                if(res.data.code == 200){
                    // ShowTable 的数据
                    // this.goodsList = []
                    // this.goodsList.push(res.data.data.goods_info)

                    //echarts 的数据
                    this.formatDay(res.data.data.sales_volume)  //默认数据 
                    console.log(res,888888888888888888)
                    
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    })

                }
            })

        },
        formatDay(info){       //取值   整理 day 模式数据
            this.xAxisData = []
            this.yAxisData = []
            this.yAxisData2 = []
            for(let key in info){       
                this.xAxisData.push(key)
                this.yAxisData.push(info[key].estimate_receive_num)
                this.yAxisData2.push(info[key].estimate_deal_num)
            }
        },
        getSalesVolume(){
            getSalesVolume(this.info).then(res => {
                if(res.data.code == 200){
                    this.formatDay(res.data.data)  
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    })
                }
            })
        },
        getShowGoodsList(page){
            let data = {
                page
            }
            getShowGoodsList(data,this.info).then(res => {
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
            text-align: center;
            position: absolute;
            bottom: 40px;
        }
        .blank{
            width: 1140px;
            margin: auto;
            height: 100px;
            background: #fff;
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