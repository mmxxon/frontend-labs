import _ from 'lodash';

const phoneCodes = require('./json/codes.json');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toFormatList(userList) {
  const formattedUserList = userList.map((person) => ({
    id: person.id.value || `${person.name.first}${person.name.last}`,
    favorite: false,
    course: null,
    bg_color: '#FF0000',
    gender: capitalizeFirstLetter(person.gender),
    title: person.name.title,
    full_name: `${person.name.first} ${person.name.last}`,
    city: person.location.city,
    state: person.location.state,
    country: person.location.country,
    postcode: person.location.postcode,
    coordinates: person.location.coordinates,
    timezone: person.location.timezone,
    email: person.email,
    b_date: person.dob.date,
    age: parseInt(person.dob.age, 10),
    phone: person.phone,
    picture_large: person.picture.large,
    picture_thumbnail: person.picture.thumbnail,
    note: null,
  }));

  return formattedUserList;
}

export function upCaseCheck(str) {
  if (typeof str === 'string' || str instanceof String) {
    return str.charAt(0).toUpperCase() === str.charAt(0);
  }
  return false;
}

export function validatePerson(person) {
  if (!(upCaseCheck(person.gender)
      && upCaseCheck(person.full_name)
      && (person.state ? upCaseCheck(person.state) : true)
      && upCaseCheck(person.city)
      && upCaseCheck(person.country)
  )) {
    return false;
  }
  /*
    if (typeof person.age !== 'number') {
      return false;
    } */

  const phone = person.phone.replace(/[.,/\s#!$%^&*;:{}=\-_`~()]/g, '');
  const { country } = person;
  const codeInfo = _.find(phoneCodes.country, (code) => code.eng === country);
  if (!codeInfo) {
    return false;
  }
  if (!(phone.startsWith(codeInfo.code.replace(0, 0, '')) && parseInt(phone.replace('+', '', '').length, 10) === parseInt(codeInfo.length, 10))) {
    return false;
  }
  return /\S+@\S+\.\S+/.test(person.email);
}

export function filterBy(userList, param, val) {
  if (!(userList && param && userList[0][param])) {
    return [];
  }
  return userList.filter((user) => user[param] === val);
}

export function strComp(str1, str2) {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  if (s1 < s2) {
    return 1;
  }
  if (s1 > s2) {
    return -1;
  }
  return 0;
}

export function sortBy(userList, param) {
  if (!(userList && param)) {
    return [];
  }
  if (typeof userList[0][param] === 'number') {
    return _.sortBy(userList, (per1, per2) => (per2[param] - per1[param]));
  }
  if (typeof userList[0][param] === 'string' || userList[0][param] instanceof String) {
    return _.sortBy(userList, (per1, per2) => strComp(per2[param], per1[param]));
  }
  return userList.sort();
}

export function findOne(userList, param, val) {
  if (!(userList && param && val)) {
    return null;
  }
  if (/^\d+$/.test(val)) {
    return _.find(userList, (per) => per[param] === parseInt(val, 10));
  }
  return _.find(userList, (per) => per[param] === val);
}

export function getPercentage(userList, pred) {
  if (!userList) {
    return 0;
  }
  const filtered = userList.filter((per) => pred(per));

  return 100 * (filtered ? filtered.length / userList.length : 0);
}
