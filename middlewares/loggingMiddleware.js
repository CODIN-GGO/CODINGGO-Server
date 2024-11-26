const morgan = require('morgan');

const loggingMiddleware = (req, res, next) => {
    const start = Date.now(); // 요청 시작 시간 기록

    // Morgan 로깅 설정
    const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
    morgan(format)(req, res, next);

    // 응답이 완료된 후에 실행되는 로깅
    res.on('finish', () => {
        const duration = Date.now() - start; // 요청 처리 시간 계산
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    });
};

module.exports = loggingMiddleware;