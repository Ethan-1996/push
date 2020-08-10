<template>
  <div class="bigBoxOfTop">
    <div class="pageTop">
      <div class="topLeft">
        <ul v-if="notLogged">
          <li v-for="item in leftInfo" :key="item.id" @click="topath(item.path)">{{item.text}}</li>
        </ul>
        <ul v-else>
          <li @click="topath('/')">首页</li>
          <li>
            欢迎您,{{name}}&nbsp;&nbsp;&nbsp;&nbsp;
            <span @click="exitLogged">退出</span>
          </li>
        </ul>
      </div>
      <div class="topRight">
        <ul>
          <li v-for="item in rightInfo" :key="item.id" @click="topath(item.path)">{{item.text}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTop",
  inject: ["reload"],
  watch: {
    $route() {
      this.accessToken = localStorage.getItem("accessToken");
      if (this.accessToken) {
        this.name = localStorage.getItem("phone");
        this.notLogged = false;
      } else {
        this.accessToken = sessionStorage.getItem("accessToken");
        if (this.accessToken) {
          this.name = sessionStorage.getItem("phone");
          this.notLogged = false;
        } else {
          this.notLogged = true;
        }
      }
    },
  },
  data() {
    return {
      name: "",
      accessToken: "",
      notLogged: false, //是否未登陆 true 为没有登陆
      leftInfo: [
        { id: 1, text: "首页", path: "/" },
        { id: 2, text: "登录", path: "/Login" },
        { id: 3, text: "注册", path: "/Register" },
      ],
      rightInfo: [
        { id: 1, text: "帮助中心", path: "/" },
        { id: 2, text: "商家合作", path: "/" },
        { id: 3, text: "网站导航", path: "/" },
      ],
    };
  },
  created() {
    //获取 本地储存用户信息
    this.accessToken = localStorage.getItem("accessToken");
    if (this.accessToken) {
      this.name = localStorage.getItem("phone");
      this.notLogged = false;
    } else {
      this.accessToken = sessionStorage.getItem("accessToken");
      if (this.accessToken) {
        this.name = sessionStorage.getItem("phone");
        this.notLogged = false;
      } else {
        this.notLogged = true;
      }
    }
  },
  methods: {
    exitLogged() {
      //推出登陆函数
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user_id");
      localStorage.removeItem("phone");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("user_id");
      sessionStorage.removeItem("phone");
      // this.reload()
      location.reload();
      // this.topath("Login")
    },
    topath(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.bigBoxOfTop {
  background: #f5f5f5;
}
.pageTop {
  width: 1400px;
  height: 37px;
  margin: auto;
  display: flex;
  justify-content: space-between;

  .topLeft {
    ul {
      display: flex;
      li {
        margin-right: 30px;
        font-size: 14px;
        line-height: 37px;
        color: #999;
        cursor: pointer;
      }
    }
  }
  .topRight {
    ul {
      display: flex;
      li {
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