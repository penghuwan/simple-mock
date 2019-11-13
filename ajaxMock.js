import fakeApi from './api.js';

// 保存系统原生的XMLHttpRequest对象
const RealXHR = window.XMLHttpRequest;

class XMLHttpRequest {
  constructor () {
    this.url = null;
    this.type = null;
    this.hit = false;
    // 真实的xhr
    this.xhr = null;
  }
  open (type, url, bool) {
    // 遍历配置文件中输出的数组，检测并尝试获取匹配url的res对象
    fakeApi.forEach (item => {
      let rule = item.rule;
      if (typeof rule === 'string') {
        rule = new RegExp (rule);
      }
      if (rule && rule.test (url)) {
        this.res = item.res;
        this.hit = true;
        return false;
      }
    });
    // 如果没有命中，那么使用系统原有的Ajax的API，实现无缝切换
    if (!this.hit) {
      this.xhr = new RealXHR ();
      this.xhr.open (type, url, bool);
    }
  }
  send (args) {
    // 如果命中，就覆盖Ajax的API
    if (this.hit && this.onreadystatechange) {
      this.readyState = 4;
      this.status = 200;
      this.responseText = JSON.stringify (this.res);
      this.onreadystatechange ();
    } else {
      // 如果没有命中，那么使用系统原有的Ajax的API，实现无缝切换
      this.xhr.send (args);
    }
  }
}
// 覆盖
window.XMLHttpRequest = XMLHttpRequest;
