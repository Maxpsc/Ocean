import fetch from './fetch';
import crypto from 'crypto';

export function fetchLogin(data){
    return fetch('/api/login','POST',data);
};

export function fetchReg(data){
    return fetch('/api/reg','POST',data);
};

export function fetchLogout(){
    return fetch('/api/logout','GET');
};

export function md5(password){
    let md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}
