const {merge, validator} = require('../lab3');
const {test1, test2} = require('../data/lab3');

test('Check merge', () => {
  expect(merge(...test1).length).toBe(1);
  expect(merge(...test2).length).toBe(2);
});
