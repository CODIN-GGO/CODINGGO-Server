const jwt = require('jsonwebtoken');

// 비밀키를 환경 변수에서 가져오거나 기본값 설정
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

// JWT 생성
const generateToken = (user) => {
    // 사용자 정보를 기반으로 액세스 토큰 생성
    return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' }); // 1시간 유효
};

// 리프레시 토큰 생성
const generateRefreshToken = (user) => {
    // 리프레시 토큰 생성
    return jwt.sign({ id: user.id }, secretKey, { expiresIn: '1d' }); // 1일 유효
};

// 토큰 검증
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};

module.exports = {
    generateToken,
    generateRefreshToken,
    verifyToken,
};