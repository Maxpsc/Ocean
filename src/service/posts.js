import fetch from './fetch';

export function fetchGet(){
    return fetch('/api/posts','GET');
};
export function fetchPublic(data){
    return fetch('/api/posts/public','POST',data);
}
