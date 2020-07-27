<template>
  <div class="msite">
    <!--标头-->
    <mt-header :title="`${headerTitle.name}`" fixed size="22px">
      <router-link to="/search" slot="left"><mt-button><i class="iconfont icon-sousuo"></i></mt-button></router-link>
      <router-link to="/login" slot="right"><mt-button>登录|注册</mt-button></router-link>
    </mt-header>
    <!--导航栏部分-->
    <div class="msiteBar">
        <mt-swipe :auto="4000">
          <mt-swipe-item>
            <a href="javascript:"
            class="link_to_food"
            v-for="(item,index) in foodNavFirst"
            :key="index">
              <div class="food_container"><img :src="`${baseUrl}${item.image_url}`"></div>
              <span>{{item.title}}</span>
            </a>
          </mt-swipe-item>
          <mt-swipe-item>
            <a href="javascript:"
            class="link_to_food"
            v-for="(item,index) in foodNavSecond"
            :key="index">
              <div class="food_container"><img :src="`${baseUrl}${item.image_url}`"></div>
              <span>{{item.title}}</span>
            </a>
          </mt-swipe-item>
        </mt-swipe>
    </div>
    <!--中间的分界区域-->
    <div class="separate"></div>
    <!--附近商家-->
    <div class="msite_shop_list">
      <!--附近商家头部-->
      <div class="shop_header">
        <i class="iconfont icon-shops"></i>
        <span>附近商家</span>
      </div>

      <!--附近商家详情页-->
      <div class="shop_container">
        <ul class="shop_list">
          <router-link to="/shop/goods">
            <li class="shop_li"
            v-for="(item,index) in nearbyBusinesses"
            :key="index">
              <a>
                <div class="shop_left">
                  <img :src="`${nearbyBusinesses}${item.image_path}`">
                </div>
                <div class="shop_right">
                  <section class="shop_detail_header">
                    <h4 class="shop_title ellipsis">{{item.name}}</h4>
                    <ul class="shop_detail_ul">
                      <li class="supports"
                        v-for="(item,index) in baozhunpiao"
                        :key="index">{{item}}</li>
                    </ul>
                  </section>
                  <section class="shop_rating_order">
                    <section class="shop_rating_order_left">
                      <div class="star star-24">
                        <span class="star-item on">★</span>
                        <span class="star-item on">★</span>
                        <span class="star-item on">★</span>
                        <span class="star-item on">★</span>
                        <span class="star-item off">★</span>
                      </div>
                      <div class="rating_section">{{item.rating}}</div>
                      <div class="order_section">月售{{item.recent_order_num}}单</div>
                    </section>
                    <section class="shop_rating_order_right">
                      <span class="delivery_style delivery_right">硅谷专送</span>
                    </section>
                  </section>
                  <section class="shop_distance">
                    <p class="shop_delivery_msg">
                      <span>¥{{item.float_minimum_order_amount}}起送</span>
                      <sapn class="segmentation">/</sapn>
                      <span>配送费约¥{{item.float_delivery_fee}}</span>
                    </p>
                  </section>
                </div>
              </a>
            </li>
            
          </router-link>
          <router-view></router-view>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
export default{
  data () {
    return {
      headerTitle: '', // 标头地址
      foodNavFirst: [], // 食物导航栏的前面部分
      foodNavSecond: [], // 食物导航栏的后面部分
      baseUrl: 'https://fuss10.elemecdn.com/', // 图片的根路径
      nearbaseUrl:"http://cangdu.org:8001/img/",  //附近商家的根路径
      nearbyBusinesses: [] ,// 获取到附近商家列表
      baozhunpiao:["保","准","票"],   //保准票的数组
    }
  },
  mounted () {
    // 获取标头地址
    this.$axios({
      url: '/position/40.10038,116.36867',
      method: 'GET'
    }).then(result => {
      // console.log(result.data.data.city)
      this.headerTitle = result.data.data
      // 当地址栏请求成功之后，就发送第二次请求，根据经纬度来获取附近商家
      this.$axios({
        url: 'shops?latitude=' + this.headerTitle.latitude + "&" + "longitude=" + this.headerTitle.longitude,
        method: 'GET'
      }).then(result => {
        this.nearbyBusinesses = result.data.data
        //console.log(this.nearbyBusinesses)
      })
    })
    // 获取食物导航栏
    this.$axios({
      url: 'index_category',
      method: 'GET'
    }).then(result => {
      this.foodNavFirst = result.data.data.slice(0, 8)
      this.foodNavSecond = result.data.data.slice(8, 16)
      // console.log(this.foodNavSecond)
    })
  },
  methods: {

  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
    -webkit-tap-highlight-color:transparent
  }
  ul{
    list-style: none;
  }
  .msite{
    width: 100%;
  }
  .msite .mint-header{
    background-color: #02a774;
    height: 45px;
    padding: 0px 18px;
    z-index: 10000;
  }
  .msite .mint-header .iconfont{
    font-size: 22px;
  }
  .mint-header /deep/ .mint-header-title{
    font-size: 20px;
    margin-left: -30px;
  }
  .msite .msiteBar{
    width: 100%;
    margin-top: 45px;
    height: 200px;
  }
  .msite .msiteBar .mint-swipe-item .link_to_food{
    display: block;
    width: 25%;
    float: left;
    color: #666;
    text-align: center;
    font-size: 13px;
    margin-bottom: 20px;
  }
  .msite .msiteBar .mint-swipe-item .link_to_food span{
    margin-top: 5px;
    color: #666;
  }
  .msite .msiteBar .mint-swipe-item .link_to_food .food_container img{
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-bottom: 5px;
  }
  .msiteBar /deep/ .mint-swipe-indicator{
    background-color: #666;
    margin-right: 8px;
  }
  .msiteBar /deep/ .mint-swipe-indicator.is-active{
    background: #02a774;
    font-weight: 600;
    opacity: 1;
  }
  .separate{
    width: 100%;
    height: 12px;
    background-color: #F0F0F0;
    opacity: 0.8;
  }
  .shop_header{
    padding: 10px 10px 0px;
  }
  .shop_header .iconfont{
    font-size: 16px;
  }
  .shop_header span{
    color: #999;
    font-size: 14px;
    line-height: 20px;
  }
  .shop_list{
    padding: 0px;
    padding-bottom: 53px;
  }
  .shop_li{
    position: relative;
    width: 100%;
    height: 105px;
    border-bottom: 1px solid #f1f1f1;
    box-sizing: border-box;
    margin-top: 5px;
  }
  .shop_li a{
    width: 100%;
    display: block;
    box-sizing: border-box;
    padding: 15px 8px;
  }
  .shop_li a .shop_left{
    width: 21%;
    height: 75px;
    float: left;
    box-sizing: border-box;
    margin-right: 5px;
  }
  .shop_li a .shop_left img{
    width: 100%;
    height: 100%;
  }
  .shop_right{
    width: 77%;
    height: 75px;
    box-sizing: border-box;
    float: right;
  }
  .shop_detail_header h4{
    float: left;
    width: 140px;
    color: #333333;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
  }
  .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
  .shop_title::before{
    content: "品牌";
    line-break: inherit;
    font-size: 11px;
    line-height: 11px;
    color: #333;
    background-color: #ffd930;
    padding: 2px 2px;
    border-radius: 2px;
    margin-right: 5px;
  }
  .shop_detail_ul{
    float: right;
    margin-top: 3px;
  }
  .shop_detail_ul li{
    float: left;
    font-size: 10px;
    color: #999;
    border: 1px solid #f1f1f1;
    padding: 0 2px;
    border-radius: 2px;
  }
  .shop_rating_order_left{
    float: left;
    color: #ff9a0d;
  }
  .shop_rating_order_left .star{
    float: left;
  }
  .shop_rating_order_left .star .star-item{
    display: inline-block;
    background-repeat: no-repeat;
  }
  .shop_rating_order_left .star.star-24 .star-item{
    width: 20px;
    height: 20px;
    margin-top: 18px;
    margin-bottom: 8px;
    margin-right: -8px;
    background-size: 20px 20px;
    font-size: 14px;
  }
  .shop_rating_order_left .star.star-24 .star-item.off{
    color: #999;
  }
  .shop_rating_order_left .rating_section{
    height: 20px;
    margin-top: 21px;
    float: left;
    margin-left: 5px;
    color: #ff6000;
    font-size: 10px;
  }
  .shop_rating_order_left .order_section{
    height: 20px;
    font-size: 10px;
    color: #666;
    margin-top: 21px;
    float: left;
    margin-left: 5px;
  }
  .shop_rating_order_right .delivery_style{
    float: right;
    color: #02a774;
    border: 1px solid #02a774;
    font-size: 12px;
    padding: 1px;
    border-radius: 2px;
    margin-top: 14px;
    transform-origin: 35px 0;
    transform: scale(0.7);
  }
  .shop_distance{
    float: left;
    margin-left: -157px;
    margin-top: 40px;
  }
  .shop_distance .shop_delivery_msg{
    float: left;
    color: #666;
    font-size: 12px;
    /* margin-left: 0px; */
    /* left: 0px; */
    transform: scale(0.9);
  }
</style>
