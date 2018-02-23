let dataList = require('../../static/data/data.js')

Page({
  data: {},
  _getSlideList: function () {
    let _this = this
    _this.setData({
      productList: dataList.dataList.data.productList
    })
  },
  onLoad: function () {
    this._getSlideList()
  },
  toDetail() {
    wx: wx.navigateTo({
      url: '../../base/productDetail/productDetail'
    })
  }
})