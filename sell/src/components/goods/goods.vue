<template>
   <div class="goods" >
       <div class="menus-wrapper" ref="menusWrapper">
       	<ul >
       		<li class="good-item" v-for="(item,index) of goods"  v-bind:class="{'current': currentIndex === index}"
              v-on:click="selectMenu(index, $event)"
       		>
       			<span class="text border-1px ">
       			<span class="icon" v-show="item.type > 0" v-bind:class="iconArray[item.type]">	
       			</span>
       			{{goods[index].name}}
       			</span>
       		</li>
       	</ul>
       </div>
       <div class="foods-wrapper" ref="foodsWrapper">
       	<ul>
       		<li class="food-list" v-for="(item,index) in goods" ref="foodList" >
       			<h1 class="title" style="padding-left:14px;height:26px;line-height:26px;border-left:2px solid #d9dde1;font-size:12px;color:rgb(147, 153, 159);background-color:#f3f5f7;">
       			{{item.name}}
       			</h1>
       			<ul>
       				<li v-for="(food,key) of item.foods" class="food-item border-1px">
       					<div  class="food-pic">
       				        <img class="pic-icon" width="64" height="64" v-bind:src="food.icon">
       			        </div>
       			        <div class="food-name">
       			        	<h2 class="food-name-text">
       			        	{{food.name}}
       			        	</h2>
       			        	<p class="description">
       			        	{{food.description}}
       			        	</p>
       			        	<span class="sell-count">
       			        	月售{{food.sellCount}}份
       			        	</span>
       			        	<span class="rating">
       			        		好评率{{food.rating}}%
       			        	</span>
       			        	<div class="price">
       			        	<span class="new-price">
       			        	￥{{food.price}}
       			        	</span>
       			        	<span v-show="food.oldPrice" class="old-price" style="font-size:10px;font-weight:normal;line-height:48px;color:rgb(147,153,159);">
       			        	<strike>
       			        	￥{{food.oldPrice}}
       			        	</strike>
       			        	</span>
       			        	</div>
       			        	<div class="buyBtn">
       			        		<v-cart-control v-on:add="addFood" v-bind:food="food"></v-cart-control>
       			        	</div>
       			        </div>
       				</li>
       			</ul>
       		</li>
       	</ul>
       </div>
        <v-shop-cart  ref="shopCart" v-bind:selectFoods="selectFoods" v-bind:deliveryPrice="seller.deliveryPrice" v-bind:minPrice="seller.minPrice" ></v-shop-cart>
   </div>
</template>
<script type="text/ecmascript-6">
import BetterScroll from 'better-scroll';
import vShopCart from '../shopcart/shopCart.vue';
import cartControl from '../cartControl/cartControl.vue';
    const ERROR_OK = 0;
    export default {
    	data: function() {
    		return {
    			goods: [],
    		    iconArray: ['decrease', 'discount', 'special', ' invoice', 'guarantee'],
    		    listHeight:[],
    		    scrollY:0
    		};
    	},
      components: {
    		 'v-shop-cart': vShopCart,
    		 'v-cart-control':cartControl    
    		},
      props: {
      	seller: {
           type: Object,
           default: function() {
              return {};
           }
      	} 
      },
      computed: {
           currentIndex() {
           	for (let j = 0; j < this.listHeight.length; j++) {
               let height1 = this.listHeight[j];
               let height2 = this.listHeight[j + 1];
               if (!height2 || ((this.scrollY) >= height1 && this.scrollY < height2)) {
                  return j;
               };
           	};
           	return 0;
           },
           selectFoods: function() {
           	let foods= [];
           	this.goods.forEach(function (good) {
              good.foods.forEach(function(food) {
                 if (food.count) {
                 	foods.push(food);
                 }
                 // console.log(food.count);
              })
           	})
           	return foods;
           }

       },
      created () {
      	// this.iconArray = ['decrease', 'discount', 'special', ' invoice', 'guarantee'];
      	this.$http.get('/api/goods').then(function(response) {
      		// success callback
             var res=[];
             res=response.body;
             if (res.errno === ERROR_OK) {
             	this.goods = res.data;
             	// console.log(this.goods);
             	// DOM还没更新
             	this.$nextTick(function() {	
             	// DOM现在更新了
             	// this绑定到当前实例
             	this._initScroll();
             	this._calculateHeight();
             	});
             }
      	}, function (response) {
      		// error callback
      	})
       },
       methods: {
         _initScroll:function() {
         	this.menusScroll = new BetterScroll(this.$refs.menusWrapper, {
         	 click:true
         	});	
         	this.foodsScroll = new BetterScroll(this.$refs.foodsWrapper, {
         		click:true,
         		probeType:3
         	});
         	this.foodsScroll.on('scroll', (pos) => {
              this.scrollY = Math.abs(Math.round(pos.y));
         	});
         },
         _calculateHeight:function() {
            let foodList = this.$refs.foodList;
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
            	height += foodList[i].clientHeight;
            	this.listHeight.push(height);
            };
         },
         selectMenu:function(index, event) {
         	if (!event._constructed) {
                return false;
         	};
           let foodList = this.$refs.foodList;
           let el = foodList[index];
           this.foodsScroll.scrollToElement(el, 300);
         },
         addFood:function (target) {
             this._drop(target);
             },
         _drop:function (target) {
            // 体验优化,异步执行下落动画
            this.$nextTick(() => {
            this.$refs.shopCart.drop(target);
           });
         }
       },
       events: {}  
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/styles/mixin.styl"
  .goods
  	display flex 
  	position absolute
  	width 100%
  	top 174px
  	bottom 46px
  	overflow hidden
  	.menus-wrapper
  		flex 0 0 80px
  		width 80px
  		background #f3f5f7
  		.good-item
  			display table
  			height 54px
  			width 56px
  			line-height 14px
  			padding 0 12px
  			&.current
                position: relative
                z-index: 10
                margin-top: -1px
                background: #fff
                font-weight: 700
               .text
                    border-none()
  			.icon
                display:inline-block
                vertical-align:top
                background-size:12px
                background-repeat:no-repeat
                width:12px
                height:12px
                margin-right:2px
                &.decrease
                    bg-image('images/decrease_3')
                &.discount
                    bg-image('images/discount_3')
                &.guarantee
                    bg-image('images/guarantee_3')
                &.invoice
                    bg-image('images/invoice_3')
                &.special
                    bg-image('images/special_3')	
            .text
                display table-cell
                width 56px
                vertical-align middle
                border-1px(rgba(7,17,27,0.1))
                font-size 12px
  			    color rgb(77, 85, 93)
  		        font-weight 200
  	.foods-wrapper
  		flex 1
  		.food-item
  			display flex
  			margin-top 18px
  			margin-left 18px
  			margin-right 18px
  			border-1px(rgba(7,17,27,0.1))
  			.pic-icon
  				border-radius 3%
  			.food-name
  			    margin 2px 0 18px 10px  
  			    .food-name-text
  			    	font-size 14px
  			    	color rgb(7, 17, 27)
  			    	line-height 14px
  			    	margin-bottom 10px	
  			    .description
  			    	font-size 10px
  			    	color rgb(147, 153, 159)
  			    	line-height 10px
  			    	margin-bottom 5px
  			    .sell-count
  			    	font-size 10px
  			    	color rgb(147, 153, 159)
  			    	margin-right 12px	
  			    .rating	
  			    	font-size 10px
  			    	color rgb(147, 153, 159)
  			    	line-height 10px	
  			    .price
  			    	margin-top 6px
  			    	.new-price
  			    	    margin-left 12px
  			            font-size 14px
  			         	color rgb(240, 20, 20)
  			    	    line-height 14px
  			    	    font-weight 700	
  			    .buyBtn
  			    	position absolute
  			    	height 25px
  			    	right 2px
  			    	bottom 18px
  		    
</style>    