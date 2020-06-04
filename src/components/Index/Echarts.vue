<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main"></div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        name: 'Echarts',
        props:["xAxisData","yAxisData"],
        watch:{
            xAxisData:function(newV, oldV){
                this.drawPie('main')        //echart 渲染数据 必须重新走一遍函数
            }
        },
        methods:{
            drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: '价格 | 佣金 ：{b}<br />{a0}: {c0}%<br />'
                    },
                    grid: {
                        left: '3%',
                        right: '12%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            name:'价格 | 佣金',
                            type: 'category',
                            data: this.xAxisData,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {          
                                interval:0,      //每隔几个数据显示
                                //rotate:30       //数据倾斜 
                            }  

                        }
                    ],
                    yAxis: [
                        {
                            name:'所占比例',
                            type: 'value',
                            axisLabel: {  
                                show: true,  
                                interval: 'auto',  
                                formatter: '{value} %'  
                            },
                            show:true
                        }
                    ],
                    series: [
                        {
                            name: "所占比例",
                            type: 'bar',
                            barWidth: '60px',
                            data: this.yAxisData,
                            itemStyle: {
                                normal: {
                                    color: function(params) {          //设置颜色   
                                        var colorList = ["#3399cc","#99cc99","#ffff99","#ffcc99","#cc3366"]
                                        return colorList[params.dataIndex] 
                                    },
                                },
                            },
                        }
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
        width: 1000px;
        height: 400px;
        margin: auto;
    }
</style>
