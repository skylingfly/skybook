<template>
  <div class="commentlist">
    <div class="page-title" v-if="comments.length">评论</div>
    <div 
      class="comment"
      v-for="v in comments"
      :key='v.id'
      @click="jumpclick(v)"
      >
        <div class="user">
          <div class="inline">
            <img :src="v.image" class='avatar' mode='aspectFit' alt="">
            {{v.name}}
          </div>
          <div class="right">
            {{v.location || '未知地点'}}
            <span class="text-primary"> - </span>
            {{v.phone || '未知型号'}}
          </div>
        </div>
        <div class="content">
          {{v.comment}}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comments', 'type'],
  methods: {
    jumpclick (v) {
      if (this.type === 'comment') { // 也可以判断路由
        wx.navigateTo({
          url: '/pages/detail/main?id=' + v.bookid
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .commentlist{
    background-color: #f5f5f5;
    font-size: 14px;
    .comment{
      background-color: #fff;
      margin-bottom: 10px;
      padding: 6px 15px;
      .content{
        margin: 10px 0;
      }
      .user{
        .inline{
          display: inline-block;
        }
        .avatar{
          height: 20px;
          width: 20px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }
</style>


