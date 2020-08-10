<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div class="box">
    <div id="mainAdd"></div>
    <p style="text-align:center">竞品历史方案占比</p>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "Echarts",
  props: ["xData", "changeFlagEchart"],
  watch: {
    changeFlagEchart: function (newV, oldV) {
      this.drawPie("mainAdd"); //echart 渲染数据 必须重新走一遍函数
    },
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        backgroundColor: "#fff",
        title: {
          text: "单品占比分析",
          left: "center",
          top: 0,
          textStyle: {
            color: "#999",
          },
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        // visualMap: {
        //   show: false,
        //   min: 0,
        //   max: 1548,
        //   inRange: {
        //     colorLightness: [0, 1]
        //   }
        // },
        series: [
          {
            name: "价格 | 佣金",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.xData.sort(function (a, b) {
              return a.value - b.value;
            }),
            // roseType: "radius",
            label: {
              color: "rgba(0, 0, 0, 0.6)",
            },
            labelLine: {
              lineStyle: {
                color: "rgba(0, 0, 0, 0.6)",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              //     color: function(params) {          //设置颜色
              //     var colorList = ["#5b8ff9","#5ad8a6","#5d7092","#f6db16","#e86452","#6dc8ec","#945fb9","#ff9845","#1e9493","#ff99c3"]
              //     return colorList[params.dataIndex]
              // },
              normal: {
                color: function (params) {
                  var colorList = [
                    {
                      c1: " #1e9593",
                      c2: "#cefffe",
                    },
                    {
                      c1: " #945fb9",
                      c2: "#e1b7fe",
                    },
                    {
                      c1: " #f6bd16",
                      c2: "#fff2cc",
                    },
                    {
                      c1: " #ff98c3",
                      c2: "#ffb9d6",
                    },
                    {
                      c1: " #6ec8ed",
                      c2: "#bfedff",
                    },
                    {
                      c1: "#5ad9a6",
                      c2: "#b4ffe1",
                    },
                    {
                      c1: " #76b9ef",
                      c2: "#b0cde4",
                    },

                    {
                      c1: " #eb8086",
                      c2: "#faaf9c",
                    },
                  ];
                  return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上

                      offset: 1,
                      color: colorList[params.dataIndex].c1,
                    },
                    {
                      offset: 0,
                      color: colorList[params.dataIndex].c2,
                    },
                  ]);
                  /*  return colorList[params.dataIndex]*/
                },
              },
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      });
    },
  },
  //调用
  mounted() {
    this.$nextTick(function () {
      this.drawPie("mainAdd");
    });
  },
};
</script>
<style lang="scss" scoped>
#mainAdd {
  width: 1000px;
  height: 260px;
  margin: auto;
}
</style>
