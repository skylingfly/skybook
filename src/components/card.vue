<template>
  <a :href="detailUrl">
    <div class="card">
      <div class="thumb" @click.stop="preview">
        <img :src="book.image" 
              :alt='card'
              mode='aspectFit' 
              class="image"/>
      </div>
      <div class="detail">
        <div class="row text-primary">
          <div class="right">
            {{book.title}}
          </div>
          <div class="left">
            {{book.rate}} <Rate :value='book.rate'/>  
          </div>
        </div>
        <div class="row">
          <div class="right">
            {{book.author}}
          </div>
          <div class="left text-primary">
            浏览量:{{book.count}}
          </div>
        </div>
        <div class="row">
          <div class="right">
            {{book.publisher}}
          </div>
          <div class="left">
            {{book.user_info.nickName}}
          </div>
        </div>
      </div>
    </div>
  </a>
  
</template>

<script>
import Rate from '@/components/Rate'
export default {
  props: ['book'],
  components: {
    Rate
  },
  data () {
    return {

    }
  },
  computed: {
    detailUrl () {
      return `/pages/detail/main?id=${this.book.id}`
    }
  },
  methods: {
    preview () {
      wx.previewImage({
        current: this.book.image,
        urls: [this.book.image]
      })
    }
  }

}
</script>

<style scoped lang='scss'>
  .card{
    padding: 5px;
    overflow: hidden;
    margin: 5px 0;
    display: flex;
    font-size: 12px;
    .thumb {
      height: 90px;
      width: 90px;
      .image{
        max-width: 100%;
        max-height: 100%;
      }
    }
    .detail{
      flex:1;
      overflow: hidden;
      margin-left: 10px;
      .row{
        display: flex;
        line-height: 20px;
        margin-bottom: 4px;
        margin-right: 6px;
        display: flex;
      }
      .left {
        width: 86px;
        margin-left: 6px;
        display: inline-block;
        overflow: hidden;
      }
      .right{
        flex:1;
        overflow: hidden; 
        white-space: nowrap; 
        text-overflow: ellipsis;
      }
    }
  }
</style>


