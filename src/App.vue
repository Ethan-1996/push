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
    // window.addEventListener('message', function(event) {
    //   // if (event.origin === 'https://domain2.com') {
    //   //   const { key } = event.data;
    //   //   const value = localStorage.getItem(key);
    //   //   event.source.postMessage({wallets: wallets}, event.origin);
    //   // }
    //     console.log(event)
    //     if(event.origin == 'https://item.taobao.com/'){
    //       console.log(event)
    //       const { key } = event.data;
    //       const value = localStorage.getItem(key);
    //       event.source.postMessage({"wallets": value}, event.origin);

    //     }

    // }, false)
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
