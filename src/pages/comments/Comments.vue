<template>
    <div class="commentsWrap">
      <CommentList :type='"comment"' :comments='comments' v-if="userinfo.openId" />
      <div v-if="userinfo.openId">
        <div class="page-title">我的图书</div>
        <Card
          v-for="book in books"
          :key='book.id'
          :book='book'
        ></Card>
        <p v-if="!books.length">暂时没添加书,快去添加吧!</p>
      </div>
    </div>
</template>

<script>
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'
import { getRequest } from '@/utils/tool'
export default {
  data () {
    return {
      comments: [],
      userinfo: {},
      books: []
    }
  },
  components: {
    CommentList,
    Card
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getComments () {
      const param = {openid: this.userinfo.openId}
      const res = await getRequest('/weapp/commentlist', param)
      this.comments = res.list
    },
    async getBooks () {
      const param = {openid: this.userinfo.openId}
      const books = await getRequest('/weapp/booklist', param)
      this.books = books.list
    }
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow () {
    if (!this.userinfo.openId) {
      const userinfo = wx.getStorageSync('userInfo')
      if (userinfo) {
        this.userinfo = userinfo
      }
    }

    this.init()
  }
}
</script>

<style scoped lang='scss'>

</style>
