require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const { PORT } = process.env;
const v1router = require('./routes/v1.routes');


// middlewares
app.use(morgan('dev'));
app.use(express.json());

// import router
app.use('/api/v1/', v1router);
app.get('/', (req, res) => {
  return res.json({
    status: true,
    message: "Welcome to Apis - Challenge Chapter 6",
    error: null,
    data: null,
  });
});

// 404 error handling
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Not Found",
    data: null,
  });
});

// 500 error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
    data: err.message
  });
});

// running port 
app.listen(PORT, () => console.log(`Server Listen ${PORT}`));
