const express = require('express');
const port = 1111;
const app = express();
const md = require('express-markdown');
const serveIndex = require('serve-index');
const basicAuth = require('express-basic-auth');

// !!!IMPORTANT: place this before static or similar middleware
const mdMiddle = md({

  // directory where markdown files are stored
  // required
  directory: __dirname + '/public',

  // view to use for rendering markdown file
  // optional
  // default is undefined, no view
  view: undefined,

  // name of markdown variable passed in the context when rendering
  // optional
  // default 'markdown'
  variable: 'bar'

});

app.use(basicAuth({
    users: { 'admin': 'supersecret' },
    challenge: true
}))

app.use('/', mdMiddle, express.static('public/'), serveIndex('public/', {'icons': true}))

app.listen(port, function () {
  console.log("Server is running on "+ port +" port");
});
