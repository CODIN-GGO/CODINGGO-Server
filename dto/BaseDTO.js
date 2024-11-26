class BaseDTO {
    validate(props) {
        if (!props) throw new Error("body 비어있음");
        if (typeof props !== "object")
            throw new Error("body 타입 올바르지않음");

        for (const key in props) {
            // props[key]가 undefined인 경우에만 오류 발생, null과 false는 허용
            if (props[key] === undefined) {
                throw new Error(`${key} 속성이 비어있음`);
            }
        }
    }

    todate(d) {
        const date = new Date(d);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}-${month}-${day}`;
    }
}

module.exports = BaseDTO;