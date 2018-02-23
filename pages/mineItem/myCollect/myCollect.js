let dataList = require('../../../static/data/data.js')

Page({
  data: {
    releaseList: [],
    trans: 0,
    currentIndex: -1,
    deleteAc: false
  },
  prevent() { },
  _getData() {
    let _this = this
    _this.setData({
      releaseList: dataList.dataList.data.productList
    })
  },
  scrolled() {
    console.log('ok')
  },
  onLoad: function () {
    this._getData()
  },
  touchStart(ev) {
    this.touched = true
    this.disX = ev.changedTouches[0].pageX
    this.setData({
      currentIndex: ev.currentTarget.dataset.index,
      trans: 0
    })
  },
  touchMove(ev) {
    if (!this.touched) {
      return
    }
    let translateX = ev.changedTouches[0].pageX - this.disX
    if (translateX <= -10) {
      if (translateX <= -110) {
        translateX = -110
      }
      this.setData({
        trans: translateX
      })
    }
  },
  touchEnd(ev) {
    if (this.data.trans !== -110) {
      let timer = null
      let n = this.data.trans
      clearInterval(timer)
      timer = setInterval(() => {
        n++
        if (n >= 0) {
          clearInterval(timer)
          this.setData({
            trans: n
          })
        }
        this.setData({
          trans: n
        })
      }, 1)
    }
  },
  deletes() {
    this.setData({
      deleteAc: !this.data.deleteAc
    })
  },
  deleteTo() {
    let arr = this.data.releaseList
    arr.splice(this.data.currentIndex, 1)
    this.setData({
      currentIndex: -1,
      deleteAc: !this.data.deleteAc,
      shelfAc: false,
      releaseList: arr
    })
    wx.showToast({
      title: '已删除',
      icon: 'success',
      duration: 2000
    })
  },
  modelHide() {
    this.setData({
      deleteAc: false
    })
  },
  toDetail() {
    wx.navigateTo({
      url: '../../../base/productDetail/productDetail',
    })
  }
})