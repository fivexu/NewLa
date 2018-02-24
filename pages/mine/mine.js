import { post } from '../../api/post.js'

const app = getApp()
Page({
  data: {
    userInfo: {},
    avatarUrl: '',
    nickName: ''
  },
  _getUserInfo() {
    if (app.globalData.userInfo) {
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          avatarUrl: app.globalData.userInfo.avatarUrl,
          nickName: app.globalData.userInfo.nickName
        })
      }
    } else {
      wx.getSetting({
        success: res => {
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName
              })
            },
            fail: res => {
              if (!wx.getStorageSync('userId')) {
                wx.navigateTo({
                  url: '../sign/login/login',
                })
              }
            }
          })
        }
      })
    }
    console.log(wx.getStorageSync('userId'))
    if (wx.getStorageSync('userId')) {
      this.setData({
        avatarUrl: wx.getStorageSync('avatarUrl'),
        nickName: wx.getStorageSync('nickName')
      })
    }
    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxdf1f834c6efccc8e',
              secret: '8f1d8230a71509055e47d2dae4e41d91',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (openIdRes) {
              if (openIdRes.data.openid != null & openIdRes.data.openid != undefined) {
                post(
                  'http://49.51.41.227/newlaAdmin/index.php/Login/weChatCheck',
                  { openId: openIdRes.data.openid },
                  (res) => {
                    if (res.data.code === 400) {
                      app.globalData.openId = openIdRes.data.openid
                      wx.setStorageSync('openId', openIdRes.data.openid)
                      wx.navigateTo({
                        url: '../sign/bind/bind'
                      })
                    }
                  })
              } else {
                console.info("获取用户openId失败");
              }
            },
            fail: function (error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    })
  },
  onShow: function () {
    this._getUserInfo()
  },
  onLoad: function () {
  },
  login() {
    wx.navigateTo({
      url: '../sign/login/login'
    })
  },
  release() {
    wx.navigateTo({
      url: '../mineItem/myRelease/myRelease',
    })
  },
  collect() {
    wx.navigateTo({
      url: '../mineItem/myCollect/myCollect',
    })
  },
  comment() {
    wx.navigateTo({
      url: '../mineItem/myComment/myComment',
    })
  },
  contact() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  toUserInfo() {
    if (JSON.stringify(this.data.userInfo) === "{}" && !wx.getStorageSync('userId')) {
      wx.navigateTo({
        url: '../sign/login/login'
      })
      return
    }
    wx.navigateTo({
      url: `../user/user?userId=${wx.getStorageSync('userId')}`
    })
  }
})