<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="mainAddLine"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "ShowEcharts",
  props: ["xDataLine", "yDataLine", "yDataLinePrice", "yDataLineM"],
  watch: {
    xDataLine: function (newV, oldV) {
      this.drawPie("mainAddLine");
    },
    yDataLine: function (newV, oldV) {
      this.drawPie("mainAddLine");
    },
    yDataLineM: function (newV, oldV) {
      this.drawPie("mainAddLine");
    },
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true
        },
        legend: {
          data: [
            { name: "价格", icon: "rectangle" },
            { name: "销量", icon: "rectangle" },
            { name: "佣金", icon: "rectangle" },
          ],
        },
        xAxis: [
          {
            name: "时间/日",
            type: "category",
            data: this.xDataLine,
            axisTick: {
              alignWithLabel: true,
            },
            // axisLabel: {
            //     interval:0,
            //     rotate:0
            // }
          },
        ],
        yAxis: [
          {
            type: "value",
            // name: "价格",
            // show: false,
            axisLabel: {
              show: false, //这行bai代码控制着坐标轴dux轴的文字zhi是否显示
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            axisLine: {
              //y轴
              show: false,
            },
            splitLine: {
              //网格线
              lineStyle: {
                show: true,
                type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
              },
            },
          },
          {
            type: "value",
            name: "销量",
            show: false,
          },
          {
            type: "value",
            name: "佣金",
            axisLabel: {
              formatter: "{value} %",
            },
            show: false,
          },
        ],
        dataZoom: [
          {
            type: "inside",
            start: 98,
            end: 100,
            minValueSpan: 10,
          },
          {
            show: true,
            type: "slider",
            bottom: 60,
            start: 98,
            end: 100,
            minValueSpan: 10,
            bottom: "0px",
            // show:false
          },
        ],
        series: [
          {
            name: "价格",
            type: "line",
            smooth: true,
            areaStyle: {
              // 颜色自上而下渐变
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  // 1代表上面
                  offset: 0,
                  color: "#fce2de",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ]),
              opacity: 0.3, // 填充区域透明度
            },
            data: this.yDataLinePrice,
            itemStyle: {
              normal: {
                color: "#e4978d",
                lineStyle: {
                  width: 4,
                },
              },
            },
          },
          {
            name: "销量",
            type: "line",
            smooth: true,
            areaStyle: {
              // 颜色自上而下渐变
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  // 1代表上面
                  offset: 0,
                  color: "#ddeefc",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ]),
              opacity: 0.3, // 填充区域透明度
            },
            yAxisIndex: 1,
            data: this.yDataLine,
            itemStyle: {
              normal: {
                color: "#70a1ca",
                lineStyle: {
                  width: 4,
                },
              },
            },
          },
          {
            name: "佣金",
            type: "line",
            smooth: true,
            areaStyle: {
              // 颜色自上而下渐变
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  // 1代表上面
                  offset: 0,
                  color: "#d0fbea",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ]),
              opacity: 0.3, // 填充区域透明度
            },
            yAxisIndex: 2,
            data: this.yDataLineM,
            itemStyle: {
              normal: {
                color: "#96cb04",
                lineStyle: {
                  width: 4,
                },
              },
            },
          },
        ],
      });
    },
  },
  //调用
  mounted() {
    //console.log(this.yAxisDataSelfM,"12121212")
    this.$nextTick(function () {
      this.drawPie("mainAddLine");
    });
  },
};
</script>
<style lang="scss" scoped>
#mainAddLine {
  width: 800px;
  height: 300px;
  margin: 40px auto;
  // position: relative;
  // left: 100px;
}
</style>
