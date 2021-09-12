/* eslint-disable linebreak-style *//* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

class TicketsContainer {
  constructor(container) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    this.container = container;
    this.allTickets();
    this.form = document.querySelector('.form');
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.createTicket();
      this.form.reset();
      this.container.querySelector('.form').classList.add('hidden');
    });
    this.container.querySelector('.add-new-task').addEventListener('click', () => {
      this.container.querySelector('.form').classList.remove('hidden');
    })
  }

  allTickets() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:7070/?method=allTickets';

    xhr.open('GET', url, true);
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          this.renderTickets(data);
          console.log(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  ticketById(id) {
    const xhr = new XMLHttpRequest();
    const url = `http://localhost:7070/?method=ticketById&id=${id}`;

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

  createTicket() {
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
          this.renderTickets(data);
          console.log(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  deleteTicket(id) {
    const xhr = new XMLHttpRequest();
    const url = `http://localhost:7070/?method=deleteTicket&id=${id}`;

    xhr.open('DELETE', url, true);
    xhr.send(null);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          this.renderTickets(data);
          console.log(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  renderTickets(data) {
    document.querySelector('.task-container').innerHTML = '';
    data.forEach((e) => {
      const ticket = `<div class='ticket-container'>
      <div class='ticket-name'>${e.name}</div>
      <div class='ticket-time'>${e.time}</div>
      <div class='ticket-description hidden'>${e.description}</div>
      <div class='edit-delete'><span>&#128393;</span><span>&#11198;</span></div>
      </div>`;
      document.querySelector('.task-container').insertAdjacentHTML('beforeend', ticket);
    });
  }
}

console.log('app start');

const container = new TicketsContainer('.container');

// function allTickets() {
//   const xhr = new XMLHttpRequest();
//   const url = 'http://localhost:7070/?method=allTickets';

//   xhr.open('GET', url, true);
//   xhr.send();

//   xhr.addEventListener('load', () => {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       try {
//         const data = JSON.parse(xhr.responseText);
//         console.log(data);
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   });
// }

// function ticketById(id) {
//   const xhr = new XMLHttpRequest();
//   const url = `http://localhost:7070/?method=ticketById&id=${id}`;

//   xhr.open('GET', url, true);
//   xhr.send();

//   xhr.addEventListener('load', () => {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       try {
//         const data = JSON.parse(xhr.responseText);
//         console.log(data);
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   });
// }

// function createTicket() {
//   const form = document.querySelector('.form');
//   const data = new FormData(form);
//   const xhr = new XMLHttpRequest();
//   const url = 'http://localhost:7070/?method=createTicket';

//   xhr.open('POST', url, true);
//   xhr.send(data);

//   xhr.addEventListener('load', () => {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       try {
//         const data = JSON.parse(xhr.responseText);
//         console.log(data);
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   });
// }

// function deleteTicket(id) {
//   const xhr = new XMLHttpRequest();
//   const url = `http://localhost:7070/?method=deleteTicket&id=${id}`;

//   xhr.open('DELETE', url, true);
//   xhr.send(null);

//   xhr.addEventListener('load', () => {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       try {
//         const data = JSON.parse(xhr.responseText);
//         console.log(data);
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   });
// }

// document.querySelector('.form').addEventListener('submit', (e) => {
//   e.preventDefault();
//   createTicket();
// });

// allTickets();
// ticketById(1)
