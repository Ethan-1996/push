<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="mainAddLine"></div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        name: 'ShowEcharts',
        props:["xDataLine","yDataLine","yDataLinePrice","yDataLineM"],
        watch:{
            xDataLine:function(newV, oldV){
                this.drawPie('mainAddLine')
            },
            yDataLine:function(newV, oldV){
                this.drawPie('mainAddLine')
            },
             yDataLineM:function(newV, oldV){
                this.drawPie('mainAddLine')
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
                            data: this.xDataLine,
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
                            data: this.yDataLinePrice,
                        },
                        {
                            name: "销量",
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.yDataLine,
                        },
                        {
                            name: "佣金",
                            type: 'line',
                            yAxisIndex: 2,
                            data: this.yDataLineM,
                        },
                    ]               
                })
            }
        },
      //调用
        mounted(){
            //console.log(this.yAxisDataSelfM,"12121212")
            this.$nextTick(function() {
                this.drawPie('mainAddLine')
            })
        }
    }
</script>
<style lang="scss" scoped>
    #mainAddLine{
        width: 900px;
        height: 480px;
        margin: 40px auto;
        // position: relative;
        // left: 100px;
    }
</style>
