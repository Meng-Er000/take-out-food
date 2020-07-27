<template>
  <div >
    <goods></goods>
    <section class="box">
        <div class="head">

        </div>
        <div class="content">
          <div class="left" ref="left">
            <ul>
              <li v-for="(item, index) in left" :key="item.icon" :class="{current: currentIndex == index}" @click="selectItem(index, $event)">
                <span class="left-item">
                  <img :src="item.icon" />
                {{item.name}}
                </span>
              </li>
            </ul>
          </div>
          <div class="right" ref="right">
            <ul class="rightul">
              <li class="right-item right-item-hook" v-for="item in right" :key="item.name">
                <h2 class="itemname">{{item.name}}</h2>
                <ul>
                  <li v-for="(num,item) in item.content" :key="item">
                    <div class="iconfoods" >
                      <img :src="num.icon"/>
                    </div>
                    <div class="foodsshow">
                      <h4 class="numname">{{num.name}}</h4>
                      <p class="numdescri">{{num.description}}</p>
                      <div style="height: 42px;">
                        <span class="extra">月售{{num.sellCount}}份</span>
                        <span class="price">好评率{{num.rating}}%</span>
                      </div>
                     <div class="Price">
                      <span class="pricetwo">¥ {{num.price}}</span>
                      <div class="cartcontrol-wrapper">
                        <div class="cartreduce" @click="_click">
                          <i class="iconfont icon--zx-jianhao-copy"></i>
                        </div>
                        <span class="carttext">0</span>
                        <div class="cartplus" @click="plus()">
                          <i class="iconfont icon-addTodo-nav"></i>
                        </div>
                      </div>
                     </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

  </div>
</template>

<script>

import BScroll from 'better-scroll'
import goods from '../goods/goods.vue'

export default{
  data () {
    return {
      leftname:[],   //左边的数据的名字
      rightfoods:[],
      itemfoods:[],  //食品数据
      sum:0,   //记录数据
      left: [],   //左边的数据
      right: [    //右边的数据数组

      ],

      listHeight: [],
      scrollY: 0, // 实时获取当前y轴的高度
      clickEvent: false
    }
  },
  methods: {
    _initScroll () {
      // better-scroll的实现原理是监听了touchStart,touchend事件，所以阻止了默认的事件（preventDefault）
      // 所以在这里做点击的话，需要在初始化的时候传递属性click,派发一个点击事件
      // 在pc网页浏览模式下，点击事件是不会阻止的，所以可能会出现2次事件，所以为了避免2次，可以在绑定事件的时候把$event传递过去
      this.lefts = new BScroll(this.$refs.left, {
        click: true
      })
      this.rights = new BScroll(this.$refs.right, {
        probeType: 6 // 探针的效果，实时获取滚动高度
      })
      // rights这个对象监听事件，实时获取位置pos.y
      this.rights.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _getHeight () {
      let rightItems = this.$refs.right.getElementsByClassName('right-item-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < rightItems.length; i++) {
        let item = rightItems[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectItem (index, event) {
      this.clickEvent = true
      // 在better-scroll的派发事件的event和普通浏览器的点击事件event有个属性区别_constructed
      // 浏览器原生点击事件没有_constructed所以当时浏览器监听到该属性的时候return掉
      if (!event._constructed) {

      } else {
        let rightItems = this.$refs.right.getElementsByClassName('right-item-hook')
        let el = rightItems[index]
        this.rights.scrollToElement(el, 300)
      }
    },
    //点击减号
    _click () {
      this.$emit('click', function () {
        console.log(123)
      })
    },
    //点击加号
    plus () {
      console.log(456)
    }
  },
  components: {
    goods
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
      this._getHeight()
    })
    this.$http.get('/goods').then(result => {
      //console.log(result.body.data)
      this.left=result.body.data
      result.body.data.forEach( (item,i) => {
        item.foods.forEach( (item,i) => {
          this.itemfoods.push(item)
        })
        this.leftname=item.name
        this.rightfoods=item.foods
        this.right.push({name:this.leftname,content:this.itemfoods.slice(this.sum,this.sum+result.body.data[i].foods.length)})
        this.sum=this.sum+result.body.data[i].foods.length
        //console.log(this.sum)
      })
    })
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        // 当height2不存在的时候，或者落在height和height2之间的时候，直接返回当前索引
        // >=height，是因为一开始this.scrollY=0,height=0
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          return i
        }
        if (this.listHeight[this.listHeight.length - 1] - this.$refs.right.clientHeight <= this.scrollY) {
          if (this.clickTrue) {
            return this.currentNum
          } else {
            return (this.listHeight.length - 1)
          }
        }
      }
      // 如果this.listHeight没有的话，就返回0
      return 0
    }
  }
}
</script>

<style scoped>
.content{
  display: flex;
  position: absolute;
  top:200px;
  bottom:0px;
  width:100%;
  overflow: hidden;
  background: #ffffff;
}
.left{
  flex: 0 0 80px;
  width:80px;
  background-color: #f3f5f7;
}
  .left li{
    width: 100%;
    height: 100%;
  }
  .current{
    background-color: #FFFFFF;
  }
  .left-item{
    margin: 0px 10px;
    display: block;
    /* width: 100%; */
    height: 55px;
    line-height: 61px;
    text-align: center;
    border-bottom: 1px solid #eee;
    font-size: 12px;
  }
  .right{
    flex: 1;
  }
  .right-item{
    background-color: #FFFFFF;
  }
  .right-item li{
    margin: 18px;
    height:109px;
    line-height:100px;
    border-bottom: 1px solid #eee;
    margin-top: 0px;
    margin-bottom: 10px;
  }
  *{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .right-item ul{
    background-color: #FFFFFF;
  }
  .right-item .itemname{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: #93999f;
    background: #f3f5f7;
  }
  .rightul{
    background-color: #FFFFFF;
  }
  .left-item img{
    height: 12px;
  }
  .iconfoods{
    float: left;
    margin-right: 10px;
    margin-top: 15px;
  }
  .iconfoods img{
    width: 57px;
    height: 57px;
  }
  .foodsshow{
    line-height: 50px;
    margin-left: 57px;
  }
  .numname{
    font-size: 14px;
    height: 14px;
    margin-bottom: 8px;
  }
  .numdescri,.extra,.price,.pricetwo{
    height: 12px;
    font-size: 10px;
    color: #93999f;
    margin-bottom: 5px;
    margin-right: 10px;
  }
  .Price{
    height: 18px;
    line-height: 0px;
  }
  .pricetwo{
    margin-right: 8px;
    font-size: 14px;
    color: #f01414;
    font-weight: 700;
  }
  .cartcontrol-wrapper{
    float: right;
    width: 84px;
    height: 36px;
    margin-top: -8px;
  }
  .cartplus,.cartreduce{
    width: 24px;
    height: 24px;
    /* border: 1px solid #02a774; */
    border-radius: 50%;
    background-color: #02a774;
    text-align: center;
    line-height: 24px;
    float: right;
  }
  .carttext{
        font-size: 10px;
        color: #93999f;
        display: block;
        width: 12px;
        margin-left: 38px;
  }
  .cartreduce{
    float: left;
    background-color: #FFFFFF;
    color: #02A774;
    border: 2px solid #02A774;
    box-sizing: border-box;
  }
  .icon--zx-jianhao-copy{
    font-size: 15px;
    font-weight: 700;
    display: block;
    margin-top: -2px;
  }
  .icon-addTodo-nav{
    font-size: 15px;
    color: rgba(255,255,255,0.6);
  }
</style>
