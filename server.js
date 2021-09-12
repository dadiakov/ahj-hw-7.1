/* eslint-disable linebreak-style */
const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');

const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const public = path.join(__dirname,'/public');

const app = new Koa();
app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));
const port = process.env.PORT || 7070;

const tickets = [{ id: 1, author: 'dima', content: 'Some text1' }, { id: 2, author: 'dima', content: 'Some text2' }];


app.use(async (ctx) => {
  const { method, id } = ctx.request.query;
  const headers = { 'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, PATCH',};
  ctx.response.set({ ...headers}); 

  switch (method) {
    case 'allTickets':
      ctx.response.body = tickets;
      return;

    case 'ticketById':
      const ticket = tickets.find((e) => e.id == id);
      if (ticket) {
        ctx.response.body = ticket;
        return;
      }
      ctx.response.status = 404;

    case 'createTicket':
      const { author, content } = ctx.request.body;
      let id = uuidv4();
      tickets.push({ id, author, content });
      ctx.response.body = tickets;
      return;

    case 'deleteTicket':
      if (tickets.some(e => e.id == id)) {
        tickets.splice((tickets.findIndex(e => e.id == id)) , 1);
        ctx.response.body = tickets;
      } else {
        ctx.response.status = 404;
      }
      return;
      // TODO: обработка остальных методов
    default:
      ctx.response.status = 404;
  }
});

const server = http.createServer(app.callback()).listen(port);
