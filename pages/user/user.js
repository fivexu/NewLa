import { oponCamare } from '../../common/js/public.js'
const app = getApp()

Page({
  data: {
    userInfo: {},
    userAvatar: '',
    userName: '',
    userSex: '男',
    userAddress: '填写您的位置',
    userEmail: '123456789@qq.com',
    userPhone: '13540079733',
    userSexAc: false,
    userSexActive: false
  },
  getInfo() {
    let _this = this
    wx.request({
      url: 'http://49.51.41.227/newlaAdmin/index.php/login/userInfo',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        id: 7
      },
      success: function (res) {
        let data = res.data.data
        wx.hideLoading()
        console.log(data.avatar)
        if (res.data.code === 200) {
          _this.setData({
            userAvatar: data.avatar,
            userName: data.username,
            userSex: data.sex,
            userAddress: data.address,
            userEmail: data.email,
            userPhone: data.phone
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  _getUserInfo() {
    let _this = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userAvatar: app.globalData.userInfo.avatarUrl,
        userName: app.globalData.userInfo.nickName
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          userAvatar: app.globalData.userInfo.avatarUrl,
          userName: app.globalData.userInfo.nickName
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            userAvatar: app.globalData.userInfo.avatarUrl,
            userName: app.globalData.userInfo.nickName
          })
        }
      })
    }
    this.getInfo()
  },
  onShow: function () {
    console.log(wx.getStorageSync('address'))
    if (!wx.getStorageSync('address')) {
      return
    }
    this.setData({
      userAddress: wx.getStorageSync('address').school
    })
  },
  onLoad: function () {
    this._getUserInfo()
  },
  userNameChange(ev) {
    this.setData({
      userName: ev.detail.value
    })
  },
  userEmailChange(ev) {
    this.setData({
      userEmail: ev.detail.value
    })
  },
  userPhoneChange(ev) {
    this.setData({
      userPhone: ev.detail.value
    })
  },
  changeAvatar() {
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0]
        _this.setData({
          'userInfo.avatarUrl': tempFilePaths,
          userAvatar: tempFilePaths
        })
        wx.showLoading({
          title: '保存中...'
        })
        wx.uploadFile({
          url: 'http://49.51.41.227/newlaAdmin/index.php/login/change',
          filePath: res.tempFilePaths[0],
          header: {
            "Content-Type": "multipart/form-data"
          },
          name: 'avatar',
          formData: {
            'id': 7
          },
          success: function (res) {
            wx.hideLoading()
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  },
  showSex() {
    this.setData({
      userSexAc: !this.data.userSexAc
    })
    setTimeout(() => {
      this.setData({
        userSexActive: !this.data.userSexActive
      })
    }, 20)
  },
  changeSex(ev) {
    this.setData({
      userSexAc: false,
      userSexActive: false,
      userSex: ev.target.dataset.sex
    })
  },
  toPosition() {
    wx.navigateTo({
      url: '../../base/address/address',
    })
  },
  toAlter() {
    wx.navigateTo({
      url: '../sign/alter/alWter',
    })
  },
  savaUser() {
    let _this = this
    wx.showLoading({
      title: '保存中...'
    })
    wx.request({
      url: 'http://49.51.41.227/newlaAdmin/index.php/login/change',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        id: 7,
        userName: _this.data.userName,
        userSex: _this.data.userSex,
        userAddress: _this.data.userAddress,
        userPhone: _this.data.userPhone,
      },
      success: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        })
        _this.getInfo()
      }
    })
  }
})