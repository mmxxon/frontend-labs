// require('../css/app.css');
// require('../scss/base.scss');
const {merge, validator} = require('./lab3');
const {randomUserMock, additionalUsers} = require('./mock_for_L3');

console.log(merge(randomUserMock, additionalUsers))
console.log(validator(merge(randomUserMock, additionalUsers)[1]))
