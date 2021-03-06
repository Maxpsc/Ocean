//基础方法
import crypto from 'crypto';//用于加密生成各种散列

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

const sha1 = (password) => {
    let sha1 = crypto.createHash('sha1');
    return sha1.update(password).digest('hex');
};
//custom encryption
export const encryption = (password) => sha1('MICROBLOG:' + sha1(password));
