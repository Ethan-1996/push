<template>
  <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/AdminList' }">管理员设置</el-breadcrumb-item>
      <el-breadcrumb-item>权限设置</el-breadcrumb-item>
    </el-breadcrumb>
     <div class="content">
         <div class="left">
             <el-table
                height="500"
                border
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="username"
                    label="姓名"
                   >
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="电话号码"
                    >
                </el-table-column>
                <el-table-column
                    label="操作"
                   >
                   <template slot-scope="scope">
                        <el-link type="primary" @click="set(scope.row)">修改权限</el-link>
                    </template>
                </el-table-column>

            </el-table>
         </div>
         <div class="right">
             <p style="padding:20px;font-size:20px">{{nameForChange}}</p>
             <el-tree
                :data="data"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                style="margin-left:40px"
                >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ data.describe }}</span>
                    
                </span>
             </el-tree>
             <div style="margin:40px">
                 <el-button :disabled="id == ''" @click="getCheckedNodes">确认选择</el-button>
                 <el-button @click="resetChecked">清空</el-button>
             </div>
         </div>
     </div>
  </div>
</template>

<script>
import {getAdminAllRoleTree,getAllAdmins,getAdminRole,addOrEditAdminRole} from '@/api/adminApi.js';
import getAdminInfo from '@/utils/getAdminInfo.js';
export default {
    name:'AdminSetRights',
    data(){
        return {
            info:{},
            tableData:[],
            data:[],
            nameForChange:"权限展示",
            id:"", // 要更改时 传入的id
            arr:[]
        }
    },
    created(){

      getAdminInfo(this.info)
        getAdminAllRoleTree(this.info).then(res => {
            //console.log(res)
            if(res.data.code == 200){
                this.data = res.data.data
            }
        })

        getAllAdmins(this.info).then(res=> {
            if(res.data.code == 200){
                this.tableData = res.data.data
            }
        })
    },
    methods:{
        set(item){
            this.nameForChange ="正在修改" + item.username + "的权限"
            this.id = item.id
            getAdminRole({admin_id:item.id},this.info).then(res=>{
                if(res.data.code == 200){
                    this.arr = []
                    this.sel(res.data.data,this.data)

                    let Nodes = []
                    for(let i=0;i<this.arr.length;i++){
                        Nodes.push({"id":this.arr[i]})
                    }
                    
                    //console.log(this.arr)
                    this.setCheckedNodes(Nodes)
                }else{
                    this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'error'
                    });
                }
            })

        },
        // 设置 选中节点
        setCheckedNodes(Nodes) {
            // 接受一个数组 俩面试每个元素的对象  可以指通过id 来选择 
            this.$refs.tree.setCheckedNodes(Nodes);
        },
        //清空所有 选中节点
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        },
         getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes(false,true));
            let data = this.$refs.tree.getCheckedNodes(false,true)
            let role_id = []
            for(let i = 0;i<data.length;i++){
                role_id.push(data[i].id)
            }
            addOrEditAdminRole({admin_id:this.id,role_id},this.info).then(res => {
                if(res.data.code == 200){
                    this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                }else{
                     this.$message({   
                    showClose: true,
                    message: res.data.msg,
                    type: 'error'
                    });
                }
            })

        },
        sel(data,all){
            // 筛选出  子权利的 夫权力  并剔除
            for(let i =0;i<data.length;i++){  // 循环一有权利
                for(let j =0;j<all.length;j++){  //循环 所有权力的 一级
                    if(data[i] == all[j].id){    // 找到 与一级 权力匹配的 节点
                        if(all[j].children && all[j].children.length != 0){  //如果 有子节点 继续 循环 没有的话 push 进新数组
                            this.sel(data,all[j].children)
                        }else{
                            this.arr.push(data[i])
                        }
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .settingContent{
        width: 1200px;
        min-height: 700px;
        background: #fff;
    }
    .small{
        width:400px;
    }
    .content{
        margin-top: 80px;
        width: 1100px;
        padding: 0 50px;
        display: flex;
        justify-content: space-between;
        .left{
            width: 500px;
            height: 500px;
        }
        .right{
            width: 500px;
            min-height: 500px;
            border:1px #EBEEF5 solid;
        }
    }
</style>