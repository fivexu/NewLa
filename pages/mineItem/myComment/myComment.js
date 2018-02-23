let dataList = require('../../../static/data/data.js')

Page({
  data: {
    commentList: [],
    commentAc: 0
  },
  _getDetailList() {
    this.setData({
      commentList: dataList.dataList.data.commentList
    })
  },
  onLoad: function () {
    this._getDetailList()
  },
  commentIndex(ev) {
    console.log(ev.target.dataset.index)
    this.setData({
      commentAc: parseInt(ev.target.dataset.index)
    })
  },
  toDetail() {
    wx.navigateTo({
      url: '../../../base/productDetail/productDetail',
    })
  },
  toSeller() {
    wx.navigateTo({
      url: '../../seller/seller',
    })
  },
  toUser() {
    wx.navigateTo({
      url: '../../user/user',
    })
  }
})