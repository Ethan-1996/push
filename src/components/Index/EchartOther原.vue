<template>
  <!--为echarts准备一个具备大小的容器dom-->
 <div class="bid">
      <div :id="name" class="mainSelf"></div>
      <div style="margin: 8px;display: flex;justify-content: center;align-items: center;" v-if="shopName">
          {{shopName}} 
          <el-link type="primary" style="margin-left:20px" v-if="is_attention == 2" @click="addAttention">关注</el-link>
          <el-link type="primary" style="margin-left:20px" v-if="is_attention == 1" @click="cancelAttention">取消关注</el-link>
      </div>
      <div style="margin: 8px auto;display: flex;justify-content: center;align-items: center;width:290px">{{title}}</div>
 </div>

</template>
<script>
    import {addAttention,cancelAttention} from '@/api/api.js'
    import echarts from 'echarts'
    export default {
        name: 'ShEcharts',
        props:["name","info","shopName","title","is_attention","token","attention_goods_id"],
        watch:{
            info:function(newV, oldV){
                this.format(newV)
                // console.log(newV)
                this.$nextTick(()=>{
                    this.drawPie(this.name)
                })
                // this.id = ""
                deep:true
            },
            shopName:function(newV, oldV){
                this.format(this.info)
                this.$nextTick(()=>{
                    this.drawPie(this.name)
                })
            },
            // is_attention:function(newV, oldV){
            //     console.log(newV)
            //     if (newV == 1) {
            //         this.isShow = true
            //     }else if(newV == 2){
            //         this.isShow = false
            //         this.id = ""
            //     }
            //     deep:true
            //     immediate: true
            // },
        },
        data(){
            return {
                isShow:true,
                id:"",
                xAxisData:[1,2,3,4,5,6],
                yAxisData1:[600,500,400,300,200,100],  //销量
                yAxisData2:[10,20,30,40,50,60],  // 价格
                yAxisData3:[2,4,6,8,10,12]   // 佣金
            }
        },
        methods:{
            // 取消关注竞品
            cancelAttention(){
                let id = ""
                if (this.attention_goods_id) {
                    id = this.attention_goods_id
                }else if(this.id){
                    id = this.id
                }else{
                    return false
                }
                cancelAttention({id},this.token).then(res => {
                    if (res.data.code == 200) {
                         this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.$parent.changeData(this.name,2)
                    }else{
                         this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                })
            },
            // 关注竞品
            addAttention(){
                addAttention({taokeyi_goods_id:this.info[0].taokeyi_goods_id},this.token).then(res => {
                    if (res.data.code == 200) {
                         this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.id = res.data.data.attention_goods_id
                        this.$parent.changeData(this.name,1)
                    }else{
                         this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                })
            },
            format(info){

                this.yAxisData3 = []
                this.yAxisData2 = []
                this.xAxisData = []
                this.yAxisData1 = []
                for(var i = 0;i < info.length;i++){
                    this.yAxisData2.push(info[i].coupon)
                    this.yAxisData3.push(parseInt(info[i].commission))
                    this.yAxisData1.push(info[i].sale)
                    this.xAxisData.push(info[i].time)
                }
                // console.log(info)

            },
            drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'line' ,       // 默认为直线，可选为：'line' | 'shadow'  
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '6%',
                        bottom: '3%',
                        containLabel: true
                    },
                    legend: {
                        data: ['价格', '销量', '佣金']
                    },
                    xAxis: [
                        {
                            name:'时间/日',
                            type: 'category',
                            data: this.xAxisData,
                            axisTick: {
                                alignWithLabel: true
                            },
                            // axisLabel: {  
                            //     interval:0,  
                            //     rotate:0  
                            // }  
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name:'价格',
                            show:false
                        },
                        {
                            type: 'value',
                            name:'销量',
                            show:false
                        },
                        {
                            type: 'value',
                            name:'佣金',
                            axisLabel: {
                                formatter: '{value} %'
                            },
                            //offset: 80,
                            min: 0,
                            max: 100,
                            show:false
                        },
                        {
                            type: 'value',
                            show:true,
                            position:"left"
                        },
                    ],
                    series: [
                        {
                            name: "价格",
                            type: 'line',
                            data: this.yAxisData2,
                        },
                        {
                            name: "销量",
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.yAxisData1,
                        },
                        {
                            name: "佣金",
                            type: 'line',
                            yAxisIndex: 2,
                            data:this.yAxisData3,
                        },
                    ]               
                })
            }
        },
      //调用
        mounted(){
            
            // console.log(this.attention_goods_id)
            if (this.info) {
                this.format(this.info)
            }
            this.$nextTick(function() {
                this.drawPie(this.name)
            })
        }
    }
</script>
<style lang="scss" scoped>
    .mainSelf{
        width: 360px;
        height: 200px;
        
        // position: relative;
        // left: 100px;
    }
</style>
