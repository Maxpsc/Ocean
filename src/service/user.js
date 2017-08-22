import fetch from './fetch';

export function fetchDetail(query) {
    return fetch('/api/user/detail?uid='+ query.uid,'GET');
};

export function fetchUpdate(data) {
    return fetch('/api/user/update','POST',data);
};

export function fetchPosts(query) {
    return fetch('/api/user/posts?uid='+ query.uid,'GET');
};
