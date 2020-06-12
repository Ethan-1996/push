<template>
    <div class="historyContent">
        <p class="title">我的商品</p>
        <!-- 商品状态 -->
        <div class="goodsState">
            <div class="states">
                <el-link @click="getGoodsList(2,1)" :underline="false" :type="inlineType">当前在线商品</el-link>
                <el-link @click="getGoodsList(1,1)" :underline="false" :type="fuType">预告</el-link>
                <el-link @click="getGoodsList(3,1)" :underline="false" :type="noType">无效商品</el-link>
            </div>
            <div class="search">
                <!-- <el-autocomplete
                    v-model="searchInfo"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    @select="handleSelect"
                    suffix-icon="el-icon-search"
                ></el-autocomplete> -->
                <el-input placeholder="请输入店铺名/标题" v-model="searchInfo" size="small" style="margin-top:10px">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
        </div>

        <!-- 表格部分 -->

        <List :listInfo="listInfo" :info="info"/>

        <!-- 分页部分 -->
        <div class="blank"></div>
        <div class="page" v-if="pageShow">
            <el-pagination
                 background 
                :page-size="10"
                @current-change="handleCurrentChange"
                :current-page="1"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        
    </div>
</template>

<script>

import {getGoodsList} from '@/api/adminApi.js'
import getAdminInfo from '@/utils/getAdminInfo.js';
import List from '@/components/Admin/Shops/GoodsList.vue'
export default {
    name:"HistoryContent",
    components:{
        List
    },
    created(){
        // 获取用户信息函数
        getAdminInfo(this.info)

        if(!getAdminInfo(this.info)){
            return false
        }else{
            //获取数量
            // this.getStateNum()
            this.getGoodsList(2,1)
        }
    },
    data(){
        return {
            total:1,
            listInfo:[],
            info:{},
            inlineType:"primary",
            fuType:"info",
            noType:"info",
            // inlineNum:"0",
            // fuNum:"0",
            // noNum:"0",
            searchInfo:"",   //搜索框内容
            pageShow:true,
            
        }
    },
    methods:{
        search(){
             let type = 0               // 判断是什么类型的商品
            if(this.inlineType == "primary"){
                type = 2
            }
            if(this.fuType == "primary"){
                type = 1
            }
            if(this.noType == "primary"){
                type = 3
            }
            this.getGoodsList(type,1,this.searchInfo)
            this.pageShow = false
            this.$nextTick(()=> {
                this.pageShow = true
            })
        },
        // getStateNum(){    //获取 各个状态 数量的 函数 传给子组件 
        //     getStateNum(this.info).then(res => {
        //         console.log(res,"whwhwhwhhwhwhwhwhwh")
        //         if(res.data.code == 200){
        //             this.inlineNum = res.data.data.conduct  //正在进行数量
        //             this.fuNum = res.data.data.foresee     //预告数量
        //             this.noNum = res.data.data.invalid    //无效数量
        //         }
        //     })

        // },
        getGoodsList(state,page,keywords){
            switch (state) {
                case 1:
                    this.inlineType = "info"
                    this.fuType = "primary"
                    this.noType = "info"
                    break;
                case 2:
                    this.inlineType = "primary"
                    this.fuType = "info"
                    this.noType = "info"
                    break;
                case 3:
                    this.inlineType = "info"
                    this.fuType = "info"
                    this.noType = "primary"
                    break;
                default:
                    break;
            }
            let data = {
                state,
                page,
                keywords
            }
            getGoodsList(data,this.info).then(res => {
                console.log(res)
                this.listInfo = res.data.data.data
                //循环添加一个 查看数量flag
                
                for(let i = 0;i < this.listInfo.length;i++){

                    //$set 触发试图更新
                    this.$set(this.listInfo[i],"checkNumFlag",true);
                }
                //console.log(this.listInfo,"infofffffofofofofofofofofofo")
                this.total = res.data.data.total
            })

        },
        
        handleCurrentChange(val) {    //切换 页码的函数
            let type = 0               // 判断是什么类型的商品
            if(this.inlineType == "primary"){
                type = 2
            }
            if(this.fuType == "primary"){
                type = 1
            }
            if(this.noType == "primary"){
                type = 3
            }
            this.getGoodsList(type,val,this.searchInfo)
        }
    }

}
</script>
<style lang="scss">
    .goodsState{

        .el-link--inner{
            margin-left: 30px;
            line-height: 50px;
        }
        // .el-input__inner{
        //     width: 320px;
        //     height: 30px;
        //     border: none;
        //     line-height: 30px;
        //     margin-top: 10px;
        // }
        // .el-input__suffix{
        //     top: 5px;
        // }
    }   
</style>

<style lang="scss" scoped>
    .historyContent{
        width: 1200px;
        background: #fff;
        position: relative;
        .title{
            width: 1140px;
            margin: auto;
            font-size: 20px;
            margin:30px auto;
        }
        .goodsState{
            height: 60px;
            width: 1140px;
            background: #f8f8f8;
            margin:10px auto 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
        }
        .search{
            margin-right: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            top: -5px;
        }
        .page{
            width: 1140px;
            text-align: center;
            position: absolute;
            bottom: 40px;
        }
        .blank{
            width: 1140px;
            margin: auto;
            height: 100px;
            background: #fff;
        }
    }
</style>