const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const { Client } = require('pg');
const pgp = require('pg-promise')();

const cn = {
  host: 'ec2-23-23-226-190.compute-1.amazonaws.com',
  port: 5432,
  database: 'd5joh0ms7arpe4',
  user: 'gfaxkjdhdswqty',
  password: '7d38e1568462246cdfe62ced41c8d5fd42d1188c114e92be8efb6a087456147f',
  ssl: true,
};

const db = pgp(cn)

// const client = new Client({
//   connectionString:"postgres://gfaxkjdhdswqty:7d38e1568462246cdfe62ced41c8d5fd42d1188c114e92be8efb6a087456147f@ec2-23-23-226-190.compute-1.amazonaws.com:5432/d5joh0ms7arpe4",
//   ssl: true,
// })

// client.connect();

// client.query('SELECT * FROM contact;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from blabla!"}');
  });

  app.get('/test', function (req, res) {
    db.connect()
    .then(function (obj) {
      res.set('Content-Type', 'application/json');
      res.send('{"message":"resolved"}');
        obj.done();
    })
    .catch(function (error) {
      res.set('Content-Type', 'application/json');
      res.send('{"message":"rejected"}');
    });
  });
  
  app.get('/contact/1', function (request, response) {
    db.any('SELECT * FROM contact', [true])
    .then(function(data) {
      response.set('Content-Type', 'application/json');
      response.send('{"message":"resolved"}');
    })
    .catch(function(error) {
      response.set('Content-Type', 'application/json');
      response.send('{"message":"rejected"}');
    });
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
