// require('../css/app.css');
// require('../scss/base.scss');
const {
  merge, validator, filtrator, sort, search, percent
} = require('./lab3');
const {randomUserMock, additionalUsers} = require('./mock_for_L3');

console.log("Merge: \n", merge(randomUserMock, additionalUsers));
console.log("Validate: \n", validator(merge(randomUserMock, additionalUsers)[1]));
console.log("Filtrate: \n", filtrator(merge(randomUserMock, additionalUsers), "gender", "male"));
console.log("Sort: \n", sort(merge(randomUserMock, additionalUsers), "age", -1));
console.log("Search: \n", search(sort(merge(randomUserMock, additionalUsers), "age", -1), "phone", "078 059 73 14"));
console.log(
  'Percent: \n',
  percent(
    sort(merge(randomUserMock, additionalUsers), 'age', -1),
    (user) => user.gender === 'male'
  )
);
