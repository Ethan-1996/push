<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/Shops' }">商家</el-breadcrumb-item>
      <el-breadcrumb-item>商家列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <div class="searchItem">
        <label for="">电话：</label>
        <el-input placeholder="请输入电话" v-model="phone" style="width:400px"></el-input>
      </div>
      <div class="searchItem">
        <label for="">店铺名：</label>
        <el-input placeholder="请输入店铺名" v-model="nick" style="width:400px"></el-input>
      </div>
      <el-button
        type="primary"
        style="height:36px;margin:12px 0 0 10px " 
        @click="getBusinessList({page:1,phone:phone,nick:nick}),pageShow()" 
      >搜索</el-button>
    </div>
    <el-table
    :data="tableData"
    border
    style="width: 900px;margin:80px 0 40px 120px">
    <el-table-column
      prop="create_time"
      label="创建时间"
      width='160'>
    </el-table-column>
    <el-table-column
      prop="nick"
      label="店铺名称"
      width='160'>
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      >
    </el-table-column>
    <el-table-column
      label="状态"
      >
      <template slot-scope="scope">
        <span v-show="scope.row.state == 1">启用中</span>
        <span v-show="scope.row.state == 2">已冻结</span>
      </template>
    </el-table-column>

    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-link type="primary" @click="startBusiness(scope.row.id)" v-if="scope.row.state == 2">启用</el-link>
        <el-link type="primary" @click="stopBusiness(scope.row.id)" v-else>禁用</el-link><br>
        <el-link type="primary" @click="dialogVisible = true">效果展示</el-link>
      </template>
    </el-table-column>
  </el-table>

 <!-- 分页部分 -->
        <div class="blank"></div>
        <div class="page" v-if="pageShowFlag">
            <el-pagination
                 background 
                :page-size="10"
                @current-change="handleCurrentChange"
                :current-page="1"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <el-dialog
          title="效果展示"
          :visible.sync="dialogVisible"
          width="80%"
          >
          <Echart/>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
 
  </div>
</template>

<script>
import Echart from '@/components/Admin/Shops/ShopEchart.vue'
import getAdminInfo from '@/utils/getAdminInfo.js';
import {getBusinessList,stopBusiness,startBusiness} from '@/api/adminApi.js';
export default {
    name:'SettingShops',
    components:{
      Echart
    },
    data(){
        return {
            tableData:[],
            info:{},
            total:1,
            nick:"",
            phone:"",
            pageShowFlag:true,
            dialogVisible:false
        }
    },
    created(){
        getAdminInfo(this.info)

        this.getBusinessList({page:1})

      
        },
    methods:{
      // 获取列表函数
      getBusinessList(data){
        getBusinessList(data,this.info).then(res => {
          if(res.data.code == 200){
            //console.log(res)
            this.tableData = res.data.data.data
            this.total = res.data.data.total
          }else{
            this.$message({   
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });
          }
        })
      },
      //qiyong
      startBusiness(id){
        startBusiness({id},this.info).then(res => {
          if(res.data.code == 200){
             this.$message({   
                showClose: true,
                message: res.data.msg,
                type: 'success'
              });
              for(let i = 0;i<this.tableData.length;i++){
                if(id == this.tableData[i].id){
                  this.tableData[i].state = 1
                }
              }
          }else{
            this.$message({   
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });
          }
        })
      },
      //禁用
       stopBusiness(id){
        stopBusiness({id},this.info).then(res => {
          if(res.data.code == 200){
             this.$message({   
                showClose: true,
                message: res.data.msg,
                type: 'success'
              });
              for(let i = 0;i<this.tableData.length;i++){
                if(id == this.tableData[i].id){
                  this.tableData[i].state = 2
                }
              }
          }else{
            this.$message({   
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });
          }
        })
      },
      // 分业切换
      handleCurrentChange(val){
        let data = {page:val,phone:this.phone,nick:this.nick}
        
        this.getBusinessList(data)
      },
      pageShow(){
        this.pageShowFlag =  false;
        this.$nextTick(() => {
          this.pageShowFlag =  true;
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
        position: relative;
    }
    .small{
        width:400px;
    }
    .page {
      width: 1200px;
      text-align: center;
      position: absolute;
      bottom: 10px;
    }
  .blank {
    width: 100%;
    height: 70px;
  }
  .search{
    margin:0  20px 0 80px;
    height: auto;
    background: #f8f8f8;
    border-radius: 4px;
    display: flex;
    .searchItem{
      margin: 10px;
      label{
        display: inline-block;
        width:60px;
      }
    }
  }
</style>