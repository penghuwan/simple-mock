const fakeApi = require ('./api');

// 保存系统原生的fetch
const originFetch = window.fetch;

// 根据fetch的要求返回的response
const normalize = resp => {
  return {
    ok: true,
    status: 200,
    text () {
      return Promise.resolve (resp);
    },
    json () {
      return Promise.resolve (resp);
    },
  };
};

// 覆盖fetch
window.fetch = (url, cfg) => {
  // url所对应的JSON对象
  let res;
  // 表示是否config文件中是否有和url对应的配置
  let hit = false;
  // 遍历配置文件中输出的数组，检测并尝试获取匹配url的res对象
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
  // 如果命中，那么返回一个Promise，并且传递上面和url匹配的JSON对象
  if (hit) {
    return new Promise (resolve => {
      setTimeout (() => {
        resolve (normalize (res));
      }, 1000);
    });
  }
  // 如果没有命中，那么使用系统原有的fetch的API，实现无缝切换
  return originFetch (url, cfg);
};
