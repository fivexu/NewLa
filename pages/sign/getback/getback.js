import { post } from '../../../api/post.js'

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
    emailText: false,
    verify: '',
    code: false,
    codeTrue: true,
    passwordSame: false,
    passwordText: '',
    password: false,
    confirmPassword: false,
    confirmPasswordText: '',
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
        errorText: '请填写正确邮箱格式'
      })
    } else {
      wx.showLoading({
        title: '发送邮件中'
      })
      post(
        'http://192.168.0.104/Newlaadmin/index.php/login/backPwd',
        { email: this.data.emailText },
        (res) => {
          wx.hideLoading()
          if (res.data.code === 200) {
            this.setData({
              currentIndex: 1,
              'topData.currentIndex': 1,
              verify: res.data.verify
            })
            this.timeoutAgin()
          } else if (res.data.code === 404) {
            this.setData({
              error: true,
              errorText: '该邮箱未注册,请注册或重填邮箱'
            })
            this.timeoutError()
          } else {
            this.setData({
              error: true,
              errorText: '发送失败,服务器崩溃,请稍后重试'
            })
            this.timeoutError()
          }
        })
    }
    this.timeoutError()
  },
  getAginBtn() {
    if (!this.data.getAgin) {
      return
    }
    wx.showLoading({
      title: '发送邮件中'
    })
    post(
      'http://192.168.0.104/Newlaadmin/index.php/login/backPwd',
      { email: this.data.emailText },
      (res) => {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.hideLoading()
          this.setData({
            verify: res.data.verify
          })
          this.timeoutAgin()
        }
      })
    this.timeoutAgin()
  },
  userCode(ev) {
    let val = ev.detail.value
    if (val.length === 4) {
      this.setData({
        code: true
      })
    } else {
      this.setData({
        code: false
      })
    }
    if (parseInt(val) === this.data.verify) {
      this.setData({
        codeTrue: true
      })
    } else {
      this.setData({
        codeTrue: false
      })
    }
  },
  lastTo() {
    if (!this.data.codeTrue) {
      this.setData({
        error: true,
        errorText: '请填写正确的验证码'
      })
    } else {
      this.setData({
        currentIndex: 2,
        'topData.currentIndex': 2
      })
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
        title: '修改中'
      })
      post('http://192.168.0.104/Newlaadmin/index.php/login/savePwd',
        {
          email: this.data.emailText,
          password: this.data.passwordText,
          confirmPassword: this.data.confirmPasswordText
        },
        (res) => {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.code === 200) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000
            })
            wx.switchTab({
              url: '../../mine/mine',
            })
          } else if (res.data.code === 205) {
            this.setData({
              error: true,
              errorText: '修改失败,两次密码不同,请重新输入'
            })
            this.timeoutError()
          } else {
            this.setData({
              error: true,
              errorText: '修改失败,请稍后再试'
            })
            this.timeoutError()
          }
        })
    }
    this.timeoutError()
  }
})