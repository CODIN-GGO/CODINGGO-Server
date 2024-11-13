const errorMiddleware = (err, req, res, next) => {
    // 기본 오류 메시지와 상태 코드 설정
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // 개발 환경에서는 에러의 스택 트레이스를 포함
    const errorResponse = {
        status: 'error',
        statusCode: statusCode,
        message: message,
    };

    if (process.env.NODE_ENV !== 'production') {
        errorResponse.stack = err.stack; // 스택 트레이스를 개발 환경에서만 보여줌
    }

    // 클라이언트에게 JSON 형태로 에러 응답 전송
    res.status(statusCode).json(errorResponse);
};

module.exports = errorMiddleware;