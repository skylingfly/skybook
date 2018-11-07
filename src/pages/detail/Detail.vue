<template>
    <div class="detailWrap">
      <BookInfo :info='info'></BookInfo>
      <CommentList :comments='comments' />
      <div class="comment" v-if="showComment">
        <textarea 
          v-model='comment'
          auto-focus='true'
          class="textarea"
          placeholder="请输入评论"
          placeholder-style='color:#888;font-size:12px'
          maxlength="100"></textarea>
        <div class="location">
          地理位置:
          <switch :checked='location' @change="getGeo" color='#ea5a49'/>
          <span class="text-primary">{{location}}</span>
        </div>
        <div class="phone-type">
          手机型号:
          <switch :checked='phone' @change="getPhone" color='#ea5a49'/>
          <span class="text-primary">{{phone}}</span>
        </div>
        <button :disabled='unable' class="btn addbtn" @click='addcomment'>添加评论</button>
      </div>
      <p class="footer" v-else>没有登录或者已经评论</p>
      <button open-type='share' class="btn">转发</button>
      
    </div>
</template>

<script>
import config from '../../utils/config' //eslint-disable-line
import { getRequest, getLocation, postRequest, showModal } from '@/utils/tool'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'

export default {
  data () {
    return {
      userinfo: {},
      bookid: '',
      info: {},
      comment: '',
      location: '',
      phone: '',
      unable: false,
      comments: []
    }
  },
  components: {
    BookInfo,
    CommentList
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    this.getComments()
    const userinfo = wx.getStorageSync('userInfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  },
  computed: {
    showComment () {
      if (!this.userinfo.openId) {
        return false
      } else if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      }
      return true
    }
  },
  onShareAppMessage: (res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '',
      path: `/pages/detail/main?id=${this.bookid}`
    }
  },
  methods: {
    async getComments () {
      const params = {
        bookid: this.$root.$mp.query.id
      }
      const res = await getRequest('/weapp/commentlist', params)
      this.comments = res.list
    },
    async addcomment () {
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      }
      console.log(data)
      const res = await postRequest('/weapp/addcomment', data)
      if (res.msg === 'success') {
        showModal('成功', '评论添加成功!')
        this.comment = ''
        this.getComments()
      }
    },
    async getDetail () {
      const info = await getRequest('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({ // 动态设置
        title: info.title
      })
      this.info = info
    },
    async getGeo (e) {
      const ak = 'joyYTW8UFomIxRGjjZ8tjr4GVB5KPnMZ'
      const url = `https://api.map.baidu.com/geocoder/v2/`
      if (e.target.value) {
        const res = await getLocation()
        wx.request({
          url,
          data: {
            location: `${res.latitude},${res.longititude}`,
            ak,
            output: 'json'
          },
          success: (res) => {
            if (res.data.status === 0) {
              const { addressComponent } = res.data.result
              this.location = `${addressComponent.province} ${addressComponent.city}`
            } else {
              this.location = '未知地理'
            }
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const res = wx.getSystemInfoSync()
        this.phone = res.model
        console.log(res)
      } else {
        this.phone = ''
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  .comment{
    width: 100%;
    .textarea{
      padding: 15rpx;
      height: 220rpx;
      width: 100%;
      font-size: 13px;
      background-color: #f5f5f5;
    }
    .location, .phone-type{
      margin: 10px 0;
      padding-left: 10px;
    }
    .addbtn {
      margin: 10px 0; 
    }

  }
</style>
