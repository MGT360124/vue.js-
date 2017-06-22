<template>
   <div class="cart-contorl">
   <transition name="linear-move">
     <div class="decrease" v-show="food.count>0" v-on:click="decreaseCount">
       <span class="inner icon-remove_circle_outline"></span>
     </div>
     </transition>
     <div class="count" v-show="food.count>0">{{food.count}}</div>
     <div class="increase icon-add_circle" v-on:click="addCount"></div>
   </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
    export default {
      data: function() {
      return {};
      },
      props: {
       food: {
        type: Object,
        default:function () {
          return {};
        }
       }
      },
      methods: {
        addCount: function(event) {
         if (!event._constructed) {
                return;
          };
         if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
         } else {
          this.food.count++;
         };
          this.$emit('add', event.target);
          // console.log(event.target);
        },
        decreaseCount: function(event) {
          if (!event._constructed) {
                return;
          };
          if (this.food.count) {
            this.food.count--;
          }
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import '../../common/styles/mixin.styl'
  .cart-contorl
    font-size 0
    .decrease
       display inline-block
       padding 6px
       opacity: 1
       transform: translate3d(0, 0, 0)
       .inner
          display inline-block
          font-size 24px
          line-height 24px
          color rgb(0, 160, 220)
          transition: all 0.4s linear
          transform: rotate(0)
    .linear-move-enter-active, .linear-move-leave-active
      transition  all 0.4s linear
    .linear-move-enter, .linear-move-leave
      opacity 0
      transform translate3d(24px,0,0)
      .inner
          transform: rotate(180deg)      
    .count
       display inline-block
       vertical-align top
       font-size 10px
       color rgb(147, 153, 159)
       line-height 24px
       padding-top 6px
    .increase
       display inline-block
       padding 6px
       font-size 24px
       line-height 24px
       color rgb(0, 160, 220)
</style>