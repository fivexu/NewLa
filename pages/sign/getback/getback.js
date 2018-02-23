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
    code: false,
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
        email: true
      })
    } else {
      this.setData({
        email: false
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
        errorText: '该邮箱未激活或注册'
      })
    } else {
      this.setData({
        currentIndex: 1,
        'topData.currentIndex': 1
      })
      this.timeoutAgin()
    }
    this.timeoutError()
  },
  getAginBtn() {
    if (!this.data.getAgin) {
      return
    }
    this.timeoutAgin()
  },
  userCode(ev) {
    let val = ev.detail.value
    if (parseInt(val) === 8888) {
      this.setData({
        code: true
      })
    } else {
      this.setData({
        code: false
      })
    }
  },
  lastTo() {
    if (!this.data.code) {
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
        passwordSame: true
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
      wx.switchTab({
        url: '../../mine/mine',
      })
    }
    this.timeoutError()
  }
})