export default function (Mock) {
  // 解决 Mock 情况下，携带 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false
    }
    this.proxy_send(...arguments)
  }
}
