const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
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
  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  
  // Get request returning all the contacts
  app.get('/contacts', function (request, response) {
    db.any('SELECT * FROM contact', [true])
    .then(function(data) {
      response.set('Content-Type', 'application/json');
      response.send(data);
    })
    .catch(function(error) {
      console.log(error)
    });
  });

  app.delete('/remove/:id', function (request, response) {
    db.result('DELETE FROM contact WHERE id = $1', request.params.id)
    .then(function(data) {
      response.set('Content-Type', 'application/json');
      response.send(data);
    })
    .catch(function(error) {
      console.log(error)
    });
  });

  app.post('/new', function (request, response) {
    const first_name = request.body.first_name;
    const last_name = request.body.last_name;
    const phone_number = request.body.phone_number;

    db.result('INSERT INTO contact (first_name, last_name, phone_number) VALUES ($1, $2, $3)', [first_name, last_name, phone_number])
    .then(function(data) {
      response.set('Content-Type', 'application/json');
      response.send(data);
    })
    .catch(function(error) {
      console.log(error)
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
