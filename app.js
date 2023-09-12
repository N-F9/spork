var createError = require('http-errors');
const fs = require('fs')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const decompress = require("decompress");

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path =  __dirname + '/uploads'
    cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
    
  }
})

const upload = multer({ storage: storage });

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/website', websiteRouter);
app.post('/website', upload.single('zip'), function(req, res, next) {
  // res.send('respond with a resource');
  // console.log(res)
  // console.log(next)
  console.log(req.file)
  const dirName = 'uploads/' + req.file.originalname
  decompress(dirName, dirName.replace('.zip', ''))
  
  res.redirect('/')
});

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

module.exports = app;
