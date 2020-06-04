<template>
  <div class="showTable">
    <el-table :data="goodsList" style="width: 1140px;margin:auto" stripe border :cell-style="finalCellStyle">

      <el-table-column label="序号" width="40">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品ID" width="115">
        <template slot-scope="scope">
          <p>{{scope.row.state_to_goods.num_iid}}</p>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="100">
        <template slot-scope="scope">
          <p>{{scope.row.create_time}}</p>
        </template>
      </el-table-column>
      <el-table-column label="优惠券截至领取时间" width="100">
        <template slot-scope="scope">
          <p>{{scope.row.state_to_coupon.coupon_end_time}}</p>
        </template>
      </el-table-column>
      <el-table-column label="商品标题" width="205">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.state_to_goods.title" placement="top">
            <span class="titleCss">{{scope.row.state_to_goods.title}}</span>
          </el-tooltip> 
        </template>
      </el-table-column>
      <el-table-column label="领券量" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.state_to_coupon.coupon_receive_count}}</span>
        </template>
      </el-table-column>
      <el-table-column label="领券量预估成交金额" width="100">
        <template slot-scope="scope">
          <p class="tick">￥{{ scope.row.estimate_sales_volume_cp }}</p>
        </template>
      </el-table-column>
      <el-table-column label="领券量预估投产比" width="92">
        <template slot-scope="scope">
          <p>{{ scope.row.estimate_commissioning_ratio_cp }}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column label="销量" width="60">
        <template slot-scope="scope">
          <span>{{scope.row.state_to_goods.volume}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="销量预估成交金额" width="100">
        <template slot-scope="scope">
          <p class="tick">￥{{ scope.row.estimate_sales_volume_sv }}</p>
        </template>
      </el-table-column>
      <el-table-column label="销量预估投产比" width="92">
        <template slot-scope="scope">
          <p>{{ scope.row.estimate_commissioning_ratio_sv }}</p>
        </template>
      </el-table-column>
      <el-table-column label="是否失效" width="80">
        <template slot-scope="scope">
          <span v-show="scope.row.state == 1">预告</span>
          <span v-show="scope.row.state == 2">进行中</span>
          <span v-show="scope.row.state == 3">无效</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-link type="primary" @click="toMore(scope.row.id)">查看</el-link><br/>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: "ShowTable",
  props: ["goodsList"],
  inject:['reload'],
  data(){
    return {
      finalCellStyle:{
        cellHeight: '23',			//行高
      }
    }
  },
  methods:{
      toMore(id){
        if(id == this.$route.query.id){
          this.reload()
        }else{
          this.$router.push({path:"/Show",query:{id}})
        }
        
      },

  }
};
</script>
<style lang="scss">
.showTable{
  .titleCss{
    display: block;
    height: 23px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-table_1_column_5{
    .cell{
      overflow: hidden!important;
      white-space: nowrap!important;
      text-overflow: ellipsis!important;
      height: 23px!important;
    }
  }
}
</style>
<style lang="scss" scoped>
.showTable {
  width: 1140px;
  background: skyblue;
  margin:40px auto;
}
</style>