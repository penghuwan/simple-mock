export default [
  {
    rule: '/mock',
    res: {
      a: 'data',
      b: [{c: 1}, {d: 1}],
    },
  },
  {
    rule: '/mock2',
    res: {
      j: {
        q: {
          k: 'xxx',
        },
      },
    },
  },
];
