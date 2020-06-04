<template>
  <div class="pageTop">
    <div class="topLeft">
        <ul v-if="notLogged">
            <li v-for="item in leftInfo" :key="item.id" @click="topath(item.path)">{{item.text}}</li>
        </ul>
        <ul v-else>
            <li @click="topath('/Admin')">首页</li>
            <li>欢迎您,{{name}}&nbsp;&nbsp;&nbsp;&nbsp;<span @click="exitLogged">退出</span></li>
        </ul>
    </div>
    <div class="topRight">
        <ul>
            <li v-for="item in rightInfo" :key="item.id" @click="topath(item.path)">{{item.text}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name:"PageTop",
    inject:['reload'],
    data(){
        return {
            name:"",
            accessToken:"",
            notLogged:false, //是否未登陆 true 为没有登陆
            leftInfo:[
                {id:1,text:"首页",path:"/Admin"},
                {id:2,text:"登录",path:"/AdminLogin"},
                
            ],
            rightInfo:[   
                {id:1,text:"帮助中心",path:"/Admin"},
                {id:2,text:"商家合作",path:"/Admin"},
                {id:3,text:"网站导航",path:"/Admin"}
            ]
        }
    },
    created(){
        //获取 本地储存用户信息 
        this.accessToken = localStorage.getItem('accessTokenAdmin')
        if(this.accessToken){
            this.name = localStorage.getItem('phoneAdmin')
            this.notLogged = false
        }else{
            this.accessToken = sessionStorage.getItem('accessTokenAdmin')
            if(this.accessToken){
                this.name = sessionStorage.getItem('phoneAdmin')
                this.notLogged = false
            }else{
                this.notLogged = true
            }
        }
    },
    methods:{
        exitLogged(){       //推出登陆函数     
            localStorage.removeItem('accessTokenAdmin')
            localStorage.removeItem('user_idAdmin')
            localStorage.removeItem('phoneAdmin')
            sessionStorage.removeItem('accessTokenAdmin')
            sessionStorage.removeItem('user_idAdmin')
            sessionStorage.removeItem('phoneAdmin')
            this.reload()
        },
        topath(path){
            this.$router.push(path)
        }
    }

}
</script>

<style lang="scss" scoped>
    .pageTop{
        width: 1400px;
        height: 37px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        .topLeft{
            ul{
                display: flex;
                li{
                    margin-right: 30px;
                    font-size: 14px;
                    line-height: 37px;
                    color: #999;
                    cursor: pointer;
                }
            }
        }
        .topRight{
            ul{
                display: flex;
                li{
                    margin-left: 60px;
                    font-size: 14px;
                    line-height: 37px;
                    color: #999;
                    cursor: pointer;
                }
            }
        }
    }
</style>