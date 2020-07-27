<template>
  <div class="login" >
    <!--头部-->
    <div v-bind:class="{ifLogIn:ifshowor}">


      <mt-header>
        <router-link to="/" slot="left">
          <mt-button icon="back" onclick="history.go(-1)"><i class="iconfont icon-fanhui"></i></mt-button>
        </router-link>
      </mt-header>

      <!--点击切换组件-->
      <div class="loginInner">
        <!--标头-->
        <div class="Masthead">
          <h2 class="guiguFood">硅谷外卖</h2>
          <div class="clickLogin">
            <a class="SMSlogin" v-bind:class="{active:activeOr}" v-on:click="changeActive()">短信登录</a>
            <a class="Passwordlogin" v-bind:class="{active:!activeOr}" v-on:click="changeActive()">密码登录</a>
          </div>
        </div>
        <!--登录注册组件 -->
        <div class="Loginform">
          <el-form ref="form" v-if="activeOr">
            <el-form-item label-width="0px" >
              <el-input placeholder="手机号" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label-width="00px" >
              <el-input placeholder="验证码" v-model="form.code"></el-input>
            </el-form-item>
            <div class="getbutton" v-bind:class="{ifhidden:ifgetbutton}">
              <button class="getcode" @click.prevent="getcode()">获取验证码</button>
            </div>
            <div class="getbutton" v-bind:class="{ifhidden:!ifgetbutton}">
              <button class="getcode">已发送({{computeTime}})s</button>
            </div>
            <div class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="#">《用户服务协议》</a>
            </div>
            <el-form-item label-width="0px" >
              <el-button type="primary" @click="duanxinSubmit()">登录</el-button>
            </el-form-item>
            <a href="#" class="guanyu">关于我们</a>
          </el-form>

          <el-form ref="form" v-else>
            <el-form-item label-width="0px">
              <el-input placeholder="手机/邮箱/用户名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label-width="00px">
              <el-input  placeholder="密码" v-model="form.pwd" :type="`${ifshowpassword}`" ref="ifPassword"></el-input>
            </el-form-item>
            <el-switch v-model="form.delivery" v-on:change="ifshowPassword()"></el-switch>
            <el-form-item label-width="00px" >
              <el-input placeholder="验证码" v-model="form.captcha"></el-input>
            </el-form-item>
            <!--给一次性验证码绑定一个事件，点击图片发送请求-->
            <img :src="`${captchaBaseUrl}`" class="get_verification" v-on:click="qiehuan()"/>
            <el-form-item label-width="0px" >
              <el-button type="primary" @click="mimaonSubmit()">登录</el-button>
            </el-form-item>
            <a href="#" class="guanyu">关于我们</a>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default{
  data () {
    return {
      activeOr: true,
      ifshowor: false,
      form: {
        name: '', // 手机号码
        code: '', // 验证码
        pwd: '', // 密码
        delivery: false ,// 点击是否显示出密码
        captcha:""  //一次性验证码
      },
      captchaBaseUrl: '',
      ifgetbutton:false,
      computeTime:0   ,//倒计时时间
      ifshowpassword:"password"
    }
  },
  mounted () {
    this.captchaBaseUrl = 'http://localhost:4000/captcha'
  },
  methods: {
    // 切换组件
    changeActive () {
      this.activeOr = !this.activeOr
      // console.log(this.activeOr)
    },

    // 点击获取验证码按钮
    getcode () {
      // console.log(123)
      if (this.name == '') {
        Toast('请输入手机号码')
        return
      }
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.form.name))) {
        Toast('请输入正确的手机号码')
        return
      }
      //当以上都正确的时候，点击一次获取验证码，就把ifgetbutton修改一下
      this.ifgetbutton=true
      this.computeTime=10
      //点击发送验证码之后，开启定时器倒计时
      var intervalId=setInterval(result =>{
        this.computeTime--
        if(this.computeTime <= 0){
          //清除定时器
          clearInterval(intervalId)
          this.ifgetbutton=false
        }
      },1000)
      // 如上手机号码全部判断正确，把手机号码发送给后台并且发送验证码
      this.$axios({
        url: 'sendcode?phone=' + this.form.phone,
        method: 'GET'
      }).then(result => {
        Toast(result.data.msg)
      })
    },

    // 点击一次性验证码的时候，切换验证码
    qiehuan () {
      // 通过传入参数的形式来改变路径
      this.captchaBaseUrl = 'http://localhost:4000/captcha?tiem=' + Date.now()
    },

    // 点击登录按钮:短信登录
    duanxinSubmit () {
      Toast({
        message: '请前往密码登录',
        iconClass: 'iconfont icon-duibuqidangqiandenglushibai'
      })
    },

    //检测左右选择框的变化
    ifshowPassword () {
      //console.log(this.form.delivery)
      //如果是选中的状态：那么type的属性值就是text，显示密码出来
      if(this.form.delivery == true){
        //console.log(123)
        this.ifshowpassword="text"
      }
      //如果是没有被选中的状态：那么type的属性值就是password，显示密码被隐藏
      else if(this.form.delivery == false){
        this.ifshowpassword="password"
      }
    },

    // 密码登录
    mimaonSubmit () {
      if (this.form.name == "") {
        Toast("用户名必须指定")
        return
      }
      else if (this.form.pwd == "") {
        Toast("密码必须指定")
        return
      }
      else if (this.form.captcha == "") {
        Toast("验证码必须指定")
        return
      }
      //当我点击登录的时候，就把登录的手机号存放到profile这个组件中去,并且还要实现路由的跳转
      sessionStorage.setItem("user-session",this.form.name)
      sessionStorage.setItem("password-session",this.form.pwd)
      this.$router.replace('/profile')
      //判断，session中是否有数值，如果有，那就更改这个页面的样式
      if (sessionStorage.getItem('user-session') !== null) {
        //console.log(123)
        this.ifshowor=!this.ifshowor
      }
    }

  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    color: #000000;
  }
  *{
    margin: 0;
    padding: 0;
  }
  .login{
    width: 100%;
    height: 100%;
    z-index: 200;
  }
  .iconfont{
    font-size: 20px;
    color: #999;

  }
  .login .mint-header{
    background-color: #FFFFFF;
    padding-left: 5px;
  }
  .loginInner{
    width: 80%;
    height: auto;
    padding-top: 20px;
    margin: 0 auto;
  }
  .loginInner .Masthead{
    width: 100%;
  }
  .loginInner .Masthead .guiguFood{
    font-size: 40px;
    font-weight: bold;
    color: #02a774;
    text-align: center;
  }
  .loginInner .Masthead .clickLogin{
    padding-top: 30px;
    text-align: center;
  }
  .loginInner .Masthead .clickLogin a{
    color: #333;
    font-size: 14px;
    padding-bottom: 4px;
  }
  .loginInner .Masthead .clickLogin .SMSlogin{

  }
  .loginInner .Masthead .clickLogin .Passwordlogin{
    margin-left: 40px;
  }
  .loginInner .Masthead .clickLogin .active{
    color: #02a774;
    font-weight: 700;
    border-bottom: 2px solid #02a774;
  }
  .Loginform{
    width: 100%;
  }
  .el-form{
    width: 100%;
  }
  .el-form .el-input{

  }
  .el-form /deep/ .el-input .el-input__inner{
    height: 48px;
    margin-top: 16px;
  }
  .login_hint{
    width: 100%;
    margin-top: 12px;
    color: #999;
    font-size: 14px;
    line-height: 20px;
  }
  .login_hint a{
    color: #02a774;
  }
  .el-button {
    width: 100%;
    height: 42px;
    margin-top: 30px;
    background-color: #4cd96f;
    border: 1px solid #4cd96f;
  }
  .guanyu{
    display: block;
    font-size: 12px;
    margin-top: 20px;
    text-align: center;
    color: #999;
  }
  /deep/ .el-input__inner:focus{
    border-color: #02a774;
    outline: 0;
  }
  /deep/ .el-button span{
    font-size: 16px;
  }
  .getbutton{
    position: absolute;
    right: 14%;
    top: 29%;
  }
  .getcode{
    border: 0px;
    font-size: 14px;
    color: #ccc;
    background: transparent;
  }
  .getcode:focus{
    outline: -webkit-focus-ring-color auto 0px;
  }
  /deep/ .el-switch.is-checked .el-switch__core{
    border-color: #02a774;
    background-color: #02a774;
  }
  .el-switch{
    position: absolute;
    right: 13%;
    top: 39%;
  }
  .get_verification{
    position: absolute;
    top: 46%;
    right: 12%;
  }
  .ifhidden{
    visibility: hidden;
  }
  .ifLogIn{
    visibility: hidden;
  }
  /deep/ .mint-button-icon{
    display: none;
  }
</style>
