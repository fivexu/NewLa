Page({
  data: {
    historyList: [],
    value: ''
  },
  onLoad: function () {
    let _this = this
    var value = wx.getStorageSync('history')
    if (value) {
      this.setData({
        historyList: value
      })
    }
  },
  searchTo(ev) {
    let val = ev.detail.value
    let arr = this.data.historyList
    arr = arr.reverse()
    arr[arr.length] = val
    arr = arr.reverse()
    if (arr.length >= 7) {
      arr.pop()
    }
    this.setData({
      historyList: arr,
      value: ''
    })
    wx.setStorageSync('history', arr)
  },
  clearHistory() {
    wx.removeStorageSync('history')
    this.setData({
      historyList: []
    })
  }
})