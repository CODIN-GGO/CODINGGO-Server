const User = require('../models/User'); // 유저 모델


// 유저 생성
const createUser = async (name, age, grade, email, password) => {
    try {
        const user = await User.create({
            name,
            age,
            grade,
            email,
            password,
        });
        return user.get();
    } catch (error) {
        console.error('유저 생성 실패:', error);
        throw new Error('유저 생성 중 오류가 발생했습니다.');
    }
};

// refreshToken 업데이트
const updateRefreshToken = async (userId, refreshToken) => {
    try {
        return await User.update({ refreshToken: refreshToken }, { where: { id: userId } });
    } catch (error) {
        console.error('Refresh Token 업데이트 실패:', error);
        throw new Error('Refresh Token 업데이트 중 오류가 발생했습니다.');
    }
};
// 이메일로 유저 찾기
const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return null; // 사용자 없음
        }
        return user.get(); // 사용자 객체 반환
    } catch (error) {
        console.error('이메일로 유저 찾기 실패:', error);
        throw new Error('이메일로 유저를 찾는 중 오류가 발생했습니다.');
    }
};

module.exports = {
    createUser,
    updateRefreshToken,
    findUserByEmail,
};