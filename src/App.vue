<template>
  <div id="app">
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive && show">
        <!-- 这里是会被缓存的视图组件 -->
    </router-view>
</keep-alive>
 
<router-view v-if="!$route.meta.keepAlive && show">
    <!-- 这里是不被缓存的视图组件 -->
</router-view>

    <!-- <router-view v-if="show"/> -->
  </div>
</template>

<script>
export default {
  name:"App",
  provide(){     //穿一个 刷新页面的函数
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      show:true
    }
  },
  created(){
  },
  methods:{
    reload(){
      this.show = false
      this.$nextTick(function() {
        this.show = true
      })
    }
  }
}
</script>
<style lang="scss">
body{padding-right:0 !important;}

</style>
