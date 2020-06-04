<template>
  <div class="layout_left">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#324157"
      :default-active="onRoutes"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      :collapse="isCollapse"
      router
    >
      <template v-for="one in items">
        <template v-if="one.subs">
          <el-submenu
            :index="one.index"
            :key="one.index"
          >
            <template slot="title">
              <i :class="one.icon"></i>
              <span>{{one.title}}</span>
            </template>
            <template v-for="two in one.subs">
              <template v-if="two.children">
                <el-submenu
                  :key='two.index'
                  :index="two.index"
                >
                  <template slot="title">
                    <span>{{two.title}}</span>
                  </template>
                  <template v-for="children in two.children">
                    <el-menu-item
                      :key='children.index'
                      :index='children.index'
                    >{{children.title}}</el-menu-item>
                  </template>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item-group :key='two.index'>
                  <el-menu-item :index='two.index'>{{two.title}}</el-menu-item>
                </el-menu-item-group>
              </template>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="one.index"
            :key="one.index"
          >
            <template>
              <i :class="one.icon"></i>
              <span>{{one.title}}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>



<script>
// import bus from "@/common/bus";
export default {
  data() {
    return {
      isCollapse: false,
      items: [
        {
          icon: "el-icon-s-open",
          index: "/",
          title: "首页"
        },
        {
          icon: "el-icon-rank",
          index: "2",
          title: "用户数据",
          subs: [
            {
              index: "data1",
              title: "数据1",
              children: [
                {
                  index: "addata1",
                  title: "添加数据1"
                }
              ]
            },
            {
              index: "data2",
              title: "数据2"
            },
            {
              index: "data3",
              title: "数据3"
            }
          ]
        },
        {
          icon: "el-icon-date",
          index: "3",
          title: "组件间传值",
          subs: [
            {
              index: "zujian1",
              title: "方法一"
            },
            {
              index: "zujian2",
              title: "方法二"
            },
            {
              index: "zujian3",
              title: "方法三"
            }
          ]
        }
      ]
    };
  },
  computed: {
    // onRoutes() {
    //   return this.$route.path.replace("/", "");
    // }
  },
  created() {
    // bus.$on("collapse", msg => {
    //   this.isCollapse = msg;
    // });
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  }
};
</script>


<style lang="scss" scoped>
.layout_left {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  background-color: #324157;
}
.layout_left::-webkit-scrollbar {
  width: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}
.layout_left > ul {
  height: 100%;
}
</style>

