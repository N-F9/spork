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
    cb(null, file.originalname.replace(/ /g, '_'))
  }
})

const upload = multer({ storage: storage });

var indexRouter = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

for (const key of fs.readdirSync('uploads/')) {
  app.use(`/${key}`, express.static(`uploads/${key}`))  
}

console.log(app)

app.post('/upload', upload.single('zip'), function(req, res, next) {
  const dirName = 'uploads/' + req.file.originalname.replace(/ /g, '_')
  console.log(dirName)
  const dirNameWithoutZIP = dirName.replace('.zip', '')
  decompress(dirName, dirNameWithoutZIP)
  fs.rmSync(dirName)
  const name = req.file.originalname.replace(/ /g, '_').replace('.zip', '')
  app.use(`/${name}`, express.static(dirNameWithoutZIP))
  // this isn't working for some reason
  
  console.log(app._router.stack)
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
