<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div class="box" style="display:inline-block">
    <div id="mainProportion"></div>
    <p style="text-align:center">本品所在类目所有方案占比</p>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "mainProportion",
  props: ["AxisProportionData"],
  watch: {
    AxisProportionData: function(newV, oldV) {
      this.drawPie("mainProportion"); //echart 渲染数据 必须重新走一遍函数
    }
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
          text: "类目占比分析",
          left: "center",
          top: 20,
          textStyle: {
            color: "#999"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        series: [
          {
            name: "价格 | 佣金",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              color: "rgba(0, 0, 0, 0.6)"
            },
            labelLine: {
              lineStyle: {
                color: "rgba(0, 0, 0, 0.6)"
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },

            data: this.AxisProportionData,
            itemStyle: {
              // color: function(params) {          //设置颜色
              //     var colorList = ["#5b8ff9","#5ad8a6","#5d7092","#f6db16","#e86452","#6dc8ec","#945fb9","#ff9845","#1e9493","#ff99c3"]
              //     return colorList[params.dataIndex]
              // },
              normal: {
                color: function(params) {
                  var colorList = [
                    {
                      c1: " #eb8086",
                      c2: "#faaf9c"
                    },
                    {
                      c1: " #76b9ef",
                      c2: "#b0cde4"
                    },
                    {
                      c1: "#5ad9a6",
                      c2: "#b4ffe1"
                    },
                    {
                      c1: " #6ec8ed",
                      c2: "#bfedff"
                    },
                    {
                      c1: " #ff98c3",
                      c2: "#ffb9d6"
                    },
                    {
                      c1: " #f6bd16",
                      c2: "#fff2cc"
                    },
                    {
                      c1: " #945fb9",
                      c2: "#e1b7fe"
                    },
                    {
                      c1: " #1e9593",
                      c2: "#cefffe"
                    }
                  ];
                  return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上

                      offset: 1,
                      color: colorList[params.dataIndex].c1
                    },
                    {
                      offset: 0,
                      color: colorList[params.dataIndex].c2
                    }
                  ]);
                  /*  return colorList[params.dataIndex]*/
                }
              }
            }
          }
        ]
      });
    }
  },
  //调用
  mounted() {
    this.$nextTick(function() {
      this.drawPie("mainProportion");
    });
  }
};
</script>
<style lang="scss" scoped>
#mainProportion {
  width: 500px;
  height: 400px;
  display: inline-block;
  //   margin: auto;
}
</style>
