import fetch from './fetch';

export function fetchLogin(data){
    return fetch('/api/login','POST',data);
};

export function fetchReg(data){
    return fetch('/api/reg','POST',data);
};

export function fetchLogout(){
    return fetch('/api/logout','GET');
};
