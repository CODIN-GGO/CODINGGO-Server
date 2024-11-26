const BaseDTO = require("./BaseDTO");

/**회원가입 요청*/
class UserCreateRequestDTO extends BaseDTO {
    name;
    age;
    grade;
    email;
    password;

    constructor(body) {
        super();
        this.name = body.name;
        this.age = body.age;
        this.grade = body.grade;
        this.email = body.email;
        this.password = body.password;
        this.validate(this);
    }
}

/**회원가입 응답*/
class UserCreateResponseDTO extends BaseDTO {
    isSuccess;
    code;
    message;
    result;

    constructor(isSuccess, code, message, user) {
        super();
        this.isSuccess = isSuccess; // 성공 여부 (Boolean)
        this.code = code; // 코드 설정
        this.message = message; // 메시지 설정
        this.result = user ? { // user가 존재하는 경우에만 정보 설정
            userId: user.id,
            name: user.name,
            age: user.age,
            grade: user.grade,
            email: user.email,
        } : null; // user가 없을 경우 null
        this.validate(this);
    }
}

/**로그인 요청*/
class UserLoginRequestDTO extends BaseDTO {
    email;
    password;

    constructor(body) {
        super();
        this.email = body.email;
        this.password = body.password;
        this.validate(this);
    }
}

/**로그인 응답*/
class UserLoginResponseDTO extends BaseDTO {
    isSuccess;
    code;
    message;
    result;

    constructor(isSuccess, code, message, userId, access, refresh) {
        super();
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
        this.result = {
            userId: userId, // 로그인 유저 아이디
            accessToken: access, // JWT 토큰
            refreshToken: refresh, // JWT 토큰
        };
        this.validate(this);
    }
}




module.exports = {
    UserCreateRequestDTO,
    UserCreateResponseDTO,
    UserLoginRequestDTO,
    UserLoginResponseDTO,
};

