const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const loggingMiddleware = require('./middlewares/loggingMiddleware'); // 로깅 미들웨어
const errorMiddleware = require('./middlewares/errorMiddleware'); // 에러 미들웨어

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

// sequelize 연결
sequelize.sync({force: false})
  .then(()=>{
    console.log('DB 연결')
  })
  .catch((err)=>{
    console.error(err)
  })


// 미들웨어 설정

app.use(loggingMiddleware); // 로깅 미들웨어 사용
app.use(express.json()); // JSON 데이터 처리
app.use(express.urlencoded({ extended: false })); // URL 인코딩 데이터 처리

// TODO - 라우터 설정
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 404 에러 처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url}`);
  error.status = 404;
  next(error);
});

// 에러 미들웨어 사용
app.use(errorMiddleware);

app.listen(app.get('port'), () => {
  console.log(app.get('port'),'번 포트에서 대기 중');
});
