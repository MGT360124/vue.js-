<template>
   <div class="header">
       <div class="content-wrapper">
          <div class="avatar">
           <img style="width:64px;height:64px;" v-bind:src="seller.avatar">
          </div>
          <div class="content">
             <div class="title">
             <span class="brand"></span>
             <span class="name">{{seller.name}}</span>
             </div>
             <div class="description">
               <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达
               </span>
             </div>
             <div v-if="seller.supports" class="support">
                <span class="icon" v-bind:class="iconArray[seller.supports[0].type]"></span>
                <span class="text">{{seller.supports[0].description}}</span>
             </div>
          </div>
          <div v-if="seller.supports" class="supportMore" v-on:click="ShowDetail()">
              <span  class="count">{{seller.supports.length}}个
              </span>
              <i class="icon-keyboard_arrow_right"></i>
          </div>
       </div>
       <div class="bulletin-wrapper" >
          <span class="bulletin"></span>
          <span class="bulletin-content" v-on:click="ShowDetail()">{{seller.bulletin}}</span> 
       </div>
       <div class="background" >
           <img style="width:100%;height:100%;" v-bind:src="seller.avatar">
        </div>
      <transition name="fade">
       <div v-show="isShow" class="detail">
            <div  class="detail-wrapper  clearfix">
             <div  class="detail-main">
                <h1 class="detail-seller-name">{{seller.name}}</h1>
               <div class="star-wrapper">
                    <v-star v-bind:score="seller.score" v-bind:size="48"></v-star>
               </div>
               <div class="title">
                   <div class="line"></div>
                   <div class="title-text">优惠信息</div>
                   <div class="line"></div>
               </div>
               <ul v-if="seller.supports" class="supports">
                   <li class="support-item" v-for="(item,index) in seller.supports">
                   <span class="icon" v-bind:class="iconArray[seller.supports[index].type]"></span>
                      <span class="text">{{seller.supports[index].description}}</span>
                   </li>
               </ul>
               <div class="bulletin">
                   <div class="line"></div>
                   <div class="title-text">商家公告</div>
                   <div class="line"></div>
               </div>
               <div class="bulletin-text">
                   {{seller.bulletin}}
               </div>
             </div>   
            </div> 
            <div  class="detail-close">
               <i class="icon-close" v-on:click="closeDetail"></i> 
            </div>
        </div>
      </transition>
   </div>
</template>
<script type="text/ecmascript-6">
import vStar from '../star/star.vue';  
 export default {
 	data: function() {
     return { 
      isShow:false
     };
 	},
    components:{
        'v-star':vStar
    },
 	props: {
 	seller: {
         type: Object,
         default: function() {
         	return {};
          }
         } 
 	},
    created() {
        this.iconArray = ['decrease', 'discount', 'special', ' invoice', 'guarantee'];
    },
 	methods: {
        ShowDetail:function() {
            this.isShow=true;
        },
        closeDetail:function() {
            this.isShow=false;
        }
    }
 };
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/styles/mixin.styl"
.header
    position:relative
    color:#fff
    background:rgba(7,17,27,0.5)
    overflow:hidden
    .content-wrapper
        font-size:0  
        padding:24px 12px 18px 24px 
        position:relative
        .avatar
            display:inline-block
            // 顶部对齐
            vertical-align:top
            img
                border-radius:3px
        .content
            font-size:14px
            display:inline-block    
            margin-left:16px
            .title
                margin:2px 0 8px 0 
                .brand
                    display:inline-block
                    // 垂直对齐 
                    vertical-align:top
                    margin-right:6px 
                    height:18px
                    width:30px
                    bg-image('images/brand')
                    background-size:30px 18px
                    background-repeat:no-repeat 
                .name
                    font-size:16px
                    line-height:18px
                    font-weight:blod   
            .description
                font-size:12px 
                line-height:12px
                font-weight:200
                margin-bottom:10px
            .support
                font-size:12px
                .icon
                    display:inline-block
                    // 图片和文字对齐
                    vertical-align:top
                    background-size:12px
                    background-repeat:no-repeat
                    width:12px
                    height:12px
                    margin-right:4px
                    &.decrease
                        bg-image('images/decrease_1')
                    &.discount
                        bg-image('images/discount_1')
                    &.guarantee
                        bg-image('images/guarantee_1')
                    &.invoice
                        bg-image('images/invoice_1')
                    &.special
                        bg-image('images/special_1')
        .supportMore
            position:absolute
            right:12px
            bottom:16px
            padding:0 6px
            height:24px
            line-height:24px 
            font-weight:200           
            border-radius:14px
            background-color:rgba(0,0,0,0.2)
            .count
                font-size:10px
                margin-left:8px 
                letter-spacing:2px
            .icon-keyboard_arrow_right
                font-size:10px
                line-height:24px 
    .bulletin-wrapper
        height:28px
        padding:0 12px 0 12px
        font-weight:200
        line-height:28px
        white-space:nowrap 
        background-color:rgba(7,17,27,0.2)
        overflow:hidden 
        font-size:11px       
        text-overflow:ellipsis
        position:relative
        .bulletin
            bg-image("images/bulletin")
            vertical-align:text-top
            display:inline-block
            height:12px 
            width: 22px 
            background-size:22px 12px 
            background-repeat:no-repeat
        .bulletin-content
            font-size:10px
            margin:0 4px
            letter-spacing:1px
    .background
        position:absolute
        width:100%
        height:100%
        top:0
        left:0
        z-index:-1
        filter:blur(10px)
    .fade-enter-active, .fade-leave-active 
        transition: opacity .5s
    .fade-enter, .fade-leave-active 
        opacity: 0
    .detail
        z-index:100
        position:fixed
        overflow:auto
        top:0
        left:0
        width:100%
        height:100%
        background-color:rgba(7,17,27,0.8)
        backdrop-filter:blur(10px)                
        .detail-wrapper
            min-width:100%
            min-height:100%
            .detail-main
                margin-top:64px
                padding-bottom:64px
                .detail-seller-name
                    font-size:16px
                    font-weight:700
                    color:#fff
                    line-height:16px
                    text-align:center
                .star-wrapper
                    text-align:center
                    padding:16px 0 0 0
                .title
                    display flex 
                    width 80%
                    margin 28px auto 24px auto
                    .line
                        flex 1
                        position relative
                        top -6px
                        border-bottom 1px solid rgba(255,255,255,0.2)
                    .title-text
                        margin  0  5%
                        font-weight 700
                        font-size 14px  
                .supports
                    width:80%
                    margin 0 auto
                    .support-item
                        margin-bottom 12px
                    .icon
                        display:inline-block
                        // 图片和文字对齐
                        vertical-align:top
                        background-size 16px
                        background-repeat:no-repeat
                        width:16px
                        height:16px
                        margin-right:4px
                        &:last-child
                            margin-bottom 0    
                        &.decrease
                            bg-image('images/decrease_2')
                        &.discount
                            bg-image('images/discount_2')
                        &.guarantee
                            bg-image('images/guarantee_2')
                        &.invoice
                            bg-image('images/invoice_2')
                        &.special
                            bg-image('images/special_2')
                .bulletin
                    display flex 
                    width 80%
                    margin 28px auto 24px auto
                    .line
                        flex 1
                        position relative
                        top -6px
                        border-bottom 1px solid rgba(255,255,255,0.2)
                    .title-text
                        margin  0  5%
                        font-weight 700
                        font-size 14px              
                .bulletin-text
                    width 80%
                    margin 0 auto
                    font-size 12px   
                    font-weight 200
                    color rgb(255, 255, 255)
                    line-height 24px
        .detail-close
            position:relative
            font-size:32px
            width:32px
            height:32px
            clear:both
            color:rgba(255,255,255,0.5)
            margin:-64px auto 0 auto               
</style>
