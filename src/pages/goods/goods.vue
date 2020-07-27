<template>
  <div class="goodsheader">
    <div class="shop-header">
      <!--标头的背景和返回键-->
        <router-link to="/" slot="left">
          <router-link to="/msite"><mt-button ><i class="iconfont icon-fanhui"></i></mt-button></router-link>
          <!--<img :src="`${bgImg}`" class="bgimg"/>-->
          <div class="bgimg" :style="{'background-image': 'url('+info.bgImg+')'}"></div>
        </router-link>
      <!--头部的介绍-->
        <div class="shop-content">
          <img :src="`${info.avatar}`" class="avatar"/>
          <div class="header-content" v-on:click="ifjieshao()">
            <h2 class="content-title">
              <span class="pingpai">品牌</span>
              <span class="shangjianame">{{info.name}}</span>
              <i class="iconfont icon-youjian"></i>
            </h2>
            <div class="shop-message">
              <span class="shop-message-detail">{{info.score}}</span>
              <span class="shop-message-detail">月售{{info.sellCount}}单</span>
              <span class="shop-message-detail">硅谷专送 约{{info.deliveryTime}}分钟</span>
              <span class="shop-message-detail">距离{{info.distance}}m</span>
            </div>
          </div>
          <div class="shop-header-discounts" @click="ifyouhui()">
            <span class="shop-header-left">{{supports[0].name}}</span>
            <span class="shop-header-center">{{supports[0].content}}</span>
            <span class="shop-header-right">
              {{supportsLength}}个优惠
              <!--<i class="iconfont icon-yuanpanxiajianhuisex"></i>-->
            </span>
          </div>
        </div>

    </div>
    <div class="tab">
      <div class="tab-item" >
        <router-link to="/shop/goods"><span >点餐</span></router-link>
      </div>
      <div class="tab-item" >
        <router-link to="/shop/comment"><span >评论</span></router-link>
      </div>
      <div class="tab-item" >
        <router-link to="/shop/business"><span >商家</span></router-link>
      </div>
    </div>
    <div class="shop-brief-modal" v-bind:class="{ifshowjieshao:ifshowjieshao}">
      <div class="brief-modal-content" >
        <div class="modal-content">
          <h2>
            <span class="pingpai">品牌</span>
            <span class="shangjianame">{{info.name}}</span>
          </h2>
          <ul class="modal-ul">
            <li class="modal-ul-li">
              <h3>{{info.score}}</h3>
              <p>评分</p>
            </li>
            <li class="modal-ul-li">
              <h3>{{info.sellCount}}单</h3>
              <p>月售</p>
            </li>
            <li class="modal-ul-li">
              <h3>{{info.description}}</h3>
              <p >约{{info.deliveryTime}}分钟</p>
            </li>
            <li class="modal-ul-li">
              <h3>{{info.deliveryPrice}}元</h3>
              <p >配送费用</p>
            </li>
            <li class="modal-ul-li">
              <h3>{{info.distance}}</h3>
              <p>距离</p>
            </li>
          </ul>
          <h3 class="notice">公告</h3>
          <span class="jianjie">{{info.bulletin}}</span>
        </div>
        <div class="icon" v-on:click="ifjieshao()">
          <i class="iconfont icon-delete2"></i>
        </div>
      </div>

    </div>
    <div class="shop-brief-Discount" v-bind:class="{ifshowyouhui:ifshowyouhui}">
      <div class="activity-sheet-content">
        <div class="activity-sheet-content-div">
          <h2 class="activity-h2">优惠活动</h2>
          <div class="icon" v-on:click="ifyouhui()">
            <i class="iconfont icon-delete2"></i>
          </div>
          <ul class="discountul">
            <li class="discountli" v-for="(item,i) in supports" :key="i">
              <span class="pingpai">{{item.name}}</span>
              <h3>{{item.content}}</h3>
            </li>
          </ul>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default{
  data () {
    return {
      info: '',
      supports: [],
      supportsLength: '', // 数组长度
      ifshowjieshao: true ,// 是否展示介绍
      ifshowyouhui:true,//是否展示优惠政策
    }
  },
  methods: {
    // 切换
    ifjieshao () {
      this.ifshowjieshao = !this.ifshowjieshao
      // console.log(123)
    },
    ifyouhui () {
      this.ifshowyouhui = !this.ifshowyouhui
    }
  },
  mounted () {
    this.$http.get('/info').then(result => {
      	this.info = result.body.data
      this.supports = result.body.data.supports
      this.supportsLength = result.body.data.supports.length
      // console.log(this.supportsLength)
    })
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
  ul{
    list-style: none;
  }
  .goodsheader{
    width: 100%;
    height: 100%;
    z-index: 200;
  }
  .iconfont{
    font-size: 20px;
    color: #999;
  }
  .goodsheader .mint-button{
    padding-left: 5px;
    height: 50px;
    z-index: 100000;
    background-color: rgba(0,0,0,0);
  }
  .bgimg{
    width: 100%;
    height: 50px;
    position: relative;
    top: -50px;
    background-size: cover;
  }
   .goodsheader .mint-button .iconfont{
     color: #FFF;
   }
   .shop-header /deep/ .myactive{
     display: block;
     height: 50px;
   }
   .shop-content{
    width: 100%;
   }
   .shop-content .avatar{
     width: 66px;
     height: 66px;
     position: absolute;
     top: 10px;
     margin-left: 50%;
     transform: translateX(-50%);
     box-shadow: 0 0 0.4vw 0 rgba(0,0,0,0.2);
   }
   .header-content{

   }
   .header-content .content-title{
    margin-top: 25px;
    text-align: center;
   }
   .header-content .content-title .pingpai{
    font-size: 12px;
    background-color: yellow;
    padding: 2px 5px;
    font-weight: 700;
    border-radius: 2px;
   }
   .shangjianame{
    font-weight: 700;
    font-size: 20px;
    margin: 0px 3px;
   }
    .header-content .content-title .icon-youjian{
     color: #666666;
     font-size: 14px;
   }
   .shop-message{
     text-align: center;
   }
   .shop-message .shop-message-detail{
    text-align: center;
    height: 12px;
    margin-top: 8px;
    font-size: 11px;
    color: #333;
   }
   .shop-header-discounts{
     text-align: center;
     height: 25px;
     line-height:25px ;
     border: 1px solid #EEEEEE;
     font-size: 11px;
     color: #666;
     margin: 5px 30px;
   }
   .shop-header-discounts .shop-header-left{
    font-size: 9px;
    background-color: #70bc46;
    padding: 2px 5px;
    font-weight: 500;
    color: white;
    border-radius: 2px;
   }
   .shop-header-discounts .shop-header-center{
    margin-right: 20px;
   }
   .shop-header-discounts .shop-header-right::after{
     content: "";
     display: block;
     border-style: solid;
     border-width: 4px 4px 0;
     border-color: rgba(0,0,0,0.57) transparent transparent;
     position: absolute;
     -webkit-transform: translateY(-50%);
     transform: translateY(-50%);
     right: 33px;
     top: 22%;
   }
    .goodsheader .tab{
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #EEEEEE;
    }
    .goodsheader .tab .tab-item{
      width: 33.33%;
      height: 100%;
      float: left;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
    }
    .goodsheader .tab .tab-item span{
      height: 100%;
      width: 40px;
      display: block;
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .tab .tabActive{
      color: #02a774;
      border-bottom: 2px solid #02A774;
    }
    .shop-brief-modal,.shop-brief-Discount{
      width: 100%;
      height: 100%;
      display: flex;
      position: fixed;
      z-index: 9999999;
      top: 0;
      left: 0;
      background: rgba(0,0,0,0.5);
    }
    .brief-modal-content{
      width: 90%;
      height: 235px;
      position: relative;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      left: 5%;
      background-color: #FFFFFF;
      border-radius: 4px;
    }
    .modal-content{
      position: relative;
      margin: 20px 20px;
      width: 87%;
      height: 80%;
      color: #000000;
      text-align: center;
    }
    .modal-content .pingpai{
      font-size: 12px;
      background-color: yellow;
      padding:2px 5px;
      font-weight: 700;
      border-radius: 2px;
    }
    .modal-content h2{
      text-align: center;
      margin-left: 8%;
    }
    .modal-ul{
      margin-top: 10px;
      margin-left: -8px;
    }
    .modal-ul-li{
      float: left;
      width: 20%;
    }
    .modal-ul-li h3{
      font-size: 15px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }
    .modal-ul-li p{
      font-size: 12px;
      color: #999;
    }
    .notice{
      margin-top: 20px;
      font-size: 12px;
      padding: 50px;
      color: #999;
      background-color: #fff;
      padding-bottom: 10px;
    }
    .modal-content .jianjie{
      font-size: 13px;
      line-height: 1.54;
      color: #333;
      overflow-y: auto;
    }
    .brief-modal-content .icon{
      margin-top: 50px;
      width: 25px;
      height: 25px;
      border: 1px solid rgba(255,255,255,0.7);
      border-radius: 50%;
      margin-left: 50%;
      transform: translateX(-50%);
      text-align: center;
      line-height: 25px;
    }
    .brief-modal-content .icon .icon-delete2{
      color: rgba(255,255,255,0.7);
    }
    .ifshowjieshao,.ifshowyouhui{
      visibility: hidden;
    }
    .activity-sheet-content{
      width: 100%;
      height: 240px;
      display: flex;
      position: fixed;
      background-color: #FFFFFF;
      bottom: 0px;
      left: 0px;
    }
    .activity-sheet-content .discountul{
      width: 100%;
      margin: 0px 30px;
    }
    .discountul .discountli{
      margin-bottom: 14px;
    }

    .discountul .discountli:first-child .pingpai{
      background-color: #70bc46;
    }
    .discountul .discountli:nth-child(2) .pingpai{
      background-color: #f07373;
    }
    .discountul .discountli .pingpai{
      font-size: 12px;
      background-color: #f1884f;
      padding:2px 5px;
      font-weight: 700;
      border-radius: 2px;
      color: #FFFFFF;
      float: left;
      margin-right: 10px;
    }
    .discountul .discountli h3{
      font-size: 12px;
      font-weight: normal;
    }
    .activity-h2{
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .activity-sheet-content-div{
      width: 100%;
      margin-top: 15px;
    }
    .activity-sheet-content-div /deep/ .icon-delete2{
      display: block;
      float: right;
      font-size: 26px;
      color: black;
      /* top: 1px; */
      margin-top: -50px;
    }
</style>
