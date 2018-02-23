let dataList = require('../../static/data/data.js')

Page({
  data: {
    ScrollTop: 0,
    currentRankIndex: 1,
    currentRankChangeIndex: 0,
    productClass: false,
    productClassAc: false,
    rankList: ['最新发布', '距离最近'],
    slideList: [],
    productList: [],
    productClassList: [],
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
    },
    scrollTop: false
  },
  scrolled(ev) {
    let arr = this.data.productList
    let _this = this
    arr = arr.concat(this.data.productList)
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
      _this.setData({
        productList: arr
      })
    }, 2000)
  },
  scrolling(ev) {
    let query = wx.createSelectorQuery()
    let _this = this
    query.select('.header').boundingClientRect()
    query.exec(function (res) {
      _this.setData({
        scrollTop: res[0].height <= ev.detail.scrollTop ? true : false,
        ScrollTop: ev.detail.scrollTop
      })
    })
  },
  _getSlideList: function () {
    let _this = this
    _this.setData({
      slideList: dataList.dataList.data.slider,
      productList: dataList.dataList.data.productList,
      productClassList: dataList.dataList.data.productClass,
      cityList: dataList.dataList.data.cityList
    })
  },
  onLoad: function () {
    this._getSlideList()
  },
  prevent: function (ev) {
  },
  tabsChange(ev) {
    this.setData({
      currentRankIndex: ev.target.dataset.index,
      productClass: false
    })
  },
  address() {
    wx.navigateTo({
      url: '../../base/address/address',
    })
  },
  search() {
    wx.navigateTo({
      url: '../../base/search/search',
    })
  },
  allClass() {
    this.setData({
      productClass: this.data.productClass ? false : true,
      productClassAc: false
    })
    setTimeout(() => {
      this.setData({
        productClassAc: true
      })
    }, 20)
    let _this = this
    if (wx.pageScrollTo) {
      let query = wx.createSelectorQuery()
      query.select('.header').boundingClientRect()
      query.exec(function (res) {
        if (_this.data.ScrollTop >= res[0].height) {
          return
        }
        wx.pageScrollTo({
          scrollTop: res[0].height
        })
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  productClassChange(ev) {
    this.setData({
      currentRankChangeIndex: ev.target.dataset.index
    })
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
    this.setData({
      'rankAddress.showState': false,
      'rankAddress.showCity': true,
      'rankAddress.showSchool': false,
      'rankAddress.school': '学校'
    })
  },
  showSchool(ev) {
    this.setData({
      'rankAddress.showState': false,
      'rankAddress.showCity': false,
      'rankAddress.showSchool': true
    })
  },
  toDetail(ev) {
    wx: wx.navigateTo({
      url: `../../base/productDetail/productDetail?detail=${ev.currentTarget.dataset.detail}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})