<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main"></div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        name: 'ShowEcharts',
        props:["xAxisData","yAxisData","type"],
        watch:{
            xAxisData:function(newV, oldV){
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
                            type: 'line' ,       // 默认为直线，可选为：'line' | 'shadow'  
                        },
                        formatter: this.type + ' ：{b}<br />{a0}: {c0}<br />' // c0 是 y轴数据
                    },
                    grid: {
                        left: '3%',
                        right: '6%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            name:'月份',
                            type: 'category',
                            data: this.xAxisData,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {  
                                interval:0,  
                                rotate:0  
                            }  
                        }
                    ],
                    yAxis: [
                        
                        {
                            type: 'value',
                            name:'金额',
                        }
                    ],
                    series: [
                        {
                            name: "收入金额",
                            type: 'line',
                            data: this.yAxisData,
                        },
                        // {
                        //     name: "按领券量成交额",
                        //     type: 'line',
                        //     data: this.yAxisData2,
                        // },
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
