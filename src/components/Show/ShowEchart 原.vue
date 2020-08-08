<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main"></div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        name: 'ShowEcharts',
        props:["xAxisData","yAxisData","yAxisData2"],
        watch:{
            xAxisData:function(newV, oldV){
                this.drawPie('main')
            },
            yAxisData2:function(newV, oldV){
                this.drawPie('main')
            },
        },
        methods:{
            drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'none' ,       // 默认为直线，可选为：'line' | 'shadow'  
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '6%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            name:'时间',
                            type: 'category',
                            data: this.xAxisData,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {  
                                interval:0,  
                                rotate:30  
                            }  
                        }
                    ],
                    yAxis: [
                        
                        {
                            type: 'value',
                            name:'成交额',
                        }
                    ],
                    series: [
                        {
                            name: "按销量成交额",
                            type: 'line',
                            data: this.yAxisData,
                        },
                        {
                            name: "按领券量成交额",
                            type: 'line',
                            data: this.yAxisData2,
                        },
                    ]               
                })
            }
        },
      //调用
        mounted(){
            this.$nextTick(function() {
                this.drawPie('main')
            })
        }
    }
</script>
<style lang="scss" scoped>
    #main{
        width: 900px;
        height: 480px;
        margin: 40px auto;
        // position: relative;
        // left: 100px;
    }
</style>
