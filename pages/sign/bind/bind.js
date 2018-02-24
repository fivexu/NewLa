import { post, postBindVerify, postBindRegister } from '../../../api/post.js'
const app = getApp()

Page({
  data: {
    topData: {
      currentIndex: 0,
      first: '输入邮箱号',
      next: '输入验证码',
      last: '设置密码'
    },
    passwordShow: false,
    getAgin: false,
    getAginTime: 60,
    error: false,
    errorText: '',
    email: false,
    emailText: '',
    verify: '',
    finished: false,
    code: false,
    codeText: 0,
    passwordSame: false,
    passwordText: '',
    password: false,
    confirmPassword: false,
    currentIndex: 0
  },
  userEmail(ev) {
    let val = ev.detail.value
    let rel = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    if (rel.test(val)) {
      this.setData({
        email: true,
        emailText: val
      })
    } else {
      this.setData({
        email: false,
        emailText: ''
      })
    }
  },
  timeoutAgin() {
    this.setData({
      getAgin: false,
      getAginTime: 60
    })
    let timer = null
    clearInterval(timer)
    timer = setInterval(() => {
      this.data.getAginTime--
      this.setData({
        getAginTime: this.data.getAginTime
      })
      if (this.data.getAginTime <= 0) {
        clearInterval(timer)
        this.setData({
          getAgin: true
        })
      }
    }, 1000)
  },
  timeoutError() {
    let timer = null
    clearTimeout(timer)
    timer = setTimeout(() => {
      this.setData({
        error: false
      })
    }, 3000)
  },
  nextTo() {
    if (!this.data.email) {
      this.setData({
        error: true,
        errorText: '请填写正确邮箱地址'
      })
    } else {
      wx.showLoading({
        title: '发送邮件中',
      })
      postBindVerify({ email: this.data.emailText },
        (res) => {
          wx.hideLoading()
          if (res.data.code === 405 || res.data.code === 200) {
            this.setData({
              currentIndex: 1,
              'topData.currentIndex': 1,
              verify: res.data.verify,
              finished: res.data.code === 405 ? true : false
            })
            this.timeoutAgin()
          } else if (res.data.code === 401) {
            this.setData({
              error: true,
              errorText: '该邮箱已被绑定,请更换邮箱'
            })
            this.timeoutError()
          } else {
            this.setData({
              error: true,
              errorText: '绑定失败,请稍后再试'
            })
            this.timeoutError()
          }
        }
      )
    }
    this.timeoutError()
  },
  getAginBtn() {
    if (!this.data.getAgin) {
      return
    }
    wx.showLoading({
      title: '发送邮件中',
    })
    postBindVerify({ email: this.data.emailText },
      (res) => {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.code === 405 || res.data.code === 200) {
          this.setData({
            verify: res.data.verify,
            finished: res.data.code === 405 ? true : false
          })
        } else {
          this.setData({
            currentIndex: 0,
            'topData.currentIndex': 0,
            error: true,
            errorText: '发送失败,请稍后重试'
          })
          this.timeoutError()
        }
      }
    )
  },
  userCode(ev) {
    let val = ev.detail.value
    if (val.length === 4) {
      this.setData({
        code: true,
        codeText: val
      })
    } else {
      this.setData({
        code: false,
        codeText: 0
      })
    }
  },
  lastTo() {
    if (this.data.codeText != this.data.verify) {
      this.setData({
        error: true,
        errorText: '请填写正确的验证码'
      })
    } else {
      if (this.data.finished) {
        postBind({
          email: this.data.emailText,
          openId: app.globalData.openId
        },
          (res) => {
            console.log(res)
          })
      } else {
        this.setData({
          currentIndex: 2,
          'topData.currentIndex': 2
        })
      }
    }
    this.timeoutError()
  },
  userPassword(ev) {
    let val = ev.detail.value
    let rel = /[a-zA-Z]\w{5,17}$/
    if (rel.test(val)) {
      this.setData({
        password: true,
        passwordText: val
      })
    } else {
      this.setData({
        password: false,
        passwordText: ''
      })
    }
  },
  userConfirmPassword(ev) {
    let val = ev.detail.value
    if (this.data.passwordText === val && this.data.passwordText.length === val.length) {
      this.setData({
        confirmPassword: true,
        passwordSame: true,
        confirmPasswordText: val
      })
    } else {
      this.setData({
        confirmPassword: false,
        passwordSame: false
      })
    }
  },
  showPassword() {
    this.setData({
      passwordShow: !this.data.passwordShow
    })
  },
  finish() {
    if (!this.data.password) {
      this.setData({
        error: true,
        errorText: '请输入6-18位字符、数字或下滑线'
      })
    } else if (!this.data.confirmPassword) {
      this.setData({
        error: true,
        errorText: '密码不一致，请再次确认'
      })
    } else {
      wx.showLoading({
        title: '验证中',
      })
      postBindRegister({
          email: this.data.emailText,
          password: this.data.passwordText,
          confirmPassword: this.data.confirmPasswordText,
          openId: app.globalData.openId
        },
        (res) => {
          wx.hideLoading()
          console.log(res)
          if (res.data.code === 200) {
            wx.switchTab({
              url: '../../mine/mine',
            })
          }
        })
    }
    this.timeoutError()
  }
})