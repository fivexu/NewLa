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