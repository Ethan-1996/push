<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div class="bid">
    <div
      style="margin: 8px;display: flex;justify-content: center;align-items: center;font-size:14px;font-weight:800;color:#333"
      v-if="shopName"
    >
      {{shopName}}
      <el-button
        type="primary"
        style="margin-left:20px;padding: 4px 9px;"
        v-if="is_attention == 2"
        @click="addAttention"
        round
        size="mini"
      >关注</el-button>
      <el-button
        type="primary"
        style="margin-left:20px;padding: 4px 9px;"
        v-if="is_attention == 1"
        @click="cancelAttention"
        round
        size="mini"
      >取消关注</el-button>
    </div>

    <div :id="name" class="mainSelf"></div>
    <div class="goodsTitle" @click="tourl()">{{title}}</div>
  </div>
</template>
<script>
import { addAttention, cancelAttention } from "@/api/api.js";
import echarts from "echarts";
export default {
  name: "ShEcharts",
  props: [
    "name",
    "info",
    "shopName",
    "title",
    "is_attention",
    "token",
    "attention_goods_id",
    "item_url"
  ],
  watch: {
    info: function (newV, oldV) {
      this.format(newV);
      this.$nextTick(() => {
        this.drawPie(this.name);
      });
      // this.id = ""
      deep: true;
    },
    shopName: function (newV, oldV) {
      this.format(this.info);
      this.$nextTick(() => {
        this.drawPie(this.name);
      });
    },
  },
  data() {
    return {
      isShow: true,
      id: "",
      xAxisData: [1, 2, 3, 4, 5, 6],
      yAxisData1: [120, 132, 101, 134, 90, 230, 210], //销量
      yAxisData2: [220, 182, 191, 234, 290, 330, 310], // 价格
      yAxisData3: [150, 232, 201, 154, 190, 330, 410], // 佣金
    };
  },
  methods: {
    tourl(){
      window.open(this.item_url, "_blank");
    },
    // 取消关注竞品
    cancelAttention() {
      let id = "";
      if (this.attention_goods_id) {
        id = this.attention_goods_id;
      } else if (this.id) {
        id = this.id;
      } else {
        return false;
      }
      cancelAttention({ id }, this.token).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.$parent.changeData(this.name, 2);
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    // 关注竞品
    addAttention() {
      addAttention(
        { taokeyi_goods_id: this.info[0].taokeyi_goods_id },
        this.token
      ).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.id = res.data.data.attention_goods_id;
          this.$parent.changeData(this.name, 1);
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    format(info) {
      this.yAxisData3 = [];
      this.yAxisData2 = [];
      this.xAxisData = [];
      this.yAxisData1 = [];
      for (var i = 0; i < info.length; i++) {
        this.yAxisData2.push(info[i].coupon);
        this.yAxisData3.push(parseInt(info[i].commission));
        this.yAxisData1.push(info[i].sale);
        this.xAxisData.push(info[i].time);
      }
    },
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
          // axisPointer: {
          //     type: 'cross',
          //     label: {
          //         backgroundColor: '#6a7985'
          //     }
          // }
        },
        legend: {
          type: "plain",
          orient: "vertical",
          align: "left",
          x: "right", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          padding: [0, 20, 40, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: [
            { name: "价格", icon: "rectangle" },
            { name: "销量", icon: "rectangle" },
            { name: "佣金", icon: "rectangle" },
          ],
        },

        grid: {
          left: "10%",
          right: "4%",
          bottom: "3%",
          top: "2%",
          containLabel: true,
        },
        xAxis: [
          {
            name: "时间/日",
            type: "category",
            boundaryGap: false,
            data: this.xAxisData,
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
                  color: "#ffdfdb",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ]),
              opacity: 0.3, // 填充区域透明度
            },
            data: this.yAxisData2,
            itemStyle: {
              color: "#e3968d",
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
                  color: "#ddedfc",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ]),
              opacity: 0.3, // 填充区域透明度
            },
            yAxisIndex: 1,
            data: this.yAxisData1,
            itemStyle: {
              color: "#70a1ca",
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
                  color: "#d7fdee",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ]),
              opacity: 0.3, // 填充区域透明度
            },
            yAxisIndex: 2,
            data: this.yAxisData3,
            itemStyle: {
              color: "#99c4b0",
            },
          },
        ],
      });
    },
  },
  //调用
  mounted() {
    if (this.info) {
      this.format(this.info);
    }
    this.$nextTick(function () {
      this.drawPie(this.name);
    });
  },
};
</script>
<style lang="scss" scoped>
.mainSelf {
  width: 360px;
  height: 150px;
  // margin-bottom: 40px;
  // position: relative;
  // left: 100px;
  
}
.goodsTitle {
    margin: 8px;
    width: 270px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 40px;
    color: #409eff;
    cursor: pointer;
  }
  .goodsTitle:hover{
    color: red;
  }
</style>
