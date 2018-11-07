<template>
    <div class="userContainer">
      <div class="header">
        <div class="avatar" @click='checkLogin'>
          <img class='img' :src='userInfo.avatarUrl' alt="">
        </div>
        <p class="nickname">{{userInfo.nickName}}</p>
      </div>
      <YearProgress />
      <div class="btnWrap">
        <button v-if='userInfo.openId' class="btn" @click="scanBox">添加图书</button>
      </div>
      <div class="modal-mask" v-if="showModal">
        <button  class='btn' open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>
        <button class='btn' @click="handleclose">取消</button>
      </div>
    </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '@/utils/config' //eslint-disable-line
import {showSuccess, postRequest, showModal} from '@/utils/tool'
import YearProgress from '@/components/YearProgress'

export default {
  onShow () {
    try {
      const session = wx.getStorageSync('userInfo')
      if (session) {
        this.userInfo = session
      }
    } catch (e) {
      console.log(e)
    }
  },
  components: {
    YearProgress
  },
  data () {
    return {
      showModal: false,
      userInfo: {
        nickName: '点击登录',
        avatarUrl: '../../../static/img/unlogin.png'
      }
    }
  },
  methods: {
    handleclose () {
      console.log('close')
      this.showModal = false
    },
    async addBook (isbn) {
      const params = {isbn, openid: this.userInfo.openId}
      const res = await postRequest('/weapp/addbook', params)
      if (res.title) {
        showModal('添加成功', `${res.title}添加成功`)
      }
    },
    scanBox () {
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    checkLogin () {
      const session = wx.getStorageSync('userInfo')
      if (!session) this.showModal = true
    },
    doLogin (e) {
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: (res) => {
          wx.setStorageSync('userInfo', res)
          showSuccess('登陆成功')
          this.userInfo = res
          this.showModal = false
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
    }
  }

}
</script>

<style scoped>
 .modal-mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .2);
    overflow: hidden;
    z-index: 9000;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .userContainer{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .avatar{
    height: 260rpx;
    width: 260rpx;
    border-radius: 50%;
    overflow: hidden;
    margin: 10px auto;

  }
  .btnWrap{
    padding: 0 10px;
  }
  .img{
    height: 100%;
    width: 100%;
  }
  .nickname{
    margin: 20px 0;
  }
  p{
    text-align: center;
  }
  .header{
    display: flex;
    flex-direction: column;
    justify-content: center
  }
</style>
