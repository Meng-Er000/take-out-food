<template>
  <div id="footer1" ref="footer" v-bind:class="{ifshow:ifshow}">
    <mt-tabbar style="background-color: #FFFFFF;">
      <mt-tab-item id="tab1">
        <router-link to="msite">
          <i class="iconfont icon-waimai"></i>
          <span>外卖</span>
        </router-link>
      </mt-tab-item>

      <mt-tab-item id="tab2">
        <router-link to="search">
          <i class="iconfont icon-sousuo"></i>
          <span>搜索</span>
        </router-link>
      </mt-tab-item>

      <mt-tab-item id="tab3">
        <router-link to="order">
          <i class="iconfont icon-waimaidingdan"></i>
          <span>订单</span>
        </router-link>
      </mt-tab-item>

      <mt-tab-item id="tab4">
        <router-link to="profile">
          <i class="iconfont icon-wode"></i>
          <span>我的</span>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default{
  data () {
    return {
      ifshow:false
    }
  },
  //页面最开始加载出来的时候，判断路由，如果路由地址是login的时候，那么就直接隐藏
  created () {
    if(this.$route.path == "/login" ){
      this.ifshow=true
    }
    else if(this.$route.path == "/msite/goods"){
      this.ifshow=true
    }
  },
  //监听路由改变
  watch: {
    $route: {
      handler: function(val, oldVal){
        //console.log(val.path);
        if(val.path == "/login"){
          return this.ifshow=!this.ifshow
        }
        else if(val.path == "/shop/goods" || val.path == "/shop/comment" || val.path == "/shop/business"){
          return this.ifshow=true
        }
        else if(val.path !== "/login"){
          this.ifshow=false
        }
      },
      // 深度观察监听
      deep: true
    },
  },
}
</script>

<style scoped>
  a{
    text-decoration: none;
    color: #999;
    -webkit-tap-highlight-color:transparent
  }
  .footer1{
    background-color: #FFFFFF;
    position: flex;
    display: flex;
    z-index: 999;
    left: 0;
    right: 0;
    bottom: 0px;
    width: 100%;
    height: 50px;
  }
  .mint-tabbar{
    position:fixed;
    z-index: 100;
    bottom:0px;
    left:0px;
  }
  .iconfont{
    display: block;
    margin-bottom: 5px;
    font-size: 22px;
    font-weight: 500;
  }
  .footer1 span{
    font-size: 12px;
    font-weight: 600;
  }
  .myactive{
    color: #02a774;
  }
  .ifshow{
    visibility: hidden;
  }
</style>
