var createError = require('http-errors');
var express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const socketIo = require("socket.io");
const key = require('./config/keys')
var ExpressPeerServer = require('peer').ExpressPeerServer;
var pgp = require('pg-promise')(options);
var cors = require('cors');
var debug = require('debug')('node-postgres-promises:server');
var http = require('http');
var promise = require('bluebird');
var port = normalizePort(process.env.PORT || '9000');
var logger = require('morgan');

const passport = require('passport');
require('./config/passport')(passport);
require('./config/passport-setup.js')

var options = {
    promiseLib: promise
};

var optionsForPeerjs = {
  debug: true
} 
const connectionString = {
    host: 'localhost',  
    port: 5432,
    database: 'toolArchi',
    user: 'postgres',
    password: 'postgres'
};

var app = express();







// for data base
app.use(passport.initialize());
app.use(passport.session());
var db = pgp(connectionString);

//cors 
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var issueRouter = require('./routes/issues')
var twitterAuthRouter = require('./routes/auth')
var indexRouter = require('./routes/tech');
var usersRouter = require('./routes/users');
var projectRouter = require('./routes/project')
var basic = require('./routes/basic.routes')
var messageRouter = require('./routes/message')
var tweetRouter = require('./routes/tweetAction')








// app.use(express.static(path.join(__dirname, 'public')));


app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

app.set( 'view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

const io = socketIo(server);
app.use(function(req, res, next){
  res.io = io;
  next();
});


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));


//routes
app.use('/api/tech', indexRouter);
app.use('/api/twitter', twitterAuthRouter);
app.use('/api/users', usersRouter);
app.use('/api/project', projectRouter);
app.use('/api/issues',issueRouter);
app.use('/api/message',messageRouter);
app.use('/api/tweetactions', tweetRouter)
app.use("/public", express.static(__dirname + "/public"));
//peerjs for screen sharing
app.use('/peerjs', ExpressPeerServer(server, optionsForPeerjs));
app.use(logger('dev'));



// app.use('/', basic );
app.use(express.static('client/build'))
app.get('*', (req,res)=>{
  res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
})

io.on("connection", socket => {
 
 
    socket.on(key.LINKTOCALL,(data)=>{
    io.emit(key.LINKTOCALL, data); // Emitting a new message. It will be consumed by the client

    })

    socket.on(key.REJECT_REPLY,(data)=>{
      io.emit(key.REJECT_REPLY, data);
    })
    
    socket.on(key.CLOSE_NETWORK_ISSUE,(data)=>{
      io.emit(key.CLOSE_NETWORK_ISSUE, data);
    })

    socket.on(key.ENDCALL_ACK,(data)=>{
      io.emit(key.ENDCALL_ACK, data);
    })

    socket.on(key.END_CALL,(data)=>{
      io.emit(key.END_CALL, data);
    })

    socket.on(key.CALL_ACK_MESSAGE,(data)=>{
      io.emit(key.CALL_ACK_MESSAGE, data);
    })

    socket.on(key.CHECK_TOKEN_VALIDITY, (data)=>{
      io.emit(key.CHECK_TOKEN_VALIDITY, data);
    })
    socket.on(key.LINK_TO_CALL_ACK, (data)=>{
      io.emit(key.LINK_TO_CALL_ACK, data);
    })
    socket.on(key.ENDING_RING, (data)=>{
      io.emit(key.ENDING_RING, data);
    })
    socket.on(key.ENDING_RING_ACK, (data)=>{
      io.emit(key.ENDING_RING_ACK, data);
    })
    socket.on(key.SHARE_MY_SCREEN, (data)=>{
      io.emit(key.SHARE_MY_SCREEN, data);
    })
    socket.on(key.ACCEPT_SHARE_OTHRT_PEER_SCREEN, (data)=>{
      io.emit(key.ACCEPT_SHARE_OTHRT_PEER_SCREEN, data);
    })
   

    socket.on(key.COMFIRM_TOKEN_VALIDITY, (data)=>{
      io.emit(key.COMFIRM_TOKEN_VALIDITY, data)
    })
    socket.on(key.RETRYCALL, (data)=>{
      io.emit(key.RETRYCALL, data)
    })
  socket.on("disconnect", () => {
  });
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

exports.db = db;
exports.db = db;



function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
