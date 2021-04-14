<template>
    <div>
      <el-container>
        <el-header class="homeHeader">
          <div class="title">机场项目</div>

          <el-dropdown class="userInfo" @command="commandHandler"><!--@command连接下面的各个command方法，根据传给commandHandler的值不同，调用不同的方法-->
            <span class="el-dropdown-link">
              {{user.name}}<i><img :src="user.userface" alt=""></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userinfo">个人中心</el-dropdown-item> <!--common表示点击事件-->
              <el-dropdown-item command="setting">设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu router>
              <!--default-active="2"--> <!--默认打开的菜单项-->
              <!--class="el-menu-vertical-demo"--><!--样式-->
              <!--@open="handleOpen"--><!--菜单打开时的回调-->
              <!--@close="handleClose"--><!--菜单关闭时的回调-->
              <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                <template slot="title">
                  <i style="margin-right: 5px;color: #f53434" :class="item.iconCls"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path != '/home'">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="homeWelCome" v-if="this.$router.currentRoute.path == '/home'">
              WelCome!!!
            </div>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
    export default {
      name: "Home",
      data(){
        return{
          user:JSON.parse(window.sessionStorage.getItem("user")), //将保存在sessionStorage里面的数据根据key值取出来
        }
      },
      computed:{
        routes(){
          return this.$store.state.routes;
        }
      },
      methods:{
        commandHandler(cmd){
          if (cmd == 'logout'){
            this.$confirm('此操作将注销登录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.getRequest("/api/logout"); /*确认退出后，获取后端的数据*/
              window.sessionStorage.removeItem("user") /*删除登录用户的缓存数据*/
              this.$store.commit('initRoutes',[]) /*删除登录用户的缓存数据*/
              this.$router.replace("/") /*退出后回到登录页*/
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });
          }
        },
      }
    }
</script>

<style>
  .homeWelCome{
    text-align: center;
    font-size: 30px;
    font-family: 微软雅黑;
    color: #3be515;
    padding-bottom: 25px;
  }

  .homeHeader{
    background-color: #0099ff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    box-sizing: border-box;
  }

  .homeHeader .title{
    font-size: 30px;
    font-family: 华文行楷;
    color: white;
  }

  .homeHeader .userInfo{
    cursor: pointer; /* 当鼠标移到上面时变为手指形状*/
  }

  .el-dropdown-link img{
    width: 30px;
    height: 30px;
    border-radius: 24px;
    margin-left: 8px;
  }

  .el-dropdown-link{
    display: flex;
    align-items: center;
  }

</style>
