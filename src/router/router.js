import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Test1 from '@/views/Test1'
import Test2 from '@/views/Test2'
import Test3 from '@/views/emp/test3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden:true
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      hidden:true /*用于导航栏的自动渲染，如果为true，则忽略这个菜单*/
    },
    {
      path: '/home',
      name: '导航一',
      component: Home,
      children:[
        {
          path: '/test1',
          name: '选项1',
          component: Test1
        },
        {
          path: '/test2',
          name: '选项2',
          component: Test2
        }
        ,
        {
          path: '/test3',
          name: '选项3',
          component: Test3
        }
      ]
    },

  ]
})
