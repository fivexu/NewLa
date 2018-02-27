let dataList = require('../../static/data/data.js')

import { getTimes } from '../../common/js/public.js'

Page({
  data: {
    differ: 0,
    disDay: 0,
    disHour: 0,
    disMin: 0,
    disSec: 0,
    shareAc: false,
    collectAc: false,
    contactAc: false,
    commentAc: false,
    commentFocus: false,
    sellerCommentAc: false,
    sellerCommentFocus: false,
    currentIndex: 0,
    commentList: [],
    detailList: [],
    latitude: 0,
    longitude: 0,
  },
  prevent: function (ev) {
  },
  // 举报
  toReport() {
    wx.navigateTo({
      url: '../report/report',
    })
  },
  // 打开地图
  openPosition() {
    wx.openLocation({
      latitude: 35.64242,
      longitude: 104.04311,
      address: '模拟地址,以后填写学校名称',
      scale: 28
    })
  },
  // 分享
  onShareAppMessage(res) {
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 获取详情数据
  getDetail(id) {
    
  },
  // 买家给卖家发
  _getDetailList(obj) {
    let commentLists = dataList.dataList.data.commentList
    obj ? commentLists[commentLists.length] = obj : ''
    this.setData({
      commentList: commentLists
    })
  },
  // 卖家给买家发
  _getDetailListSeller(obj, index) {
    let commentLists = dataList.dataList.data.commentList
    commentLists[index].callback[commentLists[index].callback.length] = obj
    this.setData({
      commentList: commentLists
    })
  },
  // 下架时间倒计时
  _shelfTime() {
    let timer = null
    let _this = this
    clearInterval(timer)
    timer = setInterval(() => {
      getTimes(2018, 1, 24, 24, (res) => {
        _this.setData({
          differ: res.differ,
          disDay: res.disDay,
          disHour: res.disHour < 10 ? `0${res.disHour}` : res.disHour,
          disMin: res.disMin < 10 ? `0${res.disMin}` : res.disMin,
          disSec: res.disSec < 10 ? `0${res.disSec}` : res.disSec
        })
        if (res.differ <= 0) {
          clearInterval(timer)
        }
      })
    }, 1000)
  },
  // 打开分享页
  share() {
    this.setData({
      shareAc: !this.data.shareAc
    })
  },
  onLoad: function (res) {
    this._getDetailList()
    this._shelfTime()
    console.log(res.id)
  },
  collect() {
    this.setData({
      collectAc: !this.data.collectAc
    })
  },
  comment() {
    this.setData({
      commentAc: !this.data.commentAc,
      contactAc: false
    })
  },
  deletes() {
    this.setData({
      collectAc: false,
      shareAc: false,
      commentAc: false,
      contactAc: false,
      commentFocus: false,
      sellerCommentAc: false,
      sellerCommentFocus: false
    })
  },
  commentIn(ev) {
    let _this = this
    wx.getSystemInfo({
      success: function (res) {
        let system = res.system.substring(0, 7)
        if (system === 'Android') {
          _this.setData({
            commentFocus: true
          })
        }
      }
    })
  },
  commentOut(ev) {
    this.setData({
      commentFocus: false
    })
  },
  commentFinish(ev) {
    let obj = {
      avatar: '../../static/image/detail/detail2.jpg',
      name: 'buyer3',
      talk: ev.detail.value,
      talkTime: '1分钟前'
    }
    this._getDetailList(obj)
    this.setData({
      commentFocus: false,
      commentAc: false
    })
  },
  sellerCommentIn(ev) {
    let _this = this
    wx.getSystemInfo({
      success: function (res) {
        let system = res.system.substring(0, 7)
        if (system === 'Android') {
          _this.setData({
            sellerCommentFocus: true
          })
        }
      }
    })
  },
  sellerCommentOut(ev) {
    this.setData({
      commentFocus: false
    })
  },
  sellerCommentFinish(ev) {
    let obj = {
      avatar: '../../static/image/detail/detail2.jpg',
      name: 'seller2',
      talk: ev.detail.value,
      talkTime: '1分钟前'
    }
    this._getDetailListSeller(obj, this.data.currentIndex)
    this.setData({
      sellerCommentFocus: false,
      sellerCommentAc: false
    })
  },
  phoneTo() {
    wx.makePhoneCall({
      phoneNumber: '123456798'
    })
  },
  contactTo() {
    this.setData({
      contactAc: !this.data.contactAc
    })
  },
  toSeller() {
    wx.navigateTo({
      url: '../../pages/seller/seller',
    })
  },
  replyBuyer(ev) {
    let index = ev.currentTarget.dataset.index
    this.setData({
      currentIndex: index,
      sellerCommentAc: !this.data.sellerCommentAc,
      sellerContactAc: false
    })
  }
})