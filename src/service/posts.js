import fetch from './fetch';

export function fetchGet(data){
    if(data.id){
        return fetch('/api/posts?id=' + data.id,'GET');
    }else if(data.uid){
        return fetch('/api/posts?uid=' + data.uid,'GET');
    }else{
        return fetch('/api/posts','GET');
    }
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
