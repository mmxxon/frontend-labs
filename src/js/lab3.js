const codes = require('./codes.json').country;

function calculateAge(birthday) {
  const ageDifMs = new Date(Date.now() - Date.parse(birthday)).getUTCFullYear - 1970;
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function merge(userList, additionalList) {
  const AdditionalList = additionalList.map((user) => ({
    gender: user.gender || null,
    title: user.title || null,
    full_name: user.full_name || null,
    city: user.city || null,
    state: user.state || null,
    country: user.country || null,
    postcode: user.postcode || null,
    coordinates: user.coordinates || null,
    timezone: user.timezone || null,
    email: user.email || null,
    b_date: user.b_day || null,
    age: calculateAge(user.b_day) || null,
    phone: user.phone || null,
    picture_large: user.large || null,
    picture_thumbnail: user.thumbnail || null,
    id: user.id || null,
    favorite: user.favorite || null,
    course: user.course || null,
    bg_color: user.bg_color || null,
    note: user.note || null,
  }));

  const UserList = userList.map((user) => ({
    gender: user.gender,
    title: user.name.title,
    full_name: `${user.name.first} ${user.name.last}`,
    city: user.location.city,
    state: user.location.state,
    country: user.location.country,
    postcode: user.location.postcode,
    coordinates: user.location.coordinates,
    timezone: user.location.timezone,
    email: user.email,
    b_date: user.dob.date,
    age: user.dob.age,
    phone: user.phone,
    picture_large: user.picture.large,
    picture_thumbnail: user.picture.thumbnail,
    id: '',
    favorite: false,
    course: '',
    bg_color: '#FFFFFF',
    note: '',
  }))
  return UserList.concat(AdditionalList.filter((user) => !UserList.find((user2) => user.full_name === user2.full_name)));
}

const isString = (obj) => toString.call(obj) === '[object String]';
const isNumber = (obj) => toString.call(obj) === '[object Number]';
const isUpperCase = (word) => isString(word) && word.charAt(0).toUpperCase() === word.charAt(0);
const isValidNumber = (phone, country) => {
  const val = codes.find((c) => c.eng === country);
  const number = phone.replace(/\D/g, '');
  return val && number.startsWith(val.code) && number.Length === val.length;
};
const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function validator(user) {
  let isValid = [null, true];
  Object.keys(user).forEach(key => {
    if (['full_name', 'gender', 'note', 'state', 'city', 'country'].includes(key)) {
      if (!isUpperCase(user[key])) isValid = [key, false];
    } else if (key === 'age') {
      if (!isNumber(user[key])) isValid = [key, false];
    } else if (key === 'phone') {
      if (!user.hasOwnProperty("country")) isvalid = ['country', false];
      else if (!isValidNumber(user[key], user.country)) isValid = [key, false];
    } else if (key === 'email') {
      if (!user[key].match(mailRegex)) isValid = [key, false];
    }
  })
  return isValid;
}

function filtrator(userList, field, arg) {
  if (!(users && field && arg && users[0][field])) return [];
  return users.filter((user) => user[field] === arg);
}

function sort(userlist, field, order) {
  let userList2;
  if (isNumber(userList[0][field])) {
    userList2 = userlist.sort((a, b) => {
      return order * (a - b);
    })
  } else {
    userList2 = userlist.sort();
    if (order < 0) userList2.reverse();
  }
  return userList2;
}

function search(userList, field, arg) {
  if (!(userList && field && arg && userList[0][field])) return [];
  return userList.find((user) => user[field] === arg);
}

function percent(userList, func) {
  if (!userList || !func) {
    return null;
  }
  const usersFiltered = userList.filter((user) => func(user))
  return 100 * (usersFiltered ? usersFiltered.length / userList.length : 0);
}

module.exports = {
  merge,
  validator,
  filtrator,
  sort,
  search,
  percent
}
