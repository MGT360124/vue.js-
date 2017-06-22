<template>
  <div id="app">
   <v-header v-bind:seller="seller" > 
   </v-header>
   <div class="tab border-1px">
   	<div class="tab-item">
    <router-link  to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
    <router-link  to="/ratings">评价</router-link>
    </div>
    <div class="tab-item">
    <router-link  to="/seller">商家</router-link>
    </div>
   </div>
  <router-view v-bind:seller="seller"></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import vHeader from './components/header/header.vue';
const ERROR_OK = 0;
export default {
  data() {
    return {
     seller: {}
    };
  },
  created() {
   this.$http.get('/api/seller').then(function (response) {
    // success callback
    var res = {};
    res = response.body;
     if (res.errno === ERROR_OK) {
       this.seller = res.data; 
       // console.log(this.seller); 
     };
   }, function (response) {
    // error callback
   });
  },
  methods() {

  },
	components: {
		 'v-header':vHeader, 
	},
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "./common/styles/mixin.styl"
#app
  .tab
    display:flex
    width:100%
    height:40px
    line-height:40px
    // border-bottom:1px solid rgba(7,17,27,0.1)
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex:1
      text-align:center
      & > a
       display: block
       color:rgb(77,85,93)
       // font-size:14px
       // line-height:14px
       &.active
        color:rgb(240,20,20)
</style>
