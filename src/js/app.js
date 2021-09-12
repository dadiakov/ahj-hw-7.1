/* eslint-disable linebreak-style *//* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

console.log('app start');

function allTickets() {
  const xhr = new XMLHttpRequest();
  const url = 'http://localhost:7070/?method=allTickets';

  xhr.open('GET', url, true);
  xhr.send();

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
}

function ticketById(id) {
  const xhr = new XMLHttpRequest();
  const url = `http://localhost:7070/?method=ticketById&id=${id}`;

  xhr.open('GET', url, true);
  xhr.setRequestHeader('Access-Control-Allow-Origin' , '*');
  xhr.send();

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
}

function createTicket() {
  const form = document.querySelector('.form');
  const data = new FormData(form);
  const xhr = new XMLHttpRequest();
  const url = 'http://localhost:7070/?method=createTicket';

  xhr.open('POST', url, true);
  xhr.send(data);

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
}

function deleteTicket(id) {
  const xhr = new XMLHttpRequest();
  const url = `http://localhost:7070/?method=deleteTicket&id=${id}`;

  xhr.open('DELETE', url, true);
  xhr.send(null);

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
}

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  createTicket();
});

allTickets();
ticketById(1)
deleteTicket(1);