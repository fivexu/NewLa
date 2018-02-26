import { postLogin } from '../../../api/post.js'
const app = getApp()
Page({
  data: {
    passwordShow: false,
    password: '',
    email: '',
    error: false,
    errorText: ''
  },
  showPassword() {
    this.setData({
      passwordShow: !this.data.passwordShow
    })
  },
  userEmail(ev) {
    this.setData({
      email: ev.detail.value
    })
  },
  userPassword(ev) {
    this.setData({
      password: ev.detail.value
    })
  },
  login() {
    wx.showLoading({
      title: '登录中',
    })
    postLogin({
      email: this.data.email,
      password: this.data.password
    },
      (res) => {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000
          })
          wx.clearStorageSync()
          wx.setStorageSync('userId', res.data.data.userId)
          wx.setStorageSync('nickName', res.data.data.userName)
          wx.setStorageSync('avatarUrl', res.data.data.avatar)
          wx.setStorageSync('email', this.data.email)
          setTimeout(() => {
            wx.switchTab({
              url: '../../mine/mine',
            })
          }, 1000)
        } else if (res.data.code === 400) {
          this.setData({
            error: true,
            errorText: '密码错误,请重新输入密码'
          })
          this.timeoutError()
        } else if (res.data.code === 404) {
          this.setData({
            error: true,
            errorText: '邮箱不存在,请重新输入'
          })
          this.timeoutError()
        } else {
          this.setData({
            error: true,
            errorText: '服务器崩溃,请稍后再试'
          })
          this.timeoutError()
        }
      })
  },
  timeoutError() {
    let timer = null
    clearTimeout(timer)
    timer = setTimeout(() => {
      this.setData({
        error: false
      })
    }, 3000)
  },
  registered() {
    wx.navigateTo({
      url: '../registered/registered',
    })
  },
  getBack() {
    wx.navigateTo({
      url: '../getback/getback',
    })
  }
})