import Vue from 'vue'
import Router from 'vue-router'

/**
 *  路由配置 
 *  配置跳转页面
 */
import header from '../components/common/header'
import menu from '../components/common/menu'
import footer from '../components/common/footer'

/**
 * 404页面
 */
import error404 from '../components/error'


/**
 * 菜单页面
 */
import main from '../components/pages/main'
import person from '../components/pages/person'

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/sys/person',
      component: person,
      beforeEnter: (to, from, next)=>{
        console.log('准备进去路由器...')
        console.info(to);
        console.info(from);
        //next({path: '/sys/person'});
        next();
      },
      beforeLeave: (to, from, next) => {
        console.log('准备离开路由器...')
        next();
      }
    },
    {
      path: '*',
      component: error404
    },
  ]
})

