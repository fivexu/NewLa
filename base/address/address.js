let dataList = require('../../static/data/data.js')

Page({
  data: {
    cityList: [],
    rankAddress: {
      currentState: 0,
      currentCity: 0,
      currentSchool: 0,
      showState: false,
      showCity: false,
      showSchool: false,
      state: '州',
      city: '市',
      school: '学校',
    }
  },
  _getSlideList: function () {
    let _this = this
    _this.setData({
      cityList: dataList.dataList.data.cityList
    })
  },
  onLoad: function () {
    this._getSlideList()
  },
  onShow: function () {
    // if (wx.getStorageSync('address')) {
    //   wx.removeStorageSync('address')
    // }
  },
  selectState(ev) {
    this.setData({
      'rankAddress.currentState': ev.target.dataset.index,
      'rankAddress.state': ev.target.dataset.item,
      'rankAddress.showState': false,
      'rankAddress.showCity': true
    })
  },
  selectCity(ev) {
    this.setData({
      'rankAddress.currentCity': ev.target.dataset.index,
      'rankAddress.city': ev.target.dataset.item,
      'rankAddress.showSchool': true,
      'rankAddress.showCity': false
    })
  },
  selectSchool(ev) {
    this.setData({
      'rankAddress.currentSchool': ev.target.dataset.index,
      'rankAddress.school': ev.target.dataset.item,
      'rankAddress.showSchool': false
    })
    let address = {
      state: this.data.rankAddress.state,
      city: this.data.rankAddress.city,
      school: this.data.rankAddress.school,
    }
    wx.setStorageSync('address', address)
  },
  showState(ev) {
    this.setData({
      'rankAddress.showState': true,
      'rankAddress.showCity': false,
      'rankAddress.showSchool': false,
      'rankAddress.school': '学校',
      'rankAddress.city': '市'
    })
  },
  showCity(ev) {
    if (!this.data.rankAddress.showState) {
      wx.showToast({
        title: '请先选择州',
        icon: 'none',
        duration: 1000
      })
      return
    }
    this.setData({
      'rankAddress.showState': false,
      'rankAddress.showCity': true,
      'rankAddress.showSchool': false,
      'rankAddress.school': '学校'
    })
  },
  showSchool(ev) {
    if (!this.data.rankAddress.showState && !this.data.rankAddress.showCity) {
      wx.showToast({
        title: '请先选择州和市',
        icon: 'none',
        duration: 1000
      })
      return
    }
    this.setData({
      'rankAddress.showState': false,
      'rankAddress.showCity': false,
      'rankAddress.showSchool': true
    })
  }
})