<template>
  <div class="profile">
    <!--我的-->
    <div class="mine">
      <span>我的</span>
    </div>
    <!--显示登录注册-->
    <div class="profile-number">
      <router-link to="login">
        <!--头像-->
        <div class="headPortrait">
          <i class="iconfont icon-iocn-icon-person"></i>
        </div>
        <!--登录注册-->
        <div class="user-info">
          <p class="user-info-top" v-bind:class="{ifnameshow:ifnameshow}">登录/注册</p>
          <p class="user-info-top" v-bind:class="{ifnameshow:!ifnameshow}">{{userName}}</p>
          <p >
            <span class="user-icon">
              <i class="iconfont icon-shouji"></i>
            </span>
            <span class="icon-mobile-number">暂无绑定手机号</span>
          </p>
        </div>
        <!--箭头符号-->
        <div class="arrow">></div>
      </router-link>
    </div>
    <!--显示余额以及优惠券等等信息-->
    <div class="profile_info_data">
      <ul class="info_data_list">
        <li class="info_data_link">
          <span class="info_data_top">
            <span>0.00</span>元
          </span>
          <span class="info_data_bottom">我的余额</span>
        </li>
        <li class="info_data_link">
          <span class="info_data_top green">
            <span>0</span>个
          </span>
          <span class="info_data_bottom">我的优惠</span>
        </li>
        <li class="info_data_link">
          <span class="info_data_top orange" >
            <span>0</span>分
          </span>
          <span class="info_data_bottom">我的积分</span>
        </li>
      </ul>
    </div>
    <!--详情页面-->
    <div class="profile_my_order">
      <a href="#" class="my_order">
        <span>
          <i class="iconfont icon-icon-order-s"></i>
        </span>
        <div class="my_order_div">我的订单</div>
      </a>
      <a href="#" class="my_order">
        <span>
          <i class="iconfont icon-jifen"></i>
        </span>
        <div class="my_order_div">积分商城</div>
      </a>
      <a href="#" class="my_order">
        <span>
          <i class="iconfont icon-icon_VIP"></i>
        </span>
        <div class="my_order_div">硅谷外卖会员卡</div>
      </a>
    </div>
    <div class="profile_my_order">
      <a href="#" class="my_order">
        <span class="">
          <i class="iconfont icon-icon-fuwu"></i>
        </span>
        <div class="my_order_div">服务中心</div>
      </a>
    </div>
    <div  v-bind:class="{ifexit:ifexit}" @click="Exitstatus()">
      <mt-button type="danger" size="large">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
export default{
  data:function(){
    return{
      userName:"",   //存放手机号码
      ifnameshow:false   ,//判断
      ifexit:true   //是否显示退出登录
    }
  },
  mounted () {
    //console.log(sessionStorage.getItem('user-session'))
    if (sessionStorage.getItem('user-session') !== null) {
      //console.log(123)
      this.userName=sessionStorage.getItem('user-session')
      this.ifnameshow=!this.ifnameshow
      this.ifexit=!this.ifexit
    }
  },
  //点击退出登录的方法
  //退出登录：删除session中的数据，并且更改一些变量值
  methods:{
    Exitstatus () {
      sessionStorage.clear()
      this.ifnameshow=!this.ifnameshow
      this.ifexit=!this.ifexit
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
    color: #000000;
    -webkit-tap-highlight-color: transparent;
  }
  .profile{
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .mine{
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 22px;
    background-color: #02a774;
    color: #FFFFFF;
    top: 0;
    left: 0;
    z-index: 99999;
  }
  .profile-number{
    display: block;
    width: 100%;
    height: 100px;
    background-color: #02a774;
    border-top: 1px solid #FFFFFF;
    /* position: relative; */
    /* margin-top: 45px; */
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
  .profile-number .headPortrait{
    width: 100%;
    float: left;
    width: 60px;
    height: 60px;
    border: 1px solid #e4e4e4;
    border-radius: 50%;
    overflow: hidden;
    background-color: #e4e4e4;
    margin-left: 10px;
    margin-top: 20px;
  }
  .profile-number .headPortrait .iconfont{
    font-size: 62px;
    color: #666;
  }
  .profile-number .user-info{
    float: left;
    padding-top: 25px;
    margin-left: 15px;
  }
  .profile-number .user-info .user-info-top{
    padding-bottom: 8px;
    font-size: 18px;
    color: #fff;
    font-weight: 700;
  }
  .profile-number .user-info .user-icon{
    display: inline-block;
    /* margin-left: -5px; */
    margin-right: -5px;
    width: 20px;
    height: 20px;
    font-size: 30px;
    margin-top: -20px;
    color: #fff;
  }
   .profile-number .user-info .icon-mobile-number{
     font-size: 14px;
     color: #fff;
   }
   .arrow{
     float: right;
     margin-right: 15px;
     /* margin-top: -50%; */
     margin-top: 34px;
     color: #fff;
   }
   .profile_info_data{
     width: 100%;
     position: relative;
     /* margin-top: 20px; */
     box-sizing: border-box;
     /* padding-top: 20px; */
     background: #fff;
     /* padding-top: 45px; */
     /* margin-top: 20px; */
     border-bottom: 1px solid #f1f1f1;
     height: 85px;
   }
   .profile_info_data .info_data_list{
     margin: 0;
     padding: 0;
     list-style: none;
    }
   .profile_info_data .info_data_list li{
     width: 33%;
     float: left;
     border-right: 1px solid #f1f1f1;
   }
   .profile_info_data .info_data_list li:last-child{
     border-right: 0px ;
   }
   .profile_info_data .info_data_list li .info_data_top{
     display: block;
     width: 100%;
     font-size: 14px;
     color: #333;
     padding: 15px 5px 10px;
     text-align: center;
   }
   .profile_info_data .info_data_list li .info_data_top span{
     display: inline-block;
     font-size: 30px;
     color: #f90;
     font-weight: 700;
     line-height: 30px;
   }
   .profile_info_data .info_data_list li .info_data_bottom{
     display: inline-block;
     font-size: 14px;
     color: #666;
     font-weight: 400;
     padding-bottom: 10px;
     margin-left: 50%;
     transform: translateX(-50%);
   }
   .profile_info_data .info_data_list li .info_data_top.green span{
     color: #ff5f3e;
   }
   .profile_info_data .info_data_list li .info_data_top.orange span{
     color:#6ac20b;
   }
  .profile_my_order{
    width: 100%;
    background: #FFFFFF;
    border-top: 10px solid #f5f5f5;
  }
  .my_order{
    display: flex;
    align-items: center;
    padding-left: 15px;
    border-bottom: 1px solid #F5F5F5;
  }
  .profile_my_order .iconfont{
        float: left;
        margin-left: -3px;
        margin-right: 5px;
  }
  .icon-icon-order-s{
    color: #02a774;
  }
  .icon-jifen{
    color: #ff5f3e;
  }
  .icon-icon_VIP{
    color: #f90;
  }
  .icon-icon-fuwu{
    color: #02a774;
  }
  .my_order_div{
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
    padding: 15px 10px 15px 0;
    font-size: 16px;
    color: #333;
    display: flex;
    justify-content: space-between;
  }
  .ifnameshow{
    display: none;
  }
  .mint-button{
    margin-top: 10px;
  }
  .ifexit{
    display: none;
  }
</style>
