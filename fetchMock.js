import fakeApi from './api';

const originFetch = global.fetch;

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

global.fetch = (url, cfg) => {
  let res;
  let hit = false;

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

  if (hit) {
    return new Promise (resolve => {
      setTimeout (() => {
        resolve (normalize (res));
      }, 1000);
    });
  }

  return originFetch (url, cfg);
};
