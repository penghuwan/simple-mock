import fakeApi from './api';
class XMLHttpRequest {
  constructor () {
    this.url = null;
    this.type = null;
  }
  open (type, url) {
    this.type = type;
    this.url = url;
  }
  send () {
    fakeApi.forEach (item => {
      let rule = item.rule;
      if (typeof rule === 'string') {
        rule = new RegExp (rule);
      }
      if (rule && rule.test (url)) {
        res = item.res;
        hit = true;
        return false;
      }
    });

    if (hit && this.onreadystatechange) {
      this.readyState = 4;
      this.status = 200;
      this.responseText = JSON.stringify (res);
      this.onreadystatechange ();
    }
  }
  // onreadystatechange () {}
}
global.XMLHttpRequest = XMLHttpRequest;
