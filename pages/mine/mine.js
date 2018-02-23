import { post } from '../../api/post.js'

const app = getApp()
Page({
  data: {
    userInfo: {}
  },
  _getUserInfo() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    } else {
      wx.getSetting({
        success: res => {
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
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
                    console.log(res.data)
                    if (res.data.code === 400) {
                      app.globalData.openId = openIdRes.data.openid
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
  onLoad: function () {
    this._getUserInfo()
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
    if (JSON.stringify(this.data.userInfo) === "{}") {
      wx.navigateTo({
        url: '../sign/login/login'
      })
      return
    }
    wx.navigateTo({
      url: '../user/user',
    })
  }
})