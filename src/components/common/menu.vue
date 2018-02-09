<template>
  <aside class="main-sidebar animated fadeInLeft" :class="{ showSlide: sidebar.show, hideSlide: !sidebar.show, expandSide:(!sidebar.collapsed||device.isMobile)}">
    <el-scrollbar tag="div" wrapClass="vue-scrollbar" v-if="(!sidebar.collapsed||device.isMobile)">
      <div class="sidebar">
        <el-menu :default-active="onRoutes" :default-openeds="onRouteKeys" class="el-menu-vertical el-menu-style" router :collapse="sidebar.collapsed&&!device.isMobile" @select="handleSelect">
          <template v-for="item in menuList">
            <sub-menu :param="item"></sub-menu>
          </template>
        </el-menu>
      </div>
    </el-scrollbar>
    <div class="sidebar" v-else>

      <el-menu :default-active="onRoutes" class="el-menu-vertical el-menu-style" router :collapse="sidebar.collapsed&&!device.isMobile" @select="handleSelect">
        <template v-for="item in menuList">
          <sub-menu :param="item"></sub-menu>
        </template>
      </el-menu>
    </div>
  </aside>
</template>

<script>

import subMenu from "./subMenu.vue"
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  components:{
    subMenu
  },
  props: {
    show: Boolean
  },
  data() {
    return {
    };
  },
  methods: {
      ...mapMutations({
        toggleSidebarShow: 'TOGGLE_SIDEBAR_SHOW',
      }),
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleSelect() {
        if(this.device.isMobile){
          this.toggleSidebarShow(false);
        }
      },
    },
    computed:{
      ...mapGetters({
        sidebar: 'sidebar',
        device:'device',
      }),
      onRoutes(){
        return this.$route.path;
      },
      onRouteKeys(){
        const getParentArray = (path, ms, kas = []) => {
          if (ms && ms.length > 0) {
            for (let k = 0, length = ms.length; k < length; k++) {
              if (path == ms[k].href) {
                kas.push(ms[k].href);
                break;
              }
              let i = kas.length;
              if (ms[k].children && ms[k].children.length > 0) {
                getParentArray(path, ms[k].children, kas);
              }
              if (i < kas.length) {
                kas.push(ms[k].href);
              }
            }
          }
          return kas.reverse();
        }
        return getParentArray(this.$route.path, this.menuList);
      },
      ...mapGetters([
        'menuList'
      ])
    },
    created: function () {
    },
};
</script>
<style>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

.el-menu {
  /* border: none; */
  height: 100%;
  /* background-color: #eff1f6; */
}


.showSlide {
  animation-duration: 0.2s;
  animation-name: slideInLeft;
}

.hideSlide {
  animation-duration: 0.2s;
  animation-name: slideOutLeft;
}

.el-menu--collapse .el-submenu .el-menu{
  position: relative !important;
  left: 0px;
  top: -50px;
}

.main-sidebar {
  /* border-right: 1px solid #d7d7d7; */
  text-align: left;
  background-color: #ffffff;
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  height: calc(100vh - 50px);
  width: 50px;
  z-index: 810;
  -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
}

.expandSide {
  width: 200px;
}

.el-menu-style,
.el-menu-style .el-menu{
  background-color: #ffffff;
}
.el-menu-style .el-menu-item:hover,
.el-menu-style .el-submenu__title:hover{
  background-color: #eeeeee !important;
}

.el-menu-style .el-submenu .el-menu-item {
  height: 45px;
  line-height: 45px;
}

.el-menu-style .el-menu-item,
.el-menu-style .el-submenu__title {
  height: 45px;
  line-height: 45px;
}

.main-sidebar .el-menu--collapse {
  width: 44px;
}

.main-sidebar .el-menu--collapse {
  width: 50px;
}



.vue-scrollbar {
  background-color: #ffffff !important;
  height: calc(100vh - 50px);
  margin-bottom: 0px;
  margin-right: 0px;
  overflow: hidden;
}

.main-sidebar .el-scrollbar__bar.is-vertical {
  display: none;
}

.sidebar {
  min-height: 450px;
  height: 100%;
}

.el-menu-sub > .el-menu{
  height: auto;
}

</style>
