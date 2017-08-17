//基础方法
//封装输出JSON
export const packJSON = (items,code=0) => {
    let msgs = {
        '0':'success',
        '6':'wrong params value!',
        '7':'wrong params format!',
        '8':'wrong authority!',
        '9':'server error!'
    };
    return {
        "error_code": code,
        "error_message": msgs[code],
        "items": items
    };
};
