<template>
  <div class="bookinfo"> 
    <div class="thumb">
      <img mode='aspectFill' class="back" :src="info.image" alt="">
      <img :src="info.image" class="img" mode='aspectFit' alt="">
    </div>
    <div class="info">
      <div class="title">{{info.title}}</div>
      <p class="author">{{info.author}}</p>
    </div>
    <div class="detail">
      <img :src="userinfo.image"  class='avatar' mode='aspectFit' alt="">
      {{userinfo.name}}
      <div class="right text-primary">
        {{info.rate}}分
        <Rate :value='info.rate'/>
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">{{info.price}}</div> 
    </div>
    <div class="tags">
      <p class="label" :key='tag' v-for="tag in info.tags">{{tag}}</p>
    </div>
    <div class="summary">
      <div>概述:</div>
      <p class="desc" :key='i' v-for="(sum,i) in info.summary">{{sum}}</p>
    </div>

    
  </div>
</template>

<script>
import Rate from '@/components/Rate'
export default {
  props: ['info'],
  components: {
    Rate
  },
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .bookinfo{
    font-size: 14px;
    .tags{
      .label{
        display: inline-block;
        margin: 5px;
        padding: 4px;
        border-radius: 4px;
        border: 1px solid #ea5a49;
        color: #ea5a49;
      }
      
    }
    .summary{
        margin: 10px 0;
        padding: 0 15px;
        p{
          text-indent: 2em;
          font-size: 14px;
        }
    }

    .right{
      float: right;
    }
    .detail{
      padding: 5px 10px;
      .avatar{
        height: 20px;
        width: 20px;
        border-radius:50%;
        vertical-align: middle; 
      }
    }
    .thumb{
      width: 750rpx;
      height: 500rpx;
      overflow: hidden;
      position: relative;
    }
    .back{
      width: 100%;
      filter:blur(60px);
    }
    .img{
      position: absolute;
      height: 300rpx;
      width: 100%;
      left: 0;
      top: 30rpx;
    }
    .info{
      color:#fff;
      position: absolute;
      width: 100%;
      left: 0;
      top: 330rpx;
      text-align: center;
      .title{
        font-size: 20px;
        margin: 6px 0; 
      }
      .author{
        font-size:14px;
      }
    }

  }
</style>


