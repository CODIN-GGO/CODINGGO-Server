const jwtService = require('../services/jwtService');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer 토큰 추출

    if (!token) {
        const error = new Error('토큰이 비었습니다.');
        error.status = 401;
        return next(error);
    }

    jwtService.verifyToken(token)
        .then((decoded) => {
            req.user = decoded; // 사용자 정보를 요청 객체에 추가 (id, email)
            next();
        })
        .catch((err) => {
            // 토큰 만료 에러 처리
            if (err.name === 'TokenExpiredError') {
                const error = new Error('토큰이 만료되었습니다.');
                error.status = 419;
                return next(error);
            }
            const error = new Error('유효하지 않은 토큰입니다.');
            error.status = 401;
            return next(error);
        });
};

module.exports = {authenticateToken};
