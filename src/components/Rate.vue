<template>
  <div class="rateWrap">
    <span>☆☆☆☆☆</span>
    <span class="cover" :style='style'>★★★★★</span>
  </div>
</template>
<script>
export default {
  props: {
    value: {type: [Number, String], default: '0'}
  },
  data () {
    return {
    }
  },
  computed: {
    style () {
      return `width:${this.value / 2}em`
    }
  }
}
</script>
<style scoped lang='scss'>
  .rateWrap{
    position: relative;
    display: inline-block;
    .cover{
      position: absolute;
      display: inline-block;
      left: 0;
      top: 0;
      width: 0;
      overflow: hidden;
    }
  }
</style>


