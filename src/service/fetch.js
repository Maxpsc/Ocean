const host = 'http://localhost:3000';

export default function(url, method='GET', data){
    let Header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    let options = {
        method: method,
        mode: 'cors',
        credentials: "same-origin",
        headers: Header
    };
    if(method === 'POST'){
        options.body = JSON.stringify(data);
    }

    return new Promise(function(resolve,reject){
        fetch(`${host}${url}`,options)
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
