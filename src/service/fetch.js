const host = 'http://localhost:3000';

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
