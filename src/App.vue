<template>
  <div id="app">
    
    <router-view v-if="show"/>
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
