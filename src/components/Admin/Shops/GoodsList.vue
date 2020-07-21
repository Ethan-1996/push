<template>
<div class="hisList">
  <el-table
    :data="listInfo"
    style="width: 1140px;margin:auto"
    >
    <el-table-column
      label=""
      width="20"
      >
    </el-table-column>

    <el-table-column
      label="提交时间"
      width="100"
      >
      <template slot-scope="scope">
        <span class="toLeft">{{ scope.row.update_time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="主图"
      width="140">
      <template slot-scope="scope">
        <el-image :src="scope.row.state_to_goods.pict_url" style="width:65px;height:65px;border-radius:5px ;"></el-image>
      </template>
    </el-table-column>
    <el-table-column
      label="短标题"
      width="200">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="dark" :content="scope.row.state_to_goods.title" placement="top">
          <p style="height: 46px;overflow: hidden;" class="toLeft">{{ scope.row.state_to_goods.title }}</p>
        </el-tooltip>
        
        <p style="color:red" class="toLeft">{{scope.row.state_to_goods.cat_name}}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="券后价"
      >
      <template slot-scope="scope">
        <span style="text-align:center">{{scope.row.post_coupon_price}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="佣金"
      >
      <template slot-scope="scope">
        <span>{{scope.row.commission}}%</span>
      </template>
    </el-table-column>
    <el-table-column
      label="优惠卷"
      width="140">
      <template slot-scope="scope">
        <p class="tick">￥{{ scope.row.state_to_coupon.coupon_amount }} <span class="point point1"></span><span class="point point2"></span></p>
        <p>已领</p>
        <p class="check" v-if="scope.row.checkNumFlag" @click="checknum(scope.row.id,scope.row.state_to_coupon.coupon_activity_id)">查看数量</p>
        <p v-else>{{scope.row.state_to_coupon.coupon_remain_count}}/{{scope.row.state_to_coupon.coupon_total_count}}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="起止时间"
      width="100">
      <template slot-scope="scope">
        <p class="toLeft">{{ scope.row.state_to_coupon.coupon_start_time }}</p>
        <p class="toLeft">至</p>
        <p class="toLeft">{{ scope.row.state_to_coupon.coupon_end_time }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      >
      <template slot-scope="scope">
        <span v-show="scope.row.state == 1">预告</span>
        <span v-show="scope.row.state == 2">进行中</span>
        <span v-show="scope.row.state == 3">无效</span>
      </template>
    </el-table-column>
    <el-table-column
      label="上传平台"
      width="90">
      <template slot-scope="scope">
         <el-checkbox-group v-model="scope.row.platformList">
            <el-checkbox v-for="item in platformData" :key="item.id" :label="item.id" disabled style="display:block">{{item.platform}}</el-checkbox>
          
        </el-checkbox-group>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-link type="primary" @click="dialogVisible = true;getSingleGoods(scope.row.id,scope.row.user_id)">查看</el-link><br/>
        <el-link type="primary" @click="dialogVisible = true;getSingleGoods(scope.row.id,scope.row.user_id)">修改</el-link><br/>
        <el-link type="primary" @click="editLower(scope.row.id,scope.row.user_id)" v-if="scope.row.upper_lower == 1">下架</el-link>
        <el-link type="primary" v-else >已下架</el-link><br/>
        <el-link type="primary" @click="editDelete(scope.row.id,scope.row.user_id)">删除</el-link><br/>      
      </template>
      </el-table-column>
  </el-table>

  <el-dialog :title="text" :visible.sync="dialogVisible" width="80%">
      <Echart :xAxisData="xAxisData" :yAxisData="yAxisData" :yAxisData2="yAxisData2" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import Echart from "@/components/Admin/Shops/ShopEchart.vue";
  import {editDelete,editLower,getSingleGoods,getCoupon,getPlatform} from '@/api/adminApi.js'
  export default {
      name:"List",
      components:{
        Echart
    },
    created(){
      getPlatform(this.info).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.platformData = res.data.data
        }
      })
    },
      // inject:['reload'],    //引入 app中 刷新方法
      props:["listInfo","info"],
      watch:{
        listInfo:function(newV, oldV){
          
        },
        info:function(newV, oldV){
          
        }
      },
      data(){
        return {
          platformData:[],
          checkFlag:true,
          dialogVisible: false,
            yAxisData: [],
            yAxisData2: [],
            xAxisData: [],
            text:"效果展示"
        }
      },
      
    methods: {
      format(info) {
      this.xAxisData = [];
      this.yAxisData = [];
      for (let key in info) {
        this.xAxisData.push(key);
        this.yAxisData.push(info[key]);
      }
    },
      // 可视化图标请求数据
    getSingleGoods(id,user_id) {
      //type 1 是按照销量计算
      getSingleGoods({ id,user_id, type: 1 }, this.info).then(res => {
        if (res.data.code == 200) {
          console.log(res.data.data.sales_volume.day);
          this.format(res.data.data.sales_volume.day);
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });

      //type 2 是按照领券量计算
      getSingleGoods({ id,user_id, type: 2 }, this.info).then(res => {
        if (res.data.code == 200) {
          this.yAxisData2 = []
          for (let key in res.data.data.sales_volume.day) {
            this.yAxisData2.push(res.data.data.sales_volume.day[key]);
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
      checknum(id,coupon_activity_id){      //查看领取 优惠卷数量
        let data = {
          id,
          coupon_activity_id
        }
        getCoupon(data,this.info).then(res => {
          console.log(res,"resgsgsgsggsgggggggggggggggg")
          if(res.data.code == 404){                //  404 表示  过期了  就  显示 list 中的 数据
            for(let i = 0;i < this.listInfo.length;i++){
              if(this.listInfo[i].id == id){
                this.listInfo[i].checkNumFlag = false
              }
            }
          }else if(res.data.code == 200){     // 获取领券量 后 根据 id 对比 更改数据  试图更新
            for(let i = 0;i < this.listInfo.length;i++){
              if(this.listInfo[i].id == id){
                this.listInfo[i].state_to_coupon.coupon_remain_count = res.data.data.coupon_receive_count  //领取量
                this.listInfo[i].state_to_coupon.coupon_total_count = res.data.data.coupon_total_count  //总量
                this.listInfo[i].checkNumFlag = false
              }
            }
          }
        })
      },
        //下架商品函数 
      editLower(id,user_id){  
        
        this.$confirm('此操作将永久下架该商品且不可逆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            id,
            user_id
          }
          editLower(data,this.info).then(res => {
            // console.log(res,"kkkkkkkkkkkkkkkkkkk")
            if(res.data.code == 200){
              for(let i = 0;i < this.listInfo.length;i++){   //更新 成功后 更改试图
                if(id == this.listInfo[i].id){
                  this.listInfo.splice(i,1)
                }
              }
              //this.getStateNum()       //重新获取 数量
              this.$message({
                type: 'success',
                message: '已成功下架!'
              });
            }else{
              this.$message({
                type: 'error',
                message: res.data.mag
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下架'
          });          
        });

      },
      //删除 商品信息的函数
      editDelete(id,user_id) {
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            id,user_id
          }
          editDelete(data,this.info).then(res => {
            if(res.data.code == 200){
              for(let i = 0;i < this.listInfo.length;i++){   //更新 成功后 更改试图
                if(id == this.listInfo[i].id){
                  this.listInfo.splice(i,1)
                }
              }
              //this.getStateNum()       //重新获取 数量
              this.$message({
                type: 'success',
                message: '删除成功！'
              });
            }else{
              this.$message({
                type: 'error',
                message: res.data.mag
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
</script>
<style lang="scss">
.hisList{
  .el-table .cell{
    // padding:0 5px;
    text-align: center;
  }
  // .el-table td{
  //   // padding: 4px 0;
  // }
  .toLeft{
    display: block;
    text-align: left!important;
  }
}
</style>
<style lang="scss" scoped>
  .tick{
    width: 60px;
    height: 22px;
    background: #ff9933;
    margin: auto;
    color: #fff;
    border-radius: 3px;
    position: relative;
    overflow: hidden;
      .point{
        width: 8px;
        height: 8px;
        background: #fff;
        position: absolute;
        border-radius: 4px;
        top: 7px;
      }
      .point1{
        left: -4px;
      }
      .point2{
        right: -4px;
      }

  }
  .check{
    cursor: pointer;
  }
</style>