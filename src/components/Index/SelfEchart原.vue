<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="mainSelf"></div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        name: 'ShowEcharts',
        props:["xAxisDataSelf","yAxisDataSelf","yAxisDataSelfPrice","yAxisDataSelfM"],
        watch:{
            xAxisDataSelf:function(newV, oldV){
                this.drawPie('mainSelf')
            },
            yAxisDataSelf:function(newV, oldV){
                this.drawPie('mainSelf')
            },
             yAxisDataSelfM:function(newV, oldV){
                this.drawPie('mainSelf')
            },
        },
        methods:{
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
                            data: this.xAxisDataSelf,
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
                            offset: 80,
                            // min: 0,
                            // max: 100,
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
                            data: this.yAxisDataSelfPrice,
                        },
                        {
                            name: "销量",
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.yAxisDataSelf,
                        },
                        {
                            name: "佣金",
                            type: 'line',
                            yAxisIndex: 2,
                            data: this.yAxisDataSelfM,
                        },
                    ]               
                })
            }
        },
      //调用
        mounted(){
            //console.log(this.yAxisDataSelfM,"12121212")
            this.$nextTick(function() {
                this.drawPie('mainSelf')
            })
        }
    }
</script>
<style lang="scss" scoped>
    #mainSelf{
        width: 900px;
        height: 480px;
        margin: 40px auto;
        // position: relative;
        // left: 100px;
    }
</style>
