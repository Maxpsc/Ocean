import fetch from './fetch';

export function fetchGet(){
    return fetch('/api/posts','GET');
}
export function fetchPublic(data){
    return fetch('/api/posts/public','POST',data);
}
export function fetchDelete(data){
    return fetch('/api/posts/delete','POST',data);
}
export function fetchUpdate(data){
    return fetch('/api/posts/update','POST',data);
}
