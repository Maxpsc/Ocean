import host from 'src/host';
// const host = 'http://localhost:3000';
export default function(url, method='GET', data){
    let headers = new Headers();
    headers.append('Accept', 'application/json, text/plain, */*');
    headers.append('Content-Type', 'application/json');
    let fetchOptions = {
        method: method,
        mode: 'cors',
        credentials: "include",
        headers: headers
    };
    if(method === 'POST'){
        fetchOptions.body = JSON.stringify(data);
    }
    return new Promise(function(resolve,reject){
        fetch(`${host}${url}`,fetchOptions)
        .then(res => res.json())
        .then(res => {
            if(res.error_code === 0){
                resolve(res);
            }else{
                reject(res);
            }
        })
        .catch(error => {
            console.warn(`Network error: ${error}`);
        });
    });
};

export function fetchUpload(url, file){
    let formData = new FormData();
    formData.append('avatar',file);
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');//使用浏览器默认header以携带boundary
    let fetchOptions = {
        method: 'POST',
        mode: 'cors',
        credentials: "include",
        // headers: headers,
        body: formData
    };
    return new Promise(function(resolve,reject){
        fetch(`${host}${url}`,fetchOptions)
        .then(res => res.json())
        .then(res => {
            if(res.error_code === 0){
                resolve(res);
            }else{
                reject(res);
            }
        })
        .catch(error => {
            console.warn(`Network error: ${error}`);
        });
    });
}
