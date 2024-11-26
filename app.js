const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const loggingMiddleware = require('./middlewares/loggingMiddleware'); // 로깅 미들웨어
const errorMiddleware = require('./middlewares/errorMiddleware'); // 에러 미들웨어
const { authenticateToken } = require('./middlewares/authMiddleware'); // 토큰 검증 미들웨어

const authRoutes = require('./routes/authRoutes');

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

// 라우터 설정
app.use('/auth', authRoutes); // '/auth' 경로에 authRoutes 사용

// TODO - 라우터 설정
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// jwt test
app.get('/tokentest', authenticateToken, (req, res) => {
  // req.user를 통해 인증된 사용자 정보에 접근
  res.json({ message: '토큰 검증 성공.', user: req.user });
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
