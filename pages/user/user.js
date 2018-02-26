import { oponCamare } from '../../common/js/public.js'
import { postUserGet, postUser, userUrl } from '../../api/post.js'
const app = getApp()

Page({
  data: {
    userInfo: {},
    userAvatar: '',
    userName: '',
    userSex: '男',
    userAddress: '',
    userEmail: '',
    userPhone: '',
    userSexAc: false,
    userSexActive: false
  },
  getInfo() {
    postUserGet({
      id: wx.getStorageSync('userId')
    },
      (res) => {
        let data = res.data.data
        wx.hideLoading()
        if (res.data.code === 200) {
          this.setData({
            userAvatar: data.avatar,
            userName: data.username,
            userSex: data.sex,
            userAddress: data.address,
            userEmail: data.email,
            userPhone: data.phone
          })
        }
      }
    )
  },
  onShow: function () {
    if (!wx.getStorageSync('address')) {
      return
    }
    this.setData({
      userAddress: wx.getStorageSync('address').school
    })
  },
  onLoad: function (res) {
    wx.showLoading({
      title: '加载您的数据中',
    })
    this.getInfo()
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
          url: userUrl,
          filePath: res.tempFilePaths[0],
          header: {
            "Content-Type": "multipart/form-data"
          },
          name: 'avatar',
          formData: {
            'id': wx.getStorageSync('userId')
          },
          success: function (res) {
            wx.hideLoading()
            let data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data
            if (data.code === 200) {
              wx.setStorageSync('avatarUrl', data.avatar)
            }
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
      url: `../sign/alter/alter`,
    })
  },
  savaUser() {
    let _this = this
    wx.showLoading({
      title: '保存中...'
    })
    postUser({
      id: wx.getStorageSync('userId'),
      userName: _this.data.userName,
      userSex: _this.data.userSex,
      userAddress: _this.data.userAddress,
      userPhone: _this.data.userPhone,
    },
      (res) => {
        wx.hideLoading()
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        })
        wx.setStorageSync('nickName', _this.data.userName)
        _this.getInfo()
      }
    )
  },
  signOut() {
    wx.clearStorageSync()
    wx.setStorageSync('singOut', true)
    wx.switchTab({
      url: '../mine/mine',
    })
  }
})