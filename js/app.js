"use strict";

let _persons = [];
let _selectedPersonId;

async function loadPersons() {
  let response = await fetch("https://randomuser.me/api/?results=10");
  let data = await response.json();
  //   appendPersons(data.results);
  //   _persons = data.results;
  //   _person = data.results; // set _person to the results array
  //   appendPersons(_person);
  appendPersons(data.results);
  _persons = data.results; //
}

loadPersons();

function appendPersons(persons) {
  for (let person of persons) {
    document.querySelector("#users-container").innerHTML += /*html*/ `
      <article onclick="showDetailView('${person.login.uuid}')">
        <img class="thumbnail" src="${person.picture.thumbnail}">
        <div class="name-gender-div-list">
        <h2 data-name="${person.name.first.toLowerCase()} ${person.name.last.toLowerCase()}" class="name">${person.name.first} ${person.name.last}</h2>
        <p class="dot">•</p>
        <p class="gender">${person.gender}</p>
        </div>
        <p class="email"><a href="mailto:${person.email}">${person.email}</a></p>
        <p class="phone">${person.phone}<p/>
      </article>
      `;
  }
  //   showLoader(false);
}

function showDetailView(id) {
  const person = _persons.find((person) => person.login.uuid === id);
  document.querySelector("#detailViewContainer").innerHTML = /*html*/ `

        <article onclick="showDetailView('${person.login.uuid}')">
        <div class="desktop-image-details">
        <img class="medium" src="${person.picture.medium}">
  <div class="details">
        <div class="name-gender-div">
        <h2 class="name-detail">${person.name.first} ${person.name.last}</h2>
        <p>•</p>
        <p class="gender-detail">${person.gender}</p>
      </div>
      <div class="image-p-div">
        <img class="details-image" src="./img/user.png">
        <p class="username-detail">${person.login.username}</p>
      </div>
      <div class="image-p-div">
        <img class="details-image" src="./img/address.png">
        <p class="address-detail">${person.location.street.number} ${person.location.street.name} ${person.location.city} ${person.location.state} ${person.location.country} ${person.location.postcode}</p>
      </div>
      <div class="image-p-div">
        <img class="details-image" src="./img/email.png">
        <p class="email-detail"><a href="mailto:${person.email}">${person.email}</a></p>
      </div>
      <div class="image-p-div">
        <img class="details-image" src="./img/phone.png">
        <p class="phone-detail">${person.phone}</p>
      </div>
      <div class="image-p-div">
        <img class="details-image" src="./img/timezone.png">
        <p class="timezone-detail">${person.location.timezone.offset} ${person.location.timezone.description}</p>  
      </div>
   </div>
   </div>
        </article>
    `;
  navigateTo("#/user");
}

// function search(value) {
//   value = value.toLowerCase();
//   const filteredPersons = _persons.filter((person) => {
//     const name = `${person.name.first} ${person.name.last}`.toLowerCase();
//     return name.includes(value);
//   });
//   document.querySelector("#users-container").innerHTML = "";
//   appendPersons(filteredPersons);
// }

// function search(value) {
//   value = value.toLowerCase();
//   const filteredPersons = _persons.filter((person) => {
//     const phone = `${person.phone}`.toLowerCase();
//     return phone.includes(value);
//   });
//   document.querySelector("#users-container").innerHTML = "";
//   appendPersons(filteredPersons);
// }
function search(value) {
  value = value.toLowerCase();
  const filteredPersons = _persons.filter((person) => {
    const name = `${person.name.first} ${person.name.last}`.toLowerCase();
    const phone = `${person.phone}`.toLowerCase();
    const gender = `${person.gender}`.toLowerCase();
    return name.includes(value) || phone.includes(value) || gender === value;
  });
  document.querySelector("#users-container").innerHTML = "";
  appendPersons(filteredPersons);
}
