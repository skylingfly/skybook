<template>
  <div class="swiper">
    <swiper 
      :indicator-dots='indicatorDots'
      :autoplay="autoplay"
      indicator-color='#999'
      indicator-active-color= '#ea5a49'
      :interval="interval" 
      :duration="duration"
      :circular='true'
    >
      <div :key="INDEX" v-for="(imgs, INDEX) in imgUrls">
        <swiper-item>
          <image 
            @click="gotoddetail(img.id)"
            mode='aspectFit' 
            :src="img.image" 
            v-for="img in imgs"
            :key="img.id"
            class="slide-image" 
            />
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      autoplay: true,
      interval: 3000,
      duration: 500,
      indicatorDots: true
    }
  },
  props: ['tops'],
  computed: {
    imgUrls () {
      const res = this.tops
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6, 9)]
    }
  },
  methods: {
    gotoddetail (id) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${id}`
      })
    }
  }

}
</script>

<style scoped lang='scss'>
  .swiper{
    margin-top: 6px;
    .slide-image{
      width: 33%;
      height:250rpx;
    }
  }
</style>

