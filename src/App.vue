<template>
  <div id="app" class="wrapper fixed">
    <vue-progress-bar></vue-progress-bar>
    <imp-header></imp-header>
    <aside-menu></aside-menu>
    <div class="content-wrapper" :class="{ slideCollapse: sidebar.collapsed, mobileSide: device.isMobile}">
        <el-scrollbar tag="div" wrapClass="content-scrollbar">
          <section class="content">
            <el-breadcrumb separator="/" :show="isVis">
              <template v-for="child in currentMenus">
                <el-breadcrumb-item :to="{ path: child.href }">{{child.name}}</el-breadcrumb-item>
              </template>
            </el-breadcrumb>
            <transition :name="transitionName" mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut">
              <router-view class="router-view main-view"></router-view>
            </transition>
            <imp-footer class="animated slideInUp"></imp-footer>
          </section>
        </el-scrollbar>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import store from '@/vuex/store'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import impHeader from './components/common/header'
import asideMenu from './components/common/menu'
import impFooter from './components/common/footer'
import 'animate.css'
import "font-awesome.css";

export default {
  name: 'app',
  data(){
    return {
      isVis: true,
      transitionName: 'slide-left',
      msg: '欢迎！！！',
    }
  },
  components: {
    impHeader,asideMenu,impFooter
  },
  computed: {
    ...mapGetters({
          sidebar: 'sidebar',
          device:'device',
          currentMenus:'currentMenus',
      }),
  },
  methods: {
    ...mapMutations({
          toggleDevice: 'TOGGLE_DEVICE',
          toggleSidebar: 'TOGGLE_SIDEBAR',
          toggleSidebarShow: 'TOGGLE_SIDEBAR_SHOW',
      }),
      ...mapActions({
        changeCurrentMenu: 'changeCurrentMenu' // 映射 this.changeCurrentMenu() 为 this.$store.dispatch('changeCurrentMenu')
      })
  },
  watch: {
    '$route' (to, from) {  
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }  
  },
  beforeMount () {
    const { body } = document
    const WIDTH = 784
    const handler = () => {
      if (!document.hidden) {
        let rect = body.getBoundingClientRect()
        let isMobile = rect.width < WIDTH
        this.toggleDevice(isMobile);
        if (isMobile){
          this.toggleSidebarShow(false);
          this.toggleSidebar(false);
        }else{
          this.toggleSidebarShow(true);
        }
      }
    }
    document.addEventListener('visibilitychange', handler)
    window.addEventListener('DOMContentLoaded', handler)
    window.addEventListener('resize', handler)
  },
  mounted () {
    this.$Progress.finish()
  },
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      this.$store.dispatch('changeCurrentMenu',to);
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
    this.$router.push('/');
  },
  store
}
</script>

<style>
/* 
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  } */

  .el-breadcrumb{
    padding: 14px 0 14px 8px;
    border-bottom: 1px solid #d7d7d7;
    background: whitesmoke;
    /* margin-left: -10px;
    margin-right: -6px;
    margin-top: -6px;
    margin-bottom: 5px; */
  }

  .main-view{
    padding: 10px;
  }
  .el-breadcrumb__inner{
    font-weight: 600;
    color: #303133;
  }

  .animated {
    animation-duration: .5s;
  }

  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
    margin: 0;
    padding: 0;
  }

  *,:after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }


  .content-wrapper {
    -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    margin-left: 200px;
    padding-top: 50px;
  }

  .el-scrollbar__view{
    height: 100%;
  }

  .el-scrollbar .vue-scrollbar .sidebar {
    height: 100%;
  }

  .content-scrollbar{
    height: calc(100vh - 50px);
  }

  .content-wrapper .el-scrollbar__bar.is-vertical{
    display: none;
  }
  
  .content-wrapper.slideCollapse{
    margin-left: 50px;
  }

  .content-wrapper.mobileSide{
    margin-left: 0px;
  }


/*
* 路由切换动画
*/
.router-view {  
     position: relative;  
     width: 100%;  
     transition: all .5s ease;  
}  

.slide-left-enter, .slide-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(100px, 0);  
  transform: translate(100px, 0);  
}  
.slide-left-leave-active, .slide-right-enter {  
  opacity: 0;  
  -webkit-transform: translate(-100px, 0);  
  transform: translate(-100px, 0);  
}  
</style>
