const jwtService = require('../services/jwtService');
const User = require('../models/User'); // 유저 모델
const UserService = require('../services/userService');
const { UserCreateRequestDTO, UserCreateResponseDTO, UserLoginRequestDTO, UserLoginResponseDTO } = require('../dto/UserDTO');
const bcrypt = require('bcrypt');


// 회원가입
const register = async (req, res) => {
    try {
        const userRequestDTO = new UserCreateRequestDTO(req.body);
        const user = await UserService.findUserByEmail(userRequestDTO.email); // 서비스에서 사용자 검색

        // 이미 해당 이메일의 사용자가 존재하면 에러 반환
        if(user){
            const response = new UserCreateResponseDTO(false, 'USERCREATE_FAILED', '해당 이메일의 유저가 이미 존재합니다.', null);
            return res.status(401).json(response); 
        }
        // 비밀번호 해싱
        const hash = await bcrypt.hash(userRequestDTO.password, 10);
        const newUser = await UserService.createUser(userRequestDTO.name, userRequestDTO.age, userRequestDTO.grade, userRequestDTO.email, hash);
        console.log(newUser);
        
        const response = new UserCreateResponseDTO(true, 'USERCREATE_SUCCESS', '유저 생성을 성공했습니다.', newUser);
        return res.status(201).json(response);
    } catch (error) {
        console.log(error)
        const response = new UserCreateResponseDTO(false, 'USERCREATE_FAILED', error.message || '유저 생성 중 오류가 발생했습니다.', null);
        return res.status(400).json(response);
    }
};

// 로그인
const login = async (req, res) => {
    try {
        const userLoginRequestDTO = new UserLoginRequestDTO(req.body);
        const user = await UserService.findUserByEmail(userLoginRequestDTO.email); // 서비스에서 사용자 검색

        if (user && await bcrypt.compare(userLoginRequestDTO.password, user.password)) { // 비밀번호 검증 로직 추가
            // jwt토큰, refresh토큰 생성
            const token = jwtService.generateToken(user);
            const refreshToken = jwtService.generateRefreshToken(user);
            const result = { userId: user.id, accessToken: token,  refreshToken: refreshToken};

            console.log(result);
            const response = new UserLoginResponseDTO(true, 'LOGIN_SUCCESS', '로그인에 성공했습니다.', result);

            // refreshToken 업데이트
            await UserService.updateRefreshToken(user.id, refreshToken);

            return res.status(200).json(response);
        } else {
            const response = new UserLoginResponseDTO(false, 'LOGIN_FAILED', '이메일과 비밀번호를 확인해주세요.', null);
            return res.status(401).json(response);
        }
    } catch (error) {
        const response = new UserLoginResponseDTO(false, 'LOGIN_FAILED', error.message || '로그인 중 오류가 발생했습니다.', null);
        return res.status(500).json(response);
    }
};

module.exports = {
    register,
    login,
};