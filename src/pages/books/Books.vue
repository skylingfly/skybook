<template>
    <div class="booksWrap">
      <TopSwiper :tops = 'tops'></TopSwiper> 
      <Card v-for="v in books" :key ='v.id' :book='v'></Card>
      <p v-if="!more" class="footer">没有更多数据</p>
    </div>
</template>

<script>
import config from '../../utils/config' //eslint-disable-line
import { getRequest } from '@/utils/tool'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'

export default {
  mounted () {
    this.getList(true)
    this.getTop()
  },
  components: {
    Card,
    TopSwiper
  },
  data () {
    return {
      books: [],
      page: 1,
      size: 10,
      more: true, // 是否有更多
      tops: [],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 600

    }
  },
  computed: {
    imgUrls () {
      return this.tops.map(v => v.image)
    }
  },
  onPullDownRefresh () {
    this.getList(true)
    this.getTop()
  },
  onReachBottom () {
    if (!this.more) return
    this.page += 1
    this.getList()
  },
  methods: {
    async getList (init) {
      if (init) {
        this.page = 1
        this.more = true
      }
      const param = {page: this.page, size: this.size}
      const res = await getRequest('/weapp/booklist', param)
      if (res.list.length < this.size && this.page > 1) {
        this.more = false
      }

      if (init) {
        this.books = res.list
        wx.stopPullDownRefresh()
      } else {
        this.books = this.books.concat(res.list)
      }
    },
    async getTop () {
      const tops = await getRequest('/weapp/top')
      this.tops = tops.list
    }
  }

}
</script>

<style scoped>
 
</style>
