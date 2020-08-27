<template>
  <div class="logoTop">
    <div class="logo">
      <img src="../../assets/images/indexLogo.png" alt />
      <span class="shu"></span>
      <img src="../../assets/images/indexLogoAfter.png" alt />
      <span style="margin-left:5px">专 注 淘 客 流 量 推 广</span>
    </div>
    <div class="logoRight">
      <ul>
        <li v-for="item in navs" :key="item.id" @click="toPath(item.route)" :class="$route.path == item.route ? 'active':''">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebIndexHeader",
  props: ["info"],
  data() {
    return {
      navs: [
        { id: 1, text: "首页", route: "/" },
        { id: 2, text: "推广中心", route: "/Home" },
        { id: 3, text: "产品分析", route: "/Index" },
        { id: 4, text: "插件下载", route: "/DownLoadCrx" },
        { id: 5, text: "个人中心", route: "/PersonCenter" },
      ],
    };
  },
  methods: {
    toPath(path) {
      if (!this.info && path != '/DownLoadCrx' && path != '/') {
        this.$router.push("/Login");
      } else {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.logoTop {
  width: 1400px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  .logo {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #8ebff7;
    .shu {
      display: inline-block;
      height: 38px;
      width: 2px;
      background: #cccccc;
      margin: 0 10px;
    }
  }
  .logoRight {
    ul {
      display: flex;
      justify-content: space-between;
      width: 480px;
      li {
        padding: 5px;
        margin-right: 24px;
        font-size: 16px;
        border-bottom: 2px solid #fff;
        cursor: pointer;
      }
      li:nth-of-type(5) {
        margin-right: 0;
      }
      li:hover {
        border-bottom: 2px solid #0590f9;
      }
      .active{
        border-bottom: 2px solid #0590f9;
      }
    }
  }
}
</style>