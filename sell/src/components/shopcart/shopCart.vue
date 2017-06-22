<template>
   <div class="shop-cart">
     <div class="content">
       <div class="content-left">
         <div class="logo-wrapper">
           <div class="logo" v-bind:class="{'HighLight':totalCount>0}">
             <span class="icon-shopping_cart" v-bind:class="{'HighLight':totalCount>0}"></span>
           </div>
           <div class="count" v-show="totalCount">{{totalCount}}</div>
         </div>
         <div class="price" v-bind:class="{'isBold':totalPrice>0}">￥{{totalPrice}}</div>
         <div class="distribution">另需配送费￥{{deliveryPrice}}元</div>
       </div>
       <div class="content-right">
       <div class="min-price" v-bind:class="payClass">
         {{payDesc}}
       </div>
       </div>
     </div>
     <div class="ball-container">
      <div v-for="(ball, index) of balls">
       <transition name='drop' v-on:before-enter="beforeEnter"
       v-on:enter="enter" v-on:after-enter="afterEnter" v-on:enter-cancelled="enterCancelled">
         <div class="ball"  v-show="ball.show">
           <div class="inner"></div>
         </div>
       </transition>
      </div>
     </div>
   </div>
</template>

<script type="text/ecmascript-6">
    export default {
     data:function() {
     return {
      balls:[
      {
        'show':false
      },
       {
        'show':false
      },
       {
        'show':false
      }, 
      {
        'show':false
      }
      ],
        dropBall:[]  
       };
       },
       props: {
       deliveryPrice: {
           type:Number,
           default:3
       },
       minPrice: {
           type:Number,
           default:20
       },
       selectFoods: {
        type:Array,
        default: function() {
          return [];
        }
       }
       },
       computed: {
        totalPrice: function () {
          let total = 0;
          for (var i = 0; i < this.selectFoods.length; i++) {
            var food = this.selectFoods[i];
            total += food.price * food.count;
          };
          return total;
        },
        totalCount: function () {
          let count = 0;
          for (var j = 0; j<this.selectFoods.length; j++) {
            count += this.selectFoods[j].count;  
          };
          return count;
        },
        payDesc:function() {
          if (this.totalPrice === 0) {
            return `￥${this.minPrice}元起送`;
          } else if (this.totalPrice < this.minPrice ) {
            var deff = this.minPrice - this.totalPrice;
            return `还差￥${deff}元起送`;
          } else {
           return `去结算`; 
          }
        },
        payClass: function () {
          if (this.totalPrice < this.minPrice) {
            return 'no-enough';
          } else {
            return 'enough';
          }
        }
       },
       methods: {
        drop:function(el) {
          // console.log(el);
          for (var i = 0; i < this.balls.length; i++) {
             if (!this.balls[i].show) {
                 this.balls[i].show = true;
                 this.balls[i].el = el; 
                 this.dropBall.push(this.balls[i]);
                 // console.log(this.dropBall);
                 return;
             }
          };
        },
        beforeEnter: function (el) {
          // ...
        },
        // 此回调函数是可选项的设置
        // 与 CSS 结合时使用
        enter: function (el, done) {
        // ...
        done()
        },
        afterEnter: function (el) {
        // ...
        },
        enterCancelled: function (el) {
        // ...
        }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/styles/mixin.styl'
  .shop-cart
    position fixed
    width 100%
    left 0px
    bottom 0px
    background-color #141d27
    z-index 50
    height 48px
    .content
       display flex 
       background-color #141d27
       font-size 0 
       .content-left
         flex 1
         .logo-wrapper
           display inline-block
           position relative
           top -10px
           width 56px
           height 56px
           margin 0 12px 
           padding 6px
           background-color #141d27
           border-radius 50%
           box-sizing border-box
           vertical-align top
           .logo
              width 100%
              height 100%
              border-radius 50%
              background-color #2B333B
              text-align center
              &.HighLight
                  background-color rgb(0, 160, 220)
                  color rgb(255, 255, 255)
              .icon-shopping_cart
                font-size 24px
                // line-height 为父元素的高度，实现垂直居中的设置
                line-height 44px
                color #80858a
                &.HighLight
                  background-color rgb(0, 160, 220)
                  color rgb(255, 255, 255)  
           .count
             position absolute
             top 1px
             right 0
             z-index 100
             font-size 9px
             font-weight 700
             color rgb(255, 255, 255) 
             line-height 16px
             height 16px
             width 24px
             text-align center
             background-color rgb(240, 20, 20)
             box-shadow 0 4px 8px 0 rgba(0, 0, 0, .4)
             border-radius 8px
             // display none
             // &.isShow
             //   display block                   
         .price
           display inline-block
           vertical-align top
           margin 12px 0
           line-height 24px
           padding-right 12px
           border-right 1px solid rgba(255, 255, 255, 0.1) 
           color  #80858a
           font-size 16px
           font-weight 700
           &.isBold
             font-weight 700
             color #fff
         .distribution 
           display inline-block
           vertical-align top
           margin 12px 0
           line-height 24px
           padding-left 6px
           font-size 14px
           font-weight 500
           color #80858a   
       .content-right
          flex 0 0 105px
          width 105px
          background-color #2B333B
          font-size 0
          text-align center
          .min-price
            font-size 16px
            font-weight 700
            color #80858a
            width 105px
            height 56px
            line-height 50px
            &.no-enough
              color #80858a
            &.enough
              background-color #00b43c
              color #fff
    .ball-container
      .drop-transition
        transition all 0.4s  
        .ball
          position fixed
          left 32px
          bottom 22px
          z-index 200
          .inner
            width 16px
            height 16px
            border-radius 8px
            background-color rgb(0,160,220)
            transition all 0.4s 
                         
</style>