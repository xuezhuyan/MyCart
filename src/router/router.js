import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../components/list/List.vue'
import Cart from '../components/cart/Cart.vue'
import GoodsInfo from '../components/goodsinfo/GoodsInfo.vue'
import Test from '../components/cart/test.vue'
// 安装
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/list' },
    { path: '/list', component: List },
    { path: '/cart', component: Cart },
    { path: '/goodsinfo/:id?', component: GoodsInfo },
    { path: '/test', component: Test }
  ]
})

/**
 // 导航守卫
 router.beforeEach((to, from, next) => {
   // to表示要去的路由对象
   // from: 要离开的路由对象
   // next: 执行下一步操作,必须调用这个方法
   if (to.path === '/login') {
     // 如果是登陆页面 直接展示登陆页面
     next()
   } else {
     // 判断用户是否登陆
     // 假设此处登陆成功后,用户信息被储存到cookie中
     if (document.cookie.indexOf('session_id') > 0) {
       // 如果用户有用户名就执行下一步操作
       next()
     } else {
       next({ path: '/login' })
     }
   }
 })

 登录状态判断步骤
 1. 在登录页面输入用户名和密码
 2. 点击登录按钮,发送ajax请求,将用户名和密码传递给服务器登录接口
 3. 服务器的登陆接口根据传过来的用户名和密码,到数据库中查询有没有该用户
 4. 如果有该用户,将用户信息储存到session中
 5. 将session_id 储存到cookie中(服务器通过SetCookie的响应头告诉浏览器,让浏览器
  储存session_id到cookie中)
 6. 每个页面跳转的时候,都会经过设置好的导航守卫,进行登录状态的判断
 */
export default router
