<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/RechargeList' }">充值</el-breadcrumb-item>
      <el-breadcrumb-item>充值概览</el-breadcrumb-item>
    </el-breadcrumb>
    <Echart :xAxisData="xAxisData" :yAxisData="yAxisData" :type="type"/>

  
  </div>
</template>

<script>
import Echart from '@/components/Admin/Recharge/Echart.vue'
import getAdminInfo from '@/utils/getAdminInfo.js';
import {surveyMonth} from '@/api/adminApi.js';
export default {
    name:'RechargeAll',
    components:{
      Echart
    },
    data(){
        return {
            tableData:[],
            info:{},
           xAxisData:[1,2,3,4,5,6,7,8,9],
           yAxisData:[10,20,30,40,50,60,70,80,90],
           type:"月份"
        }
    },
    created(){
      getAdminInfo(this.info)

     
    },
    methods:{
      surveyMonth(data){
        surveyMonth(data,this.info).then(res => {
          if(res.data.code == 200){
            console.log(res)
          }else{
            this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
          }
        })
      }
    }
}
</script>
<style lang="scss">
.settingContent{
  .cell{
    text-align: center;
  }
}
</style>
<style lang="scss" scoped>
    .settingContent{
        width: 1200px;
        min-height: 700px;
        background: #fff;
    }
    .small{
        width:400px;
    }
</style>