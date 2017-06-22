<template>
   <div class="star" v-bind:class="starType">
       <span v-for="itemClass in itemClasses" class="star-item"  v-bind:class="itemClass"></span>
   </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5;
const STAR_ON = 'on';
const STAR_HALF = 'half';
const STAR_OFF ='off';
     export default{
     data:function() {
        return {
        };
     },    
     props:{
     size:{
        type:Number,
     },
     score:{
        type:Number,
     }
     },
     computed:{
        starType:function() {
            return 'star-' + this.size;
        },
        itemClasses:function() {
           let starArray = [];
           let score = Math.floor(this.score*2)/2;
           let hasDecimal = score % 1 !== 0;
           let integer = Math.floor(score);
           for (let i = 0; i < integer; i++) {
                 starArray.push(STAR_ON);
           };
           if (hasDecimal) {
            starArray.push(STAR_HALF);
           };
           while (starArray.length < LENGTH) {
            starArray.push(STAR_OFF); 
           }
           return starArray;
        }
     }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/styles/mixin.styl"
    .star
        font-size:0
        .star-item
            display:inline-block
            background-repeat:no-repeat
        &.star-48
            .star-item
                width:20px
                height:20px
                background-size:20px 20px
                margin-right:22px
                &:last-child
                    margin-right:0
                &.on
                    bg-image('images/star48_on')
                &.off
                    bg-image('images/star48_off')    
                &.half
                    bg-image('images/star48_half')                                         
        &.star-36
            .star-item
                width:15px
                height:15px
                background-size:15px 15px
                margin-right:16px
                &.on
                    bg-image('images/star36_on')
                &.off
                    bg-image('images/star36_off')    
                 .half
                    bg-image('images/star36_half') 
        &.star-24 
            .star-item
                width:10px
                height:10px
                background-size:10px 10px
                margin-right:10px
                &.on
                    bg-image('images/star36_on')
                &.off
                    bg-image('images/star24_off')    
                &.half
                    bg-image('images/star24_half') 
            
            
</style>