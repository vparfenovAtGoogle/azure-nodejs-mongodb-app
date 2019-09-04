var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var mongoClient = require("mongodb").MongoClient;

if (true) mongoClient.connect("mongodb://gdc-vparfenov-cloud-apps-cosmos:PHpdgKLZPM2iyqQ0cbLAgkqOUHOWqT9oE9LXVUvw8kOHgni8LqutAdz6dZBc68Ooz1QAMqugnNtnj7UqhXLT4g%3D%3D@gdc-vparfenov-cloud-apps-cosmos.documents.azure.com:10255/?ssl=true",
  {useNewUrlParser: true, useUnifiedTopology: true}).then (client => {
    console.log (`Client opened`)
    var dbo = client.db ("mydb");
    dbo.createCollection("customers").then (coll => {
      console.log (`Collection created`)
      coll.insertOne({ name: "Company Inc", address: "Highway 37" }).then (() => {
        console.log("1 document inserted");
        return coll.find().toArray ()
      }).then (result => {
        let idx = 0
        result.forEach (record=>record.idx = idx++)
        console.log(`records: ${JSON.stringify (result, null, 2)}`);
      })
    })
    .catch (err => console.log (`Collection Access Error: ${err}`))
  })
  .catch (err => console.log (`Client Error: ${err}`))

module.exports = app;
