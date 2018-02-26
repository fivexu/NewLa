import { postMineWechatLogin } from '../../api/post.js'

const app = getApp()
Page({
  data: {
    userInfo: {},
    avatarUrl: null,
    nickName: '',
    binged: false
  },
  loginInfo() {
    if (wx.getStorageSync('singOut')) {
      this.setData({
        avatarUrl: null,
        nickName: '',
      })
      return
    }
    let _this = this
    wx.login({
      success: function (loginRes) {
        if (loginRes.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxdf1f834c6efccc8e',
              secret: '8f1d8230a71509055e47d2dae4e41d91',
              grant_type: 'authorization_code',
              js_code: loginRes.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (openIdRes) {
              if (openIdRes.data.openid != null & openIdRes.data.openid != undefined) {
                postMineWechatLogin({ openId: openIdRes.data.openid },
                  (res) => {
                    if (res.data.code === 200) {
                      let nickName = res.data.data.username === null ? app.globalData.userInfo.nickName : res.data.data.username
                      let avatar = res.data.data.avatar === null ? app.globalData.userInfo.avatarUrl : res.data.data.avatar
                      wx.setStorageSync('userId', res.data.data.id)
                      wx.setStorageSync('nickName', nickName)
                      wx.setStorageSync('avatarUrl', avatar)
                      wx.setStorageSync('email', res.data.data.email)
                      _this.setData({
                        avatarUrl: avatar,
                        nickName: nickName
                      })
                    }
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
  _getInfo() {
    wx.getSetting({
      success: res => {
        wx.getUserInfo({
          success: res => {
            this.setData({
              avatarUrl: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName
            })
            this.loginInfo()
          },
          fail: res => {
            if (this.data.binged) {
              return
            }
            if (!wx.getStorageSync('userId')) {
              this.setData({
                binged: true
              })
              wx.navigateTo({
                url: '../sign/login/login',
              })
            }
          }
        })
      }
    })
  },
  onShow: function () {
    if (wx.getStorageSync('nickName')) {
      this.setData({
        avatarUrl: wx.getStorageSync('avatarUrl'),
        nickName: wx.getStorageSync('nickName')
      })
    } else {
      this._getInfo()
    }
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
    if (JSON.stringify(this.data.userInfo) == "{}" && this.data.nickName === '') {
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