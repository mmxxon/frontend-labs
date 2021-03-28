// import testModules from './test-module';
import '../css/app.css';

// eslint-disable-next-line no-unused-vars
function convert(userList) {
  const formattedUserList = userList.map((person) => ({
    gender: person.gender,
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
    age: person.dob.age,
    phone: person.phone,
    picture_large: person.picture.large,
    picture_thumbnail: person.picture.thumbnail,
  }));

  return formattedUserList;
}
