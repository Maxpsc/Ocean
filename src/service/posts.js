import fetch from './fetch';

export function fetchGet(id){
    if(id) return fetch('/api/posts?id=' + id,'GET');
    return fetch('/api/posts','GET');
}
export function fetchUserPosts(uid){
    return fetch('/api/posts?uid=' + uid,'GET');
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
