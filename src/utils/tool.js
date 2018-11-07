/**
 * 工具函数 by skyling
 */
import config from './config'

export function getRequest (url, data) {
  return request(url, 'GET', data)
}
export function postRequest (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: `${config.host}${url}`,
      success (res) {
        if (res.data.code == 0) { // eslint-disable-line
          resolve(res.data.data)
        } else {
          showModal('Sorry!', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 1000
  })
}

export function getLocation () {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      success (res) {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      }
    })
  })
}
