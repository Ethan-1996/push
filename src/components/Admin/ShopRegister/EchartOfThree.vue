<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "EchartOfThree",
  props:["hisXAxisData","hisYAxisData1","hisYAxisData2","hisYAxisData3","type"],
  watch: {
    hisXAxisData: function(newV, oldV) {
      this.drawPie("main");
    },
    hisYAxisData3: function(newV, oldV) {
      this.drawPie("main");
    }
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      var posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight"
      ];

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right"
          }
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom"
          }
        },
        position: {
          options: echarts.util.reduce(
            posList,
            function(map, pos) {
              map[pos] = pos;
              return map;
            },
            {}
          )
        },
        distance: {
          min: 0,
          max: 100
        }
      };

      app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 15,
        onChange: function() {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          };
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              
            ]
          });
        }
      };

      var labelOption = {
        // show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: "#fff"
          }
        }
      };


      this.charts.setOption({

        color: ['#47b231','#f75701','#008fc9'],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          //data: ["Forest", "Steppe", "Desert"]
          data: ["招商", "商家", "自己注册"]
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         mark: {show: true},
        //         dataView: {show: true, readOnly: false},
        //         magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
        // },
        xAxis: [
          {
            name:this.type,
            type: "category",
            axisTick: { show: false },
            // data: ["2012", "2013", "2014", "2015", "2016"]
            data:this.hisXAxisData
          }
        ],
        yAxis: [
          {
            type: "value",
            name:"数量"
          }
        ],
        series: [
          {
            name: "招商",
            type: "bar",
            barGap: 0,
            label: labelOption,
            // data: [320, 332, 301, 334, 390]
            data:this.hisYAxisData1
          },
          {
            name: "商家",
            type: "bar",
            label: labelOption,
            // data: [220, 182, 191, 234, 290]
            data:this.hisYAxisData2
          },
          {
            name: "自己注册",
            type: "bar",
            label: labelOption,
            // data: [150, 232, 201, 154, 190]
            data:this.hisYAxisData3
          },
         
        ]
      });
    }
  },
  //调用
  mounted() {
    this.$nextTick(function() {
      this.drawPie("main");
    });
  }
};
</script>
<style lang="scss" scoped>
#main {
  width: 1100px;
  height: 500px;
  margin: 40px auto;
  // position: relative;
  // left: 100px;
}
</style>
