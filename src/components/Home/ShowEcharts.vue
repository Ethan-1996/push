<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "ShowEcharts",
  props: ["xAxisData", "yAxisData", "yAxisData2"],
  watch: {
    xAxisData: function (newV, oldV) {
      this.drawPie("main");
    },
    yAxisData2: function (newV, oldV) {
      this.drawPie("main");
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
            type: "none", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          type: 'plain',
          orient: 'vertical',
          align:'left',
          x:'right',      //可设定图例在左、右、居中
          y:'bottom',     //可设定图例在上、下、居中
          padding:[0,0,60,120],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: [
            { icon: "rectangle", name: "领券量",  },
            { icon: "rectangle", name: "预估成交量",  },
          ],
        },
        grid: {
          left: "1%",
          right: "20%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            name: "时间",
            type: "category",
            data: this.xAxisData,

            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              textStyle: {
                color: "#000",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#85b6e9 ", //x轴颜色
                width: 3,
              },
            },
            nameTextStyle: {
              color: "#000",
            },
            splitLine: {
              show: true, //X网格线
              lineStyle: {
                //x网格线
                color: "#c2daf4",
                type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "成交额",
            axisLabel: {
              textStyle: {
                color: "#000",
              },
            },
            splitLine: {
              show: true, //去掉网格线
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#85b6e9 ", //Y轴颜色
                width: 2,
              },
            },
            nameTextStyle: {
              color: "#000",
            },
            splitLine: {
              show: true, //X网格线
              lineStyle: {
                //x网格线
                color: "#c2daf4",
                type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
              },
            },
          },
        ],
        series: [
          {
            name: "领券量",
            type: "bar",
            barWidth: 16,
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: "#eb8065",
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "#f3b3a3" },
                  { offset: 0.5, color: "#eb8065" },
                  { offset: 1, color: "#f3b3a3" },
                ]),
              },
            },
            data: this.yAxisData,
            // data: [10, 20, 30, 40, 50, 60, 70],
          },

          {
            name: "预估成交量",
            type: "bar",
            barWidth: 16,
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: "#85a9fe",
                // barBorderRadius: 28,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "#afd5fc" },
                  { offset: 0.45, color: "#85a9fe" },
                  { offset: 0.55, color: "#85a9fe" },
                  { offset: 1, color: "#afd5fc" },
                ]),
              },
            },
            data: this.yAxisData2,
            // data: [70, 60, 50, 40, 30, 20, 10],
          },
        ],
      });
    },
  },
  //调用
  mounted() {
    this.$nextTick(function () {
      this.drawPie("main");
    });
  },
};
</script>
<style lang="scss" scoped>
#main {
  width: 600px;
  height:250px;
//   margin: 40px auto;
  // position: relative;
  // left: 100px;
}
</style>
