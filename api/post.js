export function post(url, data, fn) {
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}
// bind
export function postBindVerify(data, fn) {
  let url = 'http://49.51.41.227/newlaAdmin/index.php/Login/send_verify'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}
export function postBind(data, fn) {
  let url = 'http://49.51.41.227/newlaAdmin/index.php/Login/bind'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}
export function postBindRegister(data, fn) {
  let url = 'http://49.51.41.227/newlaAdmin/index.php/Login/register'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}

// login
export function postLogin(data, fn) {
  let url = 'http://192.168.0.104/Newlaadmin/index.php/login/userLogin'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}

// user
export function postUserGet(data, fn) {
  let url = 'http://192.168.0.104/newlaAdmin/index.php/login/userInfo'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}

export function postUser(data, fn) {
  let url = 'http://192.168.0.104/newlaAdmin/index.php/login/change'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}

// alter
export function postAlter(data, fn) {
  let url = 'http://192.168.0.104/newlaadmin/index.php/login/changePwd'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}


