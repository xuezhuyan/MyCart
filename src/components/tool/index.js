import axios from 'axios'

axios.jsonp = (url, params) => {
  // 1 根据 url 和params 拼接请求地址
  url += '?'
  for (let k in params) {
    url += k + '=' + params[k] + '&'
  }
  // 2 拼接 callback
  const callbackName = 'itcast_' + (new Date() - 0)
  url += 'callback=' + callbackName
  // 3 动态创建script标签
  const script = document.createElement('script')
  script.src = url
  document.head.appendChild(script)
  return new Promise((resolve, reject) => {
    // 给window添加一个函数，就相当于全局函数
    window[callbackName] = function (data) {
      // data 就是 JSONP接口返回的数据
      // 调用resolve获取数据
      resolve(data)
      // 删除掉添加给window的属性
      delete window[callbackName]
      // 移除 script 标签
      document.head.removeChild(script)
    }
  })
}

// axios
//   .jsonp(url, {
//     page: 1,
//     count: 3
//   })
//   .then(res => {
//     console.log(res);
//   })
