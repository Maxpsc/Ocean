import fetch from './fetch';

export function fetchUsers() {
    return fetch('/api/users','GET');
};

export function fetchDelete(data) {
    return fetch('/api/users/delete','POST',data);
};

export function fetchEdit(data) {
    return fetch('/api/users/update','POST',data);
};
